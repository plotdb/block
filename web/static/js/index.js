(function(it){
  return it.apply({});
})(function(){
  var code, view, loadSample, lc, unpkg, manager, this$ = this;
  code = "<div style=\"color:red\">11</div>\n<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"console.log('base64 image loaded with html code in string.');\"/>\n<script type=\"text/javascript\">\nconsole.log('script tag in code in string run');\n</script>\n<style type=\"text/css\">\nhtml,body { background: yellow }\n</style>";
  this.view = view = new ldview({
    root: document.body,
    handler: {
      container: function(){},
      inner: function(){},
      loader: function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('running', !this$.inited);
      }
    }
  });
  loadSample = function(arg$){
    var ns, name, version, root;
    ns = arg$.ns, name = arg$.name, version = arg$.version, root = arg$.root;
    return manager.get({
      ns: ns ? ns : 'custom',
      name: name,
      version: version || "0.0.1"
    }).then(function(it){
      return it.create();
    }).then(function(it){
      return it.attach({
        root: root || view.get('container')
      });
    })['catch'](function(it){
      return console.log("failed to load block " + name, it);
    });
  };
  lc = {};
  unpkg = {
    url: function(arg$){
      var name, version, path;
      name = arg$.name, version = arg$.version, path = arg$.path;
      return "https://unpkg.com/" + name + (version && "@" + version || '') + (path && "/" + path || '');
    },
    fetch: function(arg$){
      var ns, name, version, path, type;
      ns = arg$.ns, name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
      if (ns === 'custom') {
        if (type === 'block') {
          return "/block/" + name + "/" + version + "/" + (path || 'index.html');
        } else {
          return "/block/" + name + "/" + version + "/" + (path || 'index.js');
        }
      }
      if (type === 'block') {
        return "/block/" + name + "/" + version + "/" + (path || 'index.html');
      }
      return fetch(this.url({
        name: name,
        version: version,
        path: path,
        type: type
      })).then(function(r){
        var v;
        v = (/^https:\/\/unpkg.com\/([^@]+)@([^/]+)\//.exec(r.url) || [])[2];
        return r.text().then(function(it){
          return {
            version: v || version,
            content: it
          };
        });
      });
    }
  };
  manager = new block.manager({
    registry: unpkg
  });
  /*
    registry:
      block: ({name, version}) -> "/block/#name/#version/index.html"
      lib: ({name, version, path}) -> "/assets/block/#name/#version/#path"
  */
  return manager.init().then(function(){
    return manager.set(new block['class']({
      name: "test",
      version: "0.0.1",
      code: code,
      manager: manager
    }));
  }).then(function(){
    return loadSample({
      name: 'infer-test',
      version: '0.0.1'
    });
  }).then(function(){
    return loadSample({
      name: 'infer-test',
      version: '0.0.2'
    });
  }).then(function(){
    return loadSample({
      name: 'circular-1',
      version: '0.0.1'
    });
  }).then(function(){
    return loadSample({
      name: 'react-helloworld',
      root: view.get('inner')
    });
  }).then(function(){
    return loadSample({
      name: 'vue-helloworld',
      root: view.get('inner')
    });
  }).then(function(){
    return loadSample({
      name: 'long-answer'
    });
  }).then(function(){
    return loadSample({
      name: 'cta'
    });
  }).then(function(){
    return loadSample({
      name: 'columns'
    });
  }).then(function(){
    return loadSample({
      name: 'image-explain'
    });
  }).then(function(){
    return loadSample({
      name: 'landing-col2'
    });
  }).then(function(){
    return loadSample({
      name: 'landing'
    });
  }).then(function(){
    return loadSample({
      name: 'child'
    });
  })['catch'](function(it){
    return console.log(">", it);
  }).then(function(){
    console.log('done.');
    this$.inited = true;
    return this$.view.render();
  });
});