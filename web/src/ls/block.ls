
# 插入的 block 需要做好 editable 的設定
# editable 應該要改成能吃 "editable=false" 屬性
# 現在插入的 block 似乎無法直接被刪除.
# 需要一個可以往上選一層的方式
#  - 比方說 content block, 滑鼠不管怎麼動, 都是 focus 在 header 跟 p 上

block-manager = do
  hash: {}
  add: ({name, version, block}) -> @hash{}[name][version] = block
  get: (opt = {}) ->
    [n,v] = [opt.name, opt.version]
    if !(n and v) => return Promise.reject new ldError(1015)
    if @hash{}[n][v]? =>
      return if @hash[n][v] => Promise.resolve(@hash[n][v])
      else Promise.reject new Error new ldError(404)
    json = {dependency: [opt]}
    json = opt{name,version}
    ld$.fetch "/block", {method: \POST}, {json, type: \json}
      .then (ret = {}) ~>
        if !(ret.name and ret.version) => return Promise.reject new ldError(1015)
        @add {name: ret.name, version: ret.version, block: b = new block(ret)}
        return b

# block 由 block-manager 建立. block-manager 提供必要內容供取用.
block = (opt = {}) ->
  @opt = opt
  @name = opt.name
  if opt.root =>
    @tree = serialize opt.root
  else if opt.files and opt.files["index.html"] =>
    div = document.createElement("div")
    div.innerHTML = opt.files["index.html"]
    @tree = serialize div
  block-manager.add name, @
  @

block.prototype = Object.create(Object.prototype) <<< do
  /*
  should return block-instance
  真的建一個 DOM 出來. 初始化?
  可能的事件:
   - before insert ( 編輯用 )
   - init
   - after insert ( 編輯用 )
   - before remove ( 編輯用 )
   - destroy
   - after remove ( 編輯用 )
   - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
  */
  instantiate: (data) -> deserialize(if data? => data else @tree)

/*
block-inst = ->
  @

block-inst.prototype = Object.create(Object.prototype) <<< {}
  pub: (name, data) ->
    ???.on name, data

  get-dom: ->
  get-block: ->
  init: ->
*/
