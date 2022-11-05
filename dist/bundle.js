(function(){
  block.manager.prototype.bundle = function(opt){
    var mgr, hash, _;
    opt == null && (opt = {});
    mgr = opt.manager || this;
    hash = {};
    _ = function(list, blocks, deps){
      var bd, id;
      blocks == null && (blocks = []);
      deps == null && (deps = {
        js: [],
        css: []
      });
      if (!list.length) {
        return Promise.resolve({
          blocks: blocks,
          deps: deps
        });
      }
      bd = list.splice(0, 1)[0];
      id = block.id(bd);
      if (hash[id]) {
        return Promise.resolve().then(function(){
          return _(list, blocks, deps);
        });
      }
      return _fetch(mgr.getUrl(bd), {
        method: 'GET'
      }).then(function(it){
        var node, ref$, js, css, ret, b;
        node = doc.createElement('div');
        node.innerHTML = it;
        if (node.childNodes.length > 1) {
          console.warn("DOM definition of a block should contain only one root.");
        }
        ref$ = ['script', 'style'].map(function(n){
          return Array.from(node.querySelectorAll(n)).map(function(it){
            it.parentNode.removeChild(it);
            return it.textContent;
          }).join('\n');
        }), js = ref$[0], css = ref$[1];
        node.childNodes[0].setAttribute('block', id);
        ret = eval("(function(module){" + (js || '') + ";return module.exports;})({})");
        if (ret instanceof Function) {
          ret = ret();
        }
        if (!ret) {
          ret = {};
        }
        ret.pkg || (ret.pkg = {});
        (ref$ = ret.pkg).dependencies || (ref$.dependencies = []);
        if (ret.pkg.extend) {
          if (!ret.pkg.extend.name) {
            ref$ = ret.pkg.extend;
            ref$.name = bd.name;
            ref$.version = bd.version;
          }
          list.push(ret.pkg.extend);
        }
        ret.pkg.dependencies.map(function(d){
          if (!d.name) {
            d.name = bd.name;
            d.version = bd.version;
          }
          if (d.type) {
            return;
          }
          if (/\.js$/.exec(d.url || d.path || d)) {
            return d.type = 'js';
          } else if (/\.css$/.exec(d.url || d.path || d)) {
            return d.type = 'css';
          } else {
            return d.type = 'js';
          }
        });
        deps.js = deps.js.concat((ret.pkg.dependencies || []).filter(function(it){
          return it.type === 'js' || /\.js/.exec(it.path || it || '');
        }));
        deps.css = deps.css.concat((ret.pkg.dependencies || []).filter(function(it){
          return it.type === 'css' || /\.css/.exec(it.path || it || '');
        }));
        js = "((function(module){" + (js || '') + ";return module.exports;})({}))";
        blocks.push(b = {
          js: js,
          css: css,
          html: node.innerHTML,
          bd: bd,
          id: id
        });
        hash[id] = b;
        return _(list, blocks, deps);
      });
    };
    return _(opt.blocks || (opt.blocks = [])).then(function(arg$){
      var blocks, deps;
      blocks = arg$.blocks, deps = arg$.deps;
      return Promise.all([mgr.csscope.bundle(deps.css), mgr.rescope.bundle(deps.js)]).then(function(arg$){
        var depcss, depjsCache, js, depcssCache, css, html;
        depcss = arg$[0], depjsCache = arg$[1];
        js = blocks.map(function(b){
          return "\"" + b.id + "\":" + (b.js || '""');
        });
        js = "document.currentScript.import({" + js.join(',\n') + "});";
        depcssCache = deps.css.map(function(o){
          return "csscope.cache(" + JSON.stringify((o.inited = true, o.scope = csscope.scope(o), o)) + ")";
        }).join(';');
        css = blocks.map(function(b){
          var scope;
          scope = csscope.scope(b);
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
        return "<template>\n  " + html + "\n  <style type=\"text/css\">" + css + depcss + "</style>\n  <script type=\"text/javascript\">" + js + depjsCache + ";" + depcssCache + "</script>\n</template>";
      });
    });
  };
  ({
    bundle: function(opt){
      var mgr, hash, _;
      opt == null && (opt = {});
      mgr = opt.manager || this;
      hash = {};
      _ = function(list, blocks, deps){
        var bd, id;
        blocks == null && (blocks = []);
        deps == null && (deps = {
          js: [],
          css: []
        });
        if (!list.length) {
          return Promise.resolve({
            blocks: blocks,
            deps: deps
          });
        }
        bd = list.splice(0, 1)[0];
        id = block.id(bd);
        if (hash[id]) {
          return Promise.resolve().then(function(){
            return _(list, blocks, deps);
          });
        }
        return _fetch(mgr.getUrl(bd), {
          method: 'GET'
        }).then(function(it){
          var node, ref$, js, css, ret, b;
          node = doc.createElement('div');
          node.innerHTML = it;
          if (node.childNodes.length > 1) {
            console.warn("DOM definition of a block should contain only one root.");
          }
          ref$ = ['script', 'style'].map(function(n){
            return Array.from(node.querySelectorAll(n)).map(function(it){
              it.parentNode.removeChild(it);
              return it.textContent;
            }).join('\n');
          }), js = ref$[0], css = ref$[1];
          node.childNodes[0].setAttribute('block', id);
          ret = eval("(function(module){" + (js || '') + ";return module.exports;})({})");
          if (ret instanceof Function) {
            ret = ret();
          }
          if (!ret) {
            ret = {};
          }
          ret.pkg || (ret.pkg = {});
          (ref$ = ret.pkg).dependencies || (ref$.dependencies = []);
          if (ret.pkg.extend) {
            if (!ret.pkg.extend.name) {
              ref$ = ret.pkg.extend;
              ref$.name = bd.name;
              ref$.version = bd.version;
            }
            list.push(ret.pkg.extend);
          }
          ret.pkg.dependencies.map(function(d){
            if (!d.name) {
              d.name = bd.name;
              d.version = bd.version;
            }
            if (d.type) {
              return;
            }
            if (/\.js$/.exec(d.url || d.path || d)) {
              return d.type = 'js';
            } else if (/\.css$/.exec(d.url || d.path || d)) {
              return d.type = 'css';
            } else {
              return d.type = 'js';
            }
          });
          deps.js = deps.js.concat((ret.pkg.dependencies || []).filter(function(it){
            return it.type === 'js' || /\.js/.exec(it.path || it || '');
          }));
          deps.css = deps.css.concat((ret.pkg.dependencies || []).filter(function(it){
            return it.type === 'css' || /\.css/.exec(it.path || it || '');
          }));
          js = "((function(module){" + (js || '') + ";return module.exports;})({}))";
          blocks.push(b = {
            js: js,
            css: css,
            html: node.innerHTML,
            bd: bd,
            id: id
          });
          hash[id] = b;
          return _(list, blocks, deps);
        });
      };
      return _(opt.blocks || (opt.blocks = [])).then(function(arg$){
        var blocks, deps;
        blocks = arg$.blocks, deps = arg$.deps;
        return Promise.all([mgr.csscope.bundle(deps.css), mgr.rescope.bundle(deps.js)]).then(function(arg$){
          var depcss, depjsCache, js, depcssCache, css, html;
          depcss = arg$[0], depjsCache = arg$[1];
          js = blocks.map(function(b){
            return "\"" + b.id + "\":" + (b.js || '""');
          });
          js = "document.currentScript.import({" + js.join(',\n') + "});";
          depcssCache = deps.css.map(function(o){
            return "csscope.cache(" + JSON.stringify((o.inited = true, o.scope = csscope.scope(o), o)) + ")";
          }).join(';');
          css = blocks.map(function(b){
            var scope;
            scope = csscope.scope(b);
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
          return "<template>\n  " + html + "\n  <style type=\"text/css\">" + css + depcss + "</style>\n  <script type=\"text/javascript\">" + js + depjsCache + ";" + depcssCache + "</script>\n</template>";
        });
      });
    }
  });
}).call(this);
