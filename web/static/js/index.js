var code, lc, manager;
code = "<div style=\"color:red\">11</div>\n<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"alert('onload');\"/>\n<script type=\"text/javascript\">\nconsole.log('script tag');\n</script>\n<style type=\"text/css\">\nhtml,body { background: yellow }\n</style>";
lc = {};
manager = new block.manager({
  registry: function(arg$){
    var name, version;
    name = arg$.name, version = arg$.version;
    return "/block/" + name + "/" + version + "/index.html";
  }
});
manager.set(new block['class']({
  name: "test",
  version: "0.0.1",
  code: code
})).then(function(){
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
});
/*
  .then ->
    manager.get {name: "sample", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.sample = it
    it.attach document.body
  .then ->
    manager.get {name: "test", version: "0.0.1"}
  .then ->
    it.create!
  .then ->
    lc.test = it
    it.attach document.body
  .then -> lc.test.update [{p: ['style',0], li: ['background', 'yellow']}]
  .then -> lc.land2.update [{p: ['style',0], li: ['opacity', '0.5']}]
  .then -> lc.land2.get-dom-data!
  .then -> console.log it

code = """
@keyframes test {
  0% { background: red; }
  100% { background: green; }
}
@media (max-width: 1024px) {
  .nest1 { animation: 1s test infinite }
  @media (max-height: 1024px) {
    .nest2 { animation: infinite 1s test }
  }
}
"""
ret = csscope 'test', code
#console.log ret
*/