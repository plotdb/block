var win, doc

rescope = if window? => window.rescope else if module? and require? => require "@plotdb/rescope" else null
csscope = if window? => window.csscope else if module? and require? => require "@plotdb/csscope" else null
proxise = if window? => window.proxise else if module? and require? => require "proxise" else null
fetch = if window? => window.fetch else if module? and require? => require "node-fetch" else null

e404 = (o) -> Promise.reject(new Error! <<< {name: \lderror, id: 404, message: o})

_fetch = (u, c) ->
  (ret) <- fetch u, c .then _
  if ret and ret.ok => return ret.text!
  if !ret => return Promise.reject(new Error("404") <<< {name: \lderror, id: 404})
  ret.clone!text!then (t) ->
    i = ret.status or 404
    e = new Error("#i #t") <<< {name: \lderror, id: i, message: t}
    try
      if (j = JSON.parse(t)) and j.name == \lderror => e <<< j <<< {json: j}
    catch err
    return Promise.reject e

rid = ->
  while true
    id = "b-#{Math.random!toString(36).substring(2)}"
    if !rid.hash[id] => break
  rid.hash[id] = true
  return id
rid.hash = {}

parse-name-string = (n) ->
  n = n.split('@')
  [n,v] = if !n.0 => ["@#{n.1}", n.2] else [n.0,n.1]
  return {name: n, version: v}

# We don't sanitize input for now, since we have to trust blocks.
# Following code is for reference.
#sanitize-real = (code) ->
#  DOMPurify.sanitize( (code or ''), { ADD_TAGS: <[script style plug]>, ADD_ATTR: <[ld ld-each block plug]> })
sanitize = (code) -> (code or '')

pubsub = ->
  @subs = {}
  @

pubsub.prototype = Object.create(Object.prototype) <<< do
  fire: (name, ...args) -> Promise.all(@subs[][name].map -> it.apply null, args)
  on: (name, cb) -> @subs[][name].push cb

block = {}
block.id = (o) -> o.id or o.url or "#{o.name}@#{o.version or 'main'}:#{o.path or 'index.html'}"
block.id2obj = (k) ->
  k = k.split(':')
  if k.length <= 2 => [nv,path,ns] = k else [ns,nv,path] = k
  if !(ret = /^(@?[^@]+)(?:@([^:]+))?$/.exec(nv)) => return null
  return {ns, name: ret.1, version: ret.2, path}
block.env = ->
  [win, doc] := [it, it.document]
  if rescope.env => rescope.env win
  if rescope.env => csscope.env win
block.i18n =
  module:
    lng: \en
    t: (v) ->
      vs = if Array.isArray(v) => v else [v]
      lng = @lng
      for i from 0 til vs.length =>
        if !vs[i] => continue
        [ns, ...t] = vs[i].split(':')
        t = t.join(':')
        if @res{}[lng]{}[ns][t] => return that
      return t or ns or v[* - 1]
    change-language: -> @lng = it or \en
    add-resource-bundle: (lng, ns, res, deep, overwrite) -> @res{}[lng][ns] = res
    res: {}
  use: -> @module = it
  add-resource-bundle: (lng, id, resource, deep = true, overwrite = true) ->
    block.i18n.module.add-resource-bundle lng, id, resource, deep, overwrite
  change-language: -> block.i18n.module.change-language it

block.global =
  csscope:
    hash: {}
    apply: (ret) ->
      ret = ret
        .filter ~> !@hash[it.id or it.url]
        .map ~> @hash[it.id or it.url] = it.scope
      if ret.length => doc.body.classList.add.apply doc.body.classList, ret

block.init = proxise.once ~> if block._rescope => block._rescope.init!
block.rescope = ->
  if !block._rescope => block._rescope = new rescope global: if win? => win else global
  block._rescope
block.csscope = ->
  if !block._csscope => block._csscope = new csscope.manager!
  block._csscope
block.manager = (opt={}) ->
  @hash = {}
  @proxy = {}
  @running = {}
  # mapping from a version range to an actual version
  # use _ver.map to align design with `rescope` and `csscope`
  @_ver = {map: {}}
  @_chain = opt.chain or null
  # this is undocumented, and seems to be replaced by `registry`. should we remove it in the future?
  @_fetch = opt.fetch or null
  @init = proxise.once ~> @_init!
  @rescope = if opt.rescope instanceof rescope => opt.rescope else block.rescope!
  @csscope = if opt.csscope instanceof csscope => opt.csscope else block.csscope!
  if opt.registry => @registry opt.registry
  @init!
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    if @rescope == block.rescope! => block.init!
    else @rescope.init!
  id: block.id
  id2obj: block.id2obj
  chain: -> @_chain = it
  registry: (r) ->
    if typeof(r) in <[string function]> or (r.fetch and r.url) => r = {lib: r, block: r}
    if r.lib? =>
      if @rescope == block.rescope! => @rescope = new rescope {global: win}
      if @csscope == block.csscope! => @csscope = new csscope.manager!
      @rescope.registry r.lib
      @csscope.registry r.lib
    if r.block? =>
      @_reg = r.block or ''
      if typeof(@_reg) == \string => if @_reg and @_reg[* - 1] != \/ => @_reg += \/
  set: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(opts.map (obj) ~>
      {ns, name, version, path} = obj
      if !ns => ns = ''
      b = if obj instanceof block.class => obj else obj.block
      @hash{}[ns]{}[name]{}[version][path or 'index.html'] = b
    )
  get-url: ({ns, name, version, path}) ->
    if !ns => ns = ''
    r = @_reg.url or @_reg
    if typeof(r) == \function => r {ns, name, version, path, type: \block}
    else "#{@_reg or ''}/assets/block/#{name}/#{version or 'main'}/#{path or 'index.html'}"

  fetch: (o) ->
    o <<< {type: \block}
    # this is undocumented - and it's going to be replaced by `@plotdb/registry`
    # we probably would like to remove this once we get what's this for.
    if @_fetch => return Promise.resolve(@_fetch o)
    _ref = if @_reg.fetch => @_reg.fetch o else @get-url o
    if _ref.then => _ref
    else if !_ref => return e404 o
    else _fetch _ref, {method: \GET} .then -> {content: it}

  _get: (opt) ->
    [ns, n, v, p] = [opt.ns or '', opt.name, opt.version or \main, opt.path or 'index.html']
    obj = {ns: ns, name: n, version: v, path: p}
    if !(n and v) => return Promise.reject(new Error! <<< {name: "lderror", id: 1015})
    @hash{}[ns]{}[n]
    if /[^0-9.]/.exec(v) and !opt.force =>
      if @_ver.map{}[ns][n] and @_ver.map[ns][n][v] => if @hash[ns][n]{}[@_ver.map[ns][n][v]][p] => return that
      for ver, c of @hash{}[ns][n] =>
        if !semver.fit ver, v => continue
        return Promise.resolve(c[p])
    if @hash[ns][n]{}[v][p]? and !opt.force => return Promise.resolve(@hash[ns][n][v][p])
    if @running{}[ns]{}[n]{}[v][p] == true => return
    @running[ns][n][v][p] = true
    @fetch opt{ns, name, version, path}
      .then ~>
        if !it => return e404 obj
        if it.version =>
          if obj.version != it.version => @_ver.map[ns]{}[n][obj.version] = it.version
          obj.version = it.version
        return it.content or it
      .catch (e) ~>
        if !@_chain => return Promise.reject(e)
        @_chain.get opt
      .then (ret = {}) ~>
        b = new block.class(obj <<< {code: ret, manager: @})
        @set(obj <<< {block: b})
        b
      .then ~>
        @proxy[ns][n][v][p].resolve it
        return it
      .finally ~> @running[ns][n][v][p] = false
      .catch (e) ~>
        @proxy[ns][n][v][p].reject e
        return Promise.reject e

  from: (o, p) ->
    @get o .then (b) -> b.create!then (i) ->
      i.attach p
        .then -> i.interface!
        .then -> {instance: i, interface: it}

  get: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(
      opts.map (opt = {}) ~>
        if typeof(opt) == \string => opt = parse-name-string(opt)
        [ns, n, v, p] = [opt.ns or '', opt.name, opt.version or \main, opt.path or 'index.html']
        if !@proxy{}[ns]{}[n]{}[v][p] => @proxy[ns][n][v][p] = proxise (opt) ~> @_get(opt)
        @proxy[ns][n][v][p] opt
    ).then -> if Array.isArray(opt) => return it else return it.0

  bundle: (opt = {}) ->
    mgr = opt.manager or @
    hash = {}
    _ = (list, blocks = [], deps = {js: [], css: []}) ->
      if !list.length => return Promise.resolve {blocks, deps}
      bd = list.splice 0, 1 .0
      id = block.id bd
      if hash[id] => return Promise.resolve!then -> _ list, blocks, deps
      _fetch mgr.get-url(bd), {method: \GET}
        .then ->
          node = doc.createElement \div
          node.innerHTML = it
          if node.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
          [js,css] = <[script style]>.map (n)->
            Array.from(node.querySelectorAll n)
              .map -> it.parentNode.removeChild(it); it.textContent
              .join \\n
          node.childNodes.0.setAttribute \block, id
          ret = eval("(function(module){#{js or ''};return module.exports;})({})")
          if ret instanceof Function => ret = ret!
          if !ret => ret = {}
          if ret.{}pkg.extend => list.push ret.{}pkg.extend
          deps.js ++= (ret.{}pkg.dependencies or []).filter -> it.type == \js or /\.js/.exec((it.path or it or ''))
          deps.css ++= (ret.{}pkg.dependencies or []).filter -> it.type == \css or /\.css/.exec((it.path or it or ''))
          # we expect js to be sth like function body, so we should wrap it with a function.
          js = "((function(module){#{js or ''};return module.exports;})({}))"
          blocks.push b = {js, css, html: node.innerHTML, bd, id}
          hash[id] = b
          return _ list, blocks, deps
    _ opt.[]blocks
      .then ({blocks, deps}) ->
        Promise.all [
          mgr.csscope.bundle(deps.css),
          mgr.rescope.bundle(deps.js)
        ]
          .then ([depcss, depjs-cache]) ->
            js = blocks.map (b) -> "\"#{b.id}\":#{b.js or '""'}"
            js = "document.currentScript.import({#{js.join(',\n')}});"
            # we fill csscope cache with empty content but proper id and scope
            # so it won't do anything except recognizing this.
            # the real CSS will be loaded directly from the `style` tag.
            depcss-cache = deps.css
              .map (o) -> "csscope.cache(#{JSON.stringify(o <<< {inited: true, scope: csscope.scope(o)})})"
              .join(';')
            css = blocks
              .map (b) ->
                scope = csscope.scope b
                csscope {rule: "*[scope~=#{scope}]", name: scope, css: (b.css or ''), scope-test: "[scope]"}
              .join \\n
            html = blocks.map(-> it.html or '').join(\\n)
            return """
            <template>
              #html
              <style type="text/css">#css#depcss</style>
              <script type="text/javascript">#js#depjs-cache;#depcss-cache</script>
            </template>
            """

  debundle: (opt = {}) ->
    mgr = opt.manager or @
    lc = {}
    if !opt.root =>
      p = if opt.url => _fetch opt.url, {method: \GET}
      else Promise.resolve(opt.code)
      p = p.then (c) ->
        if !block.debundle-node => document.body.appendChild block.debundle-node = doc.createElement \div
        block.debundle-node.appendChild(div = doc.createElement \div)
        div.innerHTML = c
        div.querySelector('template')
    else p = Promise.resolve( if typeof(opt.root) == \string => doc.querySelector(opt.root) else opt.root )
    p.then (root) ->
      if root.content => root = root.content
      [nodes, classes] = [{}, {}]
      Array.from(root.childNodes).map (n) ~>
        if n.nodeType != doc.ELEMENT_NODE => return
        if n.nodeName == \SCRIPT => lc.script = n.cloneNode true
        else if n.nodeName == \STYLE => lc.style = n.cloneNode true
        else if !(id = n.getAttribute(\block)) => return
        else nodes[id] = n
      if lc.script =>
        # needed if lc.script is loaded from fetch + innerHTML
        s = doc.createElement \script
        s.textContent = lc.script.textContent
        lc.script = s
        lc.script.import = ~> lc.codes = if typeof(it) == \function => it! else it
        lc.script.setAttribute \type, \text/javascript
        doc.body.appendChild lc.script
      if lc.style =>
        # TODO we may need path translation here
        lc.style.setAttribute \type, \text/css
        doc.body.appendChild lc.style
      for k,node of nodes =>
        {ns, name, version, path} = block.id-to-obj(k)
        bc = new block.class {
          manager: mgr, ns: ns, name: name, version: version, path: path,
          code: script: lc.codes[k], dom: node, style: ""
        }
        mgr.set bc


block.class = (opt={}) ->
  @opt = opt
  @scope = opt.scope or null # will be regen in `init` if null
  @_ctx = {} # libraries context. may inherited from extended base class.
  @csscopes = {global: [], local: []} # css libraries. may be either global or local.
  # manager is used for recursively get extended block.
  @ <<< opt{ns, name, version, path, manager}
  if !opt.ns => opt.ns = ''
  if !@manager => console.warn "manager is mandatory when constructing block.class"
  code = opt.code

  if opt.root =>
    node = if typeof(opt.root) == \string => doc.querySelector(opt.root) else opt.root
  else
    if typeof(code) == \function => code = code!
    if typeof(code) == \string =>
      code = sanitize code
      div = doc.createElement("div")
      # in case of unwanted space which creates more than 1 child.
      div.innerHTML = (code or '').trim!
      if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    else if typeof(code) == \object =>
      @script = code.script # can be either a string, object or function
      @style = code.style # should be string or CSSRuleList(todo)
      @ <<< code{style, script}
      dom = if code.dom instanceof Function => code.dom! else code.dom
      if dom instanceof win.Element => node = dom
      else
        code = sanitize dom
        div = doc.createElement("div")
        div.innerHTML = code
        if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
  # TODO @script may involve `eval` below in `init`; to optimize, we may prebundle this directly as JS.
  # remove functional elements before sending them into datadom.
  # div but not node: we will get node later so get all func elements via div first.
  <[script style link]>.map (n) ~>
    v = Array.from((node or div).querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
    # TODO should concat with previous result?
    # @[n] = (@[n] or '') + (if v? and v => v else '')
    @[n] = if v? and v => v else (@[n] or "")
  if !node and div =>
    for i from 0 til div.childNodes.length =>
      if (node = div.childNodes[i]).nodeType == win.Element.ELEMENT_NODE => break
  if !node => node = doc.createElement(\div)
  if node.nodeType != win.Element.ELEMENT_NODE =>
    console.log warn "root of DOM definition of a block should be an Element"
  @node = node

  # we dont init until create is called, because we may not use it even if it's loaded.
  @init = proxise.once ~> @_init!
  @

# use document fragment ( yet datadom doesn't work with #document-fragment )
# @frag = document.createRange!.createContextualFragment(code)
# domtree = @frag.cloneNode(true)

block.class.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    block.init!
      .then ~>
        # TODO see constructor above about @script
        # This involves eval which compile separatedly, may induce inefficiency.
        # eventaully we will want this to be interpreted directly by browser in batch.
        @interface = (if @script instanceof Function => @script!
        else if typeof(@script) == \object => @script
        else if (v = eval("(function(module){#{@script or ''};return module.exports;})({})")) instanceof Function => v!
        else (v or {}))
        if !@interface => @interface = {}
        @interface.{}pkg
        if !@name => @name = @interface.pkg.name
        if !@version => @version = @interface.pkg.version
        if !@path => @path = @interface.pkg.path
        @id = block.id {name: (@name or rid!), version: @version or rid!, path: @path}
        # ID for translation : i18next treat `:` as separator for id, so we escape it
        @_id_t = @id.replace /:/g, '='
        # TODO better scope format?
        # use csscope for a stable scope name ( base64 ). scope may be pre-given, set in constructor.
        if !@scope => @scope = csscope.scope(@)

        # only create style-node if we have style.
        # this is useful when we use bundler with pre-scoped css.
        # TODO we may need an additional flag for explicitly telling block to whether do scoping or not.
        if @style =>
          doc.body.appendChild(@style-node = doc.createElement("style"))
          @style-node.setAttribute \type, 'text/css'
          # TODO @style takes 2nd parse here. we should support rule passing mechanism
          ret = csscope {
            rule: "*[scope~=#{@scope}]", name: @scope, css: @style, scope-test: "[scope]"
          }
          # translate local url to registry url.
          # TODO this always runs, which may no be necessary.
          # should we add some mechanism to make this optional?
          # also, this may have potential issues if registry changes after initialized
          ret = ret.replace /url\("?([^()"]+)"?\)/g, "url(#{@_path('')}$1)"
          @style-node.textContent = ret

        @factory = (i) ->
          @_instance = i
          @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->), _class: @
        } <<< @interface
      .then ~>
        @extends = []
        if !@interface.pkg.extend => return
        if !@manager => return new Error("no available manager to get extended block")
        @manager.get(@interface.pkg.extend)
          .then ~>
            @extend = it
            @extend-dom = !(@interface.pkg.extend.dom?) or @interface.pkg.extend.dom
            @extend-style = !(@interface.pkg.extend.style?) or @interface.pkg.extend.style
            @extend.init!
          .then ~>
            @extends = [@extend] ++ @extend.extends
      .then ~>
        i18n = @interface.pkg.i18n or {}
        for lng, res of i18n =>
          block.i18n.module.add-resource-bundle lng, @_id_t, res, true, true
      .then ~>
        @dependencies = if Array.isArray(@interface.pkg.dependencies) => @interface.pkg.dependencies
        else [v for k,v of (@interface.pkg.dependencies or {})]
        @dependencies.map ->
          if it.type => return
          if /\.js$/.exec(it.url or it.path or it) => it.type = \js
          else if /\.css$/.exec(it.url or it.path or it) => it.type = \css
          else it.type = \js # default js type
        if @extend => @_ctx = @extend.context!
        else if rescope.dual-context => @_ctx = rescope.dual-context!
        # no dual-context in rescope <= 4.0.1. just a backlog, can be removed in future update.
        else if rescope.proxin => @_ctx = new rescope.proxin!
        @manager.rescope.load @dependencies.filter(-> !it.type or it.type == \js), @_ctx
      .then ~>
        @manager.csscope.load(
          @dependencies
            .filter -> it.type == \css and it.global == true
            .map -> it.url or it
        )
      .then ~>
        @csscopes.global = (it or [])
        @manager.csscope.load(
          @dependencies
            .filter -> it.type == \css and it.global != true
            .map -> it.url or it
        )
      .then ~>
        @csscopes.local = (it or [])
        if !@extend => return
        @csscopes.global ++= (@extend.csscopes.global or [])
        if @extend-style == true => @csscopes.local ++= (@extend.csscopes.local or [])
        else if @extend-dom == \overwrite => @csscopes.local ++= (@extend.csscopes.local).slice(1)
      .catch (e) ~>
        console.error "[@plotdb/block] init block {name: #{@name}, version: #{@version}, path: #{@path or ''}}", e
        # TODO seems useless, unless we set it to @node?
        node = doc.createElement("div")
        node.innerText = "failed"
        @ <<< interface: {}, style-node: {}, factory: (-> @), dependencies: []

  context: -> @_ctx # get library context

  dom: -> @node

  _path: (p = '') ->
    @manager
      .get-url @{ns, name, version, path}
      .replace(/\/[^/]*$/, '/') + p

  i18n: (t) ->
    id = @_id_t
    block.i18n.module.t( ["#id:#t"] ++ (@extends.map -> "#{it._id_t}:#t") ++ ["#t"] )

  create: (o={}) ->
    # defer init in create since we may not use this block even if we load it.
    <~ @init!then _
    r = new block.instance {block: @, ns: @ns, name: @name, version: @version, data: o.data}
    r.init!
      .then -> if o.root => r.attach o{root, before}
      .then -> r


  # child: either
  #  - dom tree of child.
  #  - dom tree of container ( for interpolation )
  resolve-plug-and-clone-node: (child, by-pass = false) ->
    if !by-pass =>
      node = @dom!cloneNode true
      # child content may contain elements for `plug` - replace parent plug with child, if any found.
      if child =>
        # list all plugs used in sample dom, and replace them with child [plug].
        Array.from(node.querySelectorAll('plug')).map ->
          name = it.getAttribute(\name)
          # we skip nested plugs so recursive plug applying is possible.
          n = child.querySelector(":scope :not([plug]) [plug=#{name}], :scope > [plug=#{name}]")
          if n => it.replaceWith n
    else node = child
    return if @extend and @extend-dom != false =>
      if @extend-dom == \overwrite => @extend.resolve-plug-and-clone-node(node, true)
      else @extend.resolve-plug-and-clone-node(node)
    else node

block.instance = (opt = {}) ->
  @ <<< opt{ns, name, version, block, data}
  @init = proxise.once ~> @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: -> @block.init!
  attach: (opt = {}) ->
    if opt.data => @data = opt.data
    root = opt.root
    root = if !root => null else if typeof(root) == \string => doc.querySelector(root) else root
    block.global.csscope.apply @block.csscopes.global
    if !root => node = null
    else
      node = @dom opt.root
      exts = [@block] ++ @block.extends
      s = [@block.scope]
      for i from 0 til exts.length - 1 =>
        es = exts[i].extend-style
        if es == \overwrite => continue
        else if es == false => break
        s.push exts[i + 1].scope
      node.setAttribute \scope, s.join(' ')
      node.classList.add.apply(
        node.classList,
        @block.csscopes.local.map(->it.scope) ++ @block.csscopes.global.map(->it.scope)
      )
      if opt.before => root.insertBefore node, opt.before
      root.appendChild node

    @run({node, type: \init})
  detach: ->
    node = @dom!
    node.parentNode.removeChild node
    @run({node, type: \destroy})

  # TBD
  interface: ->
    for i from @obj.length to 0 by -1 =>
      if !(ret = (@obj[i] or {}).interface) => continue
      return if ret instanceof Function => ret.apply(@obj[i]) else ret
    return null
  update: (ops) -> @datadom.update ops

  _transform: (node, tag, func) ->
    regex = new RegExp("^#{tag}-(.+)$")
    _ = (n) ~>
      if n.nodeType == win.Element.TEXT_NODE =>
        n.parentNode.setAttribute tag, n.textContent
        n.parentNode.replaceChild doc.createTextNode(func(n.textContent)), n
      else
        for i from 0 til n.attributes.length =>
          {name,value} = n.attributes[i]
          if !(ret = regex.exec(name)) => continue
          n.setAttribute ret.1, func(value or '')
        if (v = n.getAttribute(tag)) => return n.textContent = func v
        for i from 0 til n.childNodes.length => _ n.childNodes[i]
    Array.from(node.querySelectorAll "[#tag]")
      .filter (n) -> n.hasAttribute(tag)
      .map (n) ~> _ n
    return node

  # TODO this is a simplified interface for doing DOM transformation.
  # it's expected to be publicly accessible for end users to apply expected transformation
  # so we are going to have a plugin / transformation mechanism underneath in the future;
  # for now we just accept a single parameter which is the name, and only accept `i18n` / `path` as its name.
  transform: (n) ->
    if !(n in <[i18n path]>) => return
    @_transform @node, \t, (~> @i18n it)
    @_transform @node, \path, (~> @_path it)

  dom: (child) ->
    if @node => return that
    @node = @block.resolve-plug-and-clone-node child
    @transform \i18n
    @transform \path

  _path: -> @block._path it
  i18n: -> @block.i18n it

  # run factory methods, recursively.
  # we will need a bus for communication.
  run: ({node, type}) ->
    cs = []
    ps = []
    c = @block
    if !@obj => @obj = []
    if !@pubsub => @pubsub = new pubsub!
    while c =>
      cs = [c] ++ cs
      c = c.extend
    new Promise (res, rej) ~>
      _ = (list = [], idx = 0, gtx = {}, parent) ~>
        if list.length <= idx =>
          p = Promise.all(ps)
            .then -> res it
            .catch -> rej it
          return p
        b = list[idx]
        # if we don't want dependencies from base class, use b.dependencies:
        #   @block.manager.rescope.context (b.dependencies or []).filter(->it.type != \css), (ctx) ~>
        # this is exactly the same with ctx = b._ctx.{}local with rescope < v3, see below
        # we are migrating to v4 so keep it here before we verify its correctness
        ## @block.manager.rescope.context b._ctx.{}local, (ctx) ~>
        ((ctx) ~>
          gtx <<< ctx
          payload = {
            root: node, parent: parent, manager: @block.manager
            ctx: gtx, context: gtx,
            pubsub: @pubsub
            i18n:
              add-resource-bundles: (resources = {}) ~>
                for lng, res of resources =>
                  block.i18n.add-resource-bundle lng, @block._id_t, res
              t: ~> @block.i18n(it)
            t: ~> @block.i18n(it)
            path: ~> @_path(it)
            data: @data
          }
          if type == \init => @obj.push(o = new b.factory @)
          ps.push if (o = @obj[idx]) => @obj[idx][type](payload) else null
          _ list, idx + 1, gtx, o
        ) if b._ctx.ctx => b._ctx.ctx! else b._ctx.{}local # use `{}local` for rescope < v4
      _ cs, 0, {}

    ## original, no inheritance structure
    #block.rescope.context @block.dependencies.filter(->it.type != \css), (context) ~>
    #  @obj = new @block.factory {root: node, context}

block.env if self? => self else globalThis
if module? => module.exports = block
else if window? => window.block = block
