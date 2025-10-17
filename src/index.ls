var win, doc

err = (o="", id=404) -> Promise.reject(new Error(o) <<< {name: \lderror, id, message: o})

_fetch = (u, c) ->
  if block.__node and fs? and !/^https?:/.exec(u) =>
    return new Promise (res, rej) ->
      (e, s) <- fs.stat u, _
      if e => return rej e
      n = if s.is-directory! => "#u/index.html"
      else u
      (e, b) <- fs.read-file n, _
      if e => return rej e
      return res b.toString!
  (ret) <- fetch u, c .then _
  if ret and ret.ok => return ret.text!
  if !ret => return err!
  ret.clone!text!then (t) ->
    i = ret.status or 404
    # we have to access error, but `err` above returns a promise. thus we create it manually.
    # the old, incorrect code which generate a hidden, uncaught rejection: `e = err("#i #t", i)`
    m = "#i #t"
    e = new Error(m) <<< {name: \lderror, id: i, message: m}
    try
      if (j = JSON.parse(t)) and j.name == \lderror => e <<< j <<< {json: j}
    catch _e
    return Promise.reject e

rid = ->
  while true
    id = "b-#{Math.random!toString(36).substring(2)}"
    if !rid.hash[id] => break
  rid.hash[id] = true
  return id
rid.hash = {}

# We don't sanitize input for now, since we have to trust blocks.
# Following code is for reference.
#sanitize-real = (code) ->
#  DOMPurify.sanitize( (code or ''), { ADD_TAGS: <[script style plug]>, ADD_ATTR: <[ld ld-each block plug]> })
sanitize = (code) -> (code or '')

# actually this is more like an event bus instead of pubsub.
# we may consider it as a hybrid module by extending it with `pub` and `sub` api for nonblocking publishing.
# furthermore we may want to implement methods such as `parent` or `child` for oriental messaging.
# however this is impossible unless we add additional information in subscriber cb and name.
pubsub = ->
  @subs = {}
  @

pubsub.prototype = Object.create(Object.prototype) <<< do
  fire: (n, ...args) -> Promise.all(@subs[][n].map -> it.apply null, args)
  on: (n, cb) -> (if Array.isArray(n) => n else [n]).map (n) ~> @subs[][n].push cb
  /* # sample code for nonblocking message publishing
  pub: (name, ...args) ->
    ps = @subs[][name].map ->
      (res, rej) <- new Promise _
      Promise.resolve!
        .then -> it.apply null, args
        .then -> res!
        .catch -> rej it
    Promise.all ps
  */


block = {}
block.id = (o) ->
  if typeof(o) == \string => return o
  path = o.path or if o.type == \js => \index.min.js else if o.type == \css => \index.min.css else \index.html
  o.id or o.url or "#{if o.ns => "#{o.ns}:" else ''}#{o.name}@#{o.version or 'main'}:#path"
block.id2obj = (k) ->
  k = k.split(':')
  if k.length <= 2 => [nv,path,ns] = k else [ns,nv,path] = k
  if !(ret = /^(@?[^@]+)(?:@([^:]+))?$/.exec(nv)) => return null
  return {ns, name: ret.1, version: ret.2, path}
block.env = ->
  [win, doc] := [it, it.document]
  if rescope.env => rescope.env win
  if rescope.env => csscope.env win
block.i18n =
  module:
    lng: \en
    t: (v,o) ->
      vs = if Array.isArray(v) => v else [v]
      lng = @lng
      for i from 0 til vs.length =>
        if !((t = vs[i])?) => continue
        j = t.indexOf(\:)
        ns = t.substring(0,j)
        t = t.substring(j + 1)
        _t = t.split('.')
        u = @res{}[lng]{}[ns]
        for j from 0 til _t.length => if !u => break else u = u[_t[j]]
        if u => return that
      return t or v[* - 1]
    change-language: -> @_fire \languageChanged, @lng = it or \en
    add-resource-bundle: (lng, ns, res, deep, overwrite) -> @res{}[lng][ns] = res
    _evthdr: {}
    on: (n, cb) -> (if Array.isArray(n) => n else [n]).map (n) ~> @_evthdr.[][n].push cb
    off: (n, cb) -> (if Array.isArray(n) => n else [n]).map (n) ~>
      if ~(idx = @_evthdr.[][n].indexOf(cb)) => @_evthdr[n].splice idx, 1
    # internal function
    _fire: (n, ...v) -> for cb in (@_evthdr[n] or []) => cb.apply @, v
    res: {}
  use: -> @module = it
  # TODO deep and overwrite is default false in i18next. we will want to align this with them.
  add-resource-bundle: (lng, id, resource, deep = true, overwrite = true) ->
    block.i18n.module.add-resource-bundle lng, id, resource, deep, overwrite
  change-language: -> block.i18n.module.change-language it
Object.defineProperty block.i18n, \language, do
  get: -> block.i18n.module.lng or block.i18n.module.language
# since we may still use fallback module and it store language in `lng`, this is still required
Object.defineProperty block.i18n.module, \language, do
  get: -> block.i18n.module.lng

block.global =
  csscope:
    hash: {}
    apply: (ret) ->
      ret = ret
        .filter ~> !@hash[it.id or it.url]
        .map ~> @hash[it.id or it.url] = it.scope
      if ret.length => doc.body.classList.add.apply doc.body.classList, ret

block.init = proxise.once ~> if block._rescope => block._rescope.init!
block.rescope = ->
  if !block._rescope => block._rescope = new rescope global: if win? => win else global
  block._rescope
block.csscope = ->
  if !block._csscope => block._csscope = new csscope.manager!
  block._csscope
block.manager = (opt={}) ->
  @hash = {}
  @proxy = {}
  @running = {}
  # mapping from a version range to an actual version
  # use _ver.map to align design with `rescope` and `csscope`
  @_ver = {map: {}}
  @_chain = opt.chain or null
  @init = proxise.once ~> @_init!
  @rescope = if opt.rescope instanceof rescope => opt.rescope else block.rescope!
  @csscope = if opt.csscope instanceof csscope => opt.csscope else block.csscope!
  if opt.registry => @registry opt.registry
  @init!
  @

block.manager.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    if @rescope == block.rescope! => block.init!
    else @rescope.init!
  id: block.id
  id2obj: block.id2obj
  chain: (c, o) -> if !@_chain or (o and o.replace) => @_chain = c else @_chain.chain c
  registry: (r) ->
    if typeof(r) in <[string function]> or r.url or r.fetch => r = {lib: r, block: r}
    if r.lib? =>
      if @rescope == block.rescope! => @rescope = new rescope {global: win}
      if @csscope == block.csscope! => @csscope = new csscope.manager!
      @rescope.registry r.lib
      @csscope.registry r.lib
    if r.block? =>
      @_reg = r.block or ''
      if typeof(@_reg) == \string and @_reg and @_reg[* - 1] != \/ => @_reg += \/
  set: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(opts.map (obj) ~>
      {ns, name, version, path} = obj
      if !ns => ns = ''
      b = if obj instanceof block.class => obj else obj.block
      @hash{}[ns]{}[name]{}[version][path or 'index.html'] = b
    )

  _get-url: ({url,name,version,path,type}) ->
    if url => return url
    path = if path => path
    else if type == \block => \index.html
    else if type == \js => \index.min.js
    else \index.min.css
    return "#{@_reg or ''}/assets/block/#{name}/#{version or 'main'}/#path"

  get-url: (o) ->
    if !o.type => o.type = \block
    if typeof(r = @_reg.url or @_reg) == \function => r o
    else @_get-url o

  _ref: (o) ->
    if typeof(r = @_reg.url or @_reg) == \function => o = {} <<< o <<< {url: r o}
    return if @_reg.fetch => @_reg.fetch(o) else o.url

  fetch: (o) ->
    o <<< {type: \block}
    r = @_ref o
    return if !r => err o
    else if r.then => r
    else _fetch r, {method: \GET} .then -> {content: it}

  _get: (opt) ->
    [ns, n, v, p] = [opt.ns or '', opt.name, opt.version or \main, opt.path or 'index.html']
    obj = {ns: ns, name: n, version: v, path: p, ctx: opt.ctx}
    if !(n and v) => return err("",1015)
    # unify path as key to prevent from duplicate key confusion. see `get`.
    p = p.replace /\/(index\.html)?$/, ''
    @hash{}[ns]{}[n]
    if /[^0-9.]/.exec(v) and !opt.force =>
      if @_ver.map{}[ns][n] and @_ver.map[ns][n][v] => if @hash[ns][n]{}[@_ver.map[ns][n][v]][p] => return that
      for ver, c of @hash{}[ns][n] =>
        if !semver.fit ver, v => continue
        return Promise.resolve(c[p])
    if @hash[ns][n]{}[v][p]? and !opt.force => return Promise.resolve(@hash[ns][n][v][p])
    if @running{}[ns]{}[n]{}[v][p] == true => return
    @running[ns][n][v][p] = true
    @fetch opt{ns, name, version, path}
      .then ~>
        if !it => return e404 obj
        if it.version =>
          if obj.version != it.version => @_ver.map[ns]{}[n][obj.version] = it.version
          obj.version = it.version
        return it.content or it
      .catch (e) ~>
        if !@_chain => return Promise.reject(e)
        @_chain.get opt
      .then (ret = {}) ~>
        b = new block.class(obj <<< {code: ret, manager: @})
        @set(obj <<< {block: b})
        b
      .then ~>
        @proxy[ns][n][v][p].resolve it
        return it
      .finally ~> @running[ns][n][v][p] = false
      .catch (e) ~>
        @proxy[ns][n][v][p].reject e
        return Promise.reject e

  from: (o, p) ->
    @get o .then (b) -> b.create!then (i) ->
      i.attach p
        .then -> i.interface!
        .then -> {instance: i, interface: it}

  get: (opt = {}) ->
    opts = if Array.isArray(opt) => opt else [opt]
    Promise.all(
      opts.map (opt = {}) ~>
        if typeof(opt) == \string => opt = block.id2obj opt
        [ns, n, v, p] = [opt.ns or '', opt.name, opt.version or \main, opt.path or 'index.html']
        # in most cases, `<path>/index.html` = `<path>`, which cause confusion.
        # unify path as key to prevent from this.
        p = p.replace /\/(index\.html)?$/, ''
        if !@proxy{}[ns]{}[n]{}[v][p] => @proxy[ns][n][v][p] = proxise (opt) ~> @_get(opt)
        @proxy[ns][n][v][p] opt
    ).then -> if Array.isArray(opt) => return it else return it.0

  debundle: (o = {}) ->
    o = if Array.isArray(o) => o else [o]
    ps = o.map (opt) ~>
      <~ Promise.resolve!then _
      mgr = opt.manager or @
      lc = {}
      if !opt.root =>
        p = if opt.url => _fetch opt.url, {method: \GET}
        else Promise.resolve(opt.code or '')
        p = p.then (c) ->
          if !block.debundle-node => doc.body.appendChild block.debundle-node = doc.createElement \div
          block.debundle-node.style.display = \none
          block.debundle-node.appendChild(div = doc.createElement \div)
          div.innerHTML = c
          div.querySelector('template')
      else p = Promise.resolve( if typeof(opt.root) == \string => doc.querySelector(opt.root) else opt.root )
      p.then (root) ->
        if !root => return
        if root.content => root = root.content
        [nodes, classes] = [{}, {}]
        Array.from(root.childNodes).map (n) ~>
          if n.nodeType != doc.ELEMENT_NODE => return
          if n.nodeName == \SCRIPT => lc.script = n.cloneNode true
          else if n.nodeName == \STYLE => lc.style = n.cloneNode true
          else if !(id = n.getAttribute(\block)) => return
          else nodes[id] = n
        if lc.script =>
          # needed if lc.script is loaded from fetch + innerHTML
          s = doc.createElement \script
          s.textContent = lc.script.textContent
          lc.script = s
          lc.script.import = ~> lc.codes = if typeof(it) == \function => it! else it
          lc.script.setAttribute \type, \text/javascript
          doc.body.appendChild lc.script
        if lc.style =>
          # TODO we may need path translation here
          lc.style.setAttribute \type, \text/css
          doc.body.appendChild lc.style
        for k,node of nodes =>
          {ns, name, version, path} = block.id2obj(k)
          bc = new block.class {
            manager: mgr, ns: ns, name: name, version: version, path: path,
            code: script: lc.codes[k], dom: node, style: ""
          }
          mgr.set bc
    Promise.all ps

block.class = (opt={}) ->
  @opt = opt
  @scope = opt.scope or null # will be regen in `init` if null
  @_ctx = {} # libraries context. may inherited from extended base class.
  @csscopes = {global: [], local: []} # css libraries. may be either global or local.
  # manager is used for recursively get extended block.
  @ <<< opt{ns, name, version, path, manager}
  if !opt.ns => opt.ns = ''
  if !@manager => console.warn "manager is mandatory when constructing block.class"
  code = opt.code

  if opt.root =>
    node = if typeof(opt.root) == \string => doc.querySelector(opt.root) else opt.root
  else
    if typeof(code) == \function => code = code!
    if typeof(code) == \string =>
      code = sanitize code
      div = doc.createElement("div")
      # in case of unwanted space which creates more than 1 child.
      div.innerHTML = (code or '').trim!
      @_templates = Array.from(div.querySelectorAll 'template[rel=block]').map (n) ->
        n.parentNode.removeChild(n) # n is returned
      if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
    else if typeof(code) == \object =>
      @script = code.script # can be either a string, object or function
      @style = code.style # should be string or CSSRuleList(todo)
      # TODO redundant code? remove above/this?
      @ <<< code{style, script}
      dom = if code.dom instanceof Function => code.dom! else code.dom
      if dom instanceof win.Element => node = dom
      else
        code = sanitize dom
        div = doc.createElement("div")
        div.innerHTML = code
        if div.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
  # TODO @script may involve `eval` below in `init`; to optimize, we may prebundle this directly as JS.
  # remove functional elements before sending them into datadom.
  # div but not node: we will get node later so get all func elements via div first.
  <[script style link]>.map (n) ~>
    v = Array.from((node or div).querySelectorAll(n))
      .map ~> it.parentNode.removeChild(it); it.textContent
      .join \\n
    # TODO we have joined contents from all tags here,
    # however we may still have data provided directly through constructor?
    # should concat with them?
    # @[n] = (@[n] or '') + (if v? and v => v else '')
    @[n] = if v? and v => v else (@[n] or "")
  if !node and div =>
    for i from 0 til div.childNodes.length =>
      if (node = div.childNodes[i]).nodeType == win.Element.ELEMENT_NODE => break
  if !node => node = doc.createElement(\div)
  if node.nodeType != win.Element.ELEMENT_NODE =>
    console.warn "root of DOM definition of a block should be an Element"
  @node = node

  # we dont init until create is called, because we may not use it even if it's loaded.
  @init = proxise.once ~> @_init!
  @

# use document fragment ( yet datadom doesn't work with #document-fragment )
# @frag = document.createRange!.createContextualFragment(code)
# domtree = @frag.cloneNode(true)

block.class.prototype = Object.create(Object.prototype) <<< do
  _init: ->
    block.init!
      .then ~>
        if !@_templates => return
        Promise.all @_templates.map(~> @manager.debundle root: it)
      .then ~>
        # TODO see constructor above about @script
        # This involves eval which compile separatedly, may induce inefficiency.
        # eventaully we will want this to be interpreted directly by browser in batch.
        @interface = (if @script instanceof Function => @script!
        else if typeof(@script) == \object => @script
        else if (v = eval("(function(module){#{@script or ''};return module.exports;})({})")) instanceof Function => v!
        else (v or {}))
        if !@interface => @interface = {}
        @interface.{}pkg
        if !@ns => @ns = @interface.pkg.ns
        if !@name => @name = @interface.pkg.name
        if !@version => @version = @interface.pkg.version
        if !@path => @path = @interface.pkg.path
        @id = block.id {ns: @ns, name: (@name or rid!), version: @version or rid!, path: @path}
        # ID for translation : i18next treat `:` as separator for id, so we escape it
        @_id_t = @id.replace /:/g, '='
        # TODO better scope format?
        # use csscope for a stable scope name ( base64 ). scope may be pre-given, set in constructor.
        if !@scope => @scope = csscope.scope(@)

        # only create style-node if we have style.
        # this is useful when we use bundler with pre-scoped css.
        # TODO we may need an additional flag for explicitly telling block to whether do scoping or not.
        if @style =>
          doc.body.appendChild(@style-node = doc.createElement("style"))
          @style-node.setAttribute \type, 'text/css'
          # TODO @style takes 2nd parse here. we should support rule passing mechanism
          ret = csscope {
            rule: "*[scope~=#{@scope}]", name: @scope, css: @style, scope-test: "[scope]"
          }
          # translate local url to registry url.
          # TODO this always runs, which may no be necessary.
          # should we add some mechanism to make this optional? (e.g., with `path` attribute)
          # also, this may have potential issues if registry changes after initialized
          ret = ret.replace /url\("?(?!data:)([^()"]+)"?\)/g, "url(#{@_path('')}$1)"
          @style-node.textContent = ret

        @factory = (i) ->
          # this can be used to determine if it's for a base block.
          # consider to add an API such as `isBase: -> !!@_instance`
          @_instance = i
          @
        @factory.prototype = Object.create(Object.prototype) <<< {
          init: (->), destroy: (->), _class: @
          # default interface which get interface from parent.
          interface: ->
            if !@parent => return
            if @parent.interface instanceof Function => @parent.interface! else @parent.interface
        } <<< @interface
      .then ~>
        @accepted-hosts = if @interface.pkg.host => that else []
        @extends = []
        if !(ext = @interface.pkg.extend) => return
        if !@manager => return new Error("no available manager to get extended block")
        if !(ext.name or ext.url) => ext <<< @{ns, name, version}
        if @opt.ctx => ext = {} <<< ext <<< {ctx: @opt.ctx}
        @manager.get ext
          .then ~>
            @extend = it
            # circular extend detection
            try
              @extend._usedby @
            catch e
              @extend = null
              throw e
            @extend-dom = !(ext.dom?) or ext.dom
            @extend-style = !(ext.style?) or ext.style
            @extend.init!
          .then ~>
            @extends = [@extend] ++ @extend.extends
      .then ~>
        i18n = @interface.pkg.i18n or {}
        for lng, res of i18n =>
          block.i18n.module.add-resource-bundle lng, @_id_t, res, true, true
      .then ~>
        @dependencies = if Array.isArray(@interface.pkg.dependencies) => @interface.pkg.dependencies
        else [v for k,v of (@interface.pkg.dependencies or {})]
        @dependencies.map (d) ~>
          if !(d.name or d.url) => d <<< @{ns, name, version}
          if d.type => return
          if /\.js$/.exec(d.url or d.path or d) => d.type = \js
          else if /\.css$/.exec(d.url or d.path or d) => d.type = \css
          else d.type = \js # default js type
        if @extend => @_ctx = @extend.context!
        else if @opt.ctx => @_ctx = @opt.ctx
        else if rescope.dual-context => @_ctx = rescope.dual-context!
        # no dual-context in rescope <= 4.0.1. just a backlog, can be removed in future update.
        else if rescope.proxin => @_ctx = new rescope.proxin!
        @manager.rescope.load @dependencies.filter(-> !it.type or it.type == \js), @_ctx
      .then ~>
        @manager.csscope.load(
          @dependencies.filter -> it.type == \css and it.global == true
        )
      .then ~>
        @csscopes.global = (it or [])
        @manager.csscope.load(
          @dependencies.filter -> it.type == \css and it.global != true
        )
      .then ~>
        @csscopes.local = (it or [])
        if !@extend => return
        @csscopes.global ++= (@extend.csscopes.global or [])
        if @extend-style == true => @csscopes.local ++= (@extend.csscopes.local or [])
        else if @extend-dom == \overwrite => @csscopes.local ++= (@extend.csscopes.local).slice(1)
      .catch (e) ~>
        console.error "[@plotdb/block] init #{block.id @}", e
        @ <<< interface: {}, style-node: {}, factory: (-> @), dependencies: []

  # for circular extend detection
  _usedby: (b) ->
    if @ == b => throw new Error("circular extend")
    @[]_users.push b
    _ = (l = []) ~>
      if @ in l => throw new Error("circular extend")
      for o in l => _ o._users
    _ b._users

  context: -> @_ctx # get library context

  dom: -> @node

  _path: (p = '') ->
    _ = @manager.get-url(@{ns, name, version, path}) or ''
    _.replace(/\/[^/]*$/, '/') + p

  i18n: (t, o) ->
    id = @_id_t
    # we don't want colon in input mess up with our namespace
    # so we escape them with U+F8FF, last glyph in PUA A since it should rarely be used
    # alternatively we can consider using U+A789 (꞉) in input text
    t = t.replace /:/g, '\uf8ff'
    r = block.i18n.module.t( ["#id:#t"] ++ (@extends.map -> "#{it._id_t}:#t") ++ ["#t"], o )
    (r or '').replace /\uf8ff/g, \:

  create: (o={}) ->
    # defer init in create since we may not use this block even if we load it.
    <~ @init!then _
    r = new block.instance {
      block: @, data: o.data, host: o.host
      ns: @ns, name: @name, path: @path, version: @version
    }
    r.init!
      .then ->
        if !o.root => return
        r.attach {
          root: o.root
          before: o.before
          host: o.host
          auto-transform: o.auto-transform or null
        }
      .then -> r

  # child: either
  #  - dom tree of child.
  #  - dom tree of container ( for interpolation )
  resolve-plug-and-clone-node: (child, by-pass = false) ->
    if !by-pass =>
      node = @dom!cloneNode true
      # list all plugs used in sample dom, and replace them with child [plug].
      Array.from(node.querySelectorAll('plug')).for-each (p) ->
        name = p.getAttribute(\name)
        # child content may contain elements for `plug` - replace parent plug with child, if any found.
        if !child => return
        # we skip nested plugs so recursive plug applying is possible.
        n = child.querySelector(":scope :not([plug]) [plug=#{name}], :scope > [plug=#{name}]")
        if n => p.replaceWith n
      # scan again for plugs not replaced - we convert those plugs to div with fallback DOM tree
      Array.from(node.querySelectorAll('plug')).for-each (p) ->
        name = p.getAttribute(\name)
        p.removeAttribute(\name)
        p.setAttribute \plug, name
        n = document.createElement \div
        for attr in p.attributes => n.setAttribute attr.name, attr.value
        while p.firstChild => n.appendChild p.firstChild
        p.replaceWith n
    else node = child
    return if @extend and @extend-dom != false =>
      if @extend-dom == \overwrite => @extend.resolve-plug-and-clone-node(node, true)
      else @extend.resolve-plug-and-clone-node(node)
    else node

block.instance = (opt = {}) ->
  @ <<< opt{ns, name, version, path, block, data}
  @init = proxise.once ~> @_init!
  @

block.instance.prototype = Object.create(Object.prototype) <<< do
  _init: -> @block.init!
  attach: (opt = {}) ->
    if (_o = @_defered) =>
      if _o.before => _o.root.insertBefore _o.node, _o.before
      else _o.root.appendChild _o.node
      return Promise.resolve!
    if opt.data => @data = opt.data
    @host = (if Array.isArray(opt.host) => opt.host else [opt.host]).filter(->it)
    if opt.i18n =>
      @_i18n-module = opt.i18n
      list = [@block] ++ (@block.extends)
      for i from list.length - 1 to 0 by -1
        b = list[i]
        i18n = b.interface.pkg.i18n or {}
        for lng, res of i18n =>
          @_i18n-module.add-resource-bundle lng, b._id_t, res, true, true
    else @_i18n-module = block.i18n.module

    root = opt.root
    root = if !root => null else if typeof(root) == \string => doc.querySelector(root) else root
    block.global.csscope.apply @block.csscopes.global
    if !root => node = null
    else
      node = @dom opt.root
      exts = [@block] ++ @block.extends
      s = [@block.scope]
      for i from 0 til exts.length - 1 =>
        es = exts[i].extend-style
        if es == \overwrite => continue
        else if es == false => break
        s.push exts[i + 1].scope
      node.setAttribute \scope, s.join(' ')
      node.classList.add.apply(
        node.classList,
        @block.csscopes.local.map(->it.scope) ++ @block.csscopes.global.map(->it.scope)
      )
      if !opt.defer =>
        if opt.before => root.insertBefore node, opt.before
        else root.appendChild node
      else @_defered = {node, root, before: opt.before}
    if opt.auto-transform == \i18n =>
      @_i18n-module.on \languageChanged, @_i18n-transform = ~> @transform \i18n
    @run({node, type: \init})
  detach: ->
    node = @dom!
    node.parentNode.removeChild node
    if @_i18n-transform =>
      @_i18n-module.off \languageChanged, @_i18n-transform
      @_i18n-transform = null
    @run({node, type: \destroy})

  interface: -> @obj[* - 1].interface!

  # TBD
  # update: (ops) -> @datadom.update ops

  _transform: (node, tag, func) ->
    regex = new RegExp("^#{tag}-(.+)$")
    _ = (n) ~>
      if n.nodeType == win.Element.TEXT_NODE =>
        n.parentNode.setAttribute tag, n.textContent
        n.parentNode.replaceChild doc.createTextNode(func(n.textContent)), n
      else
        for i from 0 til n.attributes.length =>
          {name,value} = n.attributes[i]
          if !(ret = regex.exec(name)) => continue
          n.setAttribute ret.1, func(value or '')
        if (v = n.getAttribute(tag)) => return n.textContent = func v
        for i from 0 til n.childNodes.length => _ n.childNodes[i]
    # querySelectorAll also selects nodes under child blocks.
    # with poor transforming order, parent block may overwrite child blocks' result with incorrect values.
    ## Array.from(node.querySelectorAll "[#tag]")
    # thus we make a 2 phase query:
    #  1. log scoped nodes to (A)
    #  2. query all nodes that are not in (A)
    wk = new WeakMap!
    Array.from(node.querySelectorAll ":scope [scope] [#tag]").map (n) -> wk.set n, 1
    Array.from(node.querySelectorAll "[#tag]")
      .filter (n) -> !(wk.get n)
      .map (n) ~> _ n
    return node

  # TODO this is a simplified interface for doing DOM transformation.
  # it's expected to be publicly accessible for end users to apply expected transformation
  # so we are going to have a plugin / transformation mechanism underneath in the future;
  # for now we just accept a single parameter which is the name, and only accept `i18n` / `path` as its name.
  transform: (n) ->
    if !(n in <[i18n path]>) => return
    @_transform @node, \t, (~> @i18n it)
    @_transform @node, \path, (~> @_path it)

  dom: (child) ->
    if @node => return that
    @node = @block.resolve-plug-and-clone-node child
    @transform \i18n
    @transform \path

  _path: -> @block._path it

  _gethost: ({host, accept}) ->
    accepts = (if Array.isArray(accept) => accept else [accept]).filter(->it)
    if !accepts.length => return host
    ret = accepts.map (a) ->
      (host or []).filter((h) -> (if h.bid => block.id2obj h.bid else h).name == a.name).0
    return if Array.isArray(accept) => ret else ret.0 or {interface:->}

  i18n: (v, o) ->
    if !@_i18n-module => return @block.i18n v, o
    id = @block._id_t
    # see class.i18n for more information about this colon replace thing.
    t = v.replace /:/g, '\uf8ff'
    r = @_i18n-module.t( ["#id:#t"] ++ (@block.extends.map -> "#{it._id_t}:#t") ++ ["#t"], o )
    (r or '').replace /\uf8ff/g, \:

  # run factory methods, recursively.
  # we will need a bus for communication.
  run: ({node, type}) ->
    cs = []
    ps = []
    c = @block
    if !@obj => @obj = []
    if !@pubsub => @pubsub = new pubsub!
    # this is kinda confusing. it's actually a customized i18n object inside @plotdb/block
    # so kinda not standard one. we may want to use a standard i18n object for consistency
    # however we may also want to provide a subset of i18n object
    # when user doesn't use i18next or compatible module, so this may still be needed.
    # anyway it should be good to remove these extended api (getLanguage and addResourceBundles)
    i18n-obj =
      t: (v, o) ~> @i18n(v, o)
      on: (n,cb) ~> @_i18n-module.on n, cb
      # not standard api. keep it for now for backward compatibility
      get-language: ~> @_i18n-module.language
      add-resource-bundles: (resources = {}) ~>
        for lng, res of resources =>
          @_i18n-module.add-resource-bundle lng, @block._id_t, res, true, true
    Object.defineProperty i18n-obj, \language, {get: ~>@_i18n-module.language}
    while c =>
      cs = [c] ++ cs
      c = c.extend
    new Promise (res, rej) ~>
      _ = (list = [], idx = 0, gtx = {}, parent, sync) ~>
        if list.length <= idx =>
          p = Promise.all(ps)
            .then -> res it
            .catch -> rej it
          return p
        b = list[idx]
        # if we don't want dependencies from base class, use b.dependencies:
        #   @block.manager.rescope.context (b.dependencies or []).filter(->it.type != \css), (ctx) ~>
        # this is exactly the same with ctx = b._ctx.{}local with rescope < v3, see below
        # we are migrating to v4 so keep it here before we verify its correctness
        ## @block.manager.rescope.context b._ctx.{}local, (ctx) ~>
        ((ctx) ~>
          gtx <<< ctx
          payload = {
            root: node, parent: parent, manager: @block.manager
            ctx: gtx, context: gtx,
            pubsub: @pubsub
            i18n: i18n-obj
            t: (v, o) ~> @i18n(v, o)
            path: ~> @_path(it)
            data: @data
            host: @_gethost {host: @host, accept: b.accepted-hosts}
          }
          if type == \init =>
            @obj.push(
              o = new b.factory(
                # we don't create instance for base blocks.
                # actually we may only need one instance.
                # however, instance stores information about class,
                # which may be confusing if we store it in parent js context object.
                # thus we only pass it into factory if it's the corresponding factory
                if @block == b => @ else null
              )
            )
            o.parent = @obj[idx - 1]

          if (o = @obj[idx]) => ps.push(_p = o[type](payload))
          sync = sync or b.interface.pkg.syncInit
          if !(sync and _p) => _ list, idx + 1, gtx, o, sync
          else Promise.resolve(_p).then ~> _ list, idx + 1, gtx, o, sync
        ) if b._ctx.ctx => b._ctx.ctx! else b._ctx.{}local # use `{}local` for rescope < v4
      _ cs, 0, {}

    ## original, no inheritance structure
    #block.rescope.context @block.dependencies.filter(->it.type != \css), (context) ~>
    #  @obj = new @block.factory {root: node, context}
