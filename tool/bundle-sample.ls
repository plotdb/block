require! <[fs ../dist/block jsdom]>

window = new jsdom.JSDOM("<!DOCTYPE html><html><body></body></html>", {url: 'http://localhost'}).window

block.env window

base = "http://localhost:53424"

mgr = new block.manager registry: ({name, version, path, type}) ->
  if type == \block =>
    "#base/block/#{name}/#{version or 'main'}/#{path or 'index.html'}"
  else
    "#base/assets/lib/#{name}/#{version or 'main'}/#{path or 'index.js'}"

mgr.bundle blocks: [
 * name: \cta, version: \0.0.1
 * name: \long-answer, version: \0.0.1
 * name: \sample, version: \0.0.1
]
  .then -> fs.write-file-sync "bundle.html", it
