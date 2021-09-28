rescope = if window? => window.rescope else if module? and require? => require "@plotdb/rescope" else null

sanitize = (code) -> (code or '')

e404 = -> Promise.reject(new Error! <<< {name: \lderror, id: 404})

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

pubsub = ->
  @subs = {}
  @

pubsub.prototype = Object.create(Object.prototype) <<< do
  fire: (name, ...args) -> Promise.all(@subs[][name].map -> it.apply null, args)
  on: (name, cb) -> @subs[][name].push cb

block = {}
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

block.global =
  csscope:
    hash: {}
    apply: (ret) ->
      ret = ret
        .filter ~> !@hash[it.url]
        .map ~> @hash[it.url] = it.scope
      if ret.length => document.body.classList.add.apply document.body.classList, ret

block.init = proxise.once ~> block.rescope.init!
block.rescope = new rescope global: window
block.csscope = new csscope.manager!
block.manager = (opt={}) ->
  @hash = {}
  @proxy = {}
  @running = {}
  @_chain = opt.chain or null
  @_fetch = opt.fetch or null
  @init = proxise.once ~> @_init!
  @rescope = if opt.rescope instanceof rescope => opt.rescope else block.rescope
  @csscope = if opt.csscope instanceof csscope => opt.csscope else block.csscope
  if opt.registry => @registry opt.registry
  @init!
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    if @rescope == block.rescope => block.init!
    else @rescope.init!
  chain: -> @_chain = it
  registry: (r) ->
    if typeof(r) in <[string function]> => r = {lib: r, block: r}
    if r.lib? =>
      if @rescope == block.rescope => @rescope = new rescope {global: window}
      if @csscope == block.csscope => @csscope = new csscope.manager!
      @rescope.registry r.lib
      @csscope.registry r.lib
    if r.block? =>
      @_reg = r.block or ''
      if typeof(@_reg) == \string => if @_reg and @_reg[* - 1] != \/ => @_reg += \/
  set: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(opts.map (obj) ~>
      {name,version,path} = obj
      b = if obj instanceof block.class => obj else obj.block
      @hash{}[name]{}[version][path or 'index.html'] = b
    )
  get-url: ({name, version, path}) ->
    return if typeof(@_reg) == \function => @_reg {name, version, path, type: \block}
    else "#{@_reg or ''}/assets/block/#{name}/#{version}/#{path or 'index.html'}"

  fetch: (opt) ->
    if @_fetch => return Promise.resolve(@_fetch opt)
    url = @get-url(opt{name,version,path})
    if !url => return e404!
    ld$.fetch url, {method: \GET}, {type: \text}

  # TODO parse semantic versioning for better cache performance.
  _get: (opt) ->
    [n,v,p] = [opt.name, opt.version or \latest, opt.path or 'index.html']
    if !(n and v) => return Promise.reject(new Error! <<< {name: "lderror", id: 1015})
    if @hash{}[n]{}[v][p]? and !opt.force => return Promise.resolve(@hash[n][v][p])
    if @running{}[n]{}[v][p] == true => return
    @running[n][v][p] = true
    @fetch opt{name,version,path}
      .then ~> if it => return it else return e404!
      .catch (e) ~>
        if !@_chain => return Promise.reject(e)
        @_chain.get opt
      .then (ret = {}) ~>
        b = new block.class({code: ret, name: n, version: v, path: p, manager: @})
        @set obj = ({name: n, version: v, path: p} <<< {block: b})
        if ret.version and ret.version != v => @set(obj <<< {version: ret.version})
        b
      .then ~>
        @proxy[n][v][p].resolve it
        return it
      .finally ~> @running[n][v][p] = false
      .catch (e) ~>
        @proxy[n][v][p].reject e
        return Promise.reject e

  get: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(
      opts.map (opt = {}) ~>
        if typeof(opt) == \string => opt = parse-name-string(opt)
        [n,v,p] = [opt.name, opt.version or \latest, opt.path or 'index.html']
        if !@proxy{}[n]{}[v][p] => @proxy[n][v][p] = proxise (opt) ~> @_get(opt)
        @proxy[n][v][p] opt
    ).then -> if Array.isArray(opt) => return it else return it.0

block.class = (opt={}) ->
  @opt = opt
  @scope = "_" + Math.random!toString(36)substring(2)
  @_ctx = {} # libraries context. may inherited from extended base class.
  @csscopes = {global: [], local: []} # css libraries. may be either global or local.
  # manager is used for recursively get extended block.
  @ <<< opt{name, version, path, manager}
  if !@manager => console.log warn "manager is mandatory when constructing block.class"
  code = opt.code
  if opt.root => code = (if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root).innerHTML
  if typeof(code) == \function => code = code!
  if typeof(code) == \string =>
    @code = sanitize code
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
  else if typeof(code) == \object =>
    @script = code.script
    @style = code.style
    code = if code.dom instanceof Function => code.dom! else code.dom
    @code = sanitize code
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."

  # remove functional elements before sending them into datadom.
  # div but not node: we will get node later so get all func elements via div first.
  <[script style link]>.map (n) ~>
    v = Array.from((node or div).querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
    @[n] = if v? and v => v else (@[n] or "")

  if !node and div =>
    for i from 0 til div.childNodes.length =>
      if (node = div.childNodes[i]).nodeType == Element.ELEMENT_NODE => break
  if !node => node = document.createElement(\div)
  if node.nodeType != Element.ELEMENT_NODE =>
    console.log warn "root of DOM definition of a block should be an Element"

  @node = node
  # we dont init until create is called, because we may not use it even if it's loaded.
  @init = proxise.once ~> @_init!
  @

# use document fragment ( yet datadom doesn't work with #document-fragment )
# @frag = document.createRange!.createContextualFragment(@code)
# domtree = @frag.cloneNode(true)

block.class.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    block.init!
      .then ~>
        @interface = (if @script instanceof Function => @script!
        else if typeof(@script) == \object => @script
        else if (v = eval(@script or '')) instanceof Function => v!
        else (v or {}))
        if !@interface => @interface = {}
        @interface.{}pkg
        if !@name => @name = @interface.pkg.name
        if !@version => @version = @interface.pkg.version
        if !@path => @path = @interface.pkg.path
        @id = "#{@name or rid!}@#{@version or rid!}/#{@path or 'index.html'}"

        document.body.appendChild(@style-node = document.createElement("style"))
        @style-node.setAttribute \type, 'text/css'
        @style-node.textContent = ret = csscope {
          rule: "*[scope~=#{@scope}]", name: @scope, css: @style, scope-test: "[scope]"
        }
        @factory = (...args) -> @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->)
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
          block.i18n.module.add-resource-bundle lng, @id, res, true, true
      .then ~>
        @dependencies = if Array.isArray(@interface.pkg.dependencies) => @interface.pkg.dependencies
        else [v for k,v of (@interface.pkg.dependencies or {})]
        @dependencies.map ->
          if it.type => return
          if /\.js$/.exec(it.url or it.path or it) => it.type = \js
          else if /\.css$/.exec(it.url or it.path or it) => it.type = \css
          else it.type = \js # default js type
        if @extend => @_ctx = @extend.context!
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
        node = document.createElement("div")
        node.innerText = "failed"
        @ <<< interface: {}, style-node: {}, factory: (-> @), dependencies: []

  context: -> @_ctx # get library context

  dom: -> @node

  i18n: (t) ->
    id = @id
    block.i18n.module.t( ["#id:#t"] ++ (@extends.map -> "#{it.id}:#t") ++ [t] )

  create: (opt={}) ->
    # defer init in create since we may not use this block even if we load it.
    <~ @init!then _
    ret = new block.instance {block: @, name: @name, version: @version, data: opt.data}
    ret.init!then -> ret

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
  @ <<< opt{name, version, block, data}
  @init = proxise.once ~> @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: -> @block.init!
  attach: (opt = {}) ->
    if opt.data => @data = opt.data
    root = opt.root
    root = if !root => null else if typeof(root) == \string => document.querySelector(root) else root
    block.global.csscope.apply @block.csscopes.global
    if !root => node = null
    else
      node = @dom!
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

  _transform: (node) ->
    # i18n transformer
    _ = (n) ~>
      if n.nodeType == Element.TEXT_NODE =>
        n.parentNode.replaceChild document.createTextNode(@i18n(n.textContent)), n
      else
        for i from 0 til n.attributes.length =>
          {name,value} = n.attributes[i]
          if !(ret = /^t-(.+)$/.exec(name)) => continue
          n.setAttribute ret.1, @i18n(value or '')
        if (v = n.getAttribute(\t)) => return n.textContent = @i18n v
        for i from 0 til n.childNodes.length => _ n.childNodes[i]
    Array.from(node.querySelectorAll '[t]')
      .filter (n) -> n.hasAttribute(\t)
      .map (n) ~> _ n
    return node

  dom: ->
    if @node => return that
    @node = @block.resolve-plug-and-clone-node!
    @_transform @node

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
        @block.manager.rescope.context b._ctx.{}local, (ctx) ~>
          gtx <<< ctx
          payload = {
            root: node, parent: parent,
            ctx: gtx, context: gtx,
            pubsub: @pubsub
            i18n:
              add-resource-bundles: (resources = {}) ~>
                for lng, res of resources =>
                  block.i18n.add-resource-bundle lng, @block.id, res
              t: ~> @block.i18n(it)
            t: ~> @block.i18n(it)
            data: @data
          }
          if type == \init => @obj.push(o = new b.factory payload)
          ps.push if (o = @obj[idx]) => @obj[idx][type](payload) else null
          _ list, idx + 1, gtx, o
      _ cs, 0, {}

    ## original, no inheritance structure
    #block.rescope.context @block.dependencies.filter(->it.type != \css), (context) ~>
    #  @obj = new @block.factory {root: node, context}

if module? => module.exports = block
if window? => window.block = block
