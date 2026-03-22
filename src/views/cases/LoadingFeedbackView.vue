<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Send, RefreshCw, Heart, ShoppingCart, Check, AlertCircle, Zap } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const activeTab = ref('form') // 'form' | 'block' | 'inline'

// Bad: no loading state
const badClickCount = ref(0)
async function badSubmit() {
  badClickCount.value++
  await new Promise(r => setTimeout(r, 2000))
}

const badInlineClicks = ref(0)
function badClickInline() {
  badInlineClicks.value++
}

// Good: proper loading states
const isGoodSubmitting = ref(false)
const isGoodLiking = ref(false)
const isGoodAdding = ref(false)
const isGoodRefreshing = ref(false)

// Post-loading completed states
const isLiked = ref(false)
const isAddedToCart = ref(false)
const isRefreshed = ref(false)

async function goodSubmit() {
  if (isGoodSubmitting.value) return
  isGoodSubmitting.value = true
  await new Promise(r => setTimeout(r, 1800))
  isGoodSubmitting.value = false
  toast.success('表單已送出！')
}

async function goodLike() {
  if (isGoodLiking.value) return
  isGoodLiking.value = true
  await new Promise(r => setTimeout(r, 800))
  isGoodLiking.value = false
  isLiked.value = !isLiked.value
  toast.success(isLiked.value ? '已加入收藏' : '已取消收藏')
}

async function goodAddToCart() {
  if (isGoodAdding.value || isAddedToCart.value) return
  isGoodAdding.value = true
  await new Promise(r => setTimeout(r, 1000))
  isGoodAdding.value = false
  isAddedToCart.value = true
  toast.success('已加入購物車')
}

async function goodRefresh() {
  if (isGoodRefreshing.value) return
  isGoodRefreshing.value = true
  await new Promise(r => setTimeout(r, 1500))
  isGoodRefreshing.value = false
  isRefreshed.value = true
  toast.success('資料已更新')
  // Auto-reset the "已完成" state after 3 seconds
  setTimeout(() => { isRefreshed.value = false }, 3000)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">載入狀態反饋 (Loading Feedback)</h1>
        <Badge variant="secondary" class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">系統回饋
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        操作送出後立即顯示載入狀態，讓使用者明確知道系統正在處理，預防重複觸發與焦慮感。
      </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-3 sm:w-auto sm:inline-grid">
          <TabsTrigger value="form">送出表單</TabsTrigger>
          <TabsTrigger value="block">資料區塊載入</TabsTrigger>
          <TabsTrigger value="inline">行內操作按鈕</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Ensure right side reveal state resets on tab change -->
    <SplitView :key="activeTab">
      <template #left>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Form Submit -->
          <div v-if="activeTab === 'form'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <p class="text-[11px] opacity-80">按鈕無任何載入狀態回饋，用戶不知道系統是否在處理，容易產生焦慮並重複點擊。</p>
              </div>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-[11px]">（連續點擊送出，觀察變化）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none"
                  placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none"
                  placeholder="申請事由" />
              </CardContent>
              <CardFooter class="flex flex-col items-start gap-2">
                <Button class="w-full" @click="badSubmit">
                  <Send class="h-4 w-4 mr-2" />
                  送出申請
                </Button>
                <p v-if="badClickCount > 0" class="text-xs text-destructive mt-1">
                  你已重複點擊了 {{ badClickCount }} 次！
                </p>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 2: Data Block Loading -->
          <div v-if="activeTab === 'block'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <p class="text-[11px] opacity-80">資料載入期間直接留白，毫無提示，會讓用戶誤以為頁面故障或系統無回應。</p>
              </div>
            </div>

            <Card class="max-w-md">
              <CardHeader class="pb-2 border-b">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-sm">採購申請</CardTitle>
                  <span class="text-xs text-muted-foreground">共 24 筆</span>
                </div>
                <div class="flex gap-1.5 mt-2">
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full bg-primary text-primary-foreground font-medium">全部</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">待審核</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">已核准</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">已退回</span>
                </div>
              </CardHeader>
              <CardContent class="pt-3 space-y-3">
                <input class="w-full h-8 border border-border rounded-md px-3 text-xs bg-background placeholder:text-muted-foreground/50 outline-none" placeholder="搜尋申請名稱或部門..." />
                <!-- No loading indicator: data area left completely blank -->
                <div class="min-h-[140px] rounded-md border border-dashed border-border/50" />
                <div class="pt-2 border-t flex items-center justify-between">
                  <span class="text-xs text-muted-foreground">共 24 筆</span>
                  <div class="flex gap-1.5">
                    <span class="h-7 px-3 rounded border border-border text-xs text-muted-foreground flex items-center">上一頁</span>
                    <span class="h-7 px-3 rounded border border-border text-xs text-muted-foreground flex items-center">下一頁</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Case 3: Inline Actions -->
          <div v-if="activeTab === 'inline'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <p class="text-[11px] opacity-80">按鈕點擊後沒有鎖定機制，用戶可快速多次觸發同一個 API 請求，造成伺服器負擔與資料異常。</p>
              </div>
            </div>

            <Card class="max-w-md">
              <CardHeader>
                <CardTitle class="text-sm">各種操作</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" @click="badClickInline">
                    <Heart class="h-3.5 w-3.5 mr-1.5" /> 收藏
                  </Button>
                  <Button variant="outline" size="sm" @click="badClickInline">
                    <ShoppingCart class="h-3.5 w-3.5 mr-1.5" /> 加入購物車
                  </Button>
                  <Button variant="outline" size="sm" @click="badClickInline">
                    <RefreshCw class="h-3.5 w-3.5 mr-1.5" /> 重新整理
                  </Button>
                </div>
                <p v-if="badInlineClicks > 0" class="text-xs text-destructive mt-2">
                  警告：已累積送出 {{ badInlineClicks }} 個重複請求
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Form Submit -->
          <div v-if="activeTab === 'form'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <p class="text-[11px] opacity-80">點擊後立即切換 Loading UI 並禁用按鈕，預防重複提交，並在結束後顯示結果通知。</p>
              </div>
            </div>

            <Card class="max-w-sm transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-[11px]">（點擊送出，觀察按鈕變化）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none"
                  placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none"
                  placeholder="申請事由" />
              </CardContent>
              <CardFooter>
                <Button class="w-full transition-all duration-200" :disabled="isGoodSubmitting" @click="goodSubmit">
                  <Loader2 v-if="isGoodSubmitting" class="h-4 w-4 mr-2 animate-spin" />
                  <Send v-else class="h-4 w-4 mr-2" />
                  {{ isGoodSubmitting ? '處理中...' : '送出申請' }}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 2: Data Block Loading -->
          <div v-if="activeTab === 'block'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <p class="text-[11px] opacity-80">使用骨架屏 (Skeleton Screen) 提示載入中狀態，預先建立版面佈局的心理預期，降低焦慮感。</p>
              </div>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader class="pb-2 border-b">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-sm">採購申請</CardTitle>
                  <span class="text-xs text-muted-foreground">共 24 筆</span>
                </div>
                <div class="flex gap-1.5 mt-2">
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full bg-primary text-primary-foreground font-medium">全部</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">待審核</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">已核准</span>
                  <span class="px-2.5 py-0.5 text-[11px] rounded-full border border-border text-muted-foreground">已退回</span>
                </div>
              </CardHeader>
              <CardContent class="pt-3 space-y-3">
                <input class="w-full h-8 border border-border rounded-md px-3 text-xs bg-background placeholder:text-muted-foreground/50 outline-none" placeholder="搜尋申請名稱或部門..." />
                <!-- Skeleton rows mimicking real table rows with avatar + info + amount + status badge -->
                <div class="flex flex-col divide-y">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-3 py-3 animate-pulse">
                    <div class="h-8 w-8 rounded-full bg-muted shrink-0" />
                    <div class="flex-1 space-y-1.5 min-w-0">
                      <div class="h-3 bg-muted rounded" :class="i === 1 ? 'w-2/3' : i === 2 ? 'w-1/2' : 'w-3/5'" />
                      <div class="h-2.5 bg-muted rounded w-1/3 opacity-60" />
                    </div>
                    <div class="h-3 bg-muted rounded w-14 shrink-0" />
                    <div class="h-5 bg-muted rounded-full w-14 shrink-0" />
                  </div>
                </div>
                <!-- Footer summary skeleton -->
                <div class="pt-2 border-t flex items-center justify-between animate-pulse">
                  <div class="h-2.5 bg-muted rounded w-24" />
                  <div class="flex gap-1.5">
                    <div class="h-7 bg-muted rounded w-16" />
                    <div class="h-7 bg-muted rounded w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Case 3: Inline Actions -->
          <div v-if="activeTab === 'inline'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <p class="text-[11px] opacity-80">操作按鈕點擊後切換為載入狀態並鎖定，完成後提供明確的視覺勾選或狀態提示。</p>
              </div>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle class="text-sm">操作按鈕的即時反饋與狀態記憶</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <!-- Like/Collect: toggle between liked/unliked with states -->
                <Button variant="outline" size="sm" :disabled="isGoodLiking" @click="goodLike"
                  class="w-[100px] transition-all"
                  :class="isLiked ? 'border-rose-300 text-rose-600 bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50' : ''">
                  <Loader2 v-if="isGoodLiking" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <Heart v-else class="h-3.5 w-3.5 mr-1.5 transition-colors"
                    :class="isLiked ? 'fill-rose-500 text-rose-500' : ''" />
                  <span class="w-[46px] text-left">{{ isGoodLiking ? '處理中' : isLiked ? '已收藏' : '收藏' }}</span>
                </Button>

                <!-- Add to cart: locked after success -->
                <Button variant="outline" size="sm" :disabled="isGoodAdding || isAddedToCart" @click="goodAddToCart"
                  class="w-[120px] transition-all"
                  :class="isAddedToCart ? 'border-emerald-300 text-emerald-600 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:bg-emerald-950/30' : ''">
                  <Loader2 v-if="isGoodAdding" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <Check v-else-if="isAddedToCart" class="h-3.5 w-3.5 mr-1.5" />
                  <ShoppingCart v-else class="h-3.5 w-3.5 mr-1.5" />
                  <span class="w-[66px] text-left">{{ isGoodAdding ? '處理中...' : isAddedToCart ? '已加入' : '加入購物車'
                    }}</span>
                </Button>

                <!-- Refresh: brief "完成" state then resets -->
                <Button variant="outline" size="sm" :disabled="isGoodRefreshing" @click="goodRefresh"
                  class="w-[110px] transition-all"
                  :class="isRefreshed ? 'border-blue-300 text-blue-600 bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:bg-blue-950/30' : ''">
                  <Check v-if="isRefreshed" class="h-3.5 w-3.5 mr-1.5" />
                  <RefreshCw v-else class="h-3.5 w-3.5 mr-1.5" :class="{ 'animate-spin': isGoodRefreshing }" />
                  <span class="w-[66px] text-left">{{ isGoodRefreshing ? '更新中...' : isRefreshed ? '已完成' : '重新整理'
                    }}</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
