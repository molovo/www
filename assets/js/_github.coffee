require('es6-promise').polyfill()
require 'isomorphic-fetch'

module.exports = class Github
  constructor: ->
    @projects = document.querySelectorAll '[data-repo]'
    @loadStarCounts() unless @projects.length is 0

  loadStarCounts: () =>
    console.log(@projects)
    @projects.forEach (project) =>
      repo = project.dataset.repo

      @getRepoData repo
        .then (response) =>
          project.dataset.language = response.language
          project.querySelector('[data-name]').innerText = response.name
          project.querySelector('[data-description]').innerText = response.description
          project.querySelector('[data-language]').innerText = response.language
          project.querySelector('[data-owner]').innerText = response.owner.login
          project.querySelector('[data-forks]').innerText = response.forks
          project.querySelector('[data-stars]').innerText = response.stargazers_count

  getRepoData: (repo) =>
    new Promise((resolve, reject) =>
      time = localStorage.getItem 'repo-data-last-update-time'
      cached = localStorage.getItem "repo-data.#{repo}"
      if cached? and (time? and (new Date).getTime() < (time + 1800))
        return resolve(JSON.parse(cached))

      fetch "https://api.github.com/repos/#{repo}"
        .then (response) =>
          response.json()
        .then (response) =>
          if not response.name?
            return reject response

          localStorage.setItem "repo-data.#{repo}", JSON.stringify(response)
          localStorage.setItem 'repo-data-last-update-time', (new Date).getTime()

          resolve(response)
        .catch reject
    )
