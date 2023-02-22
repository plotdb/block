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
