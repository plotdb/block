<-(->it.apply {}) _
[win, doc] = [window, window.document]
tmp = ld$.find 'template', 0
node = tmp.content

mgr = new block.manager registry: ({name, version, path, type}) ->
  if type == \block => "/block/#name/#version/#{path or 'index.html'}"
  else "/assets/lib/#{name}/#{version}/#{path or 'index.js'}"

mgr.debundle root: ld$.find('template', 0)
  .then ->
    mgr.get {name: "d3-child", version: "main"}
      .then (bc) ->
        bc.create!then (bi) ->
          bi.attach {root: document.body}
            .then -> bi.interface!
            .then -> console.log "interface: ", it
