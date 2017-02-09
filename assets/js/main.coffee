Github = require './_github'
OpenSource = require './_open-source'

window.addEventListener 'DOMContentLoaded', () =>
  new Github
  new OpenSource
