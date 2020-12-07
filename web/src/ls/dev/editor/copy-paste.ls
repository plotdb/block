
get-next = (n) ->
  if n.childNodes and n.childNodes.length => return n.childNodes.0
  if n.nextSibling => return that
  while true
    n = n.parentNode
    if !n => return null
    if n.nextSibling => return that
show-selected-nodes = (sel) ->
  range = sel.getRangeAt 0
  start = range.startContainer
  end = range.endContainer
  if start.nodeType != Element.TEXT_NODE => start = start.childNodes[range.startOffset]
  if end.nodeType != Element.TEXT_NODE => end = end.childNodes[range.endOffset]
  cur = start
  for i from 0 til 100
    cur = get-next(cur)
    if !cur or cur == end => break

document.addEventListener \copy, (e) ->
  sel = document.getSelection!
  show-selected-nodes(sel)
  e.clipboardData.setData \text/plain, sel.toString!.toUpperCase!
  e.preventDefault!

# intercept paste data and remove style
document.addEventListener \paste, (e) ->
  data = e.clipboardData.getData(\text/html)
  document.execCommand \insertText, false, data
  e.preventDefault!

