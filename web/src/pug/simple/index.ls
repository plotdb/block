mgr = new block.manager registry: ({ns, name, version, path, type}) ->
  if type == \block => "/block/#name/#{path or 'index.html'}"
  else "/assets/lib/#name/#{version or 'main'}/#{path or 'index.min.js'}"
mgr.from {name: "color"}, {root: document.body}
  .then ->
    console.log 1, it
    mgr.from {name: "color-alt"}, {root: document.body}
  .then ->
    console.log 2, it
