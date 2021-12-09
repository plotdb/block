(function(it){
  return it.apply({});
})(function(){
  var ref$, win, doc, tmp, node, mgr, testload;
  ref$ = [window, window.document], win = ref$[0], doc = ref$[1];
  tmp = ld$.find('template', 0);
  node = tmp.content;
  /*
  fold =
    bundle: (opt = {}) ->
      mgr = opt.manager or @ 
      _ = (list, blocks = [], deps = {js: [], css: []}) ->
        if !list.length => return Promise.resolve {blocks, deps}
        bd = list.splice 0, 1 .0
        ld$.fetch mgr.get-url(bd), {method: \GET}, {type: \text}
          .then ->
            node = doc.createElement \div
            node.innerHTML = it
            if node.childNodes.length > 1 => console.warn "DOM definition of a block should contain only one root."
            id = "#{bd.name}@#{bd.version}:#{bd.path or 'index.html'}"
            [js,css] = <[script style]>.map (n)-> 
              Array.from(node.querySelectorAll n)
                .map -> it.parentNode.removeChild(it); it.textContent
                .join \\n
            node.childNodes.0.setAttribute \block, id
            ret = eval(js) or {}
            if ret.{}pkg.extend => list.push ret.{}pkg.extend
            deps.js ++= (ret.{}pkg.dependencies or []).filter -> it.type == \js or /\.js/.exec((it.path or it or ''))
            deps.css ++= (ret.{}pkg.dependencies or []).filter -> it.type == \css or /\.css/.exec((it.path or it or ''))
            blocks.push {js, css, html: node.innerHTML, bd, id}
            return _ list, blocks, deps
      _ opt.[]blocks
        .then ({blocks, deps}) ->
          Promise.all [
            mgr.csscope.bundle(deps.css),
            mgr.rescope.bundle(deps.js)
          ]
            .then ([depcss, depjs]) ->
              console.log "/", depcss, "/", depjs
              js = blocks.map (b) -> "\"#{b.id}\": #{(b.js or '""').replace(/;$/,'')}"
              js = "document.currentScript.import({#{js.join(',\n')}});"
              css = blocks
                .map (b) ->
                  scope = csscope.scope b
                  csscope {rule: "*[scope~=#{scope}]", name: scope, css: (b.css or ''), scope-test: "[scope]"}
                .join \\n
              html = blocks.map(-> it.html or '').join(\\n)
              return """
              <template>
                #html
                <style type="text/css">#css#depcss</style>
                <script type="text/javascript">#js#depjs</script>
              </template>
              """
  
    debundle: (opt = {}) ->
      mgr = opt.manager or @
      lc = {}
      if !opt.root =>
        p = if opt.url => ld$.fetch opt.url, {method: \GET}, {type: \text}
        else Promise.resolve(opt.code)
        p = p.then (c) ->
          if !block.debundle-node => document.body.appendChild block.debundle-node = doc.createElement \div
          block.debundle-node.appendChild(div = doc.createElement \div)
          div.innerHTML = c
          div.querySelector('template')
      else p = Promise.resolve( if typeof(opt.root) == \string => doc.querySelector(opt.root) else opt.root )
      p.then (root) ->
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
          lc.script.import = ~> lc.codes = it
          lc.script.setAttribute \type, \text/javascript
          doc.body.appendChild lc.script
        if lc.style =>
          lc.style.setAttribute \type, \text/css
          doc.body.appendChild lc.style
        for k,node of nodes =>
          ret = /^(@?[^@]+)@([^:]+)(:.+)?/.exec(k)
          [name, version, path] = [ret.1, ret.2, ((ret.3 or '').replace(/^:/,'') or '')]
          bc = new block.class {
            manager: mgr, name: name, version: version, path: path,
            code: script: lc.codes[k], dom: node, style: ""
          }
          console.log bc
          mgr.set bc
  */
  mgr = new block.manager({
    registry: function(arg$){
      var name, version, path, type;
      name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
      return "/block/" + name + "/" + version + "/" + (path || 'index.html');
    }
  });
  if (false) {
    mgr.bundle({
      blocks: [
        {
          name: 'cta',
          version: '0.0.1'
        }, {
          name: 'long-answer',
          version: '0.0.1'
        }, {
          name: 'sample',
          version: '0.0.1'
        }
      ]
    }).then(function(it){
      return ldfile.download({
        data: it,
        name: "bundle-4.html"
      });
    });
  }
  testload = function(bd){
    return mgr.get(bd).then(function(bc){
      return bc.create().then(function(bi){
        return bi.attach({
          root: container
        }).then(function(){
          return bi['interface']();
        });
      });
    });
  };
  mgr.debundle({
    root: ld$.find('template', 0)
  }).then(function(){
    mgr.get({
      name: "@plotdb/sample1",
      version: "main"
    }).then(function(bc){
      return bc.create().then(function(bi){
        return bi.attach({
          root: container
        }).then(function(){
          return bi['interface']();
        });
      });
    });
    return mgr.get({
      name: "@plotdb/sample2",
      version: "main"
    }).then(function(bc){
      return bc.create().then(function(bi){
        return bi.attach({
          root: container
        }).then(function(){
          return bi['interface']();
        });
      });
    });
  });
  if (true) {
    return mgr.debundle({
      url: "/assets/files/cache/bundled-blocks.html"
    }).then(function(){
      testload({
        name: "cta",
        version: "0.0.1",
        path: "index.html"
      });
      return testload({
        name: "long-answer",
        version: "0.0.1",
        path: "index.html"
      });
    });
  }
});