json0 = require("ot-json0")

store = do
  state: {old: {}, cur: {}, tree: {}}
  get: -> JSON.parse(JSON.stringify(@state.tree))
  set: ->
    @state.tree = JSON.parse(JSON.stringify(it))
    @state.cur = JSON.parse(JSON.stringify(it))
  add: -> @[]list.push it
  notify: (ops, source) -> @[]list.map -> if (source != it) => it.ops-in ops
  update: (ops, source) ->
    ret = json0.type.apply @state.tree, ops
    @notify ops, source

store.set serialize(ld$.find('#sample > div', 0))

editor = (opt={}) ->
  @opt = opt
  @ <<< opt{root}
  @active = null
  @state = {old: {}, cur: {}, tree: {}}
  @root.addEventListener \input, debounce 500, ~> @ops-out!
  @init!
  @

editor <<< do
  inited: false
  init: ->
    if @inited => return
    document.addEventListener \click, (e) ~> @onclick e
    @inited = true
  list: []
  add: -> @[]list.push it
  set-highlight: -> @highlight = it
  onclick: (e) ->
    ret = @[]list
      .map -> it.onclick e
      .reduce(((a,b) -> a or b), false)
    if ret =>
      @highlight.mode \edit
      return
    @highlight.mode \hover
    @list.map -> it.toggle false

editor.prototype = Object.create(Object.prototype) <<< do
  init: ->
    editor.init!
    editor.add @
    store.add @
    @state.tree = store.get!
    @state.cur = store.get!
    @ops-in!

  # return true if any contenteditable got clicked
  # if none got clicked, host will ask editors disabling the last enabled contenteditable

  toggle: (v) ->
    if !@active => return
    @active.setAttribute \contenteditable, v


  onclick: (e) ->
    p = ld$.parent(e.target, '[editable]')
    if !ld$.parent(p,null,@root) => return
    if @active and @active != p => @active.setAttribute \contenteditable, false
    @active = p
    if !p => return
    p.setAttribute \contenteditable, true
    ld$.find(p, '[editable]').map -> it.setAttribute \contenteditable, false
    range = caret-range {node: p, x: e.clientX, y: e.clientY}
    set-caret range.range
    return true

  ops-out: ->
    ret = serialize(@root.childNodes.0)
    @state.old = @state.cur
    @state.cur = ret
    ops = json0-ot-diff @state.old, @state.cur
    json0.type.apply @state.tree, ops
    store.update ops, @
  ops-in: (ops=[]) ->
    json0.type.apply @state.cur, ops
    json0.type.apply @state.tree, ops
    deserialize @state.tree
      .then ({node}) ~>
        @root.innerHTML = ""
        @root.appendChild node

ed1 = new editor root: ld$.find('#editor1', 0)
debounce 1000
  .then -> 
    ed2 = new editor root: ld$.find('#editor2', 0)
