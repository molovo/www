# Developer Handover Document - molovo.next

## Project Overview

**molovo.next** is a sophisticated Next.js 15.4.2 portfolio website for James Dinsdale (molovo), a designer and developer from Poole, UK. The project showcases design work, case studies, open source projects, and blog articles using modern web technologies with a focus on performance, accessibility, and user experience.

**Key Characteristics:**

- Personal portfolio and blog website
- Content-driven architecture with MDX
- Performance-optimized with accessibility-first approach
- Modern React 19 + Next.js 15 stack
- Deployed on Netlify with serverless functions

## 🏗️ Architecture Overview

### Tech Stack

- **Framework:** Next.js 15.4.2 with App Router
- **Frontend:** React 19.1.0, TypeScript 5.8.3
- **Styling:** Sass with component-based architecture
- **Content:** MDX with file-based content management
- **State Management:** Zustand (5 separate stores)
- **Package Manager:** Yarn 4.9.2
- **Deployment:** Netlify with serverless functions
- **Analytics:** Umami (self-hosted)

### Project Structure

```
molovo/
├── content/               # MDX content files
│   ├── posts/            # Blog articles
│   ├── studies/          # Case studies with sections
│   ├── projects/         # Open source projects
│   └── _drafts/          # Development-only content
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (site)/       # Main site pages
│   │   ├── api/          # API routes
│   │   └── feed.xml/     # RSS feed generation
│   ├── components/       # React components
│   │   └── homepage/     # Landing page sections
│   ├── data/             # Server-side data fetching
│   ├── store/            # Zustand state management
│   ├── stylesheets/      # Sass styling architecture
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── fonts/            # Local font files and configs
│   └── images/           # Static images and icons
├── public/               # Static assets
└── netlify.toml          # Deployment configuration
```

## 📝 Content Management System

### File-Based Content Architecture

The project uses a sophisticated file-based content management system with MDX:

**Content Types:**

- **Posts** (`content/posts/`): Blog articles with metadata
- **Studies** (`content/studies/`): Complex case studies with multiple sections
- **Projects** (`content/projects/`): Open source project showcases
- **Drafts** (`content/_drafts/`): Development-only preview content

**Content Structure:**

```typescript
// Example post metadata
export const metadata = {
  title: 'Article Title',
  subtitle: 'Article subtitle',
  date: new Date('2024-01-15'),
  published: true,
  tags: ['design', 'development'],
  hero: {
    src: '/images/hero.jpg',
    alt: 'Hero image description',
  },
}
```

**Data Layer (`src/data/`):**

- `posts.ts` - Blog post management with sorting and filtering
- `studies.ts` - Case study data with client filtering
- `projects.ts` - Open source project showcase
- `helpers.ts` - Shared utilities for content processing

All data functions use `'use server'` directive for SSR optimization.

## 🎨 Component Architecture

### Organization Strategy

- **Flat Structure:** Components organized in a flat hierarchy for easy discovery
- **Homepage Components:** Dedicated `/homepage` folder for landing page sections
- **Reusable UI:** Highly reusable components (Image, Button, Link, etc.)
- **Content Components:** Specialized MDX rendering components
- **Custom Components:** Advanced interactive features with animations

### Key Components

**Core UI Components:**

- `Image` - Optimized image component with zoom and responsive sizing
- `Button` - Consistent button styling with theme integration
- `Link` - Enhanced Next.js Link with external link handling
- `ContentFigure` - MDX image and video embedding
- `Social` - Social media integration and sharing

**Layout Components:**

- `Header` - Responsive navigation with theme integration
- `Footer` - Site footer with contact and social links
- `Menu` - Mobile-friendly navigation menu
- `SkipTo` - Accessibility skip links

**Interactive Components:**

- `Slideshow` - Touch-enabled image galleries
- `SyncedScroll` - Synchronized scrolling between elements
- `Contact` - Contact form with ALTCHA CAPTCHA
- `ThemeProvider` - Dynamic theming system

## 🗂️ State Management (Zustand)

The project uses Zustand with 5 separate lightweight stores:

### Store Architecture

```typescript
// src/store/
├── client.tsx              # Current client selection
├── loading.tsx             # Global loading state
├── nav-state.tsx           # Navigation menu state
├── theme.tsx               # Complex theming system
└── contact-form-state.tsx  # Contact form visibility
```

### Theme Store (Most Complex)

The theme store manages:

- Color schemes based on content
- Header styles that change with scroll position
- Client-specific branding colors
- Dark/light mode preferences

**Usage Example:**

```typescript
import { useThemeStore } from '@/store/theme'

const { headerStyle, setHeaderStyle } = useThemeStore()
```

All stores integrate with Zustand devtools for development debugging.

## 🎯 Styling Architecture (Sass)

### Organization Strategy

```sass
// src/stylesheets/main.sass
@forward 'setup/reset'
@forward 'setup/vars'
@forward 'setup/typography'
@forward 'setup/layout'
@forward 'setup/helpers'
@forward 'setup/a11y'

@forward 'components/header'
@forward 'components/footer'
// ... all component styles

@forward 'pages/article'
@forward 'pages/writing'
// ... page-specific styles
```

### Key Features

- **CSS Variables:** Extensive use for theming and responsive design
- **Component Matching:** Sass files match React component structure
- **Mobile-First:** Responsive design with custom breakpoints
- **Typography:** Advanced typography with multiple custom fonts
- **Accessibility:** Built-in accessibility features and focus management

### Font Management

- **Custom Fonts:** Multiple professionally licensed typefaces
- **Loading Strategy:** Next.js localFont with `display: swap`
- **Dynamic Switching:** Different fonts for different content types
- **CSS Variables:** Font switching via custom properties

## 🔧 Development Workflow

### Scripts Overview

```json
{
  "dev": "next dev", // Development server
  "build": "next build", // Production build
  "start": "next start", // Production server
  "lint": "next lint", // ESLint checking
  "pa11y": "pa11y-ci --sitemap https://molovo.co/sitemap.xml", // Accessibility testing
  "pa11y:local": "pa11y-ci --sitemap http://localhost:3000/sitemap.xml", // Local a11y testing
  "knip": "knip" // Unused code detection
}
```

### Code Quality Tools

**ESLint Configuration:**

- Next.js core web vitals rules
- TypeScript integration
- React best practices (avoiding unnecessary useEffect)
- JSX accessibility linting

**Prettier Configuration:**

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

**Additional Tools:**

- **Knip:** Unused dependency and code detection
- **Bundle Analyzer:** Webpack bundle analysis for optimization
- **TypeScript:** Strict mode enabled for type safety

### Testing Strategy

The project uses an **accessibility-first testing approach**:

- **Primary Testing:** pa11y-ci for automated accessibility testing
- **CI Integration:** Tests run on every push/PR via GitHub Actions
- **Coverage:** Tests entire sitemap for WCAG compliance
- **No Unit Tests:** Project relies on TypeScript and accessibility testing

## 🌐 Server-Side Architecture

### API Routes

```typescript
// src/app/api/
├── contact/
│   ├── submit/           # POST - Form submissions
│   └── altcha/challenge/ # GET - CAPTCHA challenges
└── content/
    └── studies/          # GET - Case study data with filtering
```

### Server Components & Actions

- **Data Layer:** All content fetching uses `'use server'` directive
- **Static Generation:** Pre-built pages for posts and studies
- **ISR Support:** Incremental Static Regeneration for content updates
- **RSS Generation:** Dynamic RSS feed from posts and studies

### Middleware (`src/middleware.ts`)

- Minimal implementation for pathname extraction
- Adds `x-pathname` header for SSR routing decisions
- Currently processes all requests (empty matcher)

### External Integrations

**Email & Communication:**

- **Resend:** Email delivery for contact form
- **ALTCHA:** Privacy-focused CAPTCHA alternative to reCAPTCHA

**Analytics & Social:**

- **Umami:** Self-hosted analytics with script proxying
- **Webmentions:** Social interaction via webmention.io
- **IndieWeb:** Proper rel="me" links for identity verification

**Content & Media:**

- **Puppeteer:** OG image generation for social media
- **Image Optimization:** Next.js Image with remote patterns
- **RSS Feeds:** Combined posts and studies feed

## 🚀 Build & Deployment

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "yarn pre-build && yarn build"

[functions]
  included_files = ["content/**/*"]
  node_bundler = "esbuild"
  external_node_modules = ["@sparticuz/chromium"]
```

### Build Process

1. **Pre-build:** Puppeteer browser installation for OG image generation
2. **Build:** Next.js build with MDX compilation
3. **Deploy:** Netlify serverless functions with content files included

### Environment Variables Required

```bash
# Email Configuration
RESEND_API_KEY=your_resend_api_key
CONTACT_FORM_EMAIL_FROM=hi@molovo.co
CONTACT_FORM_EMAIL_TO=hi@molovo.co

# Security
ALTCHA_HMAC_KEY=your_altcha_secret

# Analytics (Optional)
UMAMI_WEBSITE_ID=your_umami_id
```

### CI/CD Pipeline (GitHub Actions)

- **Accessibility Testing:** pa11y-ci runs on every push/PR
- **Quality Gates:** Blocks merges if accessibility issues found
- **PR Feedback:** Automated comments with test results

## 🔒 Security & Performance

### Security Measures

```
# public/_headers
Referrer-Policy: no-referrer-when-downgrade
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

**Form Security:**

- ALTCHA CAPTCHA for bot protection
- Yup schema validation (client and server)
- Email sanitization and validation

### Performance Optimizations

- **Image Optimization:** Custom Image component with lazy loading
- **Font Loading:** Strategic font loading with fallbacks
- **Bundle Splitting:** Optimized package imports
- **Caching:** Multi-layer caching for content and assets
- **Static Generation:** Aggressive pre-building with ISR fallback

## 📋 Common Tasks for New Developers

### Adding New Content

**New Blog Post:**

1. Create MDX file in `content/posts/`
2. Add metadata export with required fields
3. Content appears automatically in listings

**New Case Study:**

1. Create directory in `content/studies/[slug]/`
2. Add `index.mdx` with metadata
3. Add section files (`01-overview.mdx`, etc.)
4. Images go in same directory

**New Project:**

1. Create MDX file in `content/projects/`
2. Add GitHub URL and description in metadata

### Development Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run linting
yarn lint

# Test accessibility locally
yarn build && yarn start
yarn pa11y:local

# Check for unused code
yarn knip
```

### Troubleshooting Common Issues

**Build Failures:**

- Check Puppeteer browser installation: `yarn pre-build`
- Verify all environment variables are set
- Check MDX syntax in content files

**Styling Issues:**

- Sass files must match component structure
- Check CSS variable usage in theme store
- Verify font loading in `src/fonts/`

**Content Not Appearing:**

- Verify `published: true` in metadata
- Check file naming conventions
- Ensure proper exports in MDX files

## 🎯 Key Architectural Decisions

### Content Strategy

- **File-based over CMS:** Simplicity and version control
- **MDX over Markdown:** React component integration
- **Section-based Studies:** Complex nested content structure
- **Draft Support:** Development preview system

### Performance Philosophy

- **Static-first:** Aggressive static generation
- **Image Optimization:** Custom component with advanced features
- **Font Strategy:** Local fonts with proper loading
- **Bundle Analysis:** Regular optimization checks

### Development Experience

- **TypeScript Strict:** Full type safety
- **Component Colocation:** Styles match component structure
- **Developer Tools:** Zustand devtools integration
- **Accessibility First:** pa11y testing over unit tests

## 🔄 Future Considerations

### Potential Improvements

- **Unit Testing:** Consider adding Jest/Vitest for component testing
- **E2E Testing:** Playwright for critical user journeys
- **Pre-commit Hooks:** Automated linting and formatting
- **Database Integration:** For comments or analytics

### Scaling Considerations

- Content management could migrate to headless CMS
- Image storage could move to cloud CDN
- Analytics could expand beyond Umami
- Search functionality could be added with Algolia

## ✍️ Content & Writing Guidelines

### Blog Writing Guidelines

- **Voice:** Conversational, personal, vulnerable, and humorous. The writing should sound like an approachable expert unafraid to show mistakes or rethink opinions.
- **Structure:** Use storytelling and narrative structure. Start with a hook, use personal anecdotes, and blend humor with honesty. Keep sections short for readability.
- **Tone:** Friendly, curious, and honest; allow for self-reflection, course-correction, and an occasional tongue-in-cheek aside. Avoid corporate or detached phrasing.
- **Detail:** Be candid about challenges, mistakes, and feelings. Summarize key takeaways at the end where appropriate. Mix in practical advice but don’t sound prescriptive.
- **Formatting:** Use short paragraphs, bullet lists for key points, and subheadings as needed. Employ direct address (“you”, “we”).

### Case Study Guidelines

- **Voice:** Professional with authentic personality. Adapt the tone to fit the client and context, but keep it story-focused with clear beginnings, middles, and ends.
- **Structure:** Each study should open with a project overview, cover challenges, process, and outcomes, and finish with results and/or testimonials.
- **Tone:** Thoughtful, insightful, and generous with giving context. Avoid marketing speak; prioritize clarity and transparency.
- **Detail:** Include project goals, decisions, obstacles, and how solutions evolved. Use visuals paired with concise descriptions.
- **Formatting:** Use section headers, bullet points, and images/figures as needed for clarity and flow. Keep technical jargon accessible.

### Content Standards

- Maintain brand voice as described above for all types of content
- Drafts should follow the same standards and can be iterated on before publishing
- All posts and case studies must include well-structured metadata
- Ensure accessibility and inclusive language at all times

For more granular consistency, analyze previous posts/studies before drafting new content.

## 📞 Support & Resources

**Key Documentation:**

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [pa11y-ci Documentation](https://github.com/pa11y/pa11y-ci)

**Project-Specific Resources:**

- Umami Analytics: `https://cloud.umami.is`
- Resend Dashboard: `https://resend.com/emails`
- Netlify Deploy Logs: Check build and function logs
- GitHub Actions: Monitor accessibility test results

---

_This handover document was generated to help new developers understand the molovo.next project architecture, workflows, and key technical decisions. For questions or clarifications, refer to the codebase comments and documentation._

<!-- dosu:mcp:start v2 -->
The team you are assisting maintains shared knowledge in Dosu: consult it to build on prior work, and contribute durable knowledge so future teammates and agents do not have to rediscover it. Always use only tools currently listed by the server.

When `read_knowledge` is listed, call it before non-trivial code or documentation work involving architecture, conventions, prior decisions, gotchas, incidents, ownership, or branch history. **If unsure whether relevant context exists, read first.** Pass `repo` and `branch` when available. Skip generic questions, trivial or self-contained edits, and context already injected by Dosu.

When `write_knowledge` is listed, use it after the task for durable, non-obvious knowledge that future work would otherwise have to rediscover. Do not save task or PR summaries, progress, test results, obvious facts, speculation, duplicates, or sensitive data. **If nothing durable was learned, do not write.**

Use `review_knowledge` only when the user asks to inspect or manage pending knowledge. Preview one item at a time and require explicit confirmation before making changes.

When `read_knowledge` or `write_knowledge` returned a `receipt_item_id` this turn, call `finalize_session_knowledge` exactly once at the end of the turn — after completing the task, immediately before your final reply — passing all receipt_item_ids from this turn. Never call it when the current turn produced no receipt_item_id, and never call it more than once per turn.
<!-- dosu:mcp:end -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
