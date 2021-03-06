import { bind } from 'decko'

/**
 * Provides methods for handling nav
 *
 * @type {Menu}
 */
export default class Menu {
  /**
   * The site header
   *
   * @type {HTMLElement}
   */
  header = document.querySelector('#top')

  /**
   * The menu
   *
   * @type {HTMLNavElement}
   */
  nav = document.querySelector('#menu')

  /**
   * The nav toggle
   *
   * @type {HTMLAnchorElement}
   */
  toggle = document.querySelector('#nav-toggle')

  /**
   * The nav close button
   *
   * @type {HTMLAnchorElement}
   */
  close = document.querySelector('#nav-close')

  /**
   * Start your engines!
   *
   * @return {Menu}
   */
  constructor () {
    this.registerScrollListener()
    this.registerNavToggleListener()
  }

  /**
   * Register listeners to fix, hide and show the header on scroll
   */
  registerScrollListener () {
    window.addEventListener('scroll', e => {
      this.y = window.pageYOffset

      if (this.y < 200) {
        this.header.classList.remove('header--hidden')
        this.header.classList.remove('header--sticky')
        return
      }

      if (!this.header.classList.contains('header--sticky')) {
        this.header.classList.add('header--hidden')
        setTimeout(() => {
          this.header.classList.add('header--sticky')
        }, 250)
      }

      requestAnimationFrame(() => {
        this.bufferedY = window.pageYOffset
      })

      const fn = this.y <= this.bufferedY ? 'remove' : 'add'
      this.header.classList[fn]('header--hidden')
    })
  }

  /**
   * Register a listener to toggle the nav
   */
  registerNavToggleListener () {
    this.toggle.addEventListener('click', this.toggleMenu)
    this.close.addEventListener('click', this.toggleMenu)

    document.addEventListener('turbolinks:visit', (evt) => {
      this.nav.classList.remove('nav--open')
      document.documentElement.classList.remove('menu-open')
    })
  }

  @bind
  toggleMenu (evt) {
    evt.preventDefault()

    if (this.nav.classList.contains('nav--open')) {
      this.nav.classList.remove('nav--open')
      document.documentElement.classList.remove('menu-open')
    } else {
      this.nav.classList.add('nav--open')
      document.documentElement.classList.add('menu-open')
    }
  }
}
