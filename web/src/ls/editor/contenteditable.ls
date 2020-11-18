
lc = {active: null}
document.addEventListener \click, (e) ->
  p = ld$.parent(e.target, '[editable]')
  if lc.active == p => return
  if lc.active => lc.active.setAttribute \contenteditable, false
  lc.active = p
  if !p => return
  p.setAttribute \contenteditable, true
  ld$.find(p, '[editable]').map -> it.setAttribute \contenteditable, false
  range = caret-range {node: p, x: e.clientX, y: e.clientY}
  set-caret range.range

# 把 contenteditable 內容 複製/傳輸 ( serialize - deserialize) 到另一個 div 中
transport = (opt={}) ->
  @opt = opt
  @ <<< opt{root, output}
  @state = {old: {}, cur: {}, tree: {}}
  if !json0 => json0 = require("ot-json0")
  root.addEventListener \input, ~>
    ret = serialize(root)
    @state.old = @state.cur
    @state.cur = ret
    ret = json0-ot-diff @state.old, @state.cur
    ret = json0.type.apply @state.tree, ret
    deserialize @state.tree
      .then ({node}) ->
        @output.innerHTML = ""
        @output.appendChild node
  @

transport root: ld$.find('#input', 0), output: ld$.find(\#output,0)
