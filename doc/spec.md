# block specification

## Document Node JSON Spec

document tree is converted into json representation. Following is the member of each node in json:

 - `type` - node type. such as `tag`, `block`, `text`
    - `tag` - markup language tags
    - `block` - block
    - `text` - plain text
 - `name` - node name. ( optional, dependning on type )
    - such as `div` for tags, or `my-list` for block
    - all lower cases for block type and html in tag type
      - allow case sensitive for svg tags? check how createElementNS works
 - `version` - block version, ( only applicable to `block` type node )
 - `attr` - node attributes
 - `style` - node styles
 - `cls` - node classes
 - `data` - node data. ( optional, depending on type )
   - for `text` type: string for `textContent`
   - for `block` type: custom data following block data spec.
   - for `tag` type: not applicable.
 - `child` - array of child nodes. not applicable for `text` type node.


## Block Data Spec

## draft

 * npm 風格套件. 亦有 package.json
 * 最小需求: 一個 html, 一個 package.json
   - 但若有 js, js 應依規格撰寫
     - init, destroy, view mode, etc
 * 可用其它語言撰寫, 但發布前需自行編譯.
   - 前端編輯器可提供 transpiler

 * 引入套件: 透過 block manager
 * 載入 block 以 block 物件代表
   - 基本 dom tree
   - 初始化

 * block 物件可實體化 block instance. block 類似中介模組:
   block(func) -> block(obj) -> block-instance(obj)
