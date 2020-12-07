block = {}
block.manager = (opt={}) ->
  @hash = {}
  @api-url = opt.url or "/"
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  add: ({name, version, block}) -> @hash{}[name][version] = block
  # TODO support batch fetch
  # TODO latest -> cache?
  get-url: ({name, version}) -> "#{@api-url}block/#{name}/#{version}/index.html"
  get: (opt = {}) ->
    [n,v] = [opt.name, opt.version or \latest]
    if !(n and v) => return Promise.reject new ldError(1015)
    if @hash{}[n][v]? and !opt.force =>
      return if @hash[n][v] => Promise.resolve(@hash[n][v])
      else Promise.reject new Error new ldError(404)
    ld$.fetch @get-url(opt{name,version}) , {method: \GET}, {type: \text}
      .then (ret = {}) ~>
        @add {name: n, version: v} <<< {block: b = new block.class({code: ret, name: n, version: v})}
        return b

block.class = (opt={}) ->
  @opt = opt
  @ <<< opt{name, version}
  code = opt.code
  if opt.root => code = opt.root.innerHTML
  if code =>
    @code = DOMPurify.sanitize (code or ''), { ADD_TAGS: <[script style]> }
    @dom = document.createElement("div")
    @dom.classList.add \scope
    @dom.innerHTML = @code
  else @dom = document.createElement("div")

  # use document fragment ( yet datadom doesn't work with #document-fragment )
  #@frag = document.createRange!.createContextualFragment(@code)
  #@dom = @frag.cloneNode(true)

  <[script style link]>.map (n) ~> 
    @[n] = Array.from(@dom.querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
  @datadom = datadom.serialize(@dom)
  @interface = eval(@script)
  style = document.createElement("style")
  style.textContent = csscope.convert({scope: ".scope",css: @style})
  document.body.appendChild style
  @factory = (...args) ->
    if @init =>
      @init.apply(@, args)
    @
  @factory.prototype = @interface
  @

block.class.prototype = Object.create(Object.prototype) <<< do
  get-dom: -> datadom.deserialize @datadom
  get-datadom: -> JSON.parse(JSON.stringify(@datadom))
  create: -> new block.instance {block: @}

block.instance = (opt = {}) ->
  @block = opt.block
  @datadom = new datadom {data: @block.get-datadom!}
  @_init_promise = @datadom.init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  attach: ({root}) ->
    @get-dom!then ~>
      document.body.appendChild it
      @obj = new @block.factory {root: it}

  update: (ops) -> @datadom.update ops
  get-dom: -> @_init_promise.then ~> ret = @datadom.get-node!
  get-data: -> @datadom.get-data!

if module? => module.exports = block
if window? => window.block = block
