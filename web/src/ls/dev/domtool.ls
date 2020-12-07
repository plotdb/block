
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
                .then ->
                  block-manager.get(n{name,version})
                .then (b) ->
                  b.instantiate!
                    .then (ret) ->
                      if node.parentNode =>
                        that
                          ..insertBefore ret.node, node
                          ..removeChild node
                      else return ret
                .catch ->
                  console.log "block-manager.get failed in deserialize ( #{n.name}@#{n.version} )"
                  node.innerText = "load fail." # TODO update error info in node?
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

