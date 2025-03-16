<-(->it.apply {}) _

@mgr = new block.manager do
  registry: ({name, version, path, type}) ->
    return "/plug/#name.html"

root = document.querySelector \#root
groups = {}

@mgr.init!
  .then ~>

    view = new ldview do
      root: document.body
      init-render: false
      action: click: choice: ({node}) ->
        if !(itf = groups[node.getAttribute \data-target]) => return
        itf.toggle true
      handler: root: ({node}) -> node.classList.remove \d-none
      init:
        group: ({node}) ~>
          @mgr.get name: \base
            .then (bc) ->
              bc.create!
                .then (bi) ->
                  bi.attach {root: node} .then -> bi.interface!
                .then -> groups[node.getAttribute \data-name] = it
        child: ({node}) ~> @mgr.from {name: node.dataset.name}, {root: node}
    view.init!
      .then ->
        view.render!
