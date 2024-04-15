# Bundling

use `manager.bundle` to bundle blocks:

    manager.bundle {blocks: [bd, ...]}

where `bd` is the block definition object.

To run block manager in nodejs context, you have to provide a window for it to work in. Here is an example of running a bundler:

    require! <[@plotdb/block jsdom]>
    dom = new jsdom.JSDOM "<DOCTYPE html><html><body></body></html>"
    block.env dom.window
    mgr = new block.manager({
      registry: ({url, ns, name, version, path, type}) ->
        ...
        /* return value without `https` prefix
           will be considered a local filesystem path */
    })

    mgr.bundle({blocks: [ ... ]})
      .then ({code, deps}) -> /* write `code` to desired out file ... */


# Debundling in NodeJS

`jsdom` is required to debundle since we use browser-context APIs. In order to make `jsdom` works correctly, you will have to set several options.

First, import required modules:

    require! <[@plotdb/block @plotdb/csscope @plotdb/rescope]>


Prepare options for `jsdom`:

    opts =
      # suppress SecurityError for localStorage availability in opaque origin
      url: \http://localhost
      # we use window.eval for context extracting in rescope
      runScripts: \outside-only
      # jsdom window doesn't have `rescope` and `csscope` so we manually inject them.
      beforeParse: (window) -> window <<< {rescope,csscope}
    # with an empty document:
    html = "<DOCTYPE html><html><body></body></html>"


Now you are ready for constructing a new JSDOM:

    dom = new jsdom.JSDOM(html, opts)
    win = dom.window


Last, provide `win` as a executing context for `@plotdb/block`:

    block.env(win);


Now you are ready to debundle:

    new block.manager!
      .debundle [code: '...']
      .then -> ...
