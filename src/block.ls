block-manager = (opt={}) ->
  @hash = {}
  @api-url = opt.url
  @

block-manager.prototype = Object.create(Object.prototype) <<< do
  add: ({name, version, block}) -> @hash{}[name][version] = block
  # TODO support batch fetch
  # TODO latest -> cache?
  get: (opt = {}) ->
    [n,v] = [opt.name, opt.version or \latest]
    if !(n and v) => return Promise.reject new ldError(1015)
    if @hash{}[n][v]? and !opt.force =>
      return if @hash[n][v] => Promise.resolve(@hash[n][v])
      else Promise.reject new Error new ldError(404)
    ld$.fetch @api-url, {method: \POST}, {json: opt{name,version}, type: \json}
      .then (ret = {}) ~>
        if !(ret.name and ret.version) => return Promise.reject new ldError(1015)
        @add {name: ret.name, version: ret.version, block: b = new block-class(ret)}
        return b

block-class = (opt={}) ->
  @opt = opt
  @name = opt.name
  # For local block
  if opt.root => @datadom = datadom.serialize opt.root
  else if opt.files and opt.files["index.html"] =>
    div = document.createElement("div")
    div.innerHTML = opt.files["index.html"]
    @datadom = datadom.serialize div
  @

block-class.prototype = Object.create(Object.prototype) <<< do
  get-dom: -> datadom.deserialize @datadom
  get-datadom: -> JSON.parse(JSON.stringify(@datadom))
  create: -> new block-instance {block: @}

block-instance = (opt = {}) ->
  @block = opt.block
  @datadom = @block.get-datadom!
  @dom = datadom.deserialize @datadom
  @


block-instance.prototype = Object.create(Object.prototype) <<< do
  get-dom: -> @dom
  get-datadom: -> @datadom


/*
可能的事件:
 - before insert ( 編輯用 )
 - init
 - after insert ( 編輯用 )
 - before remove ( 編輯用 )
 - destroy
 - after remove ( 編輯用 )
 - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
*/
