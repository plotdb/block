highlight-handler = ->
  @ <<< box: null, tgt: null
  @

highlight-handler.prototype = Object.create(Object.prototype) <<< do
  is-toggled: -> return @toggled
  toggle: (v,e) ->
    @toggled = v = if v? => v else !@is-toggled!
    if !v => return @root.style <<< opacity: 0, pointerEvents: \none
    box = @root.getBoundingClientRect!
    @root.style <<<
      opacity: 1
      pointerEvents: \auto
      left: "#{(e.clientX - box.width/2) >? 0 <? window.innerWidth - box.width}px"
      top: "#{(e.clientY - box.height/2) >? 0 <? window.innerHeight - box.height}px"

  poll: ->
    @render @tgt
    setTimeout (~> @poll!), 500

  init: ->
    setInterval (~> @render @tgt), 500
    @root = ld$.find('[ld-scope=highlight]',0)
    @box = document.createElement \div
    @tgt = null
    @box.style <<< do
      position: \fixed
      top: 0
      left: 0
      zIndex: 9999
      pointerEvents: \none
      opacity: 0
      transition: "all .15s ease-in-out"
      animation: "highlight 1s infinite"

    document.body.appendChild @box
    document.addEventListener \mouseover, (e) ~>
      # dont change focus when context menu is on
      if @is-toggled! => return
      if !(node = ld$.parent e.target, '[editable]') => return
      @render node

    document.addEventListener \click, (e) ~> @toggle false
    document.addEventListener \contextmenu, (e) ~>
      @toggle true, e
      e.preventDefault!

    @view = new ldView do
      root: @root
      action: click: do
        'highlight-delete': ~>
          tgt = @tgt
          if !(tgt and tgt.parentNode) => return
          prev = tgt.previousSibling or tgt.parentNode
          if !(prev.hasAttribute \editable) => prev = null
          tgt.parentNode.removeChild tgt
          @tgt = prev
          @render prev
        'highlight-clone': ~>
          tgt = @tgt
          if !(tgt and tgt.parentNode) => return
          cloned = tgt.cloneNode true
          tgt.parentNode.insertBefore cloned, tgt.nextSibling
          @tgt = cloned
          @render cloned

    @poll!

  update: -> @render @tgt
  render: (n) ->
    @tgt = n
    if !n => return @box.style <<< opacity: 0
    box = n.getBoundingClientRect!
    p = 6
    @box.style <<<
      left: "#{box.x - p}px"
      top: "#{box.y - p}px"
      width: "#{box.width + p * 2}px"
      height: "#{box.height + p * 2}px"
      opacity: 0.5
      border: '3px solid #2be'
      borderRadius: \5px

hlh = new highlight-handler!
hlh.init!

