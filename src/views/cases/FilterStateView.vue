<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Filter, Search, AlertTriangle, Zap } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

interface PurchaseRequest {
  id: string
  title: string
  dept: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  category: 'material' | 'service' | 'equipment'
}

const requests: PurchaseRequest[] = [
  { id: 'PR-001', title: '辦公文具採購', dept: '行政部', amount: 3800, status: 'pending', category: 'material' },
  { id: 'PR-002', title: '伺服器維護合約', dept: '資訊部', amount: 85000, status: 'approved', category: 'service' },
  { id: 'PR-003', title: '印表機設備購置', dept: '行政部', amount: 24000, status: 'pending', category: 'equipment' },
  { id: 'PR-004', title: '清潔外包服務', dept: '總務部', amount: 12000, status: 'approved', category: 'service' },
  { id: 'PR-005', title: '網路交換器', dept: '資訊部', amount: 36000, status: 'rejected', category: 'equipment' },
  { id: 'PR-006', title: '員工安全帽', dept: '生產部', amount: 6500, status: 'pending', category: 'material' },
]

const statusLabel: Record<string, string> = {
  pending: '待審核',
  approved: '已核准',
  rejected: '已退回',
}

const statusColor: Record<string, string> = {
  pending: 'text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40',
  approved: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40',
  rejected: 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40',
}

const categoryLabel: Record<string, string> = {
  material: '物料採購',
  service: '服務採購',
  equipment: '設備採購',
}

// ──── BAD SIDE ────
// Filters require "Apply" click; post-apply there is no visible active state
const badStatus = ref('all')
const badCategory = ref('all')
const badApplied = ref(false)
const badAppliedStatus = ref('all')
const badAppliedCategory = ref('all')

function badApply() {
  badApplied.value = true
  badAppliedStatus.value = badStatus.value
  badAppliedCategory.value = badCategory.value
  toast.info('已套用篩選條件')
}

const badFiltered = computed(() => {
  if (!badApplied.value) return requests
  return requests.filter(r => {
    if (badAppliedStatus.value !== 'all' && r.status !== badAppliedStatus.value) return false
    if (badAppliedCategory.value !== 'all' && r.category !== badAppliedCategory.value) return false
    return true
  })
})

// ──── GOOD SIDE ────
const goodSearch = ref('')
const goodStatus = ref('all')
const goodCategory = ref('all')

interface ActiveFilter { key: string; label: string; value: string }

const activeFilters = computed<ActiveFilter[]>(() => {
  const filters: ActiveFilter[] = []
  if (goodSearch.value.trim()) filters.push({ key: 'search', label: '關鍵字', value: goodSearch.value })
  if (goodStatus.value !== 'all') filters.push({ key: 'status', label: '狀態', value: statusLabel[goodStatus.value] })
  if (goodCategory.value !== 'all') filters.push({ key: 'category', label: '類別', value: categoryLabel[goodCategory.value] })
  return filters
})

const goodFiltered = computed(() => {
  return requests.filter(r => {
    if (goodSearch.value.trim() && !r.title.includes(goodSearch.value) && !r.dept.includes(goodSearch.value)) return false
    if (goodStatus.value !== 'all' && r.status !== goodStatus.value) return false
    if (goodCategory.value !== 'all' && r.category !== goodCategory.value) return false
    return true
  })
})

function removeFilter(key: string) {
  if (key === 'search') goodSearch.value = ''
  else if (key === 'status') goodStatus.value = 'all'
  else if (key === 'category') goodCategory.value = 'all'
}

function clearAll() {
  goodSearch.value = ''
  goodStatus.value = 'all'
  goodCategory.value = 'all'
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">篩選器狀態顯示 (Filter State)</h1>
        <Badge variant="secondary" class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30">
          效率設計
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        篩選條件套用後應持續顯示當前有效的篩選狀態，讓使用者隨時知道「正在看什麼」，並能快速調整或一鍵清除。
      </p>
    </div>

    <SplitView>
      <!-- ════════════════ LEFT: BAD ════════════════ -->
      <template #left>
        <div class="flex-1 flex flex-col gap-3 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold">套用後無跡可查 (Filter State Hidden)</p>
              <p class="opacity-80">設定篩選條件後點擊「套用」，列表雖已過濾，但畫面上沒有任何線索說明目前在哪個維度檢視，用戶必須重新展開選單才能確認。</p>
            </div>
          </div>

          <Card class="border-border">
            <CardHeader class="pb-2 border-b">
              <CardTitle class="text-sm">採購申請</CardTitle>
            </CardHeader>
            <CardContent class="pt-3 space-y-3">
              <!-- Filter dropdowns requiring "Apply" action -->
              <div class="grid grid-cols-2 gap-2">
                <Select v-model="badStatus">
                  <SelectTrigger class="h-8 text-xs">
                    <SelectValue placeholder="全部狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">全部狀態</SelectItem>
                      <SelectItem value="pending">待審核</SelectItem>
                      <SelectItem value="approved">已核准</SelectItem>
                      <SelectItem value="rejected">已退回</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select v-model="badCategory">
                  <SelectTrigger class="h-8 text-xs">
                    <SelectValue placeholder="全部類別" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">全部類別</SelectItem>
                      <SelectItem value="material">物料採購</SelectItem>
                      <SelectItem value="service">服務採購</SelectItem>
                      <SelectItem value="equipment">設備採購</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" class="w-full h-8 text-xs" @click="badApply">
                <Filter class="h-3.5 w-3.5 mr-1.5" />套用篩選
              </Button>

              <!-- Data list: no result count, no active filter chips -->
              <div class="border rounded-md divide-y border-border">
                <div
                  class="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 bg-muted/40 text-[10px] font-medium text-muted-foreground">
                  <span>申請名稱</span><span>金額</span><span>狀態</span>
                </div>
                <div v-for="r in badFiltered" :key="r.id"
                  class="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2.5 text-xs items-center">
                  <div class="min-w-0">
                    <p class="font-medium truncate">{{ r.title }}</p>
                    <p class="text-muted-foreground text-[10px] mt-0.5">{{ r.dept }}</p>
                  </div>
                  <span class="text-muted-foreground text-[11px] shrink-0">NT${{ r.amount.toLocaleString() }}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                    :class="statusColor[r.status]">
                    {{ statusLabel[r.status] }}
                  </span>
                </div>
                <div v-if="badFiltered.length === 0" class="py-5 text-center text-xs text-muted-foreground">無符合結果</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <!-- ════════════════ RIGHT: GOOD ════════════════ -->
      <template #right>
        <div class="flex-1 flex flex-col gap-3 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold">恒顯篩選狀態 + 即時回應 (Persistent Filter State)</p>
              <p class="opacity-80">以 Chip 即時顯示所有有效篩選條件與結果總數，支援逐一或一鍵清除；快速篩選器全部平鋪，無需展開選單。</p>
            </div>
          </div>

          <Card class="border-border">
            <CardHeader class="pb-2 border-b">
              <CardTitle class="text-sm flex items-center justify-between">
                採購申請
                <span class="text-xs font-normal text-muted-foreground">
                  <span class="font-semibold text-foreground">{{ goodFiltered.length }}</span> / {{ requests.length }} 筆
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent class="pt-3 space-y-2.5">
              <!-- Real-time search -->
              <div class="relative">
                <Search
                  class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input v-model="goodSearch" placeholder="搜尋名稱或部門..." class="h-8 text-xs pl-8" />
              </div>

              <!-- Flat chip filter bar: status + category, instant filter, no Apply needed -->
              <div class="flex flex-wrap items-center gap-1.5">
                <button
                  v-for="item in [{ value: 'all', label: '全部' }, { value: 'pending', label: '待審核' }, { value: 'approved', label: '已核准' }, { value: 'rejected', label: '已退回' }]"
                  :key="item.value" @click="goodStatus = item.value"
                  class="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all"
                  :class="goodStatus === item.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'">{{ item.label }}</button>
                <span class="text-border text-xs select-none mx-0.5">|</span>
                <button
                  v-for="item in [{ value: 'material', label: '物料' }, { value: 'service', label: '服務' }, { value: 'equipment', label: '設備' }]"
                  :key="item.value" @click="goodCategory = goodCategory === item.value ? 'all' : item.value"
                  class="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all"
                  :class="goodCategory === item.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'">{{ item.label }}</button>
              </div>

              <!-- Active filter chips: appears when ≥1 filter is active -->
              <div v-if="activeFilters.length > 0"
                class="flex items-center gap-1.5 flex-wrap p-2 rounded-lg bg-primary/5 border border-primary/15">
                <Filter class="h-3 w-3 text-primary shrink-0" />
                <span class="text-[10px] text-primary font-medium shrink-0">{{ activeFilters.length }} 個篩選中：</span>
                <button v-for="f in activeFilters" :key="f.key" @click="removeFilter(f.key)"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium hover:opacity-75 transition-opacity">
                  {{ f.label }}：{{ f.value }}
                  <X class="h-2.5 w-2.5" />
                </button>
                <button @click="clearAll"
                  class="ml-auto text-[10px] text-primary/70 hover:text-primary hover:underline transition-colors">
                  清除全部
                </button>
              </div>

              <!-- Same data table, but now filtered state is always visible -->
              <div class="border rounded-md divide-y border-border">
                <div
                  class="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 bg-muted/40 text-[10px] font-medium text-muted-foreground">
                  <span>申請名稱</span><span>金額</span><span>狀態</span>
                </div>
                <div v-for="r in goodFiltered" :key="r.id"
                  class="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2.5 text-xs items-center">
                  <div class="min-w-0">
                    <p class="font-medium truncate">{{ r.title }}</p>
                    <p class="text-muted-foreground text-[10px] mt-0.5">{{ r.dept }}</p>
                  </div>
                  <span class="text-muted-foreground text-[11px] shrink-0">NT${{ r.amount.toLocaleString() }}</span>
                  <span class="px-1.5 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                    :class="statusColor[r.status]">
                    {{ statusLabel[r.status] }}
                  </span>
                </div>
                <div v-if="goodFiltered.length === 0" class="py-5 text-center text-xs text-muted-foreground">
                  無符合條件的申請
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
