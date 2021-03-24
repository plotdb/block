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

script can be either an object described as below, or a function returning that object .

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
 - `setRegistry(v)`: update `registry` dynamically.
   - `v`: can be a function or string, similar to the option in constructor.
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
   - `code`: use to create DOM / style / internal object. it can be one of following:
     - a function. should return either html code or object; returned value will be parsed by corresponding rules.
     - a string, providing HTML code. structure of HTML should follow the definition of a block.
     - an object, containing `dom`, `style` and `script` members.
       - `dom`: HTML code string, or a function returning HTML code string.
       - `style`: should be string for CSS.
       - `script`: function, object or string of code, for interface of the internal object by:
         - function: return the interface.
         - object: as the interface.
         - string: evaled to the interface, or a function which return the interface.
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
   - return promise.
 - `detach()`: detach DOM. return promise.
 - `update(ops)`: update `datadom` based on provided ops ( array of operational transformation ).

and following private members:

 - `obj` - block's data and interface. it's a list containing all objects in the inheritant chain.


### Interface of the internal object

`block.instance` is just a generic object for managing block life cycle. Every block has another object, serves as the internal object that provides real dynamics of the block. This object is created along with `block.instance`, and it's interface is implemented by developers based on following interface:

 - `pkg`: block information, described below.
 - `init({root, mode, context, parent, pubsub})`: initializing a block.
   - `root`: root element
   - `mode`: executing mode. ( edit, view, etc )
   - `context`: dependencies in an object.
   - `pubsub`: for communication between block in extend chain. `pubsub` is an object with following methods:
      - `on(event, cb(parmas))`: handle event with `cb` callback, params from `fire`.
        - return value will be passed and resolved to the returned promise of `fire`.
      - `fire(event, params): fire `event`. return promise.
 - `destroy({root, context})`: destroying a block.
 - `interface`: for accessing custom object. TBD
    - either a function returning interface object, or the interface object itself.


#### Block Information

The `pkg` field of a block interface is defined as:

 - `author`: author name. optional
 - `name`: block name. Follow NPM package naming convention. required.
 - `version`: Semver string. required.
 - `license`: License. required
 - `description`: description of this block. optional
 - `extend`: optional. block identifier ( `name@version` or `{name, version}` ) of block to extend.
   - use `plug` ( for html ), `obj` and `pubsub` ( js ) to work with extended block. ( TODO: documentation )
 - `dependencies`: dependencies of this block.
   - list or modules, in case of mutual dependencies:
     ["some-url", {url: "some-url", async: false, dev: true}]
   - options in object notation:
     - async: true to load this module asynchronously. true by default.
     - url: path of required module.
       - generated from name + version if omitted. ( TODO )
     - name: name of required module ( TODO )
     - version: version of required module ( TODO )
     - mode: use to control when this module should be loaded. ( TODO )


#### Block Events

(TBD) Following are possible events:

 - before insert
 - init
 - after insert
 - before destroy
 - destroy
 - after destroy
 - update


## Why block

At first we just want to make web editing easier across expertise, and *block design* ( see [future of web design comes in blocks](https://thecode.co/block-web-design/), [Editor.js](https://editorjs.io/) ) seems to be a trend in web design. It's similar to web components but we will have to do more for making visually editing possible.

While what `@plotdb/block` ( web component & management ) provides is already available in other popular frameworks, `@plotdb/block` is actually designed with following criteria thus makes it different with others:

 * version management
   - blocks are managed with proper versioning.
   - blocks should work even using the same lib with different versions without `import`. 
     - popular frameworks use `import` which will have to bundle js within.
     - even if bundle is not necessary, many libs don't support `import` and will need wrapper.
 * framework agnostic
   - prevent from abducted by specific framework
   - while we seem to invent `yet another framework`:
     - `@plotdb/block` is only for components. no state management, no reactive.
     - thus, any js frameworks are expected to work well with `@plotdb/block`.
 * As Simple as Possible
   - making a component is extremely easy. ( KISS principle )
     - there is no new syntax to learn in `@plotdb/block`, only interface.
 * Collaborative
   - `@plotdb/block` is built along with `@plotdb/datadom` for DOM serialization.
     - this makes it by default suitable for serialization, thus also for collaboration
     - editing can be described by concepts such as operational transformation
 * DOM manipulating with UI ( cross expertise editing )
   - this is covered in `@plotdb/editable`.


## Resources

 - Related modules
   - editable: cross-expertise editor interface based on a set of predefined attributes over plain HTML.
   - datadom: DOM in JSON, with extension.
   - registry: block module storage and delivery.


## License

MIT
