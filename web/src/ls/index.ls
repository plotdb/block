<-(->it.apply {}) _

code = """
<div style="color:red">11</div>
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="console.log('base64 image loaded with html code in string.');"/>
<script type="text/javascript">
console.log('script tag in code in string run');
</script>
<style type="text/css">
html,body { background: yellow }
</style>
"""

@view = view = new ldview do
  root: document.body
  handler:
    container: (->), inner: (->)
    loader: ({node}) ~> node.classList.toggle \running, !@inited


load-sample = ({ns, name, version, root}) ->
  manager.get {ns: if ns => ns else 'custom', name, version: version or "0.0.1"}
    .then -> it.create!
    .then -> it.attach {root: root or view.get('container')}
    .catch -> console.log "failed to load block #name", it

lc = {}
unpkg =
  url: ({name, version, path}) ->
    "https://unpkg.com/#{name}#{version and "@#version" or ''}#{path and "/#path" or ''}"
  fetch: ({ns, name, version, path, type}) ->
    if ns == \custom =>
      if type == \block => return "/block/#name/#version/#{path or 'index.html'}"
      else return "/block/#name/#version/#{path or 'index.js'}"

    if type == \block => return "/block/#{name}/#{version}/#{path or 'index.html'}"
    fetch @url {name, version, path, type}
      .then (r) ->
        v = (/^https:\/\/unpkg.com\/([^@]+)@([^/]+)\//.exec(r.url) or []).2
        r.text!then -> {version: v or version, content: it}


manager = new block.manager do
  registry: unpkg
/*
  registry:
    block: ({name, version}) -> "/block/#name/#version/index.html"
    lib: ({name, version, path}) -> "/assets/block/#name/#version/#path"
*/
manager.init!
  .then -> manager.set new block.class {name: "test", version: "0.0.1", code, manager}
  .then -> load-sample name: \infer-test, version: \0.0.1
  .then -> load-sample name: \infer-test, version: \0.0.2
  .then -> load-sample name: \circular-1, version: \0.0.1
  .then -> load-sample name: \react-helloworld, root: view.get('inner')
  .then -> load-sample name: \vue-helloworld, root: view.get('inner')
  .then -> load-sample name: \long-answer
  .then -> load-sample name: \cta
  .then -> load-sample name: \columns
  .then -> load-sample name: \image-explain
  .then -> load-sample name: \landing-col2
  .then -> load-sample name: \landing
  .then -> load-sample name: \child
  .then ->
    # test for debundling nothing ( usually due to element not found )
    console.log 'debundle null'
    manager.debundle null
  .catch -> console.log ">", it
  .then ~>
    console.log \done.
    @inited = true
    @view.render!
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
