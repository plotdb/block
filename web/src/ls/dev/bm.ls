
deserialize = (n) ->
  if n.type == \text => return document.createTextNode n.value
  else if n.type == \block => return deserialize n.tree
  node = document.createElement n.name
  n.attr.filter(->it and it.0).map (p) -> node.setAttribute p.0, p.1
  n.style.filter(->it and it.0).map (p) -> node.style[p.0] = p.1
  if n.cls and n.cls.length =>
    node.classList.add.apply node.classList, n.cls.filter(->it)
  for c in (n.child or []) =>
    ret = deserialize c
    if ret => node.appendChild ret
  return node

node-to-json = (n) ->
  name = n.nodeName.toLowerCase!
  if name == \#text =>
    return {type: \text, value: n.nodeValue}
  style = if n.style => [i for i from 0 til n.style.length].map(-> [n.style[it],n.style[n.style[it]]]) else []
  attr = if n.attributes =>
    [[v.nodeName, v.nodeValue] for v in n.attributes].filter(->!(it.0 in <[style class]>))
  else []
  cls = if n.classList => [v for v in n.classList] else []
  return {type: \tag, name: name, style, attr, cls}

serialize = (n) ->
  node = node-to-json n
  child = []
  if !n.childNodes => return
  for i from 0 til n.childNodes.length =>
    ret = serialize n.childNodes[i]
    child.push ret
  node.child = child
  node

serialize-html-code = (html) ->
  div = document.createElement("div")
  div.innerHTML = html
  return serialize div

resolve-required-packages = (n) ->
  ret = []
  if n.type == \block => ret.push n{name, version}
  for c in n.child => ret ++= resolve-required-packages c
  return ret


block-instance = (opt = {}) ->
  @opt = opt
  @block = opt.block
  @

block-instance.prototype = Object.create(Object.prototype) <<< do
  get-dom: -> deserialize @block.obj


block = (opt) ->
  @opt = opt
  @ <<< opt{name, version, raw}
  @obj = serialize-html-code opt.raw
  @

block.prototype = Object.create(Object.prototype) <<< do
  get-dom: -> deserialize @obj
  create: ->
    return new block-instance {block: @}

bm = do
  cache: {}
  reload: (n) -> @get n, true
  get: (n, force = false) ->
    ret = {}
    n = if Array.isArray(n) => n else [n]
    # we might also need to handle get of multiple packages in one request
    p = n.map (pkg-name) ~>
      Promise.resolve!
        .then ~>
          if @cache[pkg-name] => return Promise.resolve that
          [name,version] = pkg-name.split \@
          ld$.fetch "/blocks/#{name}/index.html", {method: \GET}, {type: \text}
            .then ~> ret[name] = @cache[pkg-name] = b = new block {raw: it, name, version}

    Promise.all p .then -> ret


bm.get <[list@0.0.1 quiz@0.0.1]>
  .then ->
    console.log \ok1,it
    for i from 0 til 10 =>
      ret = it.list.create!
      dom = ret.get-dom!
      document.body.appendChild dom
    ret = resolve-required-packages it.list.obj
    console.log ret

    bm.reload <[list@0.0.1]>
  .then ->
    console.log \ok2
  .catch (e) -> console.log e

