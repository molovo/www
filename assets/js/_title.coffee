module.exports = class Title
  constructor: () ->
    console.log 'Create title object'
    @original = window.pageTitle
    @replacement = 'I Miss You! ❤'

    # A map of events to their respective titles
    @evtMap =
      focus: @original
      focusin: @original
      pageshow: @original
      blur: @replacement
      focusout: @replacement
      pagehide: @replacement

    @registerListeners()

  updatePageTitle: (evt) =>
    console.log 'Update titles'
    evt = evt or window.event

    console.log evt.type

    # If the event type exists in the map, set the right title
    if @evtMap[evt.type]?
      document.title = @evtMap[evt.type]
    else
      # Last ditch attempt
      if document.hidden
        document.title = @replacement
      else
        document.title = @original

  registerListeners: () =>
    console.log 'Registering listeners'
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
