import Swiper from 'swiper'
import { bind } from 'decko'

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
   * Start your engines!
   *
   * @return {Images}
   */
  constructor () {
    // Setup swiper instances
    this.setupSwipers()
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
      })
    }

    if (image.dataset.srcset) {
      image.srcset = image.dataset.srcset
    } else {
      image.src = image.dataset.src
    }
  }

  setupSwipers () {
    const base = parseInt(window.getComputedStyle(document.body).fontSize.replace('px', '')) * 1.5

    const swiper = new Swiper('.swiper-container', {
      grabCursor: true,
      loop: false,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: base * 2,
      slideToClickedSlide: true,
      onSlideChangeEnd: (swiper) => {
        const figure = swiper.container[0].parentNode
        const indicator = figure.querySelector('.swiper-current')

        if (indicator) {
          indicator.innerHTML = ++swiper.realIndex
        }
      }
    })
  }
}
