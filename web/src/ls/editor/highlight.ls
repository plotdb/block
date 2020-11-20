
# option
#  - menu - context menu dom
#  - target - root node(s) where highlight works
highlight = (opt = {}) ->
  @opt = opt
  @ <<< box: null, tgt: null
  @ <<< opt{menu, target}
  @targets = []
  @add-target opt.target
  @

highlight.prototype = Object.create(Object.prototype) <<< do
  add-target: (input) -> 
    tgts = (if Array.isArray(input) => input else [input])
      .map -> if typeof(it) == \string => document.querySelector(it) else if it => it else null
      .filter -> it
    @targets = @targets ++ tgts
  is-toggled: -> return @toggled
  toggle: (v,e) ->
    @toggled = v = if v? => v else !@is-toggled!
    if !v => return @menu.style <<< opacity: 0, pointerEvents: \none
    box = @menu.getBoundingClientRect!
    @menu.style <<<
      opacity: 1
      pointerEvents: \auto
      left: "#{(e.clientX - box.width/2) >? 0 <? window.innerWidth - box.width}px"
      top: "#{(e.clientY - box.height/2) >? 0 <? window.innerHeight - box.height}px"

  mode: ->
    name = "highlight-#it"
    @box.style <<< animation: "#name 1s infinite"
    @blend.style.opacity = if it == \edit => 1 else 0
    @mask.style.opacity = if it == \edit => 1 else 0
  poll: ->
    @render @tgt
    setTimeout (~> @poll!), 500

  init: ->
    setInterval (~> @render @tgt), 500
    @box = document.createElement \div
    @blend = document.createElement \div
    @mask = document.createElement \div
    @tgt = null
    @mask.style <<< do
      position: \fixed
      top: 0
      left: 0
      width: \100%
      height: \100%
      background: 'rgba(255,255,255,.8)'
      mix-blend-mode: \hard-light
      z-index: 5
      pointer-events: \none
      opacity: 0
      transition: 'opacity .15s ease-in-out'

    style = do
      position: \fixed
      top: 0
      left: 0
      zIndex: 9999
      pointerEvents: \none
      opacity: 0
      transition: "all .15s ease-in-out"
    @box.style <<< style
    @blend.style <<< style

    document.body.appendChild @box
    document.body.appendChild @mask
    @mask.appendChild @blend
    @mode \hover
    document.addEventListener \mouseover, (e) ~>
      if @is-toggled! => return
      for i from 0 til @targets.length =>
        if ld$.parent(e.target, null, @targets[i]) =>
          # dont change focus when context menu is on
          if !(n = ld$.parent e.target, '[editable]', @targets[i]) => return
          @render n
          break

    document.addEventListener \click, (e) ~> @toggle false
    document.addEventListener \contextmenu, (e) ~>
      @toggle true, e
      e.preventDefault!

    @view = new ldView do
      root: @menu
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
    if !n =>
      @box.style <<< opacity: 0
      @blend.style <<< opacity: 0
      return
    box = n.getBoundingClientRect!
    p = 6
    style = do
      left: "#{box.x - p}px"
      top: "#{box.y - p}px"
      width: "#{box.width + p * 2}px"
      height: "#{box.height + p * 2}px"
      opacity: 0.5
      border: '3px solid #2be'
      borderRadius: \5px
    @box.style <<< style 
    @blend.style <<< do
      left: "#{box.x}px"
      top: "#{box.y}px"
      width: "#{box.width}px"
      height: "#{box.height}px"
      opacity: 1
      border: '3px solid transparent'
      background: '#999'

hlh = new highlight do
  target: ld$.find('.editor')
  menu: ld$.find('[ld-scope=highlight]',0)

editor.set-highlight hlh
hlh.init!

