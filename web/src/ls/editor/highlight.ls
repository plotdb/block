highlightbox = document.createElement \div
highlighted = null

highlightbox.style <<< do
  position: \fixed
  top: 0
  left: 0
  zIndex: 9999
  pointerEvents: \none
  opacity: 0
  transition: "all .15s ease-in-out"
  animation: "highlight 1s infinite"

highlight-render = (node) ->
  highlighted := node
  if !node => return highlightbox.style <<< opacity: 0
  box = node.getBoundingClientRect!
  p = 6
  highlightbox.style <<<
    left: "#{box.x - p}px"
    top: "#{box.y - p}px"
    width: "#{box.width + p * 2}px"
    height: "#{box.height + p * 2}px"
    opacity: 0.5
    border: '3px solid #2be'
    borderRadius: \5px

document.body.appendChild highlightbox
document.addEventListener \mouseover, (e) ->
  if !(node = ld$.parent e.target, '[editable]') => return
  highlight-render node

console.log 1
highlight-view = new ldView do
  root: ld$.find('[ld-scope=highlight]',0)
  action: click: do
    'highlight-delete': ->
      if !(highlighted and highlighted.parentNode) => return
      highlighted.parentNode.removeChild highlighted
      highlighted := null
      highlight-render!
    'highlight-clone': ->
      if !(highlighted and highlighted.parentNode) => return
      highlighted.parentNode.removeChild highlighted
      highlighted := null
      highlight-render!

