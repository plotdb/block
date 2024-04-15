fs = require "fs-extra"
require! <[jsdom @plotdb/block @plotdb/rescope @plotdb/csscope]>

jsdom-doc = "<DOCTYPE html><html><body></body></html>"
jsdom-option =
  # suppress SecurityError for localStorage availability in opaque origin
  url: \http://localhost
  # we use window.eval for context extracting in rescope
  runScripts: \dangerously
  beforeParse: (window) ->
    console.log ">?>", block.rescope
    window.rescope = rescope
    window.csscope = csscope
dom = new jsdom.JSDOM(jsdom-doc, jsdom-option)

html = fs.read-file-sync "bundle.html" .toString!
block.env dom.window

mgr = new block.manager registry: ->
<- mgr.debundle [{code: html}] .then _
for k,v of rescope._cache => console.log k
for k,v of csscope._cache => console.log k
for ns,o1 of mgr.hash => for ver,o2 of o1 =>
  for name,o3 of o2 => for path,o4 of o3 =>
    console.log "#{if ns => ns + ':' else ''}#name@#ver:#path"
    console.log ((o4.script.pkg or {}).dependencies or [])
