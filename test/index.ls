require! <[@plotdb/colors]>
block = require "../dist/node"

console.log "====== i2dobj test cases ======".yellow
id2obj-test-cases = <[
  ldcover@1.2.3:index.html ldcover:index.html github:ldcover:
  ldcover@1.2.3 ldcover@1.2.3:blah/in123.html npm:ldcover@1.2.3:blah/in123.html
]>
for s in id2obj-test-cases =>
  console.log("#s".cyan, '\n --> ', JSON.stringify(block.id2obj s).green)

console.log "====== compatible test cases (path is irrelevant) ======".yellow
compatible-test-cases =[
* current: "local:sample@1.2.0:index.html", required: "local:sample@^1.1.0:index.html"
* current: "local:sample@1.2.0:", required: "local:sample@^1.1.0:index.html"
* current: "local:sample@1.2.0:index.html", required: "local:sample@^1.3.0:index.html"
* current: "sample@1.2.0:index.html", required: "local:sample@^1.3.0:index.html"
* current: "sample@1.2.0:index.html", required: "local:sample@^1.1.0:index.html"
* current: "local:sample@1.2.1:index.html", required: "local:sample@~1.2.0:index.html"
* current: "local:sample@1.2.1:", required: "local:sample@~1.2.0:index.html"
* current: "local:sample@1.2.1:", required: "local:sample@~1.2.0:"
]
for idx from 0 til compatible-test-cases.length =>
  c = compatible-test-cases[idx]
  ret = block.compatible c
  console.log " #idx / current : #{c.current}".white
  console.log "     required: #{c.required}".cyan
  console.log "     --> result: #ret".green

