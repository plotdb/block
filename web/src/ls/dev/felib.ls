# todo: use rescope or realm?
felib = ->
  @scope = {}
  @

felib.prototype = Object.create(Object.prototype) <<< do
  context: (url, func) ->
    url = if Array.isArray(url) => url else [url]
    stacks = []
    scopes = []
    for i from 0 til url.length =>
      [stack,scope] = [{}, @scope[url[i]] or {}]
      for k of scope =>
        stack[k] = window[k]
        window[k] = scope[k]
      stacks.push stack
      scopes.push scope

    func!
    for i from scopes.length - 1 to 0 by -1
      scope = scopes[i]
      stack = stacks[i]
      for k of scope => window[k] = stack[k]

  load: (url) ->
    url = if Array.isArray(url) => url else [url]
    ret = {}
    new Promise (res, rej) ~> 
      _ = (list, idx) ~>
        items = []
        for i from idx til list.length =>
          items.push list[i]
          if list[i].async? and !list[i].async => break

        if !items.length => return res ret

        Promise.all(items.map ~> @_load(it.url or it).then ~> ret <<< it)
          .then ~> @context items.map(-> it.url or it), -> _(list, idx + items.length)

      _ url, 0

  _load: (url) ->
    new Promise (res, rej) ~>
      script = document.createElement("script")
      hash = {}
      for k,v of window => hash[k] = v
      script.onerror = ~> rej!
      script.onload = ~>
        @scope[url] = scope = {}
        for k,v of window =>
          if hash[k]? or !(window[k]?) => continue
          scope[k] = window[k]
          window[k] = undefined
        res scope
      script.setAttribute \src, url
      document.body.appendChild script

/*
# sample usage
lm = new felib!

module = do
  lib: [
    {url: "https://d3js.org/d3.v4.js", async: false},
    "https://d3js.org/d3-format.v2.min.js",
    "https://d3js.org/d3-array.v2.min.js",
    "https://d3js.org/topojson.v2.min.js",
    {url: "https://d3js.org/d3-color.v1.min.js", async: false},
    "https://d3js.org/d3-interpolate.v1.min.js",
    "https://d3js.org/d3-scale-chromatic.v1.min.js",
    "https://d3js.org/d3-dispatch.v2.min.js",
    "https://d3js.org/d3-quadtree.v2.min.js",
    "https://d3js.org/d3-timer.v2.min.js",
    "https://d3js.org/d3-force.v2.min.js",
  ]

lm.load module.lib
  .then -> console.log 'loaded', it


lm.load 'https://d3js.org/d3.v6.min.js'
  .then ->
    lm.load '/js/test.js'
  .then -> 
    lm.context 'https://d3js.org/d3.v6.min.js', ->
      console.log d3
      lm.load '/js/test2.js'
        .then ->
          console.log it
          lm.context '/js/test.js', ->
            lm.context '/js/test2.js', ->
              console.log testObj, test2Obj
            console.log testObj, test2Obj
          console.log testObj, test2Obj
        .then ->
          lm.context <[/js/test.js /js/test2.js]>, -> console.log testObj, test2Obj
*/
