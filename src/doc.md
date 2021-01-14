## Why block

At first we just want to make web editing easier across expertise, and *block design* ( see [future of web design comes in blocks](https://thecode.co/block-web-design/), [Editor.js](https://editorjs.io/) ) seems to be a trend in web design. It's similar to web components but we will have to do more for making editing visuallly possible.

While it seems that what block ( web component & management ) provides is already available in other popular frameworks, block is actually designed with following criteria thus makes it different with others:

 * version management
   - blocks are managed with proper versioning. components with different versions should work along, to some extent.
   - components should works even using the same lib with different versions, without using `import`. 
     - popular frameworks use `import` which will have to bundle js within.
     - even if bundle is not necessary, many libs don't support `import` and will need wrapper to be able to use them.
 * framework agnostic
   - prevent from abducted by specific framework
   - while we actually invent `yet another framework`:
     - we modularize the whole things to make them as independent as possible.
     - thus `@plotdb/block` only serves for components purpose. no state management, no reactive.
     - additionally, any js frameworks are expected to work well with `@plotdb/block`.
 * As Simple as Possible
   - creating components has to be extremely easy. ( KISS principle )
     - there is no new syntax to learn in `@plotdb/block`, only APIs.
 * Collaborative
   - the whole page should be able to be serialized, including DOM, data / state
   - actions generalized and described by concepts such as operational transformation
 * DOM manipulating with UI ( cross expertise editing )


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
