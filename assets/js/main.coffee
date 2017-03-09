Github   = require './_github'
Projects = require './_projects'
Title    = require './_title'

window.addEventListener 'DOMContentLoaded', () ->
  new Github
  new Projects
  new Title
