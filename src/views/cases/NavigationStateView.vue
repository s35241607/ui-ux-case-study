<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ExternalLink, ArrowLeft, Filter } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// ---- BAD simulation ----
const badSearchQuery = ref('')
const badCurrentPage = ref<'list' | 'detail'>('list')
const badOrders = [
  { id: 'ORD-001', name: '王小明', amount: 12800 },
  { id: 'ORD-002', name: '陳大志', amount: 4500 },
  { id: 'ORD-003', name: '林美華', amount: 98200 },
]
// When bad navigates, it loses search state
function badNavigateToDetail(_id: string) {
  badSearchQuery.value = ''  // loses state!
  badCurrentPage.value = 'detail'
}
function badGoBack() {
  badCurrentPage.value = 'list'
  // state is already lost
}

// ---- GOOD simulation ----
const goodSearchQuery = ref('')
const goodStatusFilter = ref('all')
// Simulate URL-preserved state
const savedSearchQuery = ref('')
const savedStatusFilter = ref('all')
const goodCurrentPage = ref<'list' | 'detail'>('list')
const selectedOrder = ref<typeof goodFilteredOrders.value[0] | null>(null)

const allOrders = [
  { id: 'ORD-001', name: '王小明', amount: 12800, status: '已付款' },
  { id: 'ORD-002', name: '陳大志', amount: 4500, status: '處理中' },
  { id: 'ORD-003', name: '林美華', amount: 98200, status: '已付款' },
  { id: 'ORD-004', name: '張志遠', amount: 2100, status: '待付款' },
]

const goodFilteredOrders = computed(() => {
  return allOrders.filter(o => {
    const matchQ = o.name.includes(goodSearchQuery.value) || o.id.includes(goodSearchQuery.value)
    const matchS = goodStatusFilter.value === 'all' || o.status === goodStatusFilter.value
    return matchQ && matchS
  })
})

function goodNavigateToDetail(order: typeof allOrders[0]) {
  // Save state before navigating (like URL params would)
  savedSearchQuery.value = goodSearchQuery.value
  savedStatusFilter.value = goodStatusFilter.value
  selectedOrder.value = order
  goodCurrentPage.value = 'detail'
}

function goodGoBack() {
  // Restore state on back navigation
  goodSearchQuery.value = savedSearchQuery.value
  goodStatusFilter.value = savedStatusFilter.value
  goodCurrentPage.value = 'list'
  toast.info('已還原上次查詢條件')
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">導覽狀態保留 (Navigation State)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        用戶在列表頁篩選、搜尋後點進詳情，<strong>返回時應保留原本的查詢狀態</strong>，而不是回到初始狀態。
        此外，單據連結應支援<strong>中鍵點擊開新分頁</strong>，讓用戶可以同時對照多筆資料。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：返回後遺失查詢狀態" rightTitle="優秀的設計：返回時恢復查詢條件">
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>點進詳情頁後，搜尋條件被清空</li>
            <li>返回時重新回到初始狀態，需要重新搜尋</li>
            <li>連結不支援中鍵開新分頁</li>
          </ul>

          <!-- Bad: list page -->
          <Card v-if="badCurrentPage === 'list'">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">訂單列表</CardTitle>
              <div class="flex gap-2 mt-2">
                <Input v-model="badSearchQuery" placeholder="搜尋客戶..." class="h-8 text-sm" />
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="o in badOrders.filter(o => o.name.includes(badSearchQuery))" :key="o.id"
                class="flex items-center gap-3 px-4 py-2.5 border-b last:border-0 hover:bg-muted/40 transition-colors">
                <span class="font-mono text-xs text-muted-foreground">{{ o.id }}</span>
                <span class="flex-1 text-sm">{{ o.name }}</span>
                <!-- Bad: button-style, no native link -->
                <Button variant="ghost" size="sm" class="h-7 text-xs" @click="badNavigateToDetail(o.id)">
                  查看
                </Button>
              </div>
            </CardContent>
          </Card>

          <!-- Bad: detail page -->
          <Card v-else>
            <CardHeader>
              <button @click="badGoBack"
                class="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground mb-2 transition-colors">
                <ArrowLeft class="h-3.5 w-3.5" />
                返回列表
              </button>
              <CardTitle class="text-sm">訂單詳情 ORD-001</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">... 詳情內容 ...</p>
              <p class="text-xs text-destructive mt-3">⚠️ 返回後，剛才的搜尋條件已遺失</p>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>返回時自動恢復篩選關鍵字與狀態</li>
            <li>連結支援 <kbd class="text-[10px] border rounded px-1">中鍵</kbd> 開新分頁（原生 &lt;a&gt; 標籤）</li>
            <li>狀態通常存放在 URL query params 中</li>
          </ul>

          <!-- Good: list page -->
          <Card v-if="goodCurrentPage === 'list'">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">訂單列表</CardTitle>
              <div class="flex gap-2 mt-2">
                <Input v-model="goodSearchQuery" placeholder="搜尋客戶或編號..." class="h-8 text-sm flex-1" />
                <Select v-model="goodStatusFilter">
                  <SelectTrigger class="h-8 text-xs w-32 shrink-0">
                    <SelectValue placeholder="所有狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">所有狀態</SelectItem>
                      <SelectItem value="已付款">已付款</SelectItem>
                      <SelectItem value="處理中">處理中</SelectItem>
                      <SelectItem value="待付款">待付款</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div v-if="goodSearchQuery || goodStatusFilter !== 'all'" class="flex items-center gap-1.5 mt-1.5">
                <Filter class="h-3 w-3 text-muted-foreground" />
                <span class="text-xs text-muted-foreground">
                  篩選中：{{ goodFilteredOrders.length }} 筆結果
                </span>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="o in goodFilteredOrders" :key="o.id"
                class="flex items-center gap-3 px-4 py-2.5 border-b last:border-0 hover:bg-muted/40 transition-colors">
                <span class="font-mono text-xs text-muted-foreground">{{ o.id }}</span>
                <span class="flex-1 text-sm">{{ o.name }}</span>
                <!-- Good: native anchor supports middle-click -->
                <a href="#" @click.prevent="goodNavigateToDetail(o)"
                  class="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  title="點擊查看 / 中鍵開新分頁">
                  <ExternalLink class="h-3 w-3" />
                  查看
                </a>
              </div>
              <div v-if="goodFilteredOrders.length === 0" class="px-4 py-6 text-center text-sm text-muted-foreground">
                沒有符合的訂單
              </div>
            </CardContent>
          </Card>

          <!-- Good: detail page -->
          <Card v-else>
            <CardHeader>
              <button @click="goodGoBack"
                class="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground mb-2 transition-colors">
                <ArrowLeft class="h-3.5 w-3.5" />
                返回列表（查詢條件已記憶）
              </button>
              <CardTitle class="text-sm">訂單詳情 {{ selectedOrder?.id }}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="space-y-1.5 text-sm">
                <div class="flex gap-2">
                  <dt class="text-muted-foreground w-16">客戶</dt>
                  <dd class="font-medium">{{ selectedOrder?.name }}</dd>
                </div>
                <div class="flex gap-2">
                  <dt class="text-muted-foreground w-16">金額</dt>
                  <dd class="tabular-nums">NT${{ selectedOrder?.amount.toLocaleString() }}</dd>
                </div>
                <div class="flex gap-2">
                  <dt class="text-muted-foreground w-16">狀態</dt>
                  <dd>{{ selectedOrder?.status }}</dd>
                </div>
              </dl>
              <p class="text-xs text-green-600 dark:text-green-400 mt-3">✓ 返回後篩選條件將自動恢復</p>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
