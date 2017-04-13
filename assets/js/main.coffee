Github     = require './_github'
Projects   = require './_projects'
Title      = require './_title'
Turbolinks = require 'turbolinks'

window.addEventListener 'DOMContentLoaded', () ->
  new Github
  new Projects
  new Title
  Turbolinks.start()
