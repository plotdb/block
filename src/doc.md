## API Reference

block.manager
 - `constructor({registry})`: create a block manager.
   - `registry`: registry url
 - `set({name,version,block})`: bind `name@version` to block ( a `block.class` object ).
 - `get({name,version,force})`: return block-class with `name@version`. ignore cache if `force` is true.
 - `setRegistry(url)`: update registry url. url can be either:
   - `string`: represent base url of the registry.
   - `function({name, version})`: a function accepting `{name,version}` params and return full path for specific block.

block.class
 - `constructor({name, version, code, root})`: create a block class.
   - code can be a serialized html file, or an object containing following members:
     - dom - dom string. if it contains any `style` or `script` tags, following members will be overwritten.
     - style - style string
     - script - can be either an object or a function returing an object.
       the object (either script itself or the returned one) should follow `block instance interface` spec.
 - `create()`: create and a block instance.
 - `get-dom():
 - `get-datadom(): 

block.instance
 - constructor({block}): create a block instance.
 - attach({root}):
 - update(ops):
 - get-dom(): 
 - get-data(): 


## block js object fields

 - pkg
   - author
   - name
   - version
   - license
   - description
   - dependencies ( similar to npm )
     - list or modules, in case of mutual dependencies:
       ["some-url", {url: "some-url", async: false, dev: true}]
     - options in object notation:
       - name: name of this module
       - version: version of this module
       - url: path of the module. generated from name + version if omitted. (TODO)
       - async: true to load this module asynchronously. true by default.
       - mode: TBD ( use to control when this module should be loaded. )

## block.instance interface

 - before insert ( 編輯用 )
 - init({root, mode, context, parent, pubsub})
   - root: root element
   - mode: executing mode. ( edit, view, etc )
   - context: dependencies in an object.
 - after insert ( 編輯用 )
 - before destroy ( 編輯用 )
 - destroy
 - after destroy ( 編輯用 )
 - update ( 編輯用, 或者...開放跨模組溝通時用來更新用? )
 - pkg ( see above )

## environment api?
 - get mode ( 確認當前模式 )

## block html attribute
 - block: CSS class-like block class definition, with following possible classes:
   - fit: this block should fit ( maximize size )
   - inline: this is an inline block.

## inheritance, block group? ( tentative )
 - with `extend`, by name or object. ( TODO: name )
   - for every block in the inheritant chain, we create an object for it.
   - store in `block.instance`'s `obj` member.
 - communicate between block object throught `pubsub` params.
 - access parent directly throught `parent` params. ( TBD? remove this for encapsulation? )
 - how code editing works? how to update block? ( TODO )
