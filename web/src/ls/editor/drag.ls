dragging = false
dragging-caret = null
dragging-src = null
ghost = new Image!
ghost.src = "data:image/svg+xml," + encodeURIComponent("""
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
  <rect x="0" y="0" width="20" height="15" fill="rgba(0,0,0,.5)"/>
</svg>
""")

ld$.find('[draggable]').map (n) ->
  n.setAttribute \draggable, true
  n.addEventListener \dragstart, (e) ->
    console.log n
    dragging-src := n
    e.dataTransfer.setData(\application/json, JSON.stringify({}))
    e.dataTransfer.setDragImage(ghost,10,10)
    dragging := true
    e.stopPropagation!
ld$.find('[editable]').map (n) ->
  n.addEventListener \drop, (e) ->
    data = JSON.parse(e.dataTransfer.getData(\application/json))
    dragging := false
    e.preventDefault!
  n.addEventListener \dragover, (e) -> e.preventDefault!


drag-box = document.createElement("div")
drag-box.style <<< do
  position: \fixed
  left: 0
  top: 0
  opacity: 0
  border: '2px solid #f0f'
  pointerEvents: \none
  transition: "opacity .15s ease-in-out"
document.body.appendChild drag-box


node = ld$.find \#input, 0
document.addEventListener \drop, (e) ->
  if !((n = dragging-src) and dragging-caret) => return
  sc = dragging-caret.startContainer
  so = dragging-caret.startOffset
  ta = if sc.nodeType == Element.TEXT_NODE => sc else sc.childNodes[so]
  if ld$.parent ta, null, n => return
  n.parentNode.removeChild n
  ta.parentNode.insertBefore n, ta
  dragging-render null

dragging-render = (range) ->
  dragging-caret := range
  if !range =>
    drag-box.style <<< opacity: 0
  else 
    box = range.getBoundingClientRect!
    drag-box.style <<< do
      left: "#{box.x}px"
      top: "#{box.y}px"
      width: \1px
      height: "#{box.height}px"
      opacity: 1


document.addEventListener \dragover, (e) ->
  if !dragging => return
  ret = caret-range {node, x: e.clientX, y: e.clientY}
  dragging-render ret.range
