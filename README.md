# Blocksmith — C++ Blockly Studio

Blocksmith 是以 React、Vite 與 Blockly 建立的繁體中文 C++ 積木編輯器。使用者可在工作區組合程式方塊，並即時查看產生的 C++ 原始碼。

## 快速開始

需求：Node.js 20.19+ 或 22.12+，以及 npm（隨 Node.js 安裝）。

```bash
npm install
npm run dev
```

開啟 Vite 顯示的本機網址即可使用。常用指令：

```bash
npm run build       # 建置靜態網站至 dist/
npm run preview     # 預覽建置結果
npm run benchmark:search  # 執行搜尋索引基準測試
```

## 功能

- Blockly 積木工作區與即時 C++ 程式碼產生
- 匯出 `.cpp` 原始碼、匯入／匯出 Blocksmith 專案 JSON
- 瀏覽器本機自動儲存、多專案分頁和自動儲存版本還原
- 積木搜尋、方塊背包、工作區小地圖、診斷提示與入門教學
- 淺色／深色模式、配色與工作區版面配置

「編譯並執行」使用 Clang WebAssembly 在瀏覽器本機編譯及執行 C++20 程式；程式碼不會送到外部編譯服務。首次啟動時會下載約 28 MB 的編譯器資源，之後由瀏覽器快取。編譯器在背景工作程序運作，以免編譯時凍結編輯器。F10 可先檢查積木連接與必填值，F11 可編譯並執行。

## 文件

- [使用指南](docs/USER_GUIDE.md)：工作區操作、專案保存、快捷鍵與目前限制
- [開發指南](docs/DEVELOPMENT.md)：專案結構、開發指令及主要模組
- [相容性與還原基準資料](fixtures/README.md)：舊版 Blockly 專案樣本及量測方法

## 靜態部署

`npm run build` 會先將編譯器資源放入 `public/clang/`，再一併輸出至 `dist/`。部署時需保留這些資源。將 `dist/` 部署至靜態網站主機即可。若部署在 GitHub Pages 專案子路徑，需依部署路徑設定 `vite.config.js` 的 `base`，再重新建置。
