# 開發指南

## 工具鏈

- Node.js 20.19+ 或 22.12+
- npm（隨 Node.js 安裝）

在專案根目錄安裝相依套件並啟動 Vite：

```bash
npm install
npm run dev
```

常用專案指令：

```bash
npm run build
npm run preview
npm run benchmark:search
```

Vite 設定會將 Blockly 核心、內建方塊、語系和 React 拆成獨立輸出區塊。`npm run dev` 和 `npm run build` 會呼叫 `clang-wasm-copy-assets`，將編譯器資源複製到被忽略的 `public/clang/`；正式建置會把這些檔案一併放到 `dist/clang/`。工具鏈約 28 MB 壓縮後、解開後約 84 MB，首次執行才會由瀏覽器載入。

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `src/App.jsx` | React 應用程式、Blockly 初始化、C++ 生成器及主要互動流程 |
| `src/blockly.css` | Blockly 工作區和積木樣式 |
| `src/style.css` | 應用程式版面、面板、對話框和外觀樣式 |
| `src/legacyBlocks.js` | 舊版自訂積木與工具箱相容定義 |
| `src/minimalBuiltinBlocks.js` | 延遲載入完整內建積木前所需的精簡註冊與舊 XML 檢查 |
| `src/builtinMutatorCompatibility.js` | Blockly 內建 mutator 的舊專案相容處理 |
| `src/searchCatalog.js` | 可搜尋積木的說明、別名和範例資料 |
| `src/searchEngine.js` | 搜尋文字正規化、匹配和排序 |
| `src/cppCompiler.worker.js` | 背景載入 Clang WebAssembly，編譯並執行 C++ 程式 |
| `scripts/` | 搜尋基準程式、舊版還原基準頁與樣本產生器 |
| `fixtures/` | 可重複使用的舊版／合成 Blockly 專案樣本 |

## 搜尋基準

`npm run benchmark:search` 會用 Node.js 執行搜尋引擎基準程式。瀏覽器端舊版還原基準頁需先啟動 Vite，再開啟 `/scripts/legacy-restore-benchmark.html`。合成樣本的產生方式、量測設定、結果與限制請見 [fixtures/README.md](../fixtures/README.md)。這些基準資料用於開發比較，不代表真實使用者專案的效能。

## 持久化與匯入格式

應用程式以瀏覽器 `localStorage` 儲存工作區、自動儲存備份、專案分頁、偏好設定及搜尋／輸入歷史。Blocksmith 專案匯出格式目前為 JSON，根層包含 `format: "blocksmith-project"`、`version`、`filename`、`exportedAt`、Blockly XML 字串 `xml`，以及自訂工具箱項目 `libraryEntities`。匯入先檢查 JSON、XML 和方塊型別，再取代目前工作區；載入失敗時會還原原 XML。

擴充積木時，請同時確認 C++ 生成器、搜尋目錄（若需搜尋）、舊 XML 相容需求及匯入／還原路徑。新增或修改持久化格式時，請更新本節與使用指南。

## 已知限制

- F10 是快速工作區診斷；F11 透過 Clang WebAssembly 編譯並在瀏覽器執行產生的 C++。
- WebAssembly 使用 WASI 執行環境，無法提供所有原生系統 API；編譯或執行預設在 120 秒後中止。
- 使用者專案與偏好設定以瀏覽器為範圍；需匯出專案 JSON 才能手動備份或移轉。
- `fixtures/` 中的大型專案是合成相容性／效能樣本，不是真實使用者資料。
