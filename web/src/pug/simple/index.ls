mgr = new block.manager registry: ({ns, name, version, path, type}) ->
  if type == \block => "/block/#name/#{path or 'index.html'}"
  else "/assets/lib/#name/#{version or 'main'}/#{path or 'index.min.js'}"

view = new ldview do
  root: document.body
  init: template: ({node}) ->
    div = document.createElement \div
    div.appendChild(node.content.cloneNode true)
    bc = new block.class root: div.childNodes.0, manager: mgr
    bid = {ns: \local, name: node.dataset.name, version: 'main', path: 'index.html', block: bc}
    mgr.set bid

view.init!
  .then ->
    mgr.from {ns: \local, name: "simple"}, {root: document.body}
  .then ->
    console.log 0, it
    mgr.from {name: "color"}, {root: document.body}
  .then ->
    console.log 1, it
    mgr.from {name: "color-alt"}, {root: document.body}
  .then ->
    console.log 2, it
