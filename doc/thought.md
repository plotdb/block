# @plotdb/block

web exchangable building block ( webblock / block ) 規格制定.

 * 目標
   - modularized / 可重用、元件化
   - flexibility / 靜態、動態頁面均能開發.
   - collaborative / 協作
   - cross-expertise / 三方編輯 ( editor, developer, designer )
     - 目前看起來這塊會更著重在 `datadom` 的運用. 或者說, 跟以下模組有關:
       - `datadom`: 內容抽象化
       - `ldview`: 功能模組化

 * 開發規格
   * 進入點: index.html 或由 (TODO/TBD) package.json 定義.
     - 只辨識 html, css 跟 js, 但允許任何形式的事前 transpiling
       - 身為開發者的 plotdb 目前主要語言為 pug, stylus 跟 livescript
         但這透過 `@plotdb/srcbuild` 來支援, 不應另在 `@plotdb/block` 中破例支援.
       - 亦可另外開發 block editor, 在裡面支援各種可能性.
   * 外部資源
     - 允許引入檔案, 但 (TBD) 應妥善定義連結的 scope 與功用.
       - 目前我們使用 pug 時, 為了將 pug 模組化而使用 `@/` 做為前綴來替代 include path
         - 也許可以參照這個手訪, 在 block 中使用 `@` 做為網址前綴.
       - 這必須要主機支援 `@` 這樣的 route, 才能正確取得資源檔 ( js, css, img, font, etc )
       - 參照下方關於 `assets` 的相關討論.
   * 基於 html/css/js 的限制
     - html 中不可包含任何 id
       - sanity checker? 檢查 id 或其它限制
     - js 要依 internal object interface(ioi?) 介面製作
       - js 部份可能會有數層物件:
         - block 類別的共通介面, 供管理、建立 block, 提供既定的 API 跟已知的作業情境.
         - 前者與 block 本身的溝通介面, 有既定的 API / Interface 待 block 實作者製作
         - 由 block 自己管理的內部物件, 可以是任何形式

 * 套件規格
   * 檔案架構
     - 最少只要有 /index.html 即可運作
 * 套件規格 ( TBD )
   * 檔案架構
     - 仍應保留利用任何檔案或機制建立進入點的可能.
       - 例如, 可以檢查有無 /package.json, 若有則會從中取得套件資料
         - block 相關資訊放在 blockinfo 物件中 ( 或者其它名稱? ) 其中包含:
           - block dependency
           - lib dependency
           - 入口檔案 ( html, css, js )
         - 確認套件名跟版本 (name, version )

   * 打包格式?
     - json: {files: {'index.html': "...", 'index.css': ..., 'somefile': {type: 'base64', content: ...}}}
     - zip? 其它 binary format?
   * 版本控制: 使用 git?
     - 取得 block: get git://someurl/sompath/
   * 區塊可以來自任何地方.
     - 非認證區塊要顯示警語
     - 也可以提供區塊列表
     - 可以自建常用區塊清單
     - 可以當場自行編輯區塊
   * npm?
   * 一旦在編輯器中客製 block, 這個 block 就沒辦法透過 name@version 將引用傳遞給其它用戶, 因為他只在某用戶的本地端/
     - 也許可以將原始 block 以 extend 形式另外保存
     - 我們需要一個取用本地端 block 的機制
     - 若元件分組並有較多子元件可能會需要 nested package.
     - nested package 可參考 npm workspace 怎麼設計:
       - https://github.com/npm/rfcs/blob/latest/accepted/0026-workspaces.md
       - https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major
   * js / css purpose block?
     - 因為 block 本身就已可包含 css 跟 js, 可以考慮提供只有 js, css 或兩者 as lib ?
     - 最 naive 就透過 name@version 找 package.json 看 `main`, `style` 或 `browser` 欄位.
       - 但這就一般套件. 也會需要定義是否 global. 如:
         {name, version, global: true}
     - 光只有 name@version 不一定能識別. 最糟就 fallback 到 package.json. 也可以依 registry 定義, 或者就找index.html.
     - index.html 的情況, 資訊定義在 js 的 {pkg} 中. 相較於 package.json, block dependencies 看起來更適合前端?
       - js 可以就在 blobk js 中 {pkg, exports} 的 exports 傳回.
       - 或沒有 {pkg, exports} 也可以直接就執行 js 內容?
       - css 可同理, 這樣或者就讓 rescope / csscope 直接 load content.
 * 影響其他 block 的問題?
 * nested block?
 * 編輯的考量
   - 假設我有很多個 block, 現在想搬到一個 two column block 中, 該怎麼做? 全選塞入?
     - 編輯器中選取的問題
     - 感覺需要一個獨立的 tree-style block list viewer?
   - 若非明確定義可以編輯的部份, 都不應該讓視覺編輯介面改到. 但是, 樣式可以?
   - 可編輯的區塊若包含 repeat-item, 可以用 mixin 來定義, 以利變數的套用
   - 需要指定使用的 library
     - 得想辦法定義 id & version syntax
   - 各個 block 可以自行定義編輯時可做的動作, 例如
     - 插入 dropdown
     - 插入表單


## Quick Idea

 * block-manager - 負責管理 block load, resolve depdendency 等
   - default set - 可以有一組 block
   - dynamically load
 * Block - 建構的基礎元件
   - 可包含 child block (?) ( 不清楚這個概念是什麼 )
 * root-block - 一個實體化的 Block, 但為根
   - 可能可以做為一個特例跟隨 block lib 本身提供.

registry
1. 有一個集中 registry
2. 核心模組
3. 使用者定義模組列表 ( 來源,版本等 )
4. 使用時, 透過 manager 即時載入
  - 亦可控制行為, 比方說限制使用範圍, 禁止動態載入
5. 可載入一組 Blocks, 但亦可各別載入子 blocks

考慮 form-block 的情況
 - form-block 可以像 google form 一樣大, 也可以僅拿來代表一個 input field
   但他們都會需要額外的處理程式. 或者, 需要定義特別的介面來處理 validation
 - 所以, 是不是 block 都會需要有額外定義介面的可能性?
 - form-block 分 code & html, 載入時可能會有純 code 的情況?
   用 block 來載入 library?

## 檔案目錄定義

每一個 block 都有一個獨立的目錄結構. 其中包含:

 * index.html, index.css, index.js - 主要進入點.
   - 容許無 index.html 的 block 嗎？ headless block for script, css or content control?
 * index.jpg / index.svg / index.png ( 到底要用哪個? ) - 縮圖
 * index.json (?) - metadata


## 結構定義 ( 當前設計. 應該要移至 editable? )

利用 HTML 定義基本的 block 結構.

 * 自動生成的結構 ( 製作 block 時不需寫 )
   * 最外層為一 div, classname = block-#{block-anem} block-item
     - attr: base-block="block名字" ( 應該要改成某種 uid? )
     - attr: id - 每個區塊都有獨立 id, 方便使用者指涉
     - attr: eid - ?
   * 考慮到 block 樣板 可能正在載入, 會需要 loading / load fail 的 ui, 也就需要額外定義特殊的 DOM, 避免被 serialize 同時方便顯示


## 參數定義 ( 當前設計. 應該要移至 editable? )

 * attr: repeat-item
   - 可自由複製數量的節點
 * attr: repeat-host
   - 做為 repeat-item 的 container
   - host 中的最後一塊 item 不應該被刪除? 或者, 刪掉後要顯示 placeholder?
 * attr: edit-text / edit-text-placeholder
   - edit-text="attr-name", 設定此屬性會讓編輯器在適當時機彈出數值編輯框
   - edit-text-placeholder 編輯框的 placeholder
 * attr: resizable
   - 允許用戶透過滑鼠拉邊框重調大小.
     - aspect ratio? use percentage? media query?
 * attr: editable
   - 設定為 false 時, 此區塊下禁止編輯
   - 此設定會讓此節點形成一獨立 contenteditable. ( TODO: 另外用一個方式描述這個行為? )
   * 確認?
     - 因為 contenteditable 的行為, 在 content 中有 block 時, 游標無法出現在 block 之後, 一定會在之後的第一個字後面
       刪除文字時, 若在之後的第一個字往前刪, 會接著刪除 block 的內容.
       如果 block 是像按鈕一樣的自成單位, 應該要設計成按 backspace 時直接刪掉整個按鈕.
       目前確認是只要將 block 設定 contenteditable = false 即可達成這個效果.
   * 有些地方不適合放區塊, 要禁止 subblock
有些區塊不適合跟內容混在一起編,
 * attr: image
   - 指定此區塊為圖片, 在適當時機彈出圖片上傳介面
   - 設定 image="bk" 時, 在適當時機可以讓用戶額外設定 repeat, position, size, attachment 等
 * attr: auto-content
   - 內容為自動生成, 不應該被 sync
 * 追加?
   - attr: animate
     - 可能有幾種方向: - (文字 / 方塊) (進場 / 重覆 / 狀態) 動畫
       - 設定動畫類型時, 除了用絕對值 (e.g., ld-bounce) , 是否也可以用變數? (e.g., $main-animation)
   - attr: containable
     - 裡面可以拖進其它 div, 但不適合放置文字 或其它 inline 物件


## 對應的 Pug 定義 ( 尚未經認真思考 )
 * repeat-item:
   +block-repeat-item(list)
   展開成
   div(repeat-host)
     each item in host
       div(repeat-item)
 * editable
   +block-editable(value)
   展開成
   div(editable) #{value}
 * resizable
   +block-resizable
   展開成
   div(resizable)

## 討論

 * assets
   - 怎麼想都不可能直接用檔名來用
     1. sandbox 中無法建立目錄結構
     2. 不同 block 中會衝到, 一定得 scope
     3. 可能的解法:
       - 用 stylus / pug mixin, 但這樣就只能用在 stylus & pug 中
         - 比方說, block blank 用到 sample/1.jpg
           - pug:
             +asset("sample/1.jpg")
           - 展開成:
             "https://assets.block/blank/<version>/sample/1.jpg"
             ( 也許可以參考 jsdelivr 的規則? )
         - 但這樣做有幾個問題
           - 若展開至其它服務, 則會有服務基於他者的問題
           - 若展開至自己, 則可能得基於 cloudflare 類的服務, 有成本的潛在風險
             - 需要精算?
       - 使用 service worker?
         - 但若要辨識來源, 還是需要在網址中提供 `name@version` ...
           - 由 js 處理? 要怎麼判斷哪些是 src? background image 怎麼辦?
         - 不支援 serviceworker 就麻煩了
       - 針對 src / href 做過濾? 再提供 API 讓 JS 呼叫?
         - 窮舉所有 use case? 難度很高
       - 利用 "/@/name/version/filename" 的形式, 並要求使用者建立 asset server, serving /@/ path
         - 就很麻煩.
         - 而且使用 DOM initialize 時怎辦? 進 innerHTML 再轉出?
         - 如果橫豎都要處理的話, 那用 `/@/filename` 不就好了?
     4. js dependency 中若有 worker.js, 可能也會有一樣的困擾
   - 即便透過 base64 embed 也不合理, 因為這樣會混入 DOM tree:
     - 無法 cache
     - 可能會讓 block.class 變很大.
     - 在 html / css 中引用一樣需要參數化
   - 因此還是得透過網址. 網址:
     - 若使用任意網址, 風險自負? ( e.g., some-cdn/blah/my.jpg )
     - 使用 md5, 製造 unique url?
     - block.manage 載入時處理掉?
       - 這樣的話, js 端就必須要提供 api 供用戶做 mapping
   - assets 也可能存在套件供引用
   - 引用外部檔案的方式
     - img(src)
     - a(href)
     - css @import
     - script, link
     - style="background-image"
 * i18n
   - 怎辦?
   - 已大致搞定.
