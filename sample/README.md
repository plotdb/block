# @plotdb/block — Samples

Each subdirectory is a standalone block definition file (plain HTML) demonstrating a different feature of `@plotdb/block`.

The loader page `sample/index.html` is responsible for loading and displaying all examples.
Run `npm start` and open `http://localhost:3000/sample/` to browse them.

(`web/static/sample` is a symlink pointing to this directory.)

---

## Examples

| Directory | Block name | Demonstrates |
|---|---|---|
| `01-hello-world/` | `hello-world` | Minimal block: HTML + `init()` |
| `02-scoped-style/` | `scoped-style` | `<style>` is automatically scoped — styles don't leak out |
| `03-interface/` | `counter` | `interface()` exposes a public API |
| `04-data/` | `profile-card` | `opt.data` lets different instances render different content |
| `05-extend/base-card/` | `base-card` | Base block defining `<plug>` slots |
| `05-extend/news-card/` | `news-card` | `pkg.extend` inheritance + filling plug slots |
| `06-i18n/` | `i18n-demo` | `pkg.i18n`, `t="key"` attribute, language switching |
| `07-headless/` | `event-bus` | Headless block with no DOM |
| `08-remote/` | `clock` | Block loaded from a remote URL via the registry |

## Block structure

Each block file is standard HTML with the following shape:

```html
<div>
  <!-- visible HTML content -->
  <style>
    /* CSS here is automatically scoped to this block only */
  </style>
  <script type="@plotdb/block">
    module.exports = {
      pkg: { name: '...', version: 'main' },
      init: function(opt) { /* opt.root, opt.data, opt.t, opt.ctx, ... */ },
      interface: function() { return { /* public API */ }; },
      destroy: function() { /* cleanup */ }
    };
  </script>
</div>
```

## Loader (`sample/index.html`)

The loader demonstrates two registration approaches:

1. **Inline template** (example 00): define a `<template>` directly in the page HTML and register it with `mgr.set()`. No server round-trip needed.
2. **Registry URL** (examples 01–08): the `registry` function in `block.manager` maps a block name to a URL; the manager fetches, parses, and caches it automatically.
