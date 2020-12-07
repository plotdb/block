block.manager
  get({name,version}): return block-class
  set-registry(url)

block.class
  create({ ... }): return block-instance

block.instance
  get-dom


可能的事件:
 - before insert ( 編輯用 )
 - init
 - after insert ( 編輯用 )
 - before remove ( 編輯用 )
 - destroy
 - after remove ( 編輯用 )
 - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
