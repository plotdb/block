/*
do
  name: "..."
  type: "..."
  version: ..." ( block only )
  value: "..."
  attr: [[name, value], ...]
  style: [[name, value], ...]
  cls: [c1, c2, ... ]
  child: [...]

serialize - html to json
deserialize - json to html
locate - 

 - block 以 html/css/js 撰寫. 經編輯器由 html 轉成 json ( serialize )
 - block json 由編輯器依用戶指示插入 page json 中.
   - page json 的操作以 op 方式儲存與傳遞.
   - 收到 op 後
     - 先用來更新 json. 
     - 依 op 算出更新的範圍. 重製其下的元件:
       - 更新 style 或 attr
       - 更改標籤名稱.
       - 刪除 / 新增標籤
   - 由於元素可能會隨時新增或刪除, block js 需要妥善處理這一塊.
*/

lc = {json: {}}

Array.from(document.querySelectorAll('button')).map -> it.addEventListener \click, -> alert \ok

wrap = (n) ->
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
  node = wrap n
  child = []
  if !n.childNodes => return
  for i from 0 til n.childNodes.length =>
    ret = serialize n.childNodes[i]
    child.push ret
  node.child = child
  node


# return {node, promise}:
#  - node: deserialized DOM tree or placeholder div for being replaced by instantiated block.
#  - promise: resolve to all pending block retrieval.
#             for placeholder div, the first element is meant to replace the placeholder.
deserialize = (n) ->
  queue = []
  Promise.resolve!
    .then ->
      _ = (n) ->
        if n.type == \text => return document.createTextNode n.value
        else if n.type == \block =>
          return (->
            node = document.createElement \div
            node.textContent = "loading..."
            queue.push(
              debounce 2000
                .then -> blocks.get(n.name)
                .then (b) ->
                  b.instantiate!
                    .then (ret) ->
                      if node.parentNode =>
                        that
                          ..insertBefore ret.node, node
                          ..removeChild node
                      else return ret
                .catch -> node.innerText = "load fail." # TODO update error info in node?
            )
            return node
          )!
        node = document.createElement n.name
        n.attr.filter(->it and it.0).map (p) -> node.setAttribute p.0, p.1
        n.style.filter(->it and it.0).map (p) -> node.style[p.0] = p.1
        if n.cls and n.cls.length =>
          node.classList.add.apply node.classList, n.cls.filter(->it)
        for c in (n.child or []) =>
          ret = _ c
          if ret => node.appendChild ret
        return node
      _(n)
    .then (node) ->
      return {node, promise: Promise.all(queue)}

locate = (op, data, root) ->
  n = obj = root
  dd = data
  console.log op.p, op
  for i from op.p.length - 1 to 0 by -1 =>
    if op.p[i] in <[attr style cls child name value type]> => break
  for j from 0 til i - 1 =>
    p = op.p[i]
    obj = if p == \child => obj.childNodes else obj
    dd = dd[p]

  switch op.p[i]
  | <[name value type]>
    deserialize dd
      .then ({node, promise}) ->
        obj.parentNode.insertBefore node, obj
        obj.parentNode.removeChild obj
  | \style
    obj.setAttribute \style, ''
    dd.style.map -> obj.style[it.0] = it.1
  | \cls
    obj.setAttribute \class, dd.cls.join(' ')
  | \attr
    Array.from(obj.attributes).map ->
      if !dd.attr[it.name] and !(it.name in <[block style class]>) => obj.removeAttribute it.name
    dd.attr.map -> obj.setAttribute it.0, it.1
  | \child
    # other case?
    if op.ld => obj.removeChild obj.childNodes[op.p[i + 1]]
    if op.li =>
      deserialize op.li
        .then ({node, promise}) ->
          obj.insertBefore node, obj.childNodes[op.p[i + 1]]


update = (ops = []) ->
  if !ops.length =>
    deserialize lc.json
      .then ({node, promise}) ->
        out.innerHTML = ""
        out.appendChild node
  else
    ops.map (o) -> locate o, lc.json, out.childNodes.0

opt = do
  onChange: ->
    new-obj = je.get!
    ops = json0-ot-diff lc.json, new-obj
    sharedb.types.defaultType.apply lc.json, ops
    update ops

je = new JSONEditor editor, opt

blocks = do
  hash: {}
  add: (name, block) -> @hash[name] = block
  get: (name) -> Promise.resolve(@hash[name])
block = (opt = {}) ->
  @name = opt.name
  @tree = serialize opt.root
  blocks.add name, @
  @
block.prototype = Object.create(Object.prototype) <<< do
  instantiate: -> deserialize @tree

b = new block {name: 'two-button', root: ld$.find('[block]', 0)}
blocks.add "two-button", b

lc.json = nt = JSON.parse(JSON.stringify(b.tree))
nt2 = JSON.parse(JSON.stringify(b.tree))

ops = [
  {p: ['child', 4], li: {type: \block, name: "two-button"}}
  {p: ['style', 0], li: ["background", "yellow"]}
  {p: ['cls', 0], li: "text-danger"}
  {p: ['attr', 0], li: ["data-name", "blah"]}
  {p: ['attr', 0], ld: ["data-name", "blah"]}
]
je.set lc.json
update!

ops-in = (ops, source = true) ->
  sharedb.types.defaultType.apply lc.json, ops
  je.set lc.json
  update ops

debounce 1000
  .then -> ops-in [ops.0]
  .then -> ld$.find('button').map(-> it.addEventListener \click, -> alert 'ok')
  .then -> debounce 1000
  .then -> ops-in [ops.1]
  .then -> debounce 1000
  .then -> ops-in [ops.2]
  .then -> debounce 1000
  .then -> ops-in [ops.3]
  .then -> debounce 1000
  .then -> ops-in [ops.4]
  .then -> debounce 1000
