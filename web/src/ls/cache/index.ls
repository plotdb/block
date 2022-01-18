<-(->it.apply {}) _
[win, doc] = [window, window.document]
tmp = ld$.find 'template', 0
node = tmp.content

mgr = new block.manager registry: ({name, version, path, type}) -> "/block/#name/#version/#{path or 'index.html'}"

bundle = ->
  console.log "bundling ..."
  mgr.bundle {blocks: [
    * name: 'cta', version: '0.0.1'
    * name: 'long-answer', version: '0.0.1'
    * name: 'sample', version: '0.0.1'
  ]}
    .then -> ldfile.download data: it, name: "bundled-blocks.html"

testload = (bd) ->
  mgr.get bd
    .then (bc) ->
      bc.create!then (bi) ->
        bi.attach {root: container}
          .then -> bi.interface!

mgr.debundle root: ld$.find('template', 0)
  .then ->
    mgr.get {name: "@plotdb/sample1", version: "main"}
      .then (bc) ->
        bc.create!then (bi) ->
          bi.attach {root: container}
            .then -> bi.interface!
    mgr.get {name: "@plotdb/sample2", version: "main"}
      .then (bc) ->
        bc.create!then (bi) ->
          bi.attach {root: container}
            .then -> bi.interface!

if true =>
  mgr.debundle url: "/assets/files/cache/bundled-blocks.html"
    .then ->
      testload {name: "cta", version: "0.0.1", path: "index.html"}
      testload {name: "long-answer", version: "0.0.1", path: "index.html"}

view = new ldview do
  root: document.body
  action: click: download: -> bundle!
