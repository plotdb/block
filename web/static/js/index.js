var code, lc, manager, ret;
code = "<div style=\"color:red\">11</div>\n<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"alert('onload');\"/>\n<script type=\"text/javascript\">\nconsole.log('script tag');\n</script>\n<style type=\"text/css\">\nhtml,body { background: yellow }\n</style>";
lc = {};
manager = new block.manager({
  registry: function(arg$){
    var name, version;
    name = arg$.name, version = arg$.version;
    return "/block/" + name + "/" + version + "/index.html";
  }
});
manager.set({
  name: "test",
  version: "0.0.1",
  block: new block['class']({
    code: code
  })
}).then(function(){
  return manager.get({
    name: "landing-col2",
    version: "0.0.1"
  });
}).then(function(it){
  return it.create();
}).then(function(it){
  lc.land2 = it;
  return it.attach(document.body);
}).then(function(){
  return manager.get({
    name: "landing",
    version: "0.0.1"
  });
}).then(function(it){
  return it.create();
}).then(function(it){
  lc.land1 = it;
  return it.attach(document.body);
}).then(function(){
  return manager.get({
    name: "sample",
    version: "0.0.1"
  });
}).then(function(it){
  return it.create();
}).then(function(it){
  lc.sample = it;
  return it.attach(document.body);
}).then(function(){
  return manager.get({
    name: "test",
    version: "0.0.1"
  });
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
}).then(function(){
  return lc.land2.update([{
    p: ['style', 0],
    li: ['opacity', '0.5']
  }]);
}).then(function(){
  return lc.land2.getDomData();
}).then(function(it){
  return console.log(it);
});
code = "@keyframes test {\n  0% { background: red; }\n  100% { background: green; }\n}\n@media (max-width: 1024px) {\n  .nest1 { animation: 1s test infinite }\n  @media (max-height: 1024px) {\n    .nest2 { animation: infinite 1s test }\n  }\n}";
ret = csscope('test', code);