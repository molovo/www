require('es6-promise').polyfill()
require 'isomorphic-fetch'

###*
 * Provides methods for retrieving repository data from Github
 *
 * @type {Github}
###
module.exports = class Github
  ###*
   * Start your engines!
   *
   * @return {Github}
  ###
  constructor: ->
    @projects = document.querySelectorAll '[data-repo]'
    @loadStarCounts() unless @projects.length is 0

  ###*
   * Load star counts for projects
  ###
  loadStarCounts: () =>
    # Loop through each of the projects
    @projects.forEach (project) =>
      # Get the repository slug from the element's dataset
      repo = project.dataset.repo

      # Retrieve the repository data from the API or cache
      @getRepoData repo
        # Handle the response
        .then (response) ->
          # Fill the template with the repository info
          project.dataset.language = response.language
          project.querySelector('[data-name]').innerText = response.name
          project.querySelector('[data-description]')
            .innerText = response.description
          project.querySelector('[data-language]').innerText = response.language
          project.querySelector('[data-owner]').innerText = response.owner.login
          project.querySelector('[data-forks]').innerText = response.forks
          project.querySelector('[data-stars]')
            .innerText = response.stargazers_count

  ###*
   * Get repository data from Github's API, and then cache it
   * for 5 minutes in localStorage
   *
   * @param  {string} repo The repository slug
   *
   * @return {Promise}
  ###
  getRepoData: (repo) ->
    ###*
     * Create a promise which returns repository information
     *
     * @param  {function} resolve
     * @param  {function} reject
     *
     * @return {Promise}
    ###
    new Promise((resolve, reject) ->
      # Retrieve the cached data and last update time from localStorage
      time   = localStorage.getItem 'repo-data-last-update-time'
      cached = localStorage.getItem "repo-data.#{repo}"

      # If cached data exists and is newer than 5 minutes, return it
      if cached? and (time? and (new Date).getTime() < (time + 1800))
        return resolve(JSON.parse(cached))

      # Fetch the repo data from Github's API
      fetch "https://api.github.com/repos/#{repo}"
        # Parse the JSON response
        .then (response) ->
          response.json()

        # Deal with the repository data
        .then (response) ->
          # If there is no repository name, an error likely occurred
          if not response.name?
            return reject response

          # Cache the response, and record the current time
          localStorage.setItem "repo-data.#{repo}", JSON.stringify(response)
          localStorage.setItem(
            'repo-data-last-update-time'
            (new Date).getTime()
          )

          # Return the response
          resolve(response)

        # Handle errors
        .catch reject
    )
