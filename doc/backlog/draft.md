## environment api?
 - get mode ( 確認當前模式 )

## block html attribute
 - block: CSS class-like block class definition, with following possible classes:
   - fit: this block should fit ( maximize size )
   - inline: this is an inline block.

## inheritance, block group? ( tentative )
 - with `extend`, by name or object. ( TODO: name )
   - for every block in the inheritant chain, we create an object for it.
   - store in `block.instance`'s `obj` member.
 - communicate between block object throught `pubsub` params.
 - access parent directly throught `parent` params. ( TBD? remove this for encapsulation? )
 - how code editing works? how to update block? ( TODO )
