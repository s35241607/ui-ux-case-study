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

## 偏好技術棧

- **Frontend**: Vue 3 (Vite) + TypeScript
- **Styling**: Tailwind CSS (v3，dark mode 使用 `class` 策略)
- **UI Library**: shadcn-vue
- **Icons**: lucide-vue-next (必須)
- **Package Manager**: pnpm
