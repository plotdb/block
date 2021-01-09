
block = {}
block.scope = new rescope global: window
block.manager = (opt={}) ->
  @hash = {}
  @set-registry opt.registry
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  init: -> block.scope.init!
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
        if !(n and v) => return Promise.reject(new ldError 1015)
        if @hash{}[n][v]? and !opt.force =>
          return if @hash[n][v] => Promise.resolve(@hash[n][v])
          else Promise.reject(new ldError 404)
        ld$.fetch @get-url(opt{name,version}) , {method: \GET}, {type: \text}
          .then (ret = {}) ~>
            @set obj = ({name: n, version: v} <<< {block: b = new block.class({code: ret, name: n, version: v})})
            if ret.version and ret.version != v => @set(obj <<< {version: ret.version})
            b.init!then -> b
    ).then -> if Array.isArray(opt) => return it else return it.0

block.class = (opt={}) ->
  @opt = opt
  @scope = "_" + Math.random!toString(36)substring(2)
  @inited = false
  @initing = false
  @ <<< opt{name, version}
  code = opt.code
  if opt.root => code = opt.root.innerHTML
  if code =>
    @code = DOMPurify.sanitize (code or ''), { ADD_TAGS: <[script style]>, ADD_ATTR: <[ld]> }
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    node = div.childNodes.0
  else node = document.createElement(\div)
  # remove functional elements before sending them into datadom.
  <[script style link]>.map (n) ~>
    @[n] = Array.from(node.querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
  @datadom = new datadom({node})
  @init = proxise ~>
    if @inited => return Promise.resolve!
    else if !@initing => @_init!
  @

# use document fragment ( yet datadom doesn't work with #document-fragment )
# @frag = document.createRange!.createContextualFragment(@code)
# domtree = @frag.cloneNode(true)

block.class.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    if @inited => return Promise.resolve!
    @initing = true
    @datadom.init!
      .then ~>
        @interface = eval(@script or '') or {}
        document.body.appendChild(@style-node = document.createElement("style"))
        @style-node.setAttribute \type, 'text/css'
        @style-node.textContent = ret = csscope {scope: "*[scope=#{@scope}]", css: @style, scope-test: "[scope]"}
        @factory = (...args) ->
          if @init => @init.apply(@, args)
          @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->)
        } <<< @interface
        @dependencies = if Array.isArray(@interface.dependencies) => @interface.dependencies
        else [v for k,v of (@interface.dependencies or {})]
        block.scope.load @dependencies

      .then ~> @ <<< inited: true, initing: false
      .then ~> @init.resolve!


  get-dom-node: -> @datadom.getNode!
  get-datadom: -> @datadom
  get-dom-data: -> @datadom.getData!
  create: ->
    ret = new block.instance {block: @}
    ret.init!then -> ret

#TODO consider how initialization of datadom work in block.instance and block.class.
block.instance = (opt = {}) ->
  @block = opt.block
  @datadom = new datadom {data: JSON.parse(JSON.stringify(@block.get-dom-data!))}
  @inited = false
  @initing = false
  @init = proxise ~>
    if @inited => return Promise.resolve!
    else if !@initing => @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    if @inited => return Promise.resolve!
    @datadom.init!then ~>
      @ <<< inited: true, initing: false
      @init.resolve!
  attach: ({root}) ->
    @get-dom-node!then (node) ~>
      node.setAttribute \scope, @block.scope
      _root = if typeof(root) == \string => document.querySelector(root) else root
      _root.appendChild node
      block.scope.context @block.dependencies, (context) ~>
        @obj = new @block.factory {root: node, context}
  detach: ->
    @get-dom-node!then (node) ~>
      node.parentNode.removeChild node
      @obj.destroy!
  update: (ops) -> @datadom.update ops
  get-datadom: -> @datadom
  get-dom-node: -> Promise.resolve @datadom.get-node!
  get-dom-data: -> Promise.resolve @datadom.get-data!

if module? => module.exports = block
if window? => window.block = block
