dragger = (opt={}) ->
  @opt = opt
  root = opt.root
  @root = root = if typeof(root) == \string => document.querySelector(root) else if root => root else null
  @ <<< do
    dragging: false
    caret: null
    src: null
  @caret = {box: null, range: null}
  @evt-handler = {}
  @init!
  @

dragger <<< do
  list: []
  add: -> @list.push it
  init: ->
    if @inited => return
    @inited = true
    # DOM might change, so we reinit drag/drop handler each time when necessary.
    # dragger obj will check if the corresponding node isn't inited and belongs to it.
    document.addEventListener \mousedown, (e) ~>
      n = e.target
      while n
        if n.hasAttribute and n.hasAttribute \draggable => break
        n = n.parentNode
      if n => @list.map -> it.drag-init n
    document.addEventListener \dragover, (e) ~>
      n = e.target
      while n
        if n.hasAttribute and n.hasAttribute \editable => break
        n = n.parentNode
      if n => @list.map -> it.drop-init n
    # update caret when user dragging around
    document.addEventListener \dragover, (evt) ~> @list.map -> it.dragover {evt}
    # handling drop
    document.addEventListener \drop, (evt) ~> @list.map -> it.drop {evt}

dragger.ghost = new Image!
dragger.ghost.src = "data:image/svg+xml," + encodeURIComponent("""
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
  <rect x="0" y="0" width="20" height="15" fill="rgba(0,0,0,.5)"/>
</svg>
""")

dragger.prototype = Object.create(Object.prototype) <<< do
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
  init: ->
    dragger.init!
    dragger.add @
    ld$.find(@root, '[draggable]').map (n) ~> @drag-init n
    ld$.find(@root, '[editable]').map (n) ~> @drop-init n
    @caret.box = document.createElement("div")
    @caret.box.style <<< do
      position: \fixed
      left: 0
      top: 0
      opacity: 0
      display: \none
      border: '2px solid #f0f'
      pointerEvents: \none
      transition: "opacity .15s ease-in-out"
      animation: "blink .4s linear infinite"
    document.body.appendChild @caret.box

  drop-init: (n) ->
    if n.{}_editor.drop-inited => return
    if !ld$.parent(n, null, @root) => return
    n.{}_edtior.drop-inited = true
    n.addEventListener \drop, (e) ~>
      if (json = e.dataTransfer.getData \application/json) => data = JSON.parse json
      @dragging = false
      e.preventDefault!
    n.addEventListener \dragover, (e) -> e.preventDefault!

  drag-init: (n) ->
    if n.{}_editor.drag-inited => return
    if !ld$.parent(n, null, @root) => return
    n.{}_editor.drag-inited = true
    n.setAttribute \draggable, true
    n.addEventListener \dragstart, (e) ~>
      @src = n
      e.dataTransfer.setData(\application/json, JSON.stringify({}))
      e.dataTransfer.setDragImage(dragger.ghost,10,10)
      @dragging = true
      e.stopPropagation!



  render: (range) ->
    @caret.range = range
    if !range =>
      @caret.box.style <<< display: \none, opacity: 0
    else 
      box = range.getBoundingClientRect!
      @caret.box.style <<< do
        left: "#{box.x}px"
        top: "#{box.y}px"
        width: \1px
        height: "#{box.height}px"
        display: \block
        opacity: 1

  dragover: ({evt}) ->
    # because we might have dragover from outside world ( like, block manager )
    # so we have to find another way to identify correct dragging event.
    #if !@dragging => return
    # alternatively we check if it's in @root, and clear caret if not.
    if !(ld$.parent evt.target, null @root) => return @render null
    ret = caret-range {node: @root, x: evt.clientX, y: evt.clientY}
    @render ret.range

  drop: ({evt}) ->
    # Is this method good?
    range = @caret.range
    @render null
    if !(range and ld$.parent(evt.target, null, @root)) => return

    sc = range.startContainer
    so = range.startOffset
    ta = if sc.nodeType == Element.TEXT_NODE => sc else sc.childNodes[so]

    if !(n = @src) =>
      # not inner drag - check data. any better way?
      data = if (json = evt.dataTransfer.getData \application/json) => JSON.parse json else {}
      if data.type == \block =>
        blocktmp.get {name: data.data.name}
          .then (dom) ~> deserialize dom
          .then (ret) ~>
            ta.parentNode.insertBefore ret.node, ta
            @fire \change
          .catch -> console.log it

    else
      if ld$.parent ta, null, n => return
      if ta.nodeType == Element.TEXT_NODE
        n.parentNode.removeChild n
        text = ta.textContent
        [
          document.createTextNode text.substring(0,so)
          n
          document.createTextNode text.substring(so)
        ].map -> ta.parentNode.insertBefore it, ta
        ta.parentNode.removeChild ta
      else
        n.parentNode.removeChild n
        ta.parentNode.insertBefore n, ta
      @fire \change
