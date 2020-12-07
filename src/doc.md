block.manager
 - constructor({registry}): create a block manager.
   - registry: registry url
 - add({name,version,block}): add block-class.
 - get({name,version,force}): return block-class with `name@version`. ignore cache if force is true.
 - set-registry(url): update registry url

block.class
 - constructor({name, version, code, root}): create a block class.
 - create(): create and a block instance.
 - get-dom():
 - get-datadom(): 

block.instance
 - constructor({block}): create a block instance.
 - attach({root}):
 - update(ops):
 - get-dom(): 
 - get-data(): 


可能的事件:
 - before insert ( 編輯用 )
 - init
 - after insert ( 編輯用 )
 - before destroy ( 編輯用 )
 - destroy
 - after destroy ( 編輯用 )
 - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
