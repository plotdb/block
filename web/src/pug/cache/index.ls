<-(->it.apply {}) _
[win, doc] = [window, window.document]
container =
  left: ld$.find \#left, 0
  right: ld$.find \#right, 0

mgr = new block.manager registry: ({name, version, path, type}) -> "/block/#name/#version/#{path or 'index.html'}"
mgr2 = new block.manager registry: ({name, version, path, type}) ->
  #if type == \block => return ""
  "/block/#name/#version/#{path or 'index.html'}"

bundle = ->
  console.log "bundling ..."
  mgr.bundle {blocks: [
    * name: 'cta', version: '0.0.1'
    * name: 'long-answer', version: '0.0.1'
    * name: 'sample', version: '0.0.1'
  ]}
    .then -> ldfile.download data: it, name: "bundled-blocks.html"

testload = (bd, root = container.left, manager = mgr) ->
  manager.get bd
    .then (bc) ->
      bc.create!then (bi) ->
        bi.attach {root}
          .then -> bi.interface!

mgr.debundle root: ld$.find('template', 0)
  .then ->
    mgr.get {name: "@plotdb/sample1", version: "main", path: "index.html"}
      .then (bc) ->
        bc.create!then (bi) ->
          bi.attach {root: container.left}
            .then -> bi.interface!
    mgr.get {name: "@plotdb/sample2", version: "main", path: "index.html"}
      .then (bc) ->
        bc.create!then (bi) ->
          bi.attach {root: container.left}
            .then -> bi.interface!

view = new ldview do
  root: document.body
  action:
    change:
      upload: ({node, evt}) ->
        ldfile.fromFile node.files.0, \text, \utf-8
          .then ->
            mgr2.debundle code: it.result
          .then ->
          .then -> testload {name: "cta", version: "0.0.1", path: "index.html"}, container.right
          .then -> testload {name: "long-answer", version: "0.0.1", path: "index.html"}, container.right
          #.then -> testload {name: "@plotdb/sample1", version: "main", path: "index.html"}, container.right, mgr2
          #.then -> testload {name: "@plotdb/sample2", version: "main", path: "index.html"}, container.right, mgr2

    click:
      download: -> bundle!
