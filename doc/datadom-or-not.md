1. plain DOM -> JS init by query -> global JS
 - 不易重用, 互相影響.
 -> modularize 
 -> 將 js, html, css 獨立存取. lib 隔離. css scoping.
 -> 要使用時, 由其它 js 要求
 -> 標準化介面與生命週期.
 -> 透過 js 引用樹建立連結 ( pubsub, eventbus, callback, api, etc )

2. 
 - module 後, 失去了 DOM 的優點
   - 想互相引用, 必須寫 js
   - 不管多簡單的頁面, 都必須靠 js 來架構.
 -> 用 custom element 包裝 module ( cemodule ): 由瀏覽器自動協助初始化
   - naming 有限制. scope 太隔離, 反而不易使用 )
   - 無法自動載入
 - 需要 dom parser
   - 分析 dom tree, 找到 custom element 時, 動態載入對應 module

3. dom parser 依需求分析 dom tree, 協助載入 module 初始化
 - 但 module 間如何溝通? -> 直接透過 node 
   - node.moduleInstance.api() # 會影響 node 
   - wm.get(node).api() # 使用 weakmap -> 但 wm 從何來?
     - dom-parser -> 這樣模組會變成 dom parser aware!
   - module-builder -> modulebuilder.wm.get(node).api()
     block.manager.block-for(document.querySelector('some-my-node'))
   v block.from = (some-my-node) -> block.wm.get(some-my-node) 
     - 然後每次 block.instance construct 就塞進 wm 中:
       (block.wm or (block.wm = new WeakMap!)).set node, bi

4. dom parser 可以 parse dom tree 來處理, 但這樣會產生一個問題
   dom tree 中某 node 的subtree 與 node 原本定義衝突
  - 處理方式
    - 無視 node tree ( 完全客製 )
    - 無視 dom tree  ( 完全生成 ) 
    - dom tree 以 <plug> 語法, 經 module 協助安插入 node tree ( 混合內容 )
    - node tree 以 <plug> 語法, 經 module 協助安插入 dom tree ( 逆混合內容. 這個概念很奇怪, 先略過不談 )
  - 要怎麼辨識處理方式?
    - module 定義 aka 不需辨識
      - 只要有 dom tree, 就一定先 parse
      - parse 過後的 dom tree 傳給 module, 要不要用則隨意.
  - but! 這代表 node tree 也會需要處理. node tree 甚至可能也有 custom element.
    - 需要 dom parser 進來處理? 
    - 應該交給 module 用戶處理? 情境
      - 某 domtree 使用 moduleA. domparser 分析到 moduleA:
      - domparser 請 moduleloader 載入 moduleA. 然後, 初始化 moduleA
      - domparser 將 moduleA sub-domtree 餵給 moduleA. 
      - moduleA 回應確定要使用的 domtree
      - domparser 繼續 parse 下去.


也因此, 我們以下列定義, 完整的將 block 與 datadom 機制切開:

@plotdb/block 的任務
 - 封裝 html,css,js 於一處
 - 協助載入,版本管理,生命週期管理.
 - 引導建立時的DOM處理.
   - 載入 module. 確認 module 的 policy
     - 客製 - 直接回覆 input dom tree
     - 生成 - 回覆 module node tree. 若有 plugs dom trees, 則嘗試合成.
   - css, js 是否也接受 customization? 
     - 至少 css 應該可以. 因為串接的特性, 沒有 DOM 合成時的問題, 併成一個大表即可.

@plotdb/datadom 的任務
 - 初始化: 取得一 datadom tree
 - 將 datadom tree 轉成 dom
 - 轉換成 dom 以後, traverse dom 尋找自定義標籤
 - 找到自定義標籤:
   - datadom 建立 placeholder, 顯示處理中
   - 請 plugin 處理 ( 此處的 plugin 會是 @plotdb/block wrapper )
     - 子樹 dom 傳入 plugin. plugin 依 name@version 找到 module, 要求 module 初始化並回傳 dom tree
     - dom tree 傳回給 datadom.
   - datadom 以回傳的 dom tree 取代 placeholder
