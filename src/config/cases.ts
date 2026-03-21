import {
  Maximize2, AlignLeft, MousePointer2, LayoutTemplate,
  Loader2, Bell, Navigation, FileWarning, FolderOpen, CheckSquare, Filter
} from 'lucide-vue-next'

export const uiCases = [
  {
    title: '視覺間距與舒適度',
    path: '/case/spacing',
    category: 'UI 設計',
    type: '視覺設計',
    desc: 'padding 與 margin 的合理運用，讓畫面有呼吸感，不讓用戶感到壓迫。',
    icon: Maximize2,
    tag: 'ui'
  },
  {
    title: '資料對齊與數字格式',
    path: '/case/data-alignment',
    category: 'UI 設計',
    type: '資料呈現',
    desc: '文字靠左、數字靠右，並搭配千分位格式讓資料一目了然。',
    icon: AlignLeft,
    tag: 'ui'
  },
  {
    title: '按鈕階層設計',
    path: '/case/button-hierarchy',
    category: 'UI 設計',
    type: '互動設計',
    desc: '利用 Primary / Secondary / Ghost 視覺重量引導用戶完成主要操作。',
    icon: MousePointer2,
    tag: 'ui'
  },
  {
    title: '按鈕收納與工具列',
    path: '/case/button-overflow',
    category: 'UI 設計',
    type: '資訊架構',
    desc: '功能過多時，只保留常用按鈕，其餘收納在 More 選單。',
    icon: LayoutTemplate,
    tag: 'ui'
  },
  {
    title: '空狀態設計',
    path: '/case/empty-state',
    category: 'UI 設計',
    type: '資料呈現',
    desc: '避免讓用戶面對空白。對應不同功能顯示情境圖示與引導行動。',
    icon: FolderOpen,
    tag: 'ui'
  }
]

export const uxCases = [
  {
    title: '內聯編輯 vs 彈窗編輯',
    path: '/case/inline-edit',
    category: 'UX 體驗',
    type: '資料編輯',
    desc: '直接在表格內修改狀態與權限，取代跳轉或開啟彈窗，極大化效率。',
    icon: LayoutTemplate,
    tag: 'ux'
  },
  {
    title: '側邊抽屜預覽',
    path: '/case/contextual-drawer',
    category: 'UX 體驗',
    type: '導覽行為',
    desc: '點選列表項目後，以側邊抽屜展開詳情，省去跳轉與按上一頁的時間。',
    icon: FolderOpen,
    tag: 'ux'
  },
  {
    title: '破壞性操作的雙重確認',
    path: '/case/destructive-action',
    category: 'UX 體驗',
    type: '防呆機制',
    desc: '移除或刪除關鍵資料時，要求手動輸入資源名稱進行二次確認，防止肌肉記憶盲點。',
    icon: FileWarning,
    tag: 'ux'
  },
  {
    title: '表單驗證與即時回饋',
    path: '/case/form-validation',
    category: 'UX 體驗',
    type: '表單體驗',
    desc: '在用戶輸入時即時驗證並提示，而非等送出後才集中報錯。',
    icon: LayoutTemplate,
    tag: 'ux'
  },
  {
    title: '未儲存資料提示',
    path: '/case/unsaved-changes',
    category: 'UX 體驗',
    type: '資料保護',
    desc: '表單填到一半意外離開時，應提示用戶或自動保存草稿。',
    icon: FileWarning,
    tag: 'ux'
  },
  {
    title: '載入狀態反饋',
    path: '/case/loading-feedback',
    category: 'UX 體驗',
    type: '互動回饋',
    desc: '觸發事件後要有 loading 狀態，避免用戶不知道系統是否正在處理。',
    icon: Loader2,
    tag: 'ux'
  },
  {
    title: '事件回饋：Toast vs Modal',
    path: '/case/success-feedback',
    category: 'UX 體驗',
    type: '狀態通知',
    desc: '成功、失敗的回饋應選擇適合的 Toast 或 Modal，而非一律使用彈窗。',
    icon: Bell,
    tag: 'ux'
  },
  {
    title: '篩選器狀態顯示',
    path: '/case/filter-state',
    category: 'UX 體驗',
    type: '互動設計',
    desc: '在查詢結果下方清楚顯示 Active Filter 徽章，支援逐一移除。',
    icon: Filter,
    tag: 'ux'
  },
  {
    title: '批次操作設計',
    path: '/case/batch-actions',
    category: 'UX 體驗',
    type: '互動設計',
    desc: '透過勾選多筆資料並使用浮動批次工具列，大幅提升操作效率。',
    icon: CheckSquare,
    tag: 'ux'
  },
  {
    title: '導覽狀態保留',
    path: '/case/navigation-state',
    category: 'UX 體驗',
    type: '導覽行為',
    desc: '返回上一頁時保留查詢篩選狀態，並支援中鍵開新分頁。',
    icon: Navigation,
    tag: 'ux'
  }
]

export const allCases = [...uiCases, ...uxCases]
