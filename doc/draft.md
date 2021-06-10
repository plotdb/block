 - 每個 block 有 html, css, js 檔.
 - html 依指定格式編排. 
 - 儲存 html code. 直接做 diff 進 sharedb.
 - 前端分析 html 結構提供編輯
 - 單一主機管理. 固定架構 


dev 寫 index.html, 但 txt 不會改.
dev 將 可編輯範圍與 code 分離. 分離方式規格化.

編輯形式?

1. 排版
2. 元件
3. 樣式
4. 內容


html+css+js -> json ( dom tree )

 定義可修改的部份

 ( 所有的文字? )
 ( 所有的樣式? )
 - 自動生成的文字怎麼辦?  - span 括起來
 節點可複製, 僅可移動到同一層級或其它同名的父節點. 


## draft

 * npm 風格套件. 亦有 package.json
 * 最小需求: 一個 html, 一個 package.json
   - 但若有 js, js 應依規格撰寫
     - init, destroy, etc
 * 可用其它語言撰寫, 但發布前需自行編譯.
   - 前端編輯器可提供 transpiler

 * 引入套件: 透過 block manager
 * 載入 block 以 block 物件代表
   - 基本 dom tree
   - 初始化

 * block 物件可實體化 block instance. block 類似中介模組:
   block(func) -> block(obj) -> block-instance(obj)
