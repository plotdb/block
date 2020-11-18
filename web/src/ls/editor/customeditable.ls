get-caret-range-text = ({node, x, y, range}) ->
  if !range => range = document.createRange!
  [idx, min] = [-1, undefined]
  for i from 0 til node.length + 1
    range.setStart node, i
    box = range.getBoundingClientRect!
    tx = box.x + box.width / 2
    ty = box.y + box.height / 2
    dist = (tx - x) ** 2 + (ty - y) ** 2
    if !(min?) or dist < min => [idx, min] = [i, dist]
  range.setStart node, idx
  range.setEnd node, idx + 2
  return range


set-vrcaret = (range, node) ->
  nbox = node.getBoundingClientRect!
  box = range.getBoundingClientRect!
  vrcaret.style
    ..left = "#{box.x}px"
    ..top = "#{box.y}px"
    ..height = "#{box.height}px"
    ..width = "1px"

ld$.find '[customeditable=true]'
  .map (node) ->
    node.addEventListener \click, (evt) -> console.log \ok, evt.clientX, evt.clientY

ld$.find('#mask', 0).addEventListener \click, (evt) ->
  range = get-caret-range-text {node: pp.childNodes.0, x: evt.clientX, y: evt.clientY}
  set-vrcaret range, pp

range = get-caret-range-text {node: pp.childNodes.0, x: 985, y: 146}
console.log range
set-vrcaret range, pp

