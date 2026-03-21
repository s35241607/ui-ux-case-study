# UI/UX Case Study - 天條規則

## 禁止事項

1. **禁止使用 `alert()`**：包含 `window.alert()`，任何需要通知使用者的行為必須使用 UI 元件（如 Toast、Dialog、Badge）
2. **禁止使用 Emoji 作為 Icon**：所有圖示一律使用 `lucide-vue-next` 的 SVG Icon 元件，不得使用 ❌ ✅ ⚠️ 等 Emoji
3. **統一案例管理**：新增任何 UI/UX 案例時，必須統一更新 `src/config/cases.ts` 中的 `uiCases` 或 `uxCases`，確保「首頁」、「側邊欄導航」及「全局搜尋模態框」的資料連動同步。
4. **統一頁面版面結構**：所有新增的 Case Study 視圖組件之外層容器與標題區，必須統一使用下列 Flex 結構 (不得寫死 max-width 或直接使用 padding)，以確保簡報模式和側邊欄導航時的排版一致性：
   ```vue
   <template>
     <div class="h-full flex flex-col">
       <div class="mb-4 px-4 lg:px-6 pt-6">
         <div class="flex items-center gap-2 mb-2">
           <h1 class="text-2xl font-bold tracking-tight">案例標題</h1>
           <Badge variant="secondary" class="...">分類</Badge>
         </div>
         <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">案例描述...</p>
       </div>
       <SplitView> ... </SplitView>
     </div>
   </template>
   ```
5. **標籤 Badge 統一規範**：Case Study 標題旁的 Badge 必須與其在 `cases.ts` 的所屬分類對應：若為 UX 類，使用 `<Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗</Badge>`；若為 UI 類，使用對應的藍色 `UI 設計` Badge
6. **下拉選單元件規範**：禁止使用原生的 `<select>` 與 `<option>`，請一律使用 `shadcn-vue` 提供的 `Select` 元件（表單選擇）或 `DropdownMenu` 元件（操作選單與內聯編輯下拉）。
7. **底部按鈕對齊 (Action Buttons)**：表單、對話框 (Dialog) 與抽屜 (Drawer) 底部的操作按鈕應**統一對齊右下方 (Right-aligned)**，也就是使用 `justify-end`。主要的確認/儲存操作擺在最右側，取消或次要操作擺在其左側。
8. **禁止使用 Emoji 作為任何用途**：不僅限於 Icon，任何地方（標題、說明文字、標籤、對比區塊等）都不得出現 Emoji 字元。
9. **禁止標示「開發成本」與「UX效益」**：Case Study 頁面中不需要附上開發成本或 UX 效益等評級標籤，保持內容精簡。
10. **對比區塊用語規範**：左右對比版面（SplitView）的左側欄標題一律使用「**修改前**」，右側欄標題一律使用「**修改後**」，禁止使用「不良的設計」、「優秀的設計」、「錯誤示範」、「正確示範」等帶有評判性或傲慢語氣的詞彙。
11. **副標題措辭規範**：頁面描述（`<p class="text-muted-foreground ...">` 的副標題）應以平實、客觀的方式說明該案例的核心議題，不得使用浮誇、行銷化的語句（如「徹底革新」、「完美呈現」、「極致體驗」等）。
12. **一致性優先原則**：新增或修改任何 Case Study 頁面前，必須先檢視現有頁面的實作方式（版面結構、元件用法、文字風格、互動模式），確保相似的功能採用相同的做法。若現有頁面已有成熟模式，不得自行發明新的寫法，應直接沿用。

## 偏好技術棧

- **Frontend**: Vue 3 (Vite) + TypeScript
- **Styling**: Tailwind CSS (v3，dark mode 使用 `class` 策略)
- **UI Library**: shadcn-vue
- **Icons**: lucide-vue-next (必須)
- **Package Manager**: pnpm
