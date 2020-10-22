console.log \init
script = document.createElement("script")
hash = {}
for k,v of window => hash[k] = v
script.onload = ->
  obj = {}
  for k,v of window =>
    if hash[k] or !window[k] => continue
    obj[k] = window[k]
    window[k] = undefined
  console.log obj
  console.log window.testObj
  console.log testObj


script.setAttribute \src, '/js/test.js'
document.body.appendChild script
