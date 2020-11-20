ghost = new Image!
ghost.src = "data:image/svg+xml," + encodeURIComponent("""
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
  <rect x="0" y="0" width="20" height="15" fill="rgba(0,0,0,.5)"/>
</svg>
""")

ld$.find '[block]' .map (n) ->
  n.addEventListener \dragstart, (evt) ->
    id = @getAttribute(\data-name)
    [name,version] = id.split(\@)
    payload = {type: \block, data: {name, version}}
    evt.dataTransfer.setData \application/json, JSON.stringify(payload)
    evt.dataTransfer.setDragImage(ghost,10,10)


blocktmp = do
  get: ({name,version}) ->
    new Promise (res, rej) ->
      if !(n = ld$.find "[ld=block-sample][data-name=#name]", 0) => return rej new Error("no block found")
      n = n.cloneNode true
      n.removeAttribute \block-sample
      n.setAttribute \editable, true
      n.setAttribute \contenteditable, true
      n.setAttribute \draggable, true
      data = serialize(n)
      res data
