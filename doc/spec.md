# block specification

## Document Node JSON Spec

moved to @plotdb/datadom.

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
