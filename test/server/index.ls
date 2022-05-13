block = require "../../dist/index"
require! <[jsdom]>

url = "http://localhost:64122"

dom = new jsdom.JSDOM """
<!DOCTYPE html>
<html><head></head><body><div></div>
</body></html>
""", {
  url: \http://localhost:64122
  runScripts: \dangerously
  resources: \usable
}
block.env dom.window
manager = new block.manager registry: ({name, version, path, type}) ->
  if type == \block =>
    "#url/block/#{name}/#{version or 'main'}/#{path or 'index.html'}"
  else
    "#url/assets/lib/#{name}/#{version or 'main'}/#{path or 'index.min.js'}"


manager.get {name: "@makeform/input", version: "main"}
  .then (block) ->
    data = is-required: true
    #root = dom.window.document.querySelector("div")
    root = null
    block.create!then (bi) -> bi.attach {root, data} .then -> bi.interface!
  .then (itf) ->
    itf.value {v: ''}
      .then ->
        console.log "ret(1): ", it
        itf.validate!
      .then ->
        console.log "ret(2): ", it
      .catch -> console.log e

