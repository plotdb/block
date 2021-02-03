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
