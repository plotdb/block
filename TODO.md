 - optimization
   - use block to wrap css + js in HTML.
     - make it possible to inject into html with declarative shadow dom
       - or at least indirectly throught loader script.
     - eval once all the bundle with DOMParser
       - https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
       - what happens for js css when using DOMParser?
     - recursively retrieve blocks based on @plotdb/block's rule, listing all dependencies and bundle them.

 - prevent circular dependencies ( extend self ) and provide proper error
 - dependency: support multiple files in one declaration. e.g., 

    {name: "@plotdb/module", version: "main", path: ["index.js", "index.css"]}

 - by pass dom should ( probably bypass style? )
 - exception within module may not be tracked.
   - e.g., we can't know the correct line number when exception occurred in `chart.render` in `@plotdb/chart`.
   - with bundler, is this still a problem?
 - DOM preprocessor
   - we may want to transform DOM in advance automatically for, such as, i18n.
     - we can by default enabling i18n and can be configured with pkg.dom-processor
     - processor can be available in block.processor.i18n 
     - run with block.class as context, or auxiliary object.
     - i18n can use following schema: ( how to support multi-attributes? )

    div(t="text to translate")
    div(t="text to translate",t-attr="attr-name-if-applicable")
