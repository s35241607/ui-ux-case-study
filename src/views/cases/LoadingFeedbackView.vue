<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import CaseBlock from '@/components/layout/CaseBlock.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, Send, RefreshCw, Heart, ShoppingCart } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// Bad: no loading state
const isBadSubmitting = ref(false)
const badClickCount = ref(0)
async function badSubmit() {
  badClickCount.value++
  await new Promise(r => setTimeout(r, 2000))
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
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        當用戶觸發任何需要等待的操作（送出表單、API 請求、資料載入），系統必須立即給予視覺反饋。
        沒有 Loading 狀態會讓用戶以為系統沒有響應，導致重複點擊或放棄操作。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：點擊後毫無反應" rightTitle="優秀的設計：立即給予 Loading 視覺反饋">
      <template #left>
        <div class="flex-1 flex flex-col">
          <!-- Case 1 -->
          <CaseBlock index="1" title="送出表單" description="按鈕無任何變化，用戶不知道是否有在處理，容易重複點擊" tag="ux">
            <Card>
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-xs">（點擊送出，觀察按鈕變化）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請事由" />
              </CardContent>
              <CardFooter class="flex-col items-start gap-2">
                <Button class="w-full" @click="badSubmit">
                  <Send class="h-4 w-4 mr-2" />
                  送出申請
                </Button>
                <p v-if="badClickCount > 0" class="text-xs text-destructive">
                  你已點擊 {{ badClickCount }} 次，不確定是否成功⋯
                </p>
              </CardFooter>
            </Card>
          </CaseBlock>

          <!-- Case 2 -->
          <CaseBlock index="2" title="資料區塊載入" description="無骨架屏，資料載入期間用戶面對空白，毫無提示" tag="ux">
            <Card>
              <CardHeader><CardTitle class="text-sm">資料列表</CardTitle></CardHeader>
              <CardContent>
                <div class="text-center py-8 text-muted-foreground/40 text-sm">
                  （此處資料載入中，但沒有任何視覺提示）
                </div>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>

      <template #right>
        <div class="flex-1 flex flex-col">
          <!-- Case 1 -->
          <CaseBlock index="1" title="送出表單" description="按鈕立即切換成 Spinner + 禁用，完成後跳出 Toast 確認" tag="ux">
            <Card>
              <CardHeader>
                <CardTitle class="text-sm">送出申請</CardTitle>
                <CardDescription class="text-xs">（點擊送出，觀察 Loading 動畫）</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3">
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請人姓名" />
                <input class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="申請事由" />
              </CardContent>
              <CardFooter>
                <Button class="w-full" :disabled="isGoodSubmitting" @click="goodSubmit">
                  <Loader2 v-if="isGoodSubmitting" class="h-4 w-4 mr-2 animate-spin" />
                  <Send v-else class="h-4 w-4 mr-2" />
                  {{ isGoodSubmitting ? '送出中...' : '送出申請' }}
                </Button>
              </CardFooter>
            </Card>
          </CaseBlock>

          <!-- Case 2 -->
          <CaseBlock index="2" title="資料區塊載入" description="Skeleton 骨架屏讓用戶知道資料正在載入，並預期版面結構" tag="ux">
            <Card>
              <CardHeader><CardTitle class="text-sm">資料列表（Skeleton 示意）</CardTitle></CardHeader>
              <CardContent class="space-y-3">
                <div class="animate-pulse space-y-2">
                  <div class="h-4 bg-muted rounded w-3/4"></div>
                  <div class="h-4 bg-muted rounded w-1/2"></div>
                  <div class="h-4 bg-muted rounded w-5/6"></div>
                  <div class="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          </CaseBlock>

          <!-- Case 3 -->
          <CaseBlock index="3" title="行內操作按鈕" description="收藏、購物車、重新整理等按鈕在 Loading 時禁用並顯示進度" tag="ux">
            <Card>
              <CardHeader><CardTitle class="text-sm">各種操作的 Loading 狀態</CardTitle></CardHeader>
              <CardContent class="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" :disabled="isGoodLiking" @click="goodLike">
                  <Loader2 v-if="isGoodLiking" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <Heart v-else class="h-3.5 w-3.5 mr-1.5" />
                  {{ isGoodLiking ? '處理中' : '收藏' }}
                </Button>
                <Button variant="outline" size="sm" :disabled="isGoodAdding" @click="goodAddToCart">
                  <Loader2 v-if="isGoodAdding" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  <ShoppingCart v-else class="h-3.5 w-3.5 mr-1.5" />
                  {{ isGoodAdding ? '加入中...' : '加入購物車' }}
                </Button>
                <Button variant="outline" size="sm" :disabled="isGoodRefreshing" @click="goodRefresh">
                  <RefreshCw class="h-3.5 w-3.5 mr-1.5" :class="{ 'animate-spin': isGoodRefreshing }" />
                  {{ isGoodRefreshing ? '更新中' : '重新整理' }}
                </Button>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>
    </SplitView>
  </div>
</template>
