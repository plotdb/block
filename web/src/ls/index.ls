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

lc = {}
manager = new block.manager!
manager.add {name: "test", version: "0.0.1", block: new block.class {code}}
manager.get {name: "sample", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.sample = it
    it.attach document.body
manager.get {name: "test", version: "0.0.1"}
  .then -> it.create!
  .then ->
    lc.test = it
    it.attach document.body
  .then -> lc.test.update [{p: ['style',0], li: ['background', 'yellow']}]

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
console.log ret
