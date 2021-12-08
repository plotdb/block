(function(it){
  return it.apply({});
})(function(){
  var tmp, node, _bundle, bundle, parseBundle, mgr, obj, testload, this$ = this;
  window.blah = function(cb){
    return this$.code = cb();
  };
  tmp = ld$.find('template', 0);
  node = tmp.content;
  _bundle = function(list, blocks, deps){
    var bd;
    blocks == null && (blocks = []);
    deps == null && (deps = []);
    if (!list.length) {
      return Promise.resolve({
        blocks: blocks,
        deps: deps
      });
    }
    bd = list.splice(0, 1)[0];
    console.log('block def: ', bd);
    return ld$.fetch(mgr.getUrl(bd), {
      method: 'GET'
    }, {
      type: 'text'
    }).then(function(it){
      var node, id, js, css, ret;
      node = document.createElement('div');
      node.innerHTML = it;
      if (node.childNodes.length > 1) {
        console.warn("DOM definition of a block should contain only one root.");
      }
      id = bd.name + "@" + bd.version + ":" + (bd.path || 'index.html');
      js = Array.from(node.querySelectorAll('script')).map(function(it){
        it.parentNode.removeChild(it);
        return it.textContent;
      }).join('\n');
      css = Array.from(node.querySelectorAll('style')).map(function(it){
        it.parentNode.removeChild(it);
        return it.textContent;
      }).join('\n');
      node.childNodes[0].setAttribute('block', id);
      ret = eval(js) || {};
      if ((ret.pkg || (ret.pkg = {})).extend) {
        list.push((ret.pkg || (ret.pkg = {})).extend);
      }
      deps = deps.concat(((ret.pkg || (ret.pkg = {})).dependencies || []).filter(function(it){
        return it.type === 'js' || /\.js/.exec(it.path || it || '');
      }));
      blocks.push({
        js: js,
        css: css,
        html: node.innerHTML,
        bd: bd,
        id: id
      });
      return _bundle(list, blocks, deps);
    });
  };
  bundle = function(opt){
    var mgr;
    opt == null && (opt = {});
    mgr = opt.manager;
    return _bundle(opt.blocks || (opt.blocks = [])).then(function(arg$){
      var blocks, deps;
      blocks = arg$.blocks, deps = arg$.deps;
      return mgr.rescope.bundle(deps).then(function(libs){
        var js, css, html, ret;
        js = blocks.map(function(b){
          return "\"" + b.id + "\": " + (b.js || '""').replace(/;$/, '');
        }).join(",\n");
        js = "document.currentScript.import({" + js + "});";
        css = blocks.map(function(b){
          var scope;
          scope = '_' + btoa(b).replace(/=/g, '_');
          return csscope({
            rule: "*[scope~=" + scope + "]",
            name: scope,
            css: b.css || '',
            scopeTest: "[scope]"
          });
        }).join('\n');
        html = blocks.map(function(it){
          return it.html || '';
        }).join('\n');
        return ret = "<template>\n  " + html + "\n  <style type=\"text/css\">" + css + "</style>\n  <script type=\"text/javascript\">" + js + libs + "</script>\n</template>";
      }).then(function(it){
        return it;
      });
    });
  };
  parseBundle = function(opt){
    var root, scr, k, ref$, node, ret, ref1$, name, version, path, bc, this$ = this;
    opt == null && (opt = {});
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    if (root.content) {
      this.root = root = root.content;
    }
    this.nodes = {};
    this.classes = {};
    this.codes = {};
    this.mgr = opt.manager;
    this.nodes = {};
    this.classes = {};
    Array.from(root.childNodes).map(function(n){
      var id;
      if (n.nodeType !== Document.ELEMENT_NODE) {
        return;
      }
      if (n.nodeName === 'SCRIPT') {
        return this$.script = n.cloneNode(true);
      } else if (n.nodeName === 'STYLE') {
        return this$.style = n.cloneNode(true);
      } else if (!(id = n.getAttribute('block'))) {} else {
        return this$.nodes[id] = n;
      }
    });
    if (this.script) {
      scr = document.createElement('script');
      scr.textContent = this.script.textContent;
      this.script = scr;
      this.script['import'] = function(it){
        return this$.codes = it;
      };
      this.script.setAttribute('type', 'text/javascript');
      document.body.appendChild(this.script);
    }
    if (this.style) {
      this.style.setAttribute('type', 'text/css');
      document.body.appendChild(this.style);
    }
    for (k in ref$ = this.nodes) {
      node = ref$[k];
      ret = /^(@?[^@]+)@([^:]+)(:.+)?/.exec(k);
      ref1$ = [ret[1], ret[2], (ret[3] || '').replace(/^:/, '') || ''], name = ref1$[0], version = ref1$[1], path = ref1$[2];
      this.classes[k] = bc = new block['class']({
        manager: this.mgr,
        name: name,
        version: version,
        path: path,
        code: {
          script: this.codes[k],
          dom: node,
          style: ""
        }
      });
      this.mgr.set(bc);
    }
    return this;
  };
  mgr = new block.manager({
    registry: function(arg$){
      var name, version, path, type;
      name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
      return "/block/" + name + "/" + version + "/" + (path || 'index.html');
    }
  });
  if (false) {
    bundle({
      manager: mgr,
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
        name: "bundle-2.html"
      });
    });
  }
  obj = parseBundle.call({}, {
    root: ld$.find('template', 0),
    manager: mgr
  });
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
  mgr.get({
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
  return ld$.fetch("/assets/bundle/bundle-2.html", {
    method: 'GET'
  }, {
    type: 'text'
  }).then(function(it){
    var div, obj;
    div = document.createElement('div');
    div.innerHTML = it;
    document.body.appendChild(div);
    return obj = parseBundle.call({}, {
      root: ld$.find(div, 'template', 0),
      manager: mgr
    });
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
});