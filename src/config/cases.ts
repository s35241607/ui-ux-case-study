import {
  Maximize2, AlignLeft, MousePointer2, LayoutTemplate,
  Loader2, Bell, Navigation, FileWarning, FolderOpen, CheckSquare, Filter,
  Search, Map, Sliders
} from 'lucide-vue-next'

export interface Case {
  title: string
  path: string
  category: string
  type: string
  desc: string
  icon: any
  tag: string
}

export interface CategoryMeta {
  labelColor: string   // sidebar group label color（含 /80 透明度）
  iconClass: string    // card / modal icon 容器 class（bg + text）
  dotColor: string     // HomeView 色塊 dot
  hoverBorder: string  // HomeView card hover border
  typeTextClass: string // card type 小字顏色
  homeDesc: string     // HomeView 分類說明
}

export const categoryMeta: Record<string, CategoryMeta> = {
  '視覺設計': {
    labelColor: 'text-blue-600/80 dark:text-blue-400/80',
    iconClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    dotColor: 'bg-blue-500',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    typeTextClass: 'text-blue-600 dark:text-blue-400',
    homeDesc: '建立清晰的視覺層次與資訊排版，讓介面一目了然、降低閱讀負擔。',
  },
  '互動設計': {
    labelColor: 'text-violet-600/80 dark:text-violet-400/80',
    iconClass: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    dotColor: 'bg-violet-500',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-700',
    typeTextClass: 'text-violet-600 dark:text-violet-400',
    homeDesc: '設計操作流程與元件互動模式，降低認知負擔並保留操作上下文。',
  },
  '系統回饋': {
    labelColor: 'text-amber-600/80 dark:text-amber-400/80',
    iconClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    dotColor: 'bg-amber-500',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    typeTextClass: 'text-amber-600 dark:text-amber-400',
    homeDesc: '在適當時機給予明確的系統狀態回應，建立用戶信任感與掌控感。',
  },
  '可用性與防呆': {
    labelColor: 'text-rose-600/80 dark:text-rose-400/80',
    iconClass: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    dotColor: 'bg-rose-500',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-700',
    typeTextClass: 'text-rose-600 dark:text-rose-400',
    homeDesc: '透過確認機制與離開提示，防止誤操作與資料意外遺失。',
  },
  '效率設計': {
    labelColor: 'text-emerald-600/80 dark:text-emerald-400/80',
    iconClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    dotColor: 'bg-emerald-500',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    typeTextClass: 'text-emerald-600 dark:text-emerald-400',
    homeDesc: '針對高頻操作場景，最大化每次互動的完成效率，減少重複步驟。',
  },
  '導覽與狀態': {
    labelColor: 'text-indigo-600/80 dark:text-indigo-400/80',
    iconClass: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    dotColor: 'bg-indigo-500',
    hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    typeTextClass: 'text-indigo-600 dark:text-indigo-400',
    homeDesc: '在頁面跳轉與層級切換中保留操作上下文，讓每次返回都回到原點。',
  },
}

// ── 1. 視覺設計 ────────────────────────────────────────────────
export const visualDesignCases: Case[] = [
  {
    title: '視覺間距與舒適度',
    path: '/case/spacing',
    category: '視覺設計',
    type: '間距系統',
    desc: '建立一致的 8pt 間距系統，透過留白建立元素的從屬關係，降低視覺擁擠感。',
    icon: Maximize2,
    tag: 'visual',
  },
  {
    title: '資料對齊與數字格式',
    path: '/case/data-alignment',
    category: '視覺設計',
    type: '資料呈現',
    desc: '文字靠左、數字靠右，搭配千分位格式，讓表格資料一目了然。',
    icon: AlignLeft,
    tag: 'visual',
  },
  {
    title: '按鈕階層設計',
    path: '/case/button-hierarchy',
    category: '視覺設計',
    type: '視覺層級',
    desc: '利用 Primary / Secondary / Ghost 視覺重量建立按鈕層次，引導用戶優先執行重點操作。',
    icon: MousePointer2,
    tag: 'visual',
  },
]

// ── 2. 互動設計 ────────────────────────────────────────────────
export const interactionDesignCases: Case[] = [
  {
    title: '內聯編輯 vs 彈窗編輯',
    path: '/case/inline-edit',
    category: '互動設計',
    type: '漸進揭露',
    desc: '直接在列表中修改欄位，取代跳轉或開啟彈窗，減少流程中斷。',
    icon: LayoutTemplate,
    tag: 'interaction',
  },
  {
    title: '側邊抽屜預覽',
    path: '/case/contextual-drawer',
    category: '互動設計',
    type: '情境保留',
    desc: '以側邊抽屜展開詳情，保留列表上下文，省去頁面跳轉與返回的操作成本。',
    icon: FolderOpen,
    tag: 'interaction',
  },
  {
    title: '按鈕收納與工具列',
    path: '/case/button-overflow',
    category: '互動設計',
    type: '漸進揭露',
    desc: '主要操作外露，次要功能收納進下拉選單，避免版面被大量按鈕占滿。',
    icon: LayoutTemplate,
    tag: 'interaction',
  },
  {
    title: '事件回饋：Toast vs Modal',
    path: '/case/success-feedback',
    category: '互動設計',
    type: '回饋設計',
    desc: '依操作重要程度選用 Toast 或 Modal，避免不必要的流程中斷。',
    icon: Bell,
    tag: 'interaction',
  },
  {
    title: '表單元件選擇策略',
    path: '/case/form-component-strategy',
    category: '互動設計',
    type: '元件決策',
    desc: '根據選項數量、是否多選、空間限制，選擇正確的表單元件，降低使用者操作成本。',
    icon: Sliders,
    tag: 'interaction',
  },
]

// ── 3. 系統回饋 ────────────────────────────────────────────────
export const feedbackCases: Case[] = [
  {
    title: '載入狀態反饋',
    path: '/case/loading-feedback',
    category: '系統回饋',
    type: '狀態可見性',
    desc: '操作送出後立即顯示載入狀態，告知系統正在處理，避免用戶重複觸發。',
    icon: Loader2,
    tag: 'feedback',
  },
  {
    title: '表單驗證與即時回饋',
    path: '/case/form-validation',
    category: '系統回饋',
    type: '即時驗證',
    desc: '在欄位輸入時即時顯示驗證結果，讓用戶及早發現並修正錯誤。',
    icon: LayoutTemplate,
    tag: 'feedback',
  },
  {
    title: '空狀態設計',
    path: '/case/empty-state',
    category: '系統回饋',
    type: '用戶引導',
    desc: '空畫面提供情境說明與行動引導，避免用戶面對無從下手的空白頁。',
    icon: FolderOpen,
    tag: 'feedback',
  },
]

// ── 4. 可用性與防呆 ───────────────────────────────────────────
export const usabilityCases: Case[] = [
  {
    title: '破壞性操作的雙重確認',
    path: '/case/destructive-action',
    category: '可用性與防呆',
    type: '錯誤預防',
    desc: '刪除等高風險操作需手動輸入資源名稱確認，防止肌肉記憶造成的誤操作。',
    icon: FileWarning,
    tag: 'safety',
  },
  {
    title: '未儲存資料提示',
    path: '/case/unsaved-changes',
    category: '可用性與防呆',
    type: '資料保護',
    desc: '離開含有未儲存變更的頁面時，提示用戶確認或放棄，防止資料意外遺失。',
    icon: FileWarning,
    tag: 'safety',
  },
]


// ── 5. 效率設計 ────────────────────────────────────────────────
export const efficiencyCases: Case[] = [
  {
    title: '批次操作設計',
    path: '/case/batch-actions',
    category: '效率設計',
    type: '批次處理',
    desc: '勾選多筆資料並透過工具列批次執行操作，大幅減少重複點擊次數。',
    icon: CheckSquare,
    tag: 'efficiency',
  },
  {
    title: '篩選器狀態顯示',
    path: '/case/filter-state',
    category: '效率設計',
    type: '篩選可視',
    desc: '套用篩選後以標籤列顯示當前條件，支援逐一移除或一鍵清除全部。',
    icon: Filter,
    tag: 'efficiency',
  },
  {
    title: '搜尋自動完成',
    path: '/case/search-autocomplete',
    category: '效率設計',
    type: '輸入加速',
    desc: '輸入部分文字即顯示候選建議，減少完整輸入的負擔，讓使用者更快找到目標資料。',
    icon: Search,
    tag: 'efficiency',
  },
]

// ── 6. 導覽與狀態 ─────────────────────────────────────────────
export const navigationCases: Case[] = [
  {
    title: '導覽狀態保留',
    path: '/case/navigation-state',
    category: '導覽與狀態',
    type: '上下文保留',
    desc: '從詳情頁返回時自動恢復篩選與捲動位置，減少重複操作。',
    icon: Navigation,
    tag: 'navigation',
  },
  {
    title: '麥包屑導覽設計',
    path: '/case/breadcrumb-nav',
    category: '導覽與狀態',
    type: '層級導覽',
    desc: '在多層級頁面中顯示完整路徑軌跡，讓使用者隨時瞭解所在位置並能快速跳回任一上層頁面。',
    icon: Map,
    tag: 'navigation',
  },
]

// ── 分組結構（供 Sidebar / HomeView 循環使用）────────────────
export const caseGroups = [
  { label: '視覺設計', cases: visualDesignCases },
  { label: '互動設計', cases: interactionDesignCases },
  { label: '系統回饋', cases: feedbackCases },
  { label: '可用性與防呆', cases: usabilityCases },
  { label: '效率設計', cases: efficiencyCases },
  { label: '導覽與狀態', cases: navigationCases },
]

export const allCases = [
  ...visualDesignCases,
  ...interactionDesignCases,
  ...feedbackCases,
  ...usabilityCases,
  ...efficiencyCases,
  ...navigationCases,
]
