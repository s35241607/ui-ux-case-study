import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: "Lan's UX Lab" }
    },
    // UI 設計案例
    {
      path: '/case/spacing',
      name: 'spacing',
      component: () => import('../views/cases/SpacingView.vue'),
      meta: { title: '視覺間距與舒適度 (Spacing)', category: 'UI 設計', type: '視覺設計', tag: 'ui' }
    },
    {
      path: '/case/data-alignment',
      name: 'data-alignment',
      component: () => import('../views/cases/DataAlignmentView.vue'),
      meta: { title: '資料對齊與數字格式 (Data Alignment)', category: 'UI 設計', type: '資料呈現', tag: 'ui' }
    },
    {
      path: '/case/button-hierarchy',
      name: 'button-hierarchy',
      component: () => import('../views/cases/ButtonHierarchyView.vue'),
      meta: { title: '按鈕階層設計 (Button Hierarchy)', category: 'UI 設計', type: '互動設計', tag: 'ui' }
    },
    {
      path: '/case/button-overflow',
      name: 'button-overflow',
      component: () => import('../views/cases/ButtonOverflowView.vue'),
      meta: { title: '複雜操作的收納與壓縮 (Button Overflow)', category: '互動設計', type: '空間效率', tag: 'interaction' }
    },
    {
      path: '/case/empty-state',
      name: 'empty-state',
      component: () => import('../views/cases/EmptyStateView.vue'),
      meta: { title: '空狀態設計 (Empty State)', category: 'UI 設計', type: '資料呈現', tag: 'ui' }
    },
    // UX 體驗案例 (企業操作情境)
    {
      path: '/case/inline-edit',
      name: 'inline-edit',
      component: () => import('../views/cases/InlineEditView.vue'),
      meta: { title: '內聯編輯 vs 彈窗編輯 (Inline Edit)', category: 'UX 體驗', type: '資料編輯', tag: 'ux' }
    },
    {
      path: '/case/contextual-drawer',
      name: 'contextual-drawer',
      component: () => import('../views/cases/ContextualDrawerView.vue'),
      meta: { title: '側邊抽屜預覽 (Contextual Drawer)', category: 'UX 體驗', type: '導覽行為', tag: 'ux' }
    },
    {
      path: '/case/form-validation',
      name: 'form-validation',
      component: () => import('../views/cases/FormValidationView.vue'),
      meta: { title: '表單驗證與即時回饋 (Form Validation)', category: 'UX 體驗', type: '表單體驗', tag: 'ux' }
    },
    {
      path: '/case/loading-feedback',
      name: 'loading-feedback',
      component: () => import('../views/cases/LoadingFeedbackView.vue'),
      meta: { title: '載入狀態反饋 (Loading Feedback)', category: 'UX 體驗', type: '互動回饋', tag: 'ux' }
    },
    {
      path: '/case/destructive-action',
      name: 'destructive-action',
      component: () => import('../views/cases/DestructiveActionView.vue'),
      meta: { title: '破壞性操作的雙重確認 (Destructive Action)', category: 'UX 體驗', type: '防呆機制', tag: 'ux' }
    },
    {
      path: '/case/success-feedback',
      name: 'success-feedback',
      component: () => import('../views/cases/SuccessFeedbackView.vue'),
      meta: { title: '事件回饋：Toast vs Modal (Success Feedback)', category: 'UX 體驗', type: '狀態通知', tag: 'ux' }
    },
    {
      path: '/case/navigation-state',
      name: 'navigation-state',
      component: () => import('../views/cases/NavigationStateView.vue'),
      meta: { title: '導覽狀態保留 (Navigation State)', category: 'UX 體驗', type: '導覽行為', tag: 'ux' }
    },
    {
      path: '/case/unsaved-changes',
      name: 'unsaved-changes',
      component: () => import('../views/cases/UnsavedChangesView.vue'),
      meta: { title: '未儲存資料提示 (Unsaved Changes)', category: 'UX 體驗', type: '資料保護', tag: 'ux' }
    },
    {
      path: '/case/batch-actions',
      name: 'batch-actions',
      component: () => import('../views/cases/BatchActionsView.vue'),
      meta: { title: '批次操作設計 (Batch Actions)', category: 'UX 體驗', type: '互動設計', tag: 'ux' }
    },

    {
      path: '/case/form-component-strategy',
      name: 'form-component-strategy',
      component: () => import('@/views/cases/FormComponentStrategyView.vue'),
      meta: { title: '表單元件選擇策略 (Form Component Strategy)', category: '互動設計', type: '元件決策', tag: 'interaction' }
    },
    {
      path: '/case/breadcrumb-nav',
      name: 'breadcrumb-nav',
      component: () => import('../views/cases/BreadcrumbNavView.vue'),
      meta: { title: '麵包屑導覽設計 (Breadcrumb Navigation)', category: '導覽與狀態', type: '層級導覽', tag: 'navigation' }
    },
  ]
})

export default router
