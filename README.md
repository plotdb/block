# @plotdb/block

*Work in progress - please consider everything as unstable.*

Frontend module library with following features:

 - isolated dependencies of JavaScript libraries.
 - scoped CSS


## Concept

Similar to `web component`, `@plotdb/block` modularizes frontend codes int components called `block`. A block can be defined in a plain HTML files, containing following 3 parts ( all parts are optional ):

 - HTML
 - CSS
 - JavaScript

This is an example of a block html file:

    <div>
      <h1> Hello World! </h1>
      <style type="@plotdb/block"> ... </style>
      <script type="@plotdb/block"> ... </script>
    </div>

There is no preferred languages in coding this html files. Users can write script in `TypeScript`, use `SASS` for stylesheet.  Following is an example using Pug, LiveScript and Stylus with `zbryikt/template` syntax:

    div
      h1 Hello World!
      style(type="@plotdb/block"): :stylus
        html, body { width: 100%; height: 100% }
      script(type="@plotdb/block"): :lsc
        { init: -> console.log \loaded. }


Similar to NPM module, blocks are defined with a `name` and a `version`, where:

 - `name`: use the naming convention as npm. e.g., `@loadingio/spinner`
 - `version`: sematic versioning, tag or hash value. e.g., `0.0.1`

And thus it's possible to manange blocks of different versions with a block manager ( `block.manager` ). When request a block from block manager, a block class ( `block.class` ) is returned for creating a block instance ( `block.instance` ) as a class. The block instance is the actual object injected and used in webpage.


## Core modules

As described above, `@plotdb/block` provides following tools:

 - `block.manager` - for accessing block definitions, used to register, get and cache `block.class` 
 - `block.class` -  based on the definition of a block to generate `block.instance`.
 - `block.instance` - object for manipulating state / DOM of the given block.


### block.manager

Blocks may be stored in places like:

 - `local`: blocks are loaded into webpages directly via `<script>` tag in HTML.
 - `remote`:  blocks are stored as files in remote URL, accessing via AJAX.

either way we have to provide a way to load, register, cache these blocks - that is, to manage them.

`block.manager` helps us manage blocks by providing following APIs:

 - `constructor(opts)`: create a new block.manager object before using it with opts:
   - `registry`: either function or string, tell `block.manager` where to find remote blocks.
     - `function({name,version})`: return URL for given `name` and `version` of a block.
     - `string`: the registry base url. block.manager will look up blocks under this url with this rule:
       - `/block/<name>/<version>/index.html`
 - `setRegistry(registry)`: update `registry` dynamically.
 - `set({name,version,block}): register a block with `name` and `version`.
   - `block`: a `block-class` object, explained below.
   - `set` also accepts Array of {name,version,block} object for batching `set`.
 - `getUrl({name,version})`: get corresponding url for a block with `name` and `version`.
 - `get({name,version,force})`: return a `block-class` object corresponding to a block with `name` and `version`.
   - `force`: by default, `block.manager` caches result. set `force` to true to force `block.manager` re-fetch data.
   - `get` also accept an array of `{name,version,force}` tuples for batching `get`.
      - in this case, `get` returns an array of `block.class`.


### block.class

`block.class` is a factory for generating block instances. It parses the code of a block based on the block specification and convert them into clonable code, preparing for generating `block.instance` objects on demand.

`block.class` provides following APIs:

 - `constructor(opt)` with following options:
   - `name`: block name. mandatory.
   - `version`: block version. mandatory.
   - `code`: string of html code. use to create internal dom tree if provided. it can also be:
     - a function, return alternative code.
     - an object, containing `dom`, `style` and `script` members.
   - `root`: root of a DOM tree. use to create internal dom tree if provided. Overwrite code.
 - `create()`: create a `block.instance` based on this object.

and following private members:

 - `dom`: block DOM tree.
 - `scope`: unique id randomly generated each time when `block.class` is created mainly for scoping purpose.
 - `opt`: raw constructor options.
 - `code`: source code for constructing this block.
 - `script`: source code for this block's script definition.
 - `style`: source code for this block's style definition.
 - `link`: reserved for future use.
 - `interface`: javascript interface for this block.
 - `styleNode`: node storing parsed / scoped style of this block.
 - `factory`: constructor for generating an object defined by `script` part.

To create a `block.instance` based on a `block.class`:

    instance = aBlockClass.create()


To generate block's internal object:

    obj = new aBlockClass.factory(...);

Please note that `obj` (block's internal object) is not the `block.instance` object, but an object based on how this block is defined in its script part.


### block.instance

`block.instance` is an instance of block created from a `block.class`. It's responsible for maintaining block's state and DOM status.

`block.instance` provides following APIs:

 - `constructor(opts)` with following options:
   - `block`: block definition ( `block.class` ) for this instance.
 - `attach({root})`: attach DOM of this instance to a specific node ( `root` ).
   - in the meantime, a block `obj` is created via `block.class`'s factory method and stored in `@obj` member.
 - `detach()`: detach DOM.
 - `update(ops)`: update `datadom` based on provided ops ( array of operational transformation ).

and following private members:

 - `obj` - block's data and interface. it's a list containing all objects in the inheritant chain.


### Events

(TBD) Following are the events supported by `@plotdb/block`: 

 - before insert
 - init
 - after insert
 - before destroy
 - destroy
 - after destroy
 - update


## Resources

 - Related modules
   - editable: cross-expertise editor interface based on a set of predefined attributes over plain HTML.
   - datadom: DOM in JSON, with extension.
   - registry: block module storage and delivery.


## License

MIT
