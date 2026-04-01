# openfun.tw 專案架構說明

> 本文件為給 AI 助理的快速參考，避免每次重新掃描。
> 最後更新：2026-04-01

---

## 專案概述

**歐噴有限公司 (OpenFun Ltd.)** 的官方網站，專注於台灣政府資料透明化與國會監督數位工具。

- **Domain:** openfun.tw（CNAME 設定）
- **Server:** Express.js on Node.js，Port **3006**，由 PM2 管理（pm2.config.cjs）
- **對外反向代理:** 推測為 Nginx/Apache → port 3006

---

## 技術棧

| 層級 | 技術 |
|------|------|
| 後端伺服器 | Express.js (Node.js) |
| 前端框架 | Vue 3（CDN，`js/vue.global.js`） |
| 樣式 | 自定義 SCSS → PostCSS（Autoprefixer + Prettify）→ CSS |
| 第三方 JS | jQuery 3.7.1、Owl Carousel 2.3.4 |
| 字型/Icon | Google Fonts（Open Sans、Pragati Narrow）、Material Symbols |
| 分析 | Google Analytics（ID: G-P99SGF4QQD） |
| 廣告 | Google Ad Manager（ads.txt） |
| 流程管理 | PM2（watch mode 自動重啟） |

### Build 指令
```bash
npm run build   # sass scss/common.scss css/common.css && postcss pipeline
npm run dev     # nodemon 監看 scss/js，build + node index
```

---

## 目錄結構

```
openfun.tw/
├── index.html          # 主頁（1056 行，主要內容都在這）
├── index.js            # Express server 入口（19 行）
├── index.bak.html      # 備份
├── package.json        # 依賴與 build scripts
├── pm2.config.cjs      # PM2 設定（app name: openfun.boggy.tw）
├── postcss.config.js   # PostCSS plugins（autoprefixer, prettify）
├── CNAME               # openfun.tw
├── ads.txt             # Google Ad Manager
├── favicon.ico
│
├── css/                # 編譯後的 CSS（勿手動修改）
│   ├── common.css
│   └── common.css.map
│
├── scss/               # SCSS 原始碼（修改這裡）
│   ├── common.scss     # 入口，import index + utils
│   ├── index.scss      # 各 section 樣式（531 行）
│   ├── utils.scss      # 變數、mixin、utility classes（423 行）
│   └── index.bak.scss  # 備份
│
├── js/
│   ├── common.js       # Vue 3 app 初始化（49 行）
│   ├── latest_news.js  # 動態新聞載入（73 行）
│   ├── vue.global.js   # Vue 3 完整 build（15505 行，CDN）
│   └── common.bak.js   # 備份
│
├── images/             # 靜態圖片（43 個）
│   ├── partner/        # 合作夥伴 logo（ccw, crc, g0v, ocf...）
│   └── work/           # 產品截圖（lyapi, pcc, bow-doctor...）
│
├── ly-user-study/      # 研究報告 PDF 檢視器（中文版）
│   └── index.html
├── ly-user-study_en/   # 研究報告 PDF 檢視器（英文版）
│   └── index.html
│
└── 0608/ 0630/ 0803/ 1130/ 1207/ 1222/   # 活動頁面（見下）
```

---

## 主頁 (index.html) Section 對應

| Section ID | Class | 說明 |
|---|---|---|
| `#top` | `.top` | Hero，parallax 背景，主標語 |
| `#about` | `.about` | 公司使命說明 |
| `#works` | `.works` | 作品集（Vue Tab 切換） |
| `#news` | `.news` | 最新消息（動態從 GitHub JSON 載入） |
| `#keymoments` | `.keymoments` | 重要時刻（Owl Carousel 圖片輪播） |
| `#members` | `.members` | 歐噴成員 |
| `.site-footer` | — | 合作夥伴 logo 列表 |

導覽列目錄：關於歐噴 / 作品集 / 最新消息 / 重要時刻 / 歐噴成員 / 合作夥伴

---

## Vue 3 響應式狀態（js/common.js）

| 變數 | 說明 |
|---|---|
| `rwdMenuVisible` | 手機漢堡選單開關 |
| `headerLightBg` | 捲動後 header 背景切換 |
| `bgPos` | Parallax 背景位移（scroll event） |
| `workListType` | 作品集 tab（product/data/research/speech/media_exposure） |

Vue app 掛載於 `._index`，`createApp` + CDN Vue 3。

---

## 動態新聞（js/latest_news.js）

從 3 個 GitHub raw JSON 端點抓資料，合併排序顯示最新 5 則：
- `lawtrace` → 綠色 tag
- `lyapi` → 黃色 tag
- `openfun` → 藍色 tag

渲染至 `.news-list`。

---

## 作品集資料（index.html 內 Vue data）

Tab 分類：
- **product**（主要產品）：OpenBudget、LawTrace、台灣公司資料、開放立法院、國會 AI 逐字稿
- **data**（資料）：LYAPI、標案資料、台灣公司資料
- **research**（研究）：研究報告
- **speech**（專題演講）：YouTube 影片、研討會演講
- **media_exposure**（媒體露出）：新聞、Podcast

---

## 活動頁面（MMDD 目錄）

簡單的活動資訊 hub，連結到 Google Docs/Slides/HackMD 等外部資源，多使用 Bootstrap 3 或 inline style。

| 目錄 | 活動 |
|---|---|
| 0608 | 東吳大學國會助理工作坊 |
| 0630 | R-Ladies Taipei 野生的國會 API |
| 0803 | 資源連結頁（連結.html） |
| 1130 | 國會松工作坊連結 |
| 1207 | 2024 開放國會黑客松 |
| 1222 | （特定日期活動） |

---

## 研究報告頁面（ly-user-study）

- **中文版** `/ly-user-study` → 訪談 11 位立法院資料用戶的研究報告 PDF
- **英文版** `/ly-user-study_en` → Digital Tools for Parliament Information in Taiwan
- 皆為 PDF 嵌入頁，含 iOS/Android/Firefox 偵測及下載備援連結
- PDF 實際存放於 `https://openfunltd.github.io/ly-user-study/`

---

## SCSS 架構

- `utils.scss`：CSS 變數（`--blue`, `--purple`, `--red`...）、mixin、breakpoints
- `index.scss`：各 section 專屬樣式
- Breakpoints：`max-width: 991px`（平板）、`767px`（手機橫）、`575px`（手機直）
- Parallax 用 CSS 變數 `--bg-pos` 配合 Vue reactive 更新

---

## Express 路由（index.js）

```
GET /                → index.html
GET /ly-user-study   → ly-user-study/index.html
Static: /favicon.ico, /images, /css, /js, /robots.txt
Port: 3006
```

注意：`/ly-user-study_en` 沒有 Express 路由，只有靜態檔案。

---

## 常見修改位置

| 修改目標 | 位置 |
|---|---|
| 主頁內容（文字、圖片） | `index.html` |
| 樣式修改 | `scss/index.scss` 或 `scss/utils.scss`，改完執行 `npm run build` |
| 新增作品集項目 | `index.html` 內的 Vue data（works 陣列） |
| 修改伺服器路由 | `index.js` |
| PM2 設定 | `pm2.config.cjs` |
| 合作夥伴 logo | `images/partner/` + `index.html` footer |
| 活動頁新增 | 新建 MMDD/ 目錄並放 index.html |
