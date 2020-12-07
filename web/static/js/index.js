var code, lc, manager, ret;
code = "<div style=\"color:red\">11</div>\n<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"alert('onload');\"/>\n<script type=\"text/javascript\">\nconsole.log('script tag');\n</script>\n<style type=\"text/css\">\nhtml,body { background: yellow }\n</style>";
lc = {};
manager = new block.manager({
  registry: "/"
});
manager.add({
  name: "test",
  version: "0.0.1",
  block: new block['class']({
    code: code
  })
});
manager.get({
  name: "sample",
  version: "0.0.1"
}).then(function(it){
  return it.create();
}).then(function(it){
  lc.sample = it;
  return it.attach(document.body);
});
manager.get({
  name: "test",
  version: "0.0.1"
}).then(function(it){
  return it.create();
}).then(function(it){
  lc.test = it;
  return it.attach(document.body);
}).then(function(){
  return lc.test.update([{
    p: ['style', 0],
    li: ['background', 'yellow']
  }]);
});
code = "@keyframes test {\n  0% { background: red; }\n  100% { background: green; }\n}\n@media (max-width: 1024px) {\n  .nest1 { animation: 1s test infinite }\n  @media (max-height: 1024px) {\n    .nest2 { animation: infinite 1s test }\n  }\n}";
ret = csscope('test', code);