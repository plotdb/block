
使用 `@/<path>` 供前端存取套件.

 - 套件應經設定才能供前端存取 ( e.g., fedep, 或某種全開放 / 特定規則的設定)
   - 此設定可供 nginx & express server 做為 rule 依據
   - pug 可透過 `@/<module-name>/<path>` 引入套件
   - html 可透過 pug 搭配 script mixin 來代入相對連結, 如:
     - `script('@/<module>/<path>')` 代換成 `script('assets/lib/<module>/<path>')`
     - 或, 不需代換但直接透過 nginx 改寫 rule. 這樣就可以解決 assets path 問題.
   - 提供 overwrite 機制. 可設定同一 module 來自多個 package
     - 如:
       - auth: <[auth @plotdb/auth]>
       - cover: <[cover @plotdb/cover]>
     - 在檔案找查的時候, 找不到的檔案自動 fallback:
       - @/cover/site-down.html(404) -> @/@plotdb/cover/site-down.html(200)
   - 後端程式亦可用類似規則來取得檔案:
     - at-require('@/cover/site-down.html')
       - expand to `node_modules/cover/dist/site-down.html`
   - 考慮提供 separate module context. 如, `@block/` 會改找查 `block_module` 目錄.

     
