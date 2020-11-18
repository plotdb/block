require! <[fs path body-parser template]>

template.server.init do
  api: ({app}) ->

    app.use body-parser.json do
      limit: '10mb'

    app.post \/block, (req, res) ->
      [n,v] = [req.body.name, (req.body.version or 'latest')]
      if !(n and /^[a-z0-9._-]+$/.exec(n)) => return res.status(404).send!
      p = path.join("block", n, v)
      f = path.join(p, "index.html")
      if !(fs.exists-sync(f)) => res.status(404).send!
      ret = fs.read-file-sync(f).toString!
      res.send {name: n, version: v, files: {"index.html": ret}}

template.watch.init {}
