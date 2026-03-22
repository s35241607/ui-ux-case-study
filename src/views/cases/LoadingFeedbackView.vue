<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Send, RefreshCw, Heart, ShoppingCart } from 'lucide-vue-next'
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
  toast.success('已加入收藏')
}

async function goodAddToCart() {
  if (isGoodAdding.value) return
  isGoodAdding.value = true
  await new Promise(r => setTimeout(r, 1000))
  isGoodAdding.value = false
  toast.success('已加入購物車')
}

async function goodRefresh() {
  if (isGoodRefreshing.value) return
  isGoodRefreshing.value = true
  await new Promise(r => setTimeout(r, 1500))
  isGoodRefreshing.value = false
  toast.success('資料已更新')
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
        <TabsList class="grid w-full grid-cols-3 sm:w-auto sm:inline-grid sm:w-auto">
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
            <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
              <strong>無狀態反饋 (No Feedback)</strong><br />
              <span class="opacity-80">按鈕無任何變化，用戶不知道是否有在處理，容易因為不確定而重複點擊送出。</span>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-[11px]">（連續點擊送出，觀察變化）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請事由" />
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
            <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
              <strong>直接留白 (Blank Loading)</strong><br />
              <span class="opacity-80">資料載入期間用戶面對空白，毫無提示，會讓人以為頁面壞掉或沒有資料。</span>
            </div>

            <Card class="max-w-md">
              <CardHeader>
                <CardTitle class="text-sm">資料列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="flex items-center justify-center py-10 bg-muted/10 rounded border border-dashed text-muted-foreground/40 text-xs">
                  （此處資料載入中，但沒有任何視覺提示，像是壞了一樣）
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Case 3: Inline Actions -->
          <div v-if="activeTab === 'inline'" class="flex flex-col gap-4">
            <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
              <strong>缺乏按鈕層級的鎖定 (No Interaction Lock)</strong><br />
              <span class="opacity-80">按鈕點擊後沒有被禁用，可重複點擊送出多次相同的 API 請求。</span>
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
            <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
              <strong>禁用與狀態提示 (Disabled + Spinner)</strong><br />
              <span class="opacity-80">點擊後立即切換成 Spinner，並將按鈕禁用以防止重複提交，完成後可搭配 Toast 通知結果。</span>
            </div>

            <Card class="max-w-sm transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-[11px]">（點擊送出，觀察按鈕變化）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請事由" />
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
            <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
              <strong>骨架屏 (Skeleton Screens)</strong><br />
              <span class="opacity-80">使用 Skeleton 骨架屏讓用戶知道資料正在讀取，預先建立版面佈局的心理預期，降低等待時間的體感。</span>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle class="text-sm">資料列表（Skeleton 顯示中）</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="flex flex-col gap-4 py-2">
                  <div class="animate-pulse space-y-3">
                    <div class="h-4 bg-muted rounded w-3/4"></div>
                    <div class="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div class="animate-pulse space-y-3 mt-2">
                    <div class="h-4 bg-muted rounded w-5/6"></div>
                    <div class="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Case 3: Inline Actions -->
          <div v-if="activeTab === 'inline'" class="flex flex-col gap-4">
            <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
              <strong>元件級別的鎖定 (Component-level Feedback)</strong><br />
              <span class="opacity-80">各種小按鈕在點擊後也必須轉換成特定的 Loading UI 並被禁用，確保 API 原則。</span>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle class="text-sm">操作按鈕的即時反饋</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" :disabled="isGoodLiking" @click="goodLike" class="w-[90px]">
                  <Loader2 v-if="isGoodLiking" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <Heart v-else class="h-3.5 w-3.5 mr-1.5" />
                  <span class="w-[42px] text-left">{{ isGoodLiking ? '處理中' : '收藏' }}</span>
                </Button>
                <Button variant="outline" size="sm" :disabled="isGoodAdding" @click="goodAddToCart" class="w-[110px]">
                  <Loader2 v-if="isGoodAdding" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <ShoppingCart v-else class="h-3.5 w-3.5 mr-1.5" />
                  <span class="w-[66px] text-left">{{ isGoodAdding ? '處理中...' : '加入購物車' }}</span>
                </Button>
                <Button variant="outline" size="sm" :disabled="isGoodRefreshing" @click="goodRefresh" class="w-[100px]">
                  <RefreshCw class="h-3.5 w-3.5 mr-1.5" :class="{ 'animate-spin': isGoodRefreshing }" />
                  <span class="w-[58px] text-left">{{ isGoodRefreshing ? '更新中' : '重新整理' }}</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
