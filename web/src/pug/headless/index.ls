manager = new block.manager registry: ({name,version}) -> "/block/#name/#version/index.html"

manager.init!
  .then -> manager.get {name: "for-headless", version: "0.0.1"}
  .then (block) -> block.create!
  .then (bi) -> bi.attach {root: ld$.find('#root',0)}
  .then -> console.log it
  .then -> manager.get {name: "headless", version: "0.0.1"}
  .then (block) -> block.create!
  .then (bi) ->
    bi.attach!
      .then -> console.log bi.interface!
