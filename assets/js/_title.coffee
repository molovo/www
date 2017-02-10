module.exports = class Title
  constructor: () ->
    ###*
     * The page title as it is when the page loads
     *
     * @type {String}
    ###
    @original = window.pageTitle

    ###*
     * A replacement title to use when the page is hidden
     *
     * @type {String}
    ###
    @replacement = 'I Miss You! ❤'

    ###*
     * A map of events to their respective titles
     *
     * @type {Object}
    ###
    @evtMap =
      focus: @original
      focusin: @original
      pageshow: @original
      blur: @replacement
      focusout: @replacement
      pagehide: @replacement

    # Register the visibility change listeners
    @registerListeners()

  ###*
   * Update the page's title based on its visibility
   *
   * @param  {Event} evt The visibility change event
  ###
  updatePageTitle: (evt) =>
    evt = evt or window.event

    # If the event type exists in the map, set the right title
    if @evtMap[evt.type]?
      document.title = @evtMap[evt.type]
    else
      # Last ditch attempt
      if document.hidden
        document.title = @replacement
      else
        document.title = @original

  ###*
   * Register listeners for changes in page visibility.
   * There are lots, but hopefully this means it will work
   * in all browsers.
  ###
  registerListeners: () =>
    # This sets the appropriate listeners so that everything works cross browser
    hidden = 'hidden'

    # Standards:
    if hidden in document
      document.addEventListener 'visibilitychange', @updatePageTitle
    else if (hidden = 'mozHidden') in document
      document.addEventListener 'mozvisibilitychange', @updatePageTitle
    else if (hidden = 'webkitHidden') in document
      document.addEventListener 'webkitvisibilitychange', @updatePageTitle
    else if (hidden = 'msHidden') in document
      document.addEventListener 'msvisibilitychange', @updatePageTitle
    # IE 9 and lower:
    else if 'onfocusin' in document
      document.onfocusin  = @updatePageTitle
      document.onfocusout = @updatePageTitle
    # All others:
    else
      window.onpageshow = @updatePageTitle
      window.onpagehide = @updatePageTitle
      window.onfocus    = @updatePageTitle
      window.onblur     = @updatePageTitle
