###*
 * Provides methods for filtering projects by language
 *
 * @type {Projects}
###
module.exports = class Projects
  ###*
   * Start your engines!
   *
   * @return {Projects}
  ###
  constructor: () ->
    @filterLinks = document.querySelectorAll '.projects--filter a'
    @filterItems = document.querySelectorAll '.projects--list a'
    @registerFilteringListeners()

  ###*
   * Register listeners on filtering links which handle click events
  ###
  registerFilteringListeners: () =>
    if @filterLinks.length is 0
      return

    for link in @filterLinks
      do (link) =>
        link.addEventListener 'click', @filterResults

  ###*
   * Filter the results when a click event is received
   *
   * @param  {HTMLEvent} evt The click event
  ###
  filterResults: (evt) =>
    # Prevent the default click handler
    evt.preventDefault()

    # Get the language of the clicked links
    language = evt.target.dataset.target

    # Loop through each of the links and remove the active class
    for link in @filterLinks
      do (link) ->
        link.classList.remove 'active' unless link is evt.target

    # Add the active class to the clicked link
    evt.target.classList.add 'active'

    # Loop through each of the project tiles
    for item in @filterItems
      do (item) ->
        # If the selected language is all, display all tiles
        if language is 'all'
          item.style.display = 'block'
          return

        # If the tile's language matches the selected language,
        # show the tile
        if item.dataset.language is language
          item.style.display = 'block'
          return

        # The tile matches nothing, hide it
        item.style.display = 'none'
