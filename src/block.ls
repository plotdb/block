rescope = if window? => window.rescope else if module? and require? => require "@plotdb/rescope" else null

# Do we really need sanitize after all? we have to trust all block we are going to use anyway...
sanitize = (code) ->
  return (code or '')
  /* To Sanitize: ( args dependes )
  DOMPurify.sanitize(
   (code or ''), {
     ADD_TAGS: <[script style plug]>
     ADD_ATTR: <[ld ld-each block plug]>
   }
  )
  */

pubsub = ->
  @subs = {}
  @

pubsub.prototype = Object.create(Object.prototype) <<< do
  fire: (name, ...args) -> @subs[][name].map -> it.apply null, args
  on: (name, cb) -> @subs[][name].push cb

block = {}
block.scope = new rescope global: window
block.manager = (opt={}) ->
  @hash = {}
  @set-registry opt.registry
  @init = proxise.once ~> @_init!
  @init!
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  _init: -> block.scope.init!
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
  get: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(
      opts.map (opt = {}) ~>
        [n,v] = [opt.name, opt.version or \latest]
        if !(n and v) => return Promise.reject(new Error! <<< {name: "ldError", id: 1015})
        if @hash{}[n][v]? and !opt.force =>
          return if @hash[n][v] => Promise.resolve(@hash[n][v])
          else Promise.reject(new Error! <<< {name: "ldError", id: 404})
        ld$.fetch @get-url(opt{name,version}) , {method: \GET}, {type: \text}
          .then (ret = {}) ~>
            @set obj = ({name: n, version: v} <<< {block: b = new block.class({code: ret, name: n, version: v})})
            if ret.version and ret.version != v => @set(obj <<< {version: ret.version})
            b.init!then -> b
    ).then -> if Array.isArray(opt) => return it else return it.0

block.class = (opt={}) ->
  @opt = opt
  @scope = "_" + Math.random!toString(36)substring(2)
  @ <<< opt{name, version, extend}
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
        else eval(@script or '')) or {}
        document.body.appendChild(@style-node = document.createElement("style"))
        @style-node.setAttribute \type, 'text/css'
        @style-node.textContent = ret = csscope {scope: "*[scope=#{@scope}]", css: @style, scope-test: "[scope]"}
        @factory = (...args) ->
          if @init => @init.apply(@, args)
          @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->)
        } <<< @interface
        @dependencies = if Array.isArray(@interface.{}pkg.dependencies) => @interface.{}pkg.dependencies
        else [v for k,v of (@interface.{}pkg.dependencies or {})]
        block.scope.load @dependencies
      .catch (e) ~>
        console.error e
        node = document.createElement("div")
        node.innerText = "failed"
        @ <<< interface: {}, style-node: {}, factory: (-> @), dependencies: []

  dom: -> @node

  create: ->
    ret = new block.instance {block: @, name: @name, version: @version}
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
  @ <<< opt{block, name, version}
  @init = proxise.once ~> @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: -> @block.init!
  attach: ({root}) ->
    node = @dom!
    node.setAttribute \scope, @block.scope
    _root = if typeof(root) == \string => document.querySelector(root) else root
    _root.appendChild node
    @run({node, type: \init})
  detach: ->
    node = @dom!
    node.parentNode.removeChild node
    @run({node, type: \destroy})
  update: (ops) -> @datadom.update ops
  get-datadom: -> @datadom

  dom: -> if @node => that else @node = @block.resolve-plug-and-clone-node!

  # run factory methods, recursively.
  # we will need a bus for communication.
  run: ({node, type}) ->
    cs = []
    c = @block
    if !@obj => @obj = []
    if !@pubsub => @pubsub = new pubsub!
    while c =>
      cs = [c] ++ cs
      c = c.extend
    _ = (list = [], idx = 0, gtx = {}, parent) ~>
      if list.length <= idx => return
      b = list[idx]
      block.scope.context (b.dependencies or []), (ctx) ~>
        gtx <<< ctx
        payload = {root: node, context: gtx, parent: parent, pubsub: @pubsub}
        if type == \init => @obj.push(o = new b.factory payload)
        else if (o = @obj[it]) => @obj[it](payload)
        _ list, idx + 1, gtx, o
    _ cs, 0, {}

    ## original, no inheritance structure
    #block.scope.context @block.dependencies, (context) ~>
    #  @obj = new @block.factory {root: node, context}

if module? => module.exports = block
if window? => window.block = block
