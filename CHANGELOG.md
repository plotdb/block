# Change Logs

## v1.5.1

 - bug fix: add missing `e` in exception handler in manager get function
 - bug fix: in manager, ensure object exist before storing cache data in it


## v1.5.0

 - add concept of `path` in block definition
 - add concept of `fallback` and `fetch` in block.mananger
 - use name and version from constructing instead of from module pkg metadata, so the name/version/path data is consistnent and we don't have to define 


## v1.4.9

 - fix bug: rid.hash is not defined before using.
 - fix bug: global CSS rules from base class are not applied


## v1.4.8

 - fix bug: should by-pass scope which style is not extended


## v1.4.7

 - remove useless `extend` option in `block.class` constructor.
 - add `style` in `extend` similar to `dom` but applied on style.
 - fix bug: block.class.init should also wait for extended class initialization (recursively)


## v1.4.6

 - add `id` for block.class in replace of manual composition of name and version.
 - tweak code flow and remove unnecessary check.
 - add `overwrite` value in {pkg: {extend: {dom}}} for replacing current `false` behavior.
 - add DOM transformer for i18n. transformer design is tentative and will probably be changed in the future.


## v1.4.5

 - fix bug: block should be scoped in base block's scope too.


## v1.4.4

 - add i18n support


## v1.4.3

 - fix bug: incorrect `parent` parameter in `init` function.


## v1.4.2

 - upgrade rescope version to solve scoped / global conflict issue.


## v1.4.1

 - add `block.init` for initialization ( such as rescope.init ) when needed, and init block in block.class since block.class can be used independently to block.manager.


## v1.4.0

 - support headless block.
 - support dom overwrite mode ( don't extend dom ) in block extension.
 - fix bug: interface default `{}` if not provided. 
 - add simple headless block and test case.


## v1.3.0 

 - support global css library
 - upgrade modules


## v1.2.1

 - proxisify block.class `get` to prevent multiple get and multiple scope id for the same block.


## v1.2.0

 - support css library
 - fix bug: create block class with data will fail. 

## v1.1.1

 - get context based on `_ctx` instead of lib urls so base class context can propagate.


## v1.1.0

 - make child block alters and inherits base block's dependencies.


## v1.0.0

 - use `lderror` instead of `ldError`
 - upgrade modules


## v0.0.11

 - access optional data in instance create and attach method. data is also passed to factory methods.


## v0.0.10

 - interface is now get from descendant instead of ancestor, to prevent confusion.


## v0.0.9

 - upgrade proxise and template for bug fixing and vulnerabilites resolving


## v0.0.8

 - return promise in pubsub `fire` function.
 - return promise in block.instance `run` function.
 - separate `init` from the constructor of `factory`.


## v0.0.7

 - support function defined block script.
 - support both function and object as the interface member of block script.


## v0.0.6

 - make `extend` work when defined in `pkg` field.


## v0.0.5

 - update peerDependency version of proxise


## v0.0.4

 - remove postinstall since it's for development.
