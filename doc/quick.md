# Quick Reference

Here we document some common patterns of using `@plotdb/block`.


## In-Page Block

You can use DOM tree in your web page to construct a block.

    /* you should configure `registry` of your own manager */
    manager = new block.manager();
    /* consider clone this node if necessary */
    root = document.querySelector('selector-to-your-DOM-tree-root');
    myclass = new block.class({
      root: root,
      manager: manager /* don't forget the manager */
    });
    /* name ,version, path are used to identify this block when you do `manager.get` */
    manager.set({
      name: 'myblock',
      version: 'main',
      path: 'index.html',
      block: myclass
    });

You probably will want to use `template` for shadow DOM:

    myclass = new block.class({
      root: document.querySelector('template').content.childNodes[0].cloneNode(true),
      manager: manager
    });


To use this `myblock` defined above:

    manager
      .get({name: 'myblock', version: 'main', path: 'index.html'})
      .then( ... )

    /* alternatively */
    manager
      .from({name: 'myblock', version: 'main', path: 'index.html'}, {root: ...})
      .then ...

You can also use the created class directly:

    myclass
      .create()
      .then ...


## With Template

Here is a simple pattern to use inline blocks with pattern:

    // HTML, in Pug
    // each template contains only one single child as the root of a block
    template(data-name="myblock"): div ....

and the corresponding livescript code:

    node = document.querySelector("template")
    manager.set {
      name: node.dataset.name, version: "main", path: "index.html"
      block: new block.class({root: node.content.cloneNode(true).childNodes[0]}, manager: manager})
    }

You can use `ldview` to abstract this concept:

    // HTML in Pug
    template(ld="template", data-name="myblock"): div ...

and the corresponding livescript code:

    viewcfg = handler: template: ({node}) ->
      manager.set do
        name: node.dataset.name, version: "main", path: "index.html"
        block: new block.class({root: node.content.cloneNode(true).childNodes[0]}, manager: manager})
      }

