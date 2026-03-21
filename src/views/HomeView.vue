<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight, Layers, Maximize2, AlignLeft, MousePointer2, LayoutTemplate, Loader2, Bell, Navigation, FileWarning } from 'lucide-vue-next'

const router = useRouter()

const uiCases = [
  {
    icon: Maximize2,
    title: '視覺間距與舒適度',
    type: '視覺設計',
    desc: 'padding 與 margin 的合理運用，讓畫面有呼吸感，不讓用戶感到壓迫。',
    path: '/case/spacing',
  },
  {
    icon: AlignLeft,
    title: '資料對齊與數字格式',
    type: '資料呈現',
    desc: '文字靠左、數字靠右，並搭配千分位格式讓資料一目了然。',
    path: '/case/data-alignment',
  },
  {
    icon: MousePointer2,
    title: '按鈕階層設計',
    type: '互動設計',
    desc: '利用 Primary / Secondary / Ghost 視覺重量引導用戶完成主要操作。',
    path: '/case/button-hierarchy',
  },
  {
    icon: LayoutTemplate,
    title: '按鈕收納與工具列',
    type: '資訊架構',
    desc: '功能過多時，只保留常用按鈕，其餘收納在 More 選單。',
    path: '/case/button-overflow',
  },
]

const uxCases = [
  {
    icon: LayoutTemplate,
    title: '表單驗證與即時回饋',
    type: '表單體驗',
    desc: '在用戶輸入時即時驗證並提示，而非等送出後才集中報錯。',
    path: '/case/form-validation',
  },
  {
    icon: Loader2,
    title: '載入狀態反饋',
    type: '互動回饋',
    desc: '觸發事件後要有 loading 狀態，避免用戶不知道系統是否正在處理。',
    path: '/case/loading-feedback',
  },
  {
    icon: Bell,
    title: '事件回饋：Toast vs Modal',
    type: '狀態通知',
    desc: '成功、失敗的回饋應選擇適合的 Toast 或 Modal，而非一律使用彈窗。',
    path: '/case/success-feedback',
  },
  {
    icon: Navigation,
    title: '導覽狀態保留',
    type: '導覽行為',
    desc: '返回上一頁時保留查詢篩選狀態，並支援中鍵開新分頁。',
    path: '/case/navigation-state',
  },
  {
    icon: FileWarning,
    title: '未儲存資料提示',
    type: '資料保護',
    desc: '表單填到一半意外離開時，應提示用戶或自動保存草稿。',
    path: '/case/unsaved-changes',
  },
]
</script>

<template>
  <div class="flex flex-col gap-8 px-4 pb-8 lg:px-6">
    <!-- Hero -->
    <div class="py-8">
      <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4">
        <Layers class="h-3 w-3" />
        互動式設計思考示範
      </div>
      <h1 class="text-4xl font-bold tracking-tight mb-3">UI/UX Case Study</h1>
      <p class="text-muted-foreground text-base max-w-2xl leading-relaxed">
        每個案例都是可操作的真實元件，讓你親身感受「不好的設計」與「好的設計」帶來的體驗差異。
        按下 <kbd class="inline-flex items-center rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">⌘K</kbd> 快速搜尋案例。
      </p>
    </div>

    <!-- UI Design Section -->
    <section>
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-2">
          <div class="h-4 w-1 rounded-full bg-blue-500"></div>
          <h2 class="text-lg font-semibold">UI 設計案例</h2>
        </div>
        <span class="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{{ uiCases.length }} 個案例</span>
      </div>
      <p class="text-sm text-muted-foreground mb-4">UI（User Interface）關注的是視覺呈現與互動元素的排版設計——讓介面清晰易讀、層次分明。</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <button
          v-for="item in uiCases"
          :key="item.path"
          @click="router.push(item.path)"
          class="group text-left rounded-xl border bg-card p-4 transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <component :is="item.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold">{{ item.title }}</span>
                <ArrowRight class="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <div class="text-[11px] text-blue-600 dark:text-blue-400 font-medium mb-1">{{ item.type }}</div>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </button>
      </div>
    </section>

    <!-- UX Experience Section -->
    <section>
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-2">
          <div class="h-4 w-1 rounded-full bg-purple-500"></div>
          <h2 class="text-lg font-semibold">UX 體驗案例</h2>
        </div>
        <span class="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{{ uxCases.length }} 個案例</span>
      </div>
      <p class="text-sm text-muted-foreground mb-4">UX（User Experience）關注的是用戶與系統的互動流程——讓每個行為都有合理的回饋與引導。</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <button
          v-for="item in uxCases"
          :key="item.path"
          @click="router.push(item.path)"
          class="group text-left rounded-xl border bg-card p-4 transition-all hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <component :is="item.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold">{{ item.title }}</span>
                <ArrowRight class="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <div class="text-[11px] text-purple-600 dark:text-purple-400 font-medium mb-1">{{ item.type }}</div>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </button>
      </div>
    </section>
  </div>
</template>
