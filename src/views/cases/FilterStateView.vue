<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import CaseBlock from '@/components/layout/CaseBlock.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Filter, Search, Calendar, Tag, Users, ChevronDown } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// Bad: no filter indicator
const badSearch = ref('')
const badStatus = ref('')
const badCategory = ref('')
const badDate = ref('')

// Good: filter state shown as chips with count
interface ActiveFilter {
  key: string
  label: string
  value: string
}

const goodSearch = ref('')
const goodStatus = ref('')
const goodCategory = ref('')
const goodDate = ref('')

const filterOptions = {
  status: [
    { value: 'pending', label: '待處理' },
    { value: 'approved', label: '已核准' },
    { value: 'rejected', label: '已拒絕' },
  ],
  category: [
    { value: 'material', label: '物料採購' },
    { value: 'service', label: '服務採購' },
    { value: 'equipment', label: '設備採購' },
  ],
  date: [
    { value: 'today', label: '今天' },
    { value: 'week', label: '本週' },
    { value: 'month', label: '本月' },
  ],
}

const activeFilters = computed<ActiveFilter[]>(() => {
  const filters: ActiveFilter[] = []
  if (goodSearch.value) {
    filters.push({ key: 'search', label: '關鍵字', value: goodSearch.value })
  }
  if (goodStatus.value) {
    const opt = filterOptions.status.find(o => o.value === goodStatus.value)
    if (opt) filters.push({ key: 'status', label: '狀態', value: opt.label })
  }
  if (goodCategory.value) {
    const opt = filterOptions.category.find(o => o.value === goodCategory.value)
    if (opt) filters.push({ key: 'category', label: '類別', value: opt.label })
  }
  if (goodDate.value) {
    const opt = filterOptions.date.find(o => o.value === goodDate.value)
    if (opt) filters.push({ key: 'date', label: '時間', value: opt.label })
  }
  return filters
})

function removeFilter(key: string) {
  if (key === 'search') goodSearch.value = ''
  else if (key === 'status') goodStatus.value = ''
  else if (key === 'category') goodCategory.value = ''
  else if (key === 'date') goodDate.value = ''
}

function clearAllFilters() {
  goodSearch.value = ''
  goodStatus.value = ''
  goodCategory.value = ''
  goodDate.value = ''
  toast.info('已清除全部篩選條件')
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">篩選器狀態顯示 (Filter State)</h1>
        <Badge variant="secondary" class="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        企業系統查詢功能常有多個篩選條件（狀態、類別、日期）。用戶設定篩選後，
        畫面無任何提示目前套用了哪些條件，導致對查詢結果感到困惑。
        良好的篩選器設計應在結果區域清楚顯示當前啟用的所有篩選條件，並提供快速移除的方式。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：設好篩選就消失，結果無提示" rightTitle="優秀的設計：Active Filter 徽章 + 一鍵清除">
      <template #left>
        <div class="flex-1 flex flex-col">
          <CaseBlock index="1" title="篩選條件面板" description="設定後收起面板，用戶不知道目前套用了什麼條件，結果可能出乎意料" tag="ux">
            <Card>
              <CardHeader class="pb-3">
                <CardTitle class="text-sm">採購申請查詢</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">關鍵字</label>
                    <Input v-model="badSearch" placeholder="搜尋⋯" class="h-8 text-xs" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">狀態</label>
                    <select v-model="badStatus" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.status" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">採購類別</label>
                    <select v-model="badCategory" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.category" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">時間範圍</label>
                    <select v-model="badDate" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.date" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </div>
                <Button size="sm" class="w-full h-8 text-xs" @click="toast.info('已套用篩選條件')">
                  <Filter class="h-3.5 w-3.5 mr-1" />套用篩選
                </Button>

                <!-- After "applying" - no indication of active filters -->
                <div class="border-t pt-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-muted-foreground">查詢結果</span>
                    <!-- No active filter count! -->
                  </div>
                  <div class="text-xs text-muted-foreground italic py-3 text-center">（套用篩選後，此區域不顯示目前啟用的篩選條件）</div>
                </div>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>

      <template #right>
        <div class="flex-1 flex flex-col">
          <CaseBlock index="1" title="篩選條件面板 + Active Filter 提示" description="套用後以標籤列顯示所有篩選條件，可逐一移除或一鍵清除全部" tag="ux">
            <Card>
              <CardHeader class="pb-3">
                <CardTitle class="text-sm">採購申請查詢</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">關鍵字</label>
                    <Input v-model="goodSearch" placeholder="搜尋⋯" class="h-8 text-xs" />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">狀態</label>
                    <select v-model="goodStatus" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.status" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">採購類別</label>
                    <select v-model="goodCategory" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.category" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">時間範圍</label>
                    <select v-model="goodDate" class="w-full h-8 text-xs border rounded-md px-2 bg-background">
                      <option value="">全部</option>
                      <option v-for="opt in filterOptions.date" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </div>

                <!-- Active filter chips - always visible -->
                <div class="border-t pt-3 space-y-2">
                  <div class="flex items-center justify-between min-h-6">
                    <div class="flex flex-wrap gap-1.5 flex-1">
                      <template v-if="activeFilters.length > 0">
                        <div class="flex items-center gap-1 flex-wrap">
                          <span class="text-xs text-muted-foreground shrink-0">
                            <Filter class="h-3 w-3 inline mr-0.5" />
                            {{ activeFilters.length }} 個篩選：
                          </span>
                          <button
                            v-for="filter in activeFilters"
                            :key="filter.key"
                            class="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-medium hover:bg-primary/20 transition-colors"
                            @click="removeFilter(filter.key)"
                          >
                            {{ filter.label }}：{{ filter.value }}
                            <X class="h-2.5 w-2.5" />
                          </button>
                          <button
                            class="text-[10px] text-muted-foreground hover:text-destructive underline transition-colors"
                            @click="clearAllFilters"
                          >清除全部</button>
                        </div>
                      </template>
                      <span v-else class="text-xs text-muted-foreground/60">未套用任何篩選條件，顯示所有資料</span>
                    </div>
                  </div>

                  <div class="rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground text-center">
                    <span v-if="activeFilters.length > 0">篩選後共 3 筆資料</span>
                    <span v-else>共 247 筆資料</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>
    </SplitView>
  </div>
</template>
