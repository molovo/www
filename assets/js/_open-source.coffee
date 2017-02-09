module.exports = class OpenSource
  constructor: () ->
    @filterLinks = document.querySelectorAll '.projects--filter a'
    @filterItems = document.querySelectorAll '.projects--list a'
    @registerFilteringListeners()

  registerFilteringListeners: () =>
    if @filterLinks.length is 0
      return

    for link in @filterLinks
      do (link) =>
        link.addEventListener 'click', @filterResults

  filterResults: (evt) =>
    evt.preventDefault()

    language = evt.target.dataset.target

    for link in @filterLinks
      do (link) =>
        link.classList.remove 'active' unless link is evt.target

    evt.target.classList.add 'active'

    for item in @filterItems
      do (item) =>
        if language is 'all'
          item.style.display = 'block'
          return

        if item.dataset.language is language
          item.style.display = 'block'
          return

        item.style.display = 'none'
