# UI/UX 案例研究集 (UI/UX Case Study)

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

![專案預覽圖](/public/images/readme/preview.png)

[🚀 立即查看網頁版 (Live Demo)](https://your-username.github.io/ui-ux-case-study/)

> 一個集結 UI/UX 設計模式、案例研究與實作範例的綜合資源庫。採用 Vue 3、TypeScript 與 Tailwind CSS 構建。
>
> 本專案透過「修改前 vs 修改後」的對照方式，視覺化呈現 UI/UX 的優化邏輯，是設計師與開發者溝通的最佳橋樑。

---

## 🌟 核心特點

- **互動式對比**：提供左右對照（SplitView），直觀呈現介面優化後的差異。
- **現代化技術棧**：基於 Vue 3 與 shadcn-vue，極簡且高性能的架構。
- **全方位分類**：涵蓋視覺設計、互動設計、系統回饋、可用性與防呆、以及效率設計。
- **繁體中文支持**：針對在地開發語境優化，提供清晰的設計邏輯說明。
- **響應式設計**：完美適配桌機、平板與手機等各式裝置。

## 🛠 技術棧

- **前端框架**：[Vue 3](https://vuejs.org/) (Vite)
- **開發語言**：[TypeScript](https://www.typescriptlang.org/)
- **樣式處理**：[Tailwind CSS](https://tailwindcss.com/) (v3)
- **UI 元件庫**：[shadcn-vue](https://www.shadcn-vue.com/) & [lucide-vue-next](https://lucide.dev/icons)
- **表單驗證**：[VeeValidate](https://vee-validate.logaretm.com/v4/) & [Zod](https://zod.dev/)

## 🚀 快速啟動

### 安裝環境
請確保您已安裝 [pnpm](https://pnpm.io/)。

```bash
# 安裝相依套件
pnpm install

# 啟動開發伺服器
pnpm dev
```

### 生產環境建置
```bash
# 執行正式建置
pnpm build

# 預覽建置成果
pnpm preview
```

## 📦 自動部署

專案內建適用於 **GitHub Pages** 的自動部署工作流：
- 檔案位置：`.github/workflows/deploy.yml`
- 觸發條件：當程式碼推送到 `main` 分支時。
- 特色：會自動產生 `404.html` 用於支援 SPA 路由。

## 🤝 參與貢獻

我們非常歡迎任何形式的貢獻！請參閱 [參與貢獻指南](CONTRIBUTING.md) 與 [行為準則](CODE_OF_CONDUCT.md)。

1. Fork 本專案。
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交您的修改 (`git commit -m 'feat: 新增某項超讚功能'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 開啟一個 Pull Request。

## 📄 授權條款

本專案採用 MIT 授權條款。詳情請參閱 [LICENSE](LICENSE) 檔案。

---

用 ❤️ 打造，為了提供更好的使用者體驗。
