<-(->it.apply {}) _
window.blah = (cb) ~> @code = cb!
tmp = ld$.find 'template', 0
node = tmp.content

parse-bundle = (opt = {}) ->
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  if root.content => @root = root = root.content
  @ <<< nodes: {}, classes: {}, codes: {}, mgr: opt.manager
  @nodes = {}
  @classes = {}
  Array.from(root.childNodes).map (n) ~>
    if n.nodeName == \SCRIPT => @script = n
    else if n.nodeName == \STYLE => @style = n.cloneNode true
    else @nodes[n.getAttribute \block] = n
  if @script =>
    @script.import = ~> @codes = it!
    @style.setAttribute \type, \text/javascript
    document.body.appendChild @script
  if @style =>
    @style.setAttribute \type, \text/css
    document.body.appendChild @style
  for k,node of @nodes =>
    ret = /^(@?[^@]+)@([^:]+)(:.+)?/.exec(k)
    [name, version, path] = [ret.1, ret.2, ((ret.3 or '').replace(/^:/,'') or '')]
    @classes[k] = bc = new block.class {
      manager: @mgr, name: name, version: version, path: path,
      code: script: @codes[k], dom: node, style: ""
    }
    @mgr.set bc
    
  @

mgr = new block.manager!
obj = parse-bundle.call {}, {root: ld$.find('template',0), manager: mgr}

mgr.get {name: "@plotdb/sample1", version: "main"}
  .then (bc) ->
    bc.create!then (bi) ->
      bi.attach {root: document.body}
        .then -> bi.interface!
        .then -> console.log it


mgr.get {name: "@plotdb/sample2", version: "main"}
  .then (bc) ->
    bc.create!then (bi) ->
      bi.attach {root: document.body}
        .then -> bi.interface!
        .then -> console.log it
