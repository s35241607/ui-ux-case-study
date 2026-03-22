<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowLeft, CheckCircle2, AlertTriangle, Calendar, Tag, DollarSign, Search, FilterX } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

interface Order {
  id: string
  name: string
  amount: number
  status: string
  category: string
  date: string
}

const allOrders: Order[] = [
  { id: 'ORD-001', name: '王小明', amount: 12800, status: '已付款', category: '電子產品', date: '2024-03-01' },
  { id: 'ORD-002', name: '陳大志', amount: 4500, status: '處理中', category: '家居用品', date: '2024-03-05' },
  { id: 'ORD-003', name: '林美華', amount: 98200, status: '已付款', category: '精品服飾', date: '2024-02-28' },
  { id: 'ORD-004', name: '張志遠', amount: 2100, status: '待付款', category: '電子產品', date: '2024-03-10' },
  { id: 'ORD-005', name: '李阿土', amount: 15600, status: '已取消', category: '家居用品', date: '2024-03-12' },
  { id: 'ORD-006', name: '周曉明', amount: 32000, status: '已付款', category: '精品服飾', date: '2024-01-15' },
]

// ----共通狀態----
const selectedOrderError = ref<Order | null>(null)
const selectedOrderMatch = ref<Order | null>(null)

// ==========================================
// BAD SIMULATION (State is Lost)
// ==========================================
const badSearchQuery = ref('')
const badStatusFilter = ref('all')
const badCategoryFilter = ref('all')
const badCurrentPage = ref<'list' | 'detail'>('list')

const badFilteredOrders = computed(() => {
  return allOrders.filter(o => {
    const matchQ = o.name.includes(badSearchQuery.value) || o.id.includes(badSearchQuery.value)
    const matchS = badStatusFilter.value === 'all' || o.status === badStatusFilter.value
    const matchC = badCategoryFilter.value === 'all' || o.category === badCategoryFilter.value
    return matchQ && matchS && matchC
  })
})

function badNavigateToDetail(order: Order) {
  // 模擬傳統行為：進入詳情頁時，原本的查詢條件被丟失
  badSearchQuery.value = ''
  badStatusFilter.value = 'all'
  badCategoryFilter.value = 'all'
  selectedOrderError.value = order
  badCurrentPage.value = 'detail'
}

function badGoBack() {
  badCurrentPage.value = 'list'
}

function badClearFilters() {
  badSearchQuery.value = ''
  badStatusFilter.value = 'all'
  badCategoryFilter.value = 'all'
}

// ==========================================
// GOOD SIMULATION (State is Preserved)
// ==========================================
const goodSearchQuery = ref('')
const goodStatusFilter = ref('all')
const goodCategoryFilter = ref('all')
const goodCurrentPage = ref<'list' | 'detail'>('list')

// 模擬 URL / 路由暫存機制
const savedState = ref({
  query: '',
  status: 'all',
  category: 'all'
})

const goodFilteredOrders = computed(() => {
  return allOrders.filter(o => {
    const matchQ = o.name.includes(goodSearchQuery.value) || o.id.includes(goodSearchQuery.value)
    const matchS = goodStatusFilter.value === 'all' || o.status === goodStatusFilter.value
    const matchC = goodCategoryFilter.value === 'all' || o.category === goodCategoryFilter.value
    return matchQ && matchS && matchC
  })
})

function goodNavigateToDetail(order: Order) {
  // 進入詳情前保存當前狀態
  savedState.value = {
    query: goodSearchQuery.value,
    status: goodStatusFilter.value,
    category: goodCategoryFilter.value
  }
  selectedOrderMatch.value = order
  goodCurrentPage.value = 'detail'
}

function goodGoBack() {
  // 恢復狀態
  goodSearchQuery.value = savedState.value.query
  goodStatusFilter.value = savedState.value.status
  goodCategoryFilter.value = savedState.value.category
  goodCurrentPage.value = 'list'
  
  toast.success('已恢復返回前的搜尋條件', {
    description: '確保操作過程不中斷，無需重新過濾資料。'
  })
}

function goodClearFilters() {
  goodSearchQuery.value = ''
  goodStatusFilter.value = 'all'
  goodCategoryFilter.value = 'all'
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">導覽狀態保留 (Navigation State)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">導覽與狀態</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        當使用者在列表頁設定了多重篩選條件並進入詳情頁後，點擊返回時，系統應該主動還原之前的篩選組合，避免強迫使用者重複相同的輸入與點擊，提升整體操作流暢度。
      </p>
    </div>

    <SplitView>
      <!-- ============================================= -->
      <!-- LEFT: BAD (State Lost)                        -->
      <!-- ============================================= -->
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-[12px] leading-relaxed">
              <p class="font-semibold mb-1">狀態遺失 (State Loss)</p>
              <ul class="list-disc list-inside opacity-90 space-y-0.5">
                <li>返回列表頁時，條件被清空</li>
                <li>使用者必須重新鍵入或選擇條件，非常繁瑣</li>
              </ul>
            </div>
          </div>

          <!-- LIST PAGE -->
          <Card v-if="badCurrentPage === 'list'" class="shadow-sm border-border/80">
            <CardHeader class="pb-3 border-b bg-muted/20">
              <CardTitle class="text-[14px]">訂單管理</CardTitle>
              
              <!-- Filters UI -->
              <div class="flex flex-col gap-3 mt-4">
                <div class="relative">
                  <Search class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input v-model="badSearchQuery" placeholder="搜尋客戶名稱或編號..." class="pl-9 h-9 text-xs bg-background" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <Select v-model="badStatusFilter">
                    <SelectTrigger class="h-9 text-xs bg-background">
                      <SelectValue placeholder="付款狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有狀態</SelectItem>
                      <SelectItem value="已付款">已付款</SelectItem>
                      <SelectItem value="處理中">處理中</SelectItem>
                      <SelectItem value="待付款">待付款</SelectItem>
                      <SelectItem value="已取消">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select v-model="badCategoryFilter">
                    <SelectTrigger class="h-9 text-xs bg-background">
                      <SelectValue placeholder="商品分類" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分類</SelectItem>
                      <SelectItem value="電子產品">電子產品</SelectItem>
                      <SelectItem value="家居用品">家居用品</SelectItem>
                      <SelectItem value="精品服飾">精品服飾</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div v-show="badSearchQuery || badStatusFilter !== 'all' || badCategoryFilter !== 'all'" class="flex items-center justify-between mt-1">
                  <span class="text-[11px] text-muted-foreground font-medium">篩選結果: {{ badFilteredOrders.length }} 筆</span>
                  <Button variant="ghost" size="sm" class="h-6 text-[11px] px-2 text-muted-foreground hover:text-foreground" @click="badClearFilters">
                    <FilterX class="h-3 w-3 mr-1" /> 清除條件
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableHeader class="bg-muted/10">
                  <TableRow class="hover:bg-transparent">
                    <TableHead class="h-9 text-[11px] font-medium pl-4">訂單資訊</TableHead>
                    <TableHead class="h-9 text-[11px] font-medium">分類</TableHead>
                    <TableHead class="h-9 text-[11px] font-medium text-right pr-4">金額 / 狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="o in badFilteredOrders" :key="o.id" class="cursor-pointer hover:bg-muted/50" @click="badNavigateToDetail(o)">
                    <TableCell class="py-2.5 pl-4">
                      <div class="font-medium text-xs">{{ o.name }}</div>
                      <div class="text-[10px] text-muted-foreground font-mono mt-0.5">{{ o.id }}</div>
                    </TableCell>
                    <TableCell class="py-2.5">
                      <Badge variant="outline" class="font-normal text-[10px]">{{ o.category }}</Badge>
                    </TableCell>
                    <TableCell class="py-2.5 text-right pr-4">
                      <div class="font-medium text-xs font-mono">{{ o.amount.toLocaleString() }}</div>
                      <div class="text-[10px] text-muted-foreground mt-0.5">{{ o.status }}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div v-if="badFilteredOrders.length === 0" class="py-10 text-center flex flex-col items-center">
                <Search class="h-8 w-8 text-muted/40 mb-2" />
                <span class="text-[12px] text-muted-foreground">查無訂單資料</span>
              </div>
            </CardContent>
          </Card>

          <!-- DETAIL PAGE -->
          <Card v-else class="shadow-sm border-border/80">
            <CardHeader class="pb-3 border-b bg-muted/10">
              <button @click="badGoBack" class="flex w-fit items-center gap-1.5 text-muted-foreground text-[11px] hover:text-foreground mb-1.5 transition-colors">
                <ArrowLeft class="h-3 w-3" /> 返回列表
              </button>
              <CardTitle class="text-[14px]">訂單詳情：{{ selectedOrderError?.id }}</CardTitle>
            </CardHeader>
            <CardContent class="pt-5 flex flex-col gap-5">
              <div class="grid grid-cols-2 gap-4 bg-muted/20 p-4 rounded-md">
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Calendar class="h-3 w-3" /> 建立日期</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderError?.date }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Tag class="h-3 w-3" /> 訂單分類</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderError?.category }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><CheckCircle2 class="h-3 w-3" /> 目前狀態</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderError?.status }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><DollarSign class="h-3 w-3" /> 總計金額</p>
                  <p class="text-[13px] font-mono font-bold">NT$ {{ selectedOrderError?.amount.toLocaleString() }}</p>
                </div>
              </div>

              <!-- Bad warning block -->
              <div class="p-3 bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-md text-[11px] flex gap-2">
                <AlertTriangle class="h-4 w-4 shrink-0" />
                <span>當使用者點擊左上角「返回列表」時，稍早的所有搜尋與過濾條件將全數遺失，無法延續工作流。</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <!-- ============================================= -->
      <!-- RIGHT: GOOD (State Retained)                  -->
      <!-- ============================================= -->
      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <CheckCircle2 class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-[12px] leading-relaxed">
              <p class="font-semibold mb-1">狀態保留 (State Persistence)</p>
              <ul class="list-disc list-inside opacity-90 space-y-0.5">
                <li>返回列表頁時，透過 URL/Storage 恢復搜尋值與篩選項</li>
                <li>確保使用者可無縫銜接處理下一筆資料</li>
              </ul>
            </div>
          </div>

          <!-- LIST PAGE -->
          <Card v-if="goodCurrentPage === 'list'" class="shadow-sm border-border/80">
            <CardHeader class="pb-3 border-b bg-muted/20">
              <CardTitle class="text-[14px]">訂單管理</CardTitle>
              
              <!-- Filters UI -->
              <div class="flex flex-col gap-3 mt-4">
                <div class="relative">
                  <Search class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input v-model="goodSearchQuery" placeholder="搜尋客戶名稱或編號..." class="pl-9 h-9 text-xs bg-background" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <Select v-model="goodStatusFilter">
                    <SelectTrigger class="h-9 text-xs bg-background">
                      <SelectValue placeholder="付款狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有狀態</SelectItem>
                      <SelectItem value="已付款">已付款</SelectItem>
                      <SelectItem value="處理中">處理中</SelectItem>
                      <SelectItem value="待付款">待付款</SelectItem>
                      <SelectItem value="已取消">已取消</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select v-model="goodCategoryFilter">
                    <SelectTrigger class="h-9 text-xs bg-background">
                      <SelectValue placeholder="商品分類" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分類</SelectItem>
                      <SelectItem value="電子產品">電子產品</SelectItem>
                      <SelectItem value="家居用品">家居用品</SelectItem>
                      <SelectItem value="精品服飾">精品服飾</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div v-show="goodSearchQuery || goodStatusFilter !== 'all' || goodCategoryFilter !== 'all'" class="flex items-center justify-between mt-1">
                  <span class="text-[11px] text-muted-foreground font-medium">篩選結果: {{ goodFilteredOrders.length }} 筆</span>
                  <Button variant="ghost" size="sm" class="h-6 text-[11px] px-2 text-muted-foreground hover:text-foreground" @click="goodClearFilters">
                    <FilterX class="h-3 w-3 mr-1" /> 清除條件
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableHeader class="bg-muted/10">
                  <TableRow class="hover:bg-transparent">
                    <TableHead class="h-9 text-[11px] font-medium pl-4">訂單資訊</TableHead>
                    <TableHead class="h-9 text-[11px] font-medium">分類</TableHead>
                    <TableHead class="h-9 text-[11px] font-medium text-right pr-4">金額 / 狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="o in goodFilteredOrders" :key="o.id" class="cursor-pointer hover:bg-muted/50" @click="goodNavigateToDetail(o)">
                    <TableCell class="py-2.5 pl-4">
                      <div class="font-medium text-xs">{{ o.name }}</div>
                      <div class="text-[10px] text-muted-foreground font-mono mt-0.5">{{ o.id }}</div>
                    </TableCell>
                    <TableCell class="py-2.5">
                      <Badge variant="outline" class="font-normal text-[10px]">{{ o.category }}</Badge>
                    </TableCell>
                    <TableCell class="py-2.5 text-right pr-4">
                      <div class="font-medium text-xs font-mono">{{ o.amount.toLocaleString() }}</div>
                      <div class="text-[10px] text-muted-foreground mt-0.5" :class="{
                        'text-amber-500': o.status === '處理中',
                        'text-green-500': o.status === '已付款',
                      }">{{ o.status }}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div v-if="goodFilteredOrders.length === 0" class="py-10 text-center flex flex-col items-center">
                <Search class="h-8 w-8 text-muted/40 mb-2" />
                <span class="text-[12px] text-muted-foreground">查無訂單資料</span>
              </div>
            </CardContent>
          </Card>

          <!-- DETAIL PAGE -->
          <Card v-else class="shadow-sm border-border/80">
            <CardHeader class="pb-3 border-b bg-muted/10">
              <button @click="goodGoBack" class="flex w-fit items-center gap-1.5 text-primary text-[11px] hover:underline mb-1.5 transition-colors">
                <ArrowLeft class="h-3 w-3" /> 返回列表
              </button>
              <CardTitle class="text-[14px]">訂單詳情：{{ selectedOrderMatch?.id }}</CardTitle>
            </CardHeader>
            <CardContent class="pt-5 flex flex-col gap-5">
              <div class="grid grid-cols-2 gap-4 bg-muted/20 p-4 rounded-md">
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Calendar class="h-3 w-3" /> 建立日期</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderMatch?.date }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><Tag class="h-3 w-3" /> 訂單分類</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderMatch?.category }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><CheckCircle2 class="h-3 w-3" /> 目前狀態</p>
                  <p class="text-[12px] font-medium">{{ selectedOrderMatch?.status }}</p>
                </div>
                <div class="space-y-1">
                  <p class="text-[10px] text-muted-foreground uppercase flex items-center gap-1"><DollarSign class="h-3 w-3" /> 總計金額</p>
                  <p class="text-[13px] font-mono font-bold">NT$ {{ selectedOrderMatch?.amount.toLocaleString() }}</p>
                </div>
              </div>

              <!-- Good success block -->
              <div class="p-3 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-100 dark:border-green-900/30 rounded-md text-[11px] flex gap-2">
                <CheckCircle2 class="h-4 w-4 shrink-0" />
                <span>系統已在背景記錄您的所在分頁與篩選條件，當您返回列表時，將無縫接軌繼續未完成的操作。</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
