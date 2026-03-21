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

## 偏好技術棧

- **Frontend**: Vue 3 (Vite) + TypeScript
- **Styling**: Tailwind CSS (v3，dark mode 使用 `class` 策略)
- **UI Library**: shadcn-vue
- **Icons**: lucide-vue-next (必須)
- **Package Manager**: pnpm
