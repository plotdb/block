block = {}
block.manager = (opt={}) ->
  @hash = {}
  @set-registry opt.registry
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  set-registry: ->
    @reg = it or ''
    if typeof(@reg) == \string => if @reg and @reg[* - 1] != \/ => @reg += \/
  set: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    opts.map ({name,version,block}) ~> @hash{}[name][version] = block
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
            obj = ({name: n, version: v} <<< {block: b = new block.class({code: ret, name: n, version: v})})
            @set obj
            if ret.version and ret.version != v => @set(obj <<< {version: ret.version})
            return b
    ).then -> if Array.isArray(opt) => return it else return it.0

block.class = (opt={}) ->
  @opt = opt
  @scope = "_" + Math.random!toString(36)substring(2)
  @ <<< opt{name, version}
  code = opt.code
  if opt.root => code = opt.root.innerHTML
  if code =>
    @code = DOMPurify.sanitize (code or ''), { ADD_TAGS: <[script style]> }
    div = document.createElement("div")
    div.innerHTML = @code
    if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    @datadom = new datadom({node: div.childNodes.0})
  else @datadom = new datadom({node: document.createElement \div})
  @datadom.init!

  # use document fragment ( yet datadom doesn't work with #document-fragment )
  # @frag = document.createRange!.createContextualFragment(@code)
  # domtree = @frag.cloneNode(true)

  <[script style link]>.map (n) ~> 
    @[n] = Array.from(@datadom.getNode!.querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
  @interface = eval(@script)
  document.body.appendChild(@style-node = document.createElement("style"))
  @style-node.setAttribute \type, 'text/css'
  @style-node.textContent = ret = csscope {scope: "*[scope=#{@scope}]", css: @style, scope-test: "[scope]"}
  @factory = (...args) ->
    if @init =>
      @init.apply(@, args)
    @
  @factory.prototype = @interface
  @

block.class.prototype = Object.create(Object.prototype) <<< do
  get-dom-node: -> @datadom.getNode!
  get-datadom: -> @datadom
  get-dom-data: -> @datadom.getData!
  create: -> new block.instance {block: @}

#TODO consider how initialization of datadom work in block.instance and block.class.
block.instance = (opt = {}) ->
  @block = opt.block
  @datadom = new datadom {data: JSON.parse(JSON.stringify(@block.get-dom-data!))}
  @_init_promise = @datadom.init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  attach: ({root}) ->
    @get-dom-node!then ~>
      it.setAttribute \scope, @block.scope
      document.body.appendChild it
      @obj = new @block.factory {root: it}
  update: (ops) -> @_init_promise.then ~> @datadom.update ops
  get-datadom: -> @datadom
  get-dom-node: -> @_init_promise.then ~> ret = @datadom.get-node!
  get-dom-data: -> @_init_promise.then ~> ret = @datadom.get-data!

if module? => module.exports = block
if window? => window.block = block
