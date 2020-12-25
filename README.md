# block

spec and library for pre-defined web page building block.


## Related modules

 - editable: cross-expertise editor interface based on a set of predefined attributes over plain HTML.
 - datadom: DOM in JSON, with extension.
 - ldCaret: caret manipulate library.
 - registry: block module storage and delivery.


## Core modules

 - block.manager - interface for caching / accessing block definitions.
 - block.class - block definition for creating block instance.
 - block.instance - Object for manipulating corresponding state of DOM / Data.


## How Things Work

All blocks are defined with a `name` and `version` pair based on the block spec, where:

 - `name`: use the same syntax as npm. e.g., `@loadingio/spinner`
 - `version`: sematic versioning, tag or hash value. e.g., `0.0.1`

Every block is a definition, and is represented in `block.class` object. `block.class` object can then generate `block.instance` object which represents a live object used in webpage that is defined with the corresponding block. 

These block definitions must be kept somewhere like:

 - `local`: blocks are loaded into webpages directly via `js` or `script` in HTML.
 - `remote`:  blocks are stored as files in remote URL.

either way we have to provide a way to load, register, cache these blocks - that is, to manage them.

### block.manager

`block.manager` helps us manage blocks by providing following APIs:

 - `constructor(opts)`: create a new block.manager object before using it with opts:
   - `registry`: either function or string, tell `block.manager` where to find remote blocks.
     - `function({name,version})`: return URL for given `name` and `version` of a block.
     - `string`: block.manager will look up blocks in `<registry>/block/<name>/<version>/index.html`.
 - `setRegistry(registry)`: update `registry` dynamically. registry is the same as the one in constructor opts.
 - `add({name,version,block}): register a block with `name` and `version`.
   - `block`: a `block-class` object, explained below.
   - add also accepts Array of {name,version,block} object for batching add.
 - `getUrl({name,version})`: get corresponding url for a block with `name` and `version`.
 - `get({name,version,force})`: return a `block-class` object corresponding to a block with `name` and `version`.
   - `force`: by default, `block.manager` caches result. set `force` to true to force `block.manager` re-fetch data.
   - *TODO* we should also support batch mode in this API.

### block.class

`block.class` is a factory for generating real usecase of block. it parses the code of a block based on the block specification and convert them into clonable code, preparing for generating `block.instance` objects on demand.

`block.class` provides following APIs:

 - `constructor(opt)` with following options:
   - `name`: block name. mandatory.
   - `version`: block version. mandatory.
   - `code`: string of html code. use to create internal dom tree if provided.
   - `root`: root of a DOM tree. use to create internal dom tree if provided. Overwrite code.
 - `getDom`: simply return a clone of the DOM tree for this block.
 - `getDatadom`: get a cloned `@plotdb/datadom` representation of this block's DOM.
 - `create`: create a `block.instance` based on this object.

and following private members:

 - `dom`: block DOM tree.
 - `datadom`: `datadom` representation of `dom`. This is a JSON data instead of a `@plotdb/datadom` object.
 - `scope`: unique id randomly generated each time when `block.class` is created mainly for scoping purpose.
 - `opt`: raw constructor options.
 - `code`: source code for constructing this block.
 - `script`: source code for this block's script definition.
 - `style`: source code for this block's style definition.
 - `link`: TBD
 - `interface`: javascript interface for this block.
 - `styleNode`: node storing parsed / scoped style of this block.
 - `factory`: constructor for generating an object defined by `script` part.

To generate block's internal object:

    obj = new cls.factory(...);

please note that `obj` above is not a `block.instance` object, but an object based on how this block is defined in its script part.


### block.instance

For every instantiated block of certain `block.class` type, there will be a corresponding `block.instance` storing data / state of its block instance counterpart.

`block.instance` provides following APIs:

 - `constructor(opts)` with following options:
   - `block`: block definition ( `block.class` ) for this instance.
 - `attach({root})`: attach DOM of this instance to a specific node ( `root` ).
   - *TODO* we may need a `init` for part of what `attach` is doing currently.
   - in the meantime, a block `obj` is created via `block.class`'s factory method and stored in `@obj` member.
 - `update(ops)`: update `datadom` based on provided ops ( array of operational transformation ).
 - `getDom()`: get it's DOM tree root.
 - `getData()`: get JSON data of it's DOM tree.

and following private members:

 - `obj` - block's data and interface.
 - `datadom` - `@plotdb/datadom` object for retrieving DOM and data representation of DOM.


## License

MIT
