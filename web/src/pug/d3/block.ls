<- document.currentScript.import _
"d3-base@main":
  pkg:
    name: 'base', version: 'main'
    dependencies: [
      {name: "d3", version: "4.0.0", path: "build/d3.js", async: false}
      {name: "d3-array", version: "3.0.0", path: "d3-array.js", async: false}
    ]
  init: ({context}) ->
    {d3} = context
    console.log "d3-base inited"
  interface: -> return {name: "d3-base", type: "interface"}

"d3-child@main":
  pkg:
    name: 'child', version: 'main'
    extend: name: 'd3-base', version: 'main'
    dependencies: [
      {name: "d3-geo", version: "2.0.0", path: "d3-geo.js", async: false}
    ]
  init: ({context}) ->
    {d3} = context
    console.log "d3-child inited"
  interface: -> return {name: "d3-child", type: "interface"}
