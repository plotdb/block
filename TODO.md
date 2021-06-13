 - exception within module may not be tracked.
   - e.g., we can't know the correct line number when exception occurred in `chart.render` in `@plotdb/chart`.
 - DOM preprocessor
   - we may want to transform DOM in advance automatically for, such as, i18n.
     - we can by default enabling i18n and can be configured with pkg.dom-processor
     - processor can be available in block.processor.i18n 
     - run with block.class as context, or auxiliary object.
     - i18n can use following schema:

    div(t="text to translate")
    div(t="text to translate",t-attr="attr-name-if-applicable")
     
