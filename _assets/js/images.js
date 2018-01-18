import { bind } from 'decko'
import MagicRoundabout from 'magic-roundabout'

/**
 * This class deals with lazy loading of images
 *
 * @type {Images}
 */
export default class Images {
  /**
   * The images to be lazy loaded
   *
   * @type {NodeList}
   */
  images = document.querySelectorAll('img[data-src], picture source[data-srcset]')

  /**
   * The IntersectionObserver config
   *
   * @type {object}
   */
  config = {
    rootMargin: '-50px 0px',
    threshold: 0.01
  }

  /**
   * An array in which slideshow instances are stored
   *
   * @type {Slideshow[]}
   */
  slideshows = []

  /**
   * Start your engines!
   *
   * @return {Images}
   */
  constructor () {
    // Setup slideshow instances
    this.setupSlideshows()
    this.lazyLoadImages()
  }

  /**
   * Setup the IntersectionObserver instance which will
   * trigger image loading
   */
  lazyLoadImages () {
    /**
     * The IntersectionObserver instance which will handle lazy loading
     *
     * @type {IntersectionObserver}
     */
    this.observer = new IntersectionObserver(this.onIntersection, this.config)

    this.images.forEach((image) => {
      this.observer.observe(image)
    })
  }

  /**
   * Handle the intersection event
   *
   * @param {Array} entries
   */
  @bind
  onIntersection (entries) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        this.observer.unobserve(entry.target)
        this.load(entry.target)
      }
    })
  }

  /**
   * Load an image
   *
   * @param {HTMLImageElement} image
   */
  load (image) {
    image.onload = () => {
      requestAnimationFrame(() => {
        image.removeAttribute('data-src')
        image.removeAttribute('data-srcset')
        image.removeAttribute('data-type')
      })
    }

    if (image.dataset.type) {
      image.type = image.dataset.type
    }

    if (image.dataset.srcset) {
      image.srcset = image.dataset.srcset
    } else {
      image.src = image.dataset.src
    }
  }

  setupSlideshows () {
    document.querySelectorAll('.slideshow').forEach(slideshow => {
      this.slideshows.push(new MagicRoundabout(slideshow, {
        onChange: (slideshow) => {
          const figure = slideshow.container.parentNode
          const indicator = figure.querySelector('.slideshow__current')

          if (indicator) {
            indicator.innerHTML = slideshow.current
          }
        }
      }))
    })
  }
}
