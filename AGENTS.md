# UI/UX Case Study - 天條規則

## 禁止事項

1. **禁止使用 `alert()`**：包含 `window.alert()`，任何需要通知使用者的行為必須使用 UI 元件（如 Toast、Dialog、Badge）
2. **禁止使用 Emoji 作為 Icon**：所有圖示一律使用 `lucide-vue-next` 的 SVG Icon 元件，不得使用 ❌ ✅ ⚠️ 等 Emoji
3. **統一案例管理**：新增任何 UI/UX 案例時，必須統一更新 `src/config/cases.ts` 中的 `uiCases` 或 `uxCases`，確保「首頁」、「側邊欄導航」及「全局搜尋模態框」的資料連動同步。

## 偏好技術棧

- **Frontend**: Vue 3 (Vite) + TypeScript
- **Styling**: Tailwind CSS (v3，dark mode 使用 `class` 策略)
- **UI Library**: shadcn-vue
- **Icons**: lucide-vue-next (必須)
- **Package Manager**: pnpm
