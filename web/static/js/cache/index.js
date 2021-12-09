(function(it){
  return it.apply({});
})(function(){
  var ref$, win, doc, tmp, node, mgr, testload;
  ref$ = [window, window.document], win = ref$[0], doc = ref$[1];
  tmp = ld$.find('template', 0);
  node = tmp.content;
  mgr = new block.manager({
    registry: function(arg$){
      var name, version, path, type;
      name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
      return "/block/" + name + "/" + version + "/" + (path || 'index.html');
    }
  });
  if (true) {
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
    }).then(function(){});
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