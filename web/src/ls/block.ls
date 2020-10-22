
block-manager = ->

# block 由 block-manager 建立. block-manager 提供必要內容供取用.
block = (opt) ->
  @opt = opt
  @

block.prototype = Object.create(Object.prototype) <<< {}
  create: ->
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

block-inst = ->
  @

block-inst.prototype = Object.create(Object.prototype) <<< {}
  pub: (name, data) ->
    ???.on name, data

  get-dom: ->
  get-block: ->
  init: ->
