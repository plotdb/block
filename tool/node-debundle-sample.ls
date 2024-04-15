fs = require "fs-extra"
require! <[jsdom @plotdb/block]>

jsdom-doc = "<DOCTYPE html><html><body></body></html>"
jsdom-option =
  # suppress SecurityError for localStorage availability in opaque origin
  url: \http://localhost
  # we use window.eval for context extracting in rescope
  runScripts: \outside-only
dom = new jsdom.JSDOM(jsdom-doc, jsdom-option)

html = fs.read-file-sync "your-bundle-file.html" .toString!
block.env dom.window
mgr = new block.manager registry: ->
mgr.debundle [{code: html}] .then -> # ...
