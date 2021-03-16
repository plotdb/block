# block

exchangable web building block ( block ) 規格制定.

 * 目標
   - cross-expertise / 三方編輯 ( editor, developer, designer )
   - modularized / 可重用、元件化
   - collaborative / 協作
   - flexibility / 靜態、動態頁面均能開發.

 * 開發規格
   * block 中不可包含任何 id
   * 進入點: index.html, index.css, index.js ( 或者, index.html )
     - 允許任何形式的 transpiling
       - pug, styl 做為特例特別支援? html / css / js 要替他生成嗎？
       - 感覺是編輯器才有這個需要.
     - 引入檔案?
   * sanity checker? 檢查 id 或其它限制

 * 套件規格
   * 檔案架構
     - 最少只要有 /index.html 即可運作. 但若滿足其它條件, 則 index.html 不一定要有.
     - 其次, 一定會檢查有無 /package.json, 若有則會從中取得套件資料
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
     所以我們需要一個取用本地端 block 的機制
   * nested package 可參考 npm workspace 怎麼設計:
     - https://github.com/npm/rfcs/blob/latest/accepted/0026-workspaces.md
     - https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major

 * 影響其他 block 的問題?
 * nested block?
 * 假設我有很多個 block, 現在想搬到一個 two column block 中, 該怎麼做? 全選塞入?
   - 編輯器中選取的問題
   - 感覺需要一個獨立的 tree-style block list viewer?

 * 若非明確定義可以編輯的部份, 都不應該讓視覺編輯介面改到. 但是, 樣式可以?
 * 可編輯的區塊若包含 repeat-item, 可以用 mixin 來定義, 以利變數的套用
 * 需要指定使用的 library
   - 得想辦法定義 id & version syntax
 * 各個 block 可以自行定義編輯時可做的動作, 例如
   - 插入 dropdown
   - 插入表單


## Quick Idea

block-runtime - 負責管理 block load, resolve depdendency 等
 - default set - 可以有一組 block
 - dynamically load
Block - 建構的基礎元件. 可包含 child block
root-block - 一個實體化的 Block, 但為根

registry
1. 有一個集中 registry
2. 核心模組
3. 使用者定義模組列表 ( 來源,版本等 )
4. 使用時, 透過 runtime 即時載入
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
