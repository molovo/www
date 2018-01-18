// Base gulp dependencies
import 'isomorphic-fetch'
import gulp          from 'gulp'
import source        from 'vinyl-source-stream'
import buffer        from 'vinyl-buffer'
import gutil         from 'gulp-util'
import rename        from 'gulp-rename'
import livereload    from 'gulp-livereload'
import { spawnSync } from 'child_process'
import changed       from 'gulp-changed'
import clone         from 'gulp-clone'
import runSequence   from 'run-sequence'
import es            from 'event-stream'
import through       from 'through2'
import fs            from 'fs'
import filter        from 'gulp-filter'

// Dependencies for compiling coffeescript
import sourcemaps from 'gulp-sourcemaps'
import browserify from 'browserify'
import watchify   from 'watchify'
import eslint     from 'gulp-eslint'
import uglifyEs   from 'uglify-es'
import composer   from 'gulp-uglify/composer'
const uglify = composer(uglifyEs, console)

// Dependencies for compiling sass
import sassLint               from 'gulp-sass-lint'
import sass                   from 'gulp-sass'
import autoprefixer           from 'gulp-autoprefixer'
import { stream as critical } from 'critical'

// Dependencies for compressing images
import imagemin  from 'gulp-imagemin'
import mozJpeg   from 'imagemin-mozjpeg'
import webp      from 'gulp-webp'
import potrace   from 'potrace'
import sharp     from 'sharp'

// Dependencies for compressing HTML
import htmlmin  from 'gulp-htmlmin'

// Sources for compilation
const sources = {
  sass: '_assets/sass/**/*.s+(a|c)ss',
  js: '_assets/js/**/*.js',
  images: [
    '_assets/img/**/*.{jpg,jpeg,gif,png,svg}',
    '_site/img/**/resized/**/*.{jpg,jpeg,gif,png,svg}'
  ],
  views: [
    '*.{html,md,markdown,svg}',
    '_{layouts,includes,posts,studies,archive}/**/*.{html,md,markdown,svg}',
    'errors/**/*.{html,md,markdown}',
    '_data/**/*.yml',
    '_config{,.dev}.yml',
    'sw.js'
  ]
}

// Entry points for compilation
const entries = {
  sass: '_assets/sass/main.sass',
  js: '_assets/js/main.js'
}

// The current environment
const env = gutil.env.env || 'dev'

/**
 * Linting tasks
 */
gulp.task('lint', (cb) => {
  return runSequence('lint:sass', 'lint:js')
})

gulp.task('lint:sass', () => {
  return gulp.src(sources.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('lint:js', () => {
  return gulp.src(sources.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
})

gulp.task('validate:html', () => {
  return spawnSync('bundle exec validate.rb')
})

/**
 * Compilation tasks
 */
gulp.task('compile', (cb) => {
  const tasks = [
    ['compile:html', 'compile:sass', 'compile:js'],
    'compile:images'
  ]

  if (env !== 'dev') {
    tasks.push('compile:critical')
  }

  if (env === 'production') {
    tasks.push('sitemap:submit')
  }

  return runSequence(...tasks, cb)
})

gulp.task('compile:sass', () => {
  return gulp.src(entries.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'not ie <= 11', 'not android <= 60'],
      cascade: false
    }))
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('_site/css/'))
    .pipe(livereload('*.css'))
})

// Set up the browserify instance
let bundler = browserify({
  ...watchify.args,
  debug: env === 'dev',
  entries: [entries.js]
})

if (env !== 'dev') {
  bundler.transform('uglifyify', {
    global: true
  })
}

bundler.transform('babelify')

if (env === 'dev') {
  bundler = watchify(bundler)
  bundler.on('update', bundle)
  bundler.plugin('errorify')
}

function bundle () {
  return bundler
    .bundle()
    .on('error', gutil.log)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/js/'))
    .pipe(livereload('*.js'))
}

gulp.task('compile:js', bundle)

gulp.task('compile:critical', () => {
  return gulp.src('_site/**/*.html')
    .pipe(critical({
      base: '_site/',
      inline: true,
      minify: true
    }))
    .on('error', err => gutil.log(gutil.colors.red(err.message)))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('_site'))
})

function trace () {
  return through.obj(function (file, encoding, callback) {
    if (!file.path.match(/\.(jpg|jpeg|png)$/)) {
      callback()
      return
    }

    potrace.trace(file.contents, {
      color: 'lightgray',
      optTolerance: 0.4,
      turdSize: 100,
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
    }, (err, svg) => {
      if (err) {
        throw err
      }

      file.path = file.path.replace(/\..+$/, '-traced.svg')
      file.contents = Buffer.from(svg)
      this.push(file)
      callback()
    })
  })
}

gulp.task('compile:images', () => {
  const images = gulp.src(sources.images)
    .pipe(changed('_site/img/'))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 3
      }),
      mozJpeg({
        progressive: true,
        quality: 72
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: true
          }
        ]
      })
    ]))

  const webpImages = images.pipe(clone())
    .pipe(webp({
      optimizationLevel: 6
    }))

  const tracedImages = images.pipe(clone())
    // .pipe(filter('*.{jpg,jpeg,png}'))
    // .pipe(sharp().resize(200))
    .pipe(trace())

  return es.merge(images, webpImages, tracedImages)
    .pipe(gulp.dest('_site/img/'))
    .pipe(livereload())
})

gulp.task('compile:html', () => {
  const args = {
    dev: [
      'exec',
      'jekyll',
      'build',
      '--incremental',
      '--trace',
      '--drafts',
      '--config',
      '_config.yml,_config.dev.yml'
    ],
    staging: [
      'exec',
      'jekyll',
      'build',
      '--config',
      '_config.yml,_config.staging.yml'
    ],
    production: [
      'exec',
      'jekyll',
      'build'
    ]
  }

  return spawnSync('bundle', args[env], {
    stdio: 'inherit'
  })
})

gulp.task('sitemap:submit', () => {
  const sitemap = 'https://molovo.co/sitemap.xml'
  const urls = [
    `http://www.google.com/webmasters/sitemaps/ping?sitemap=${sitemap}`,
    `http://www.bing.com/webmaster/ping.aspx?siteMap=${sitemap}`
  ]

  return Promise.all(urls.map(u => fetch(u)))
})

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch(sources.images, ['compile:images'])
  gulp.watch(sources.js, ['compile:js'])
  gulp.watch(sources.sass, ['compile:sass'])
  gulp.watch(sources.views, ['compile:html'])

  gulp.watch('_site/**/*.html')
    .on('change', file => livereload.changed(file.path))
})

gulp.task('test', (cb) => {
  return runSequence('lint', 'validate:html', cb)
})

gulp.task('default', (cb) => {
  return runSequence(
    'compile',
    'watch',
    cb
  )
})