<-(->it.apply {}) _
window.blah = (cb) ~> @code = cb!
tmp = ld$.find 'template', 0
node = tmp.content

_bundle = (list, blocks = [], deps = []) ->
  if !list.length => return Promise.resolve {blocks, deps}
  bd = list.splice 0, 1 .0
  console.log 'block def: ', bd
  ld$.fetch mgr.get-url(bd), {method: \GET}, {type: \text}
    .then ->
      node = document.createElement \div
      node.innerHTML = it
      if node.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
      id = "#{bd.name}@#{bd.version}:#{bd.path or 'index.html'}"
      js = Array.from(node.querySelectorAll \script)
        .map ->
          it.parentNode.removeChild it
          it.textContent
        .join \\n
      css = Array.from(node.querySelectorAll \style)
        .map ->
          it.parentNode.removeChild it
          it.textContent
        .join \\n
      node.childNodes.0.setAttribute \block, id
      ret = eval(js) or {}
      if ret.{}pkg.extend => list.push ret.{}pkg.extend
      deps ++= (ret.{}pkg.dependencies or []).filter -> it.type == \js or /\.js/.exec((it.path or it or ''))
      blocks.push {js, css, html: node.innerHTML, bd, id}
      return _bundle list, blocks, deps

bundle = (opt = {}) ->
  mgr = opt.manager
  _bundle opt.[]blocks
    .then ({blocks, deps}) ->
      mgr.rescope.bundle deps
        .then (libs) ->
          js = blocks
            .map (b) ->
              "\"#{b.id}\": #{(b.js or '""').replace(/;$/,'')}"
            .join ",\n"
          js = "document.currentScript.import({#js});"
          css = blocks
            .map (b) ->
              scope = ('_' + btoa(b).replace(/=/g,'_'))
              csscope {rule: "*[scope~=#{scope}]", name: scope, css: (b.css or ''), scope-test: "[scope]"}
            .join \\n
          html = blocks.map(-> it.html or '').join(\\n)
          ret = """
          <template>
            #html
            <style type="text/css">#css</style>
            <script type="text/javascript">#js#libs</script>
          </template>
          """
        .then -> it

parse-bundle = (opt = {}) ->
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  if root.content => @root = root = root.content
  @ <<< nodes: {}, classes: {}, codes: {}, mgr: opt.manager
  @nodes = {}
  @classes = {}
  Array.from(root.childNodes).map (n) ~>
    if n.nodeType != Document.ELEMENT_NODE => return
    if n.nodeName == \SCRIPT => @script = n.cloneNode true
    else if n.nodeName == \STYLE => @style = n.cloneNode true
    else if !(id = n.getAttribute(\block)) => return
    else @nodes[id] = n
  if @script =>
    scr = document.createElement \script
    scr.textContent = @script.textContent
    @script = scr
    @script.import = ~> @codes = it
    @script.setAttribute \type, \text/javascript
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

mgr = new block.manager registry: ({name, version, path, type}) -> "/block/#name/#version/#{path or 'index.html'}"

if false =>
  bundle {manager: mgr, blocks: [
    * name: 'cta', version: '0.0.1'
    * name: 'long-answer', version: '0.0.1'
    * name: 'sample', version: '0.0.1'
  ]}
    .then ->
      ldfile.download data: it, name: "bundle-2.html"



obj = parse-bundle.call {}, {root: ld$.find('template',0), manager: mgr}

testload = (bd) ->
  mgr.get bd
    .then (bc) ->
      bc.create!then (bi) ->
        bi.attach {root: container}
          .then -> bi.interface!


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

ld$.fetch "/assets/bundle/bundle-2.html", {method: \GET}, {type: \text}
  .then ->
    div = document.createElement \div
    div.innerHTML = it
    document.body.appendChild div
    obj = parse-bundle.call {}, {root: ld$.find(div, 'template',0), manager: mgr}
  .then ->
    testload {name: "cta", version: "0.0.1", path: "index.html"}
    testload {name: "long-answer", version: "0.0.1", path: "index.html"}
