Github = require './_github'
OpenSource = require './_open-source'
Title = require './_title'

window.addEventListener 'DOMContentLoaded', () =>
  new Github
  new OpenSource
  new Title
