block.manager.prototype.bundle = (opt = {}) ->
  mgr = opt.manager or @
  hash = {}
  _ = (list, blocks = [], deps = {js: [], css: [], block: []}) ->
    if !list.length => return Promise.resolve {blocks, deps}
    # we are going to modify it, so clone it.
    bd = JSON.parse(JSON.stringify(list.splice 0, 1 .0))
    # prevent duplicate key (`<path>` vs `<path>/index.html`) confusion.
    bd.path = (bd.path or '').replace(/\/(index\.html)?$/,'')
    id = block.id bd
    if hash[id] => return Promise.resolve!then -> _ list, blocks, deps
    _fetch mgr.get-url(bd), {method: \GET}
      .then ->
        deps.block.push bd
        node = doc.createElement \div
        node.innerHTML = (it or '').trim!
        if node.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
        # we keep style tag in html so path transformation in css works
        # TODO any better solution for this? see also `prebundle css` comment below.
        css = ""
        #[js,css] = <[script style]>.map (n)->
        [js] = <[script]>.map (n)->
          Array.from(node.querySelectorAll n)
            .map -> it.parentNode.removeChild(it); it.textContent
            .join \\n
        node.childNodes.0.setAttribute \block, id
        ret = eval("(function(module){#{js or ''};return module.exports;})({})")
        if ret instanceof Function => ret = ret!
        if !ret => ret = {}
        ret.{}pkg
        ret.pkg.[]dependencies
        if ret.pkg.extend =>
          if !ret.pkg.extend.name => ret.pkg.extend <<< bd{ns, name, version}
          list.push ret.pkg.extend
        ret.pkg.dependencies.map (d) ->
          if !d.name => d <<< bd{ns, name, version}
          if d.type => return
          if /\.js$/.exec(d.url or d.path or d) => d.type = \js
          else if /\.css$/.exec(d.url or d.path or d) => d.type = \css
          else d.type = \js # default js type
        # bundler in rescope / csscope will remove duplicates for us.
        deps.js ++= (ret.pkg.dependencies or []).filter -> it.type == \js or /\.js/.exec((it.path or it or ''))
        deps.css ++= (ret.pkg.dependencies or []).filter -> it.type == \css or /\.css/.exec((it.path or it or ''))
        # we expect js to be sth like function body, so we should wrap it with a function.
        js = "((function(module){#{js or ''};return module.exports;})({}))"
        blocks.push b = {js, css, html: node.innerHTML, bd, id}
        list ++= (ret.pkg.dependencies or []).filter -> it.type == \block or /\.html/.exec(it.path or it or '')
        hash[id] = b
        return _ list, blocks, deps
  _ opt.[]blocks.map((b)->b)
    .then ({blocks, deps}) ->
      Promise.all [
        mgr.csscope.bundle(deps.css),
        mgr.rescope.bundle(deps.js)
      ]
        .then ([depcss, depjs-cache]) ->
          js = blocks.map (b) -> "\"#{b.id}\":#{b.js or '""'}"
          js = "document.currentScript.import({#{js.join(',')}});"
          # we fill csscope cache with empty content but proper id and scope
          # so it won't do anything except recognizing this.
          # the real CSS will be loaded directly from the `style` tag.
          depcss-cache = deps.css
            .map (o) ->
              # dup it to prevent pollute internal data
              o = {} <<< o <<< {inited: true, scope: csscope.scope(o)}
              # since code is in style tag, explicitly delete it here
              # to prevent redundant bundling
              delete o.code
              "csscope.cache(#{JSON.stringify(o)})"
            .join(';')
          # TODO prebundle block css into style may lead to path transformation issue.
          # thus, we don't do it now.
          css = ""
          #css = blocks
          #  .map (b) ->
          #    scope = csscope.scope b
          #    csscope {rule: "*[scope~=#{scope}]", name: scope, css: (b.css or ''), scope-test: "[scope]"}
          #  .join ''
          html = blocks.map(-> it.html or '').join('')
          code = [
            '<template rel="block">'
            html
            """<style type="text/css">#css#depcss</style>"""
            """<script type="text/javascript">#js#depjs-cache;#depcss-cache</script>"""
            \</template>
          ].join('')
          return {code, deps}
