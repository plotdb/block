template = ld$.find('template', 0)
mgr = new block.manager!
cls1 = new block.class manager: mgr, root: template.content.childNodes.0.cloneNode true
cls2 = new block.class manager: mgr, code: template.content.childNodes.1.outerHTML
ps1 = [0 til 5].map ->  cls1.create!then (bi) -> bi.attach root: root1
Promise.all ps1
  .then ->
    for i from 0 til 5
      cls2.create!then (bi) -> bi.attach root: root1
