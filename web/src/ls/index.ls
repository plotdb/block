code = """
<div style="color:red">11</div>
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="alert('onload');"/>
<script type="text/javascript">
console.log('script tag');
</script>
<style type="text/css">
html,body { background: yellow }
</style>
"""

load-sample = ({name}) ->
  manager.get {name, version: "0.0.1"}
    .then -> it.create!
    .then -> it.attach {root: document.getElementById(\container)}
    .catch -> console.log "failed to load block #name", it

lc = {}
manager = new block.manager do
  registry:
    block: ({name, version}) -> "/block/#name/#version/index.html"
    lib: ({name, version, path}) -> "/assets/block/#name/#version/#path"
manager.init!
  .then -> manager.set new block.class {name: "test", version: "0.0.1", code, manager}
  .then -> load-sample name: \react-helloworld
  .then -> load-sample name: \vue-helloworld
  .then -> load-sample name: \long-answer
  .then -> load-sample name: \cta
  .then -> load-sample name: \columns
  .then -> load-sample name: \image-explain
  .then -> load-sample name: \landing-col2
  .then -> load-sample name: \landing
  .then -> load-sample name: \child
  .catch -> console.log ">", it
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
