rescope = if window? => window.rescope else if module? and require? => require "@plotdb/rescope" else null

sanitize = (code) -> (code or '')

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
block.global =
  csscope:
    hash: {}
    apply: (ret) ->
      ret = ret
        .filter ~> !@hash[it.url]
        .map ~> @hash[it.url] = it.scope
      if ret.length => document.body.classList.add.apply document.body.classList, ret

block.rescope = new rescope global: window
block.csscope = new csscope.manager!
block.manager = (opt={}) ->
  @hash = {}
  @proxy = {}
  @running = {}
  @set-registry opt.registry
  @init = proxise.once ~> @_init!
  @init!
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  _init: -> block.rescope.init!
  set-registry: ->
    @reg = it or ''
    if typeof(@reg) == \string => if @reg and @reg[* - 1] != \/ => @reg += \/
  set: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(opts.map (obj) ~>
      {name,version} = obj
      b = if obj instanceof block.class => obj else obj.block
      @hash{}[name][version] = b
      b.init!
    )
  get-url: ({name, version}) ->
    if typeof(@reg) == \function => @reg {name, version}
    else return "#{@reg or ''}/block/#{name}/#{version}"

  # TODO parse semantic versioning for better cache performance.
  _get: (opt) ->
    [n,v] = [opt.name, opt.version or \latest]
    if !(n and v) => return Promise.reject(new Error! <<< {name: "lderror", id: 1015})
    if @hash{}[n][v]? and !opt.force =>
      return if @hash[n][v] => Promise.resolve(@hash[n][v])
      else Promise.reject(new Error! <<< {name: "lderror", id: 404})
    if @running{}[n][v] == true => return
    @running[n][v] = true
    ld$.fetch @get-url(opt{name,version}) , {method: \GET}, {type: \text}
      .then (ret = {}) ~>
        b = new block.class({code: ret, name: n, version: v, manager: @})
        @set obj = ({name: n, version: v} <<< {block: b})
        if ret.version and ret.version != v => @set(obj <<< {version: ret.version})
        b.init!then -> b
      .then ~>
        @proxy[n][v].resolve it
        return it
      .finally ~> @running[n][v] = false
      .catch (e) ~>
        @proxy[n][v].reject e
        return Promise.reject e

  get: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(
      opts.map (opt = {}) ~>
        if typeof(opt) == \string => opt = parse-name-string(opt)
        [n,v] = [opt.name, opt.version or \latest]
        if !@proxy{}[n][v] => @proxy[n][v] = proxise (opt) ~> @_get(opt)
        @proxy[n][v] opt
    ).then -> if Array.isArray(opt) => return it else return it.0

block.class = (opt={}) ->
  @opt = opt
  @scope = "_" + Math.random!toString(36)substring(2)
  @_ctx = {} # libraries context. may inherited from extended base class.
  @csscope = {global: [], local: []} # css libraries. may be either global or local.
  # manager is used for recursively get extended block.
  @ <<< opt{name, version, extend, manager}
  code = opt.code
  if opt.root => code = (if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root).innerHTML
  if typeof(code) == \function => code = code!
  if typeof(code) == \string =>
    @code = sanitize code
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    node = div.childNodes.0
  else if typeof(code) == \object =>
    @script = code.script
    @style = code.style
    code = if code.dom instanceof Function => code.dom! else code.dom
    @code = sanitize code
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    node = div.childNodes.0
  if !node => node = document.createElement(\div)

  # remove functional elements before sending them into datadom.
  <[script style link]>.map (n) ~>
    v = Array.from(node.querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
    @[n] = if v? and v => v else (@[n] or "")
  @node = node
  @init = proxise.once ~> @_init!
  @init!
  @

# use document fragment ( yet datadom doesn't work with #document-fragment )
# @frag = document.createRange!.createContextualFragment(@code)
# domtree = @frag.cloneNode(true)

block.class.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    Promise.resolve!
      .then ~>
        @interface = (if @script instanceof Function => @script!
        else if typeof(@script) == \object => @script
        else if (v = eval(@script or '')) instanceof Function => v!
        else (v or {}))
        document.body.appendChild(@style-node = document.createElement("style"))
        @style-node.setAttribute \type, 'text/css'
        @style-node.textContent = ret = csscope {scope: "*[scope=#{@scope}]", css: @style, scope-test: "[scope]"}
        @factory = (...args) -> @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->)
        } <<< @interface
      .then ~>
        if !@interface.{}pkg.extend => return
        if !@manager => return new Error("no available manager to get extended block")
        @manager.get(@interface.pkg.extend).then ~> @extend = it
      .then ~>
        @dependencies = if Array.isArray(@interface.{}pkg.dependencies) => @interface.{}pkg.dependencies
        else [v for k,v of (@interface.{}pkg.dependencies or {})]
        if @extend => @_ctx = @extend.context!
        block.rescope.load @dependencies.filter(-> /\.js$/.exec(it.url or it) or it.type == \js), @_ctx
      .then ~>
        block.csscope.load(
          @dependencies
            .filter -> (/\.css$/.exec(it.url or it) or it.type == \css) and it.global == true
            .map -> it.url or it
        )
      .then ~>
        @{}csscope.global = (it or [])
        block.csscope.load(
          @dependencies
            .filter -> (/\.css$/.exec(it.url or it) or it.type == \css) and it.global != true
            .map -> it.url or it
        )
      .then ~>
        # TODO documenting? or let it be private?
        @csscope.local = (it or []) ++ (if @extend => @extend.csscope.local or [] else [])
      .catch (e) ~>
        console.error e
        node = document.createElement("div")
        node.innerText = "failed"
        @ <<< interface: {}, style-node: {}, factory: (-> @), dependencies: []

  context: -> @_ctx # get library context

  dom: -> @node

  create: (opt={}) ->
    ret = new block.instance {block: @, name: @name, version: @version, data: opt.data}
    ret.init!then -> ret

  resolve-plug-and-clone-node: (child) ->
    node = @dom!cloneNode true
    # child content may contain elements for `plug` - replace parent plug with child, if any found.
    if child =>
      # list all plugs used in sample dom, and replace them with child [plug].
      Array.from(node.querySelectorAll('plug')).map ->
        name = it.getAttribute(\name)
        # we skip nested plugs so recursive plug applying is possible.
        n = child.querySelector(":scope :not([plug]) [plug=#{name}], :scope > [plug=#{name}]")
        if n => it.replaceWith n
    return if @extend => @extend.resolve-plug-and-clone-node(node) else node

block.instance = (opt = {}) ->
  @ <<< opt{name, version, block, data}
  @init = proxise.once ~> @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: -> @block.init!
  attach: ({root, data}) ->
    if data => @data = data
    node = @dom!
    node.setAttribute \scope, @block.scope
    node.classList.add.apply(
      node.classList,
      @block.csscope.local.map(-> it.scope) ++ @block.csscope.global.map(->it.scope)
    )
    block.global.csscope.apply @block.csscope.global
    _root = if typeof(root) == \string => document.querySelector(root) else root
    _root.appendChild node
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

  dom: -> if @node => that else @node = @block.resolve-plug-and-clone-node!

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
        #   block.rescope.context (b.dependencies or []).filter(->it.type != \css), (ctx) ~>
        block.rescope.context b._ctx.{}local, (ctx) ~>
          gtx <<< ctx
          payload = {root: node, context: gtx, parent: parent, pubsub: @pubsub, data: @data}
          if type == \init => @obj.push(o = new b.factory payload)
          ps.push if (o = @obj[idx][type]) => @obj[idx][type](payload) else null
          _ list, idx + 1, gtx, o
      _ cs, 0, {}

    ## original, no inheritance structure
    #block.rescope.context @block.dependencies.filter(->it.type != \css), (context) ~>
    #  @obj = new @block.factory {root: node, context}

if module? => module.exports = block
if window? => window.block = block
