import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: '首頁' }
    },
    // UI 設計案例
    {
      path: '/case/spacing',
      name: 'spacing',
      component: () => import('../views/cases/SpacingView.vue'),
      meta: { title: '視覺間距與舒適度', category: 'UI 設計', type: '視覺設計', tag: 'ui' }
    },
    {
      path: '/case/data-alignment',
      name: 'data-alignment',
      component: () => import('../views/cases/DataAlignmentView.vue'),
      meta: { title: '資料對齊與數字格式', category: 'UI 設計', type: '資料呈現', tag: 'ui' }
    },
    {
      path: '/case/button-hierarchy',
      name: 'button-hierarchy',
      component: () => import('../views/cases/ButtonHierarchyView.vue'),
      meta: { title: '按鈕階層設計', category: 'UI 設計', type: '互動設計', tag: 'ui' }
    },
    {
      path: '/case/button-overflow',
      name: 'button-overflow',
      component: () => import('../views/cases/ButtonOverflowView.vue'),
      meta: { title: '按鈕收納與工具列', category: 'UI 設計', type: '資訊架構', tag: 'ui' }
    },
    // UX 體驗案例
    {
      path: '/case/form-validation',
      name: 'form-validation',
      component: () => import('../views/cases/FormValidationView.vue'),
      meta: { title: '表單驗證與即時回饋', category: 'UX 體驗', type: '表單體驗', tag: 'ux' }
    },
    {
      path: '/case/loading-feedback',
      name: 'loading-feedback',
      component: () => import('../views/cases/LoadingFeedbackView.vue'),
      meta: { title: '載入狀態反饋', category: 'UX 體驗', type: '互動回饋', tag: 'ux' }
    },
    {
      path: '/case/success-feedback',
      name: 'success-feedback',
      component: () => import('../views/cases/SuccessFeedbackView.vue'),
      meta: { title: '事件回饋：Toast vs Modal', category: 'UX 體驗', type: '狀態通知', tag: 'ux' }
    },
    {
      path: '/case/navigation-state',
      name: 'navigation-state',
      component: () => import('../views/cases/NavigationStateView.vue'),
      meta: { title: '導覽狀態保留', category: 'UX 體驗', type: '導覽行為', tag: 'ux' }
    },
    {
      path: '/case/unsaved-changes',
      name: 'unsaved-changes',
      component: () => import('../views/cases/UnsavedChangesView.vue'),
      meta: { title: '未儲存資料提示', category: 'UX 體驗', type: '資料保護', tag: 'ux' }
    }
  ]
})

export default router
