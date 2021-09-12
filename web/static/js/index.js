var code, loadSample, lc, manager;
code = "<div style=\"color:red\">11</div>\n<img src=\"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\" onload=\"alert('onload');\"/>\n<script type=\"text/javascript\">\nconsole.log('script tag');\n</script>\n<style type=\"text/css\">\nhtml,body { background: yellow }\n</style>";
loadSample = function(arg$){
  var name;
  name = arg$.name;
  return manager.get({
    name: name,
    version: "0.0.1"
  }).then(function(it){
    return it.create();
  }).then(function(it){
    return it.attach({
      root: document.getElementById('container')
    });
  })['catch'](function(it){
    return console.log("failed to load block " + name, it);
  });
};
lc = {};
manager = new block.manager({
  block: function(arg$){
    var name, version;
    name = arg$.name, version = arg$.version;
    return "/block/" + name + "/" + version + "/index.html";
  }
});
manager.init().then(function(){
  return manager.set(new block['class']({
    name: "test",
    version: "0.0.1",
    code: code
  }));
}).then(function(){
  return loadSample({
    name: 'react-helloworld'
  });
}).then(function(){
  return loadSample({
    name: 'vue-helloworld'
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
});
/*
  .then -> manager.get {name: "landing-col2", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.land2 = it
    it.attach {root: document.body}
*/
/*
  .then ->
    manager.get {name: "landing", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.land1 = it
    it.attach {root: document.body}
  .then ->
    debounce 1000
  .then -> lc.land1.detach!
*/
/*
  .then ->
    manager.get {name: "sample", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.sample = it
    it.attach {root: document.body}
  .then ->
    manager.get {name: "test", version: "0.0.1"}
  .then ->
    it.create!
  .then ->
    lc.test = it
    it.attach {root: document.body}
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