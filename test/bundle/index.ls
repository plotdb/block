require! <[fs jsdom @plotdb/rescope @plotdb/csscope]>
block = require '../../dist/node'

dom = new jsdom.JSDOM(
  "<DOCTYPE html><html><body></body></html>"
  runScripts: "dangerously"
  url: \http://localhost # prevent `localStorage is not available for opaque origins` error
)
[win, doc] = [dom.window, dom.window.document]
block.env win
win.rescope = rescope
win.csscope = csscope

mgr = new block.manager registry: url: ({ns, url, name, version, path, type}) ->
  if url =>
    return if /^https?:/.exec(url) => url else "block#url"
  path = if type == \block => "#name.html" else if type == \css => "#name.css" else "#name.js"
  ret = "block/#path"
  ret

mgr.bundle {blocks: [{name: \landing, version: \main}]}
  .then (ret) ->
    fs.write-file-sync "output.html", ret.code
    mgr.debundle ret
  .then -> console.log "bundled file written to output.html"
  .then ->
    mgr.get {name: "landing", version: "main"}
      .then (bc) -> bc.create!
      .then (bi) -> bi.attach!then -> bi.interface!
    #  .then -> it.print!
  .then -> mgr.get {name: "sample", version: "main"}
  .then (bc) -> bc.create!
  .then (bi) -> bi.attach!then -> bi.interface!

