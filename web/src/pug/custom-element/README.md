this is a tiny block implementation for experimenting `block inheritance` with:
 - pure js approach
 - custom element

inheritance should cover dom, style and script:
 - dom: use `slot`
 - style: cascade ( may need additional name? )
 - script: oo approach. ( who calls corresponding functions in block lifecycle? )

discussion
 - use `custom-element` seems impractical, because:
   - while events propagate out of shadow DOM, querySelector won't work.
     - this means that any JS over global querySelector won't work, such as popup, dropdown in Bootstrap.
   - with nested structure such as `form` + `input`:
     - if `input` is in shadow-DOM, it behaves like that it's not in form.
 - but `slot` only works with custom element.
 - so, for now we should not use `custom-element`. and thus we don't use `slot` for slot effect,
   but use alternative name `plug` with same usage, to prevent collision.
