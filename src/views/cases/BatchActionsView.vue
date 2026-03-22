```
<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Download, Trash2, CheckSquare, Square, X, AlertCircle, Zap
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

interface Order {
  id: string
  name: string
  amount: string
  status: string
  date: string
}

const orders: Order[] = [
  { id: 'ORD-001', name: '王大明', amount: 'NT$12,500', status: '待處理', date: '2024/12/15' },
  { id: 'ORD-002', name: '李小芬', amount: 'NT$3,200', status: '待處理', date: '2024/12/15' },
  { id: 'ORD-003', name: '張志偉', amount: 'NT$8,800', status: '待處理', date: '2024/12/14' },
  { id: 'ORD-004', name: '陳美麗', amount: 'NT$1,500', status: '待處理', date: '2024/12/14' },
  { id: 'ORD-005', name: '林俊傑', amount: 'NT$22,000', status: '待處理', date: '2024/12/13' },
]

// Bad: no selection, per-row actions only
const badRows = ref([...orders])

// Good: batch selection
const selectedIds = ref<Set<string>>(new Set())
const allSelected = computed(() => selectedIds.value.size === orders.length)
const someSelected = computed(() => selectedIds.value.size > 0 && !allSelected.value)

function toggleAll() {
  if (allSelected.value) {
    selectedIds.value.clear()
  } else {
    orders.forEach(o => selectedIds.value.add(o.id))
  }
  selectedIds.value = new Set(selectedIds.value) // trigger reactivity
}

function toggleRow(id: string) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
  selectedIds.value = new Set(selectedIds.value)
}

function clearSelection() {
  selectedIds.value.clear()
  selectedIds.value = new Set()
}

function batchApprove() {
  toast.success(`已核准 ${selectedIds.value.size} 筆訂單`)
  clearSelection()
}

function batchExport() {
  toast.success(`已匯出 ${selectedIds.value.size} 筆訂單`)
  clearSelection()
}

function batchDelete() {
  toast.error(`已刪除 ${selectedIds.value.size} 筆訂單`)
  clearSelection()
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">批次操作設計 (Batch Actions)</h1>
        <Badge variant="secondary" class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30">
          效率設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        批次選取搭配工具列操作，減少逐筆重複點擊的負擔。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>針對單一資料行提供獨立操作按鈕，適合低頻且非重複性的編輯需求</li>
                <li>當需要同時處理多筆相同任務時（如：全部核准），操作路徑過長且重複操作感重</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">待處理訂單（{{ orders.length }} 筆）</CardTitle>
            </CardHeader>
            <CardContent class="px-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b text-left text-xs text-muted-foreground">
                    <th class="py-2 px-4 font-medium">訂單號</th>
                    <th class="py-2 px-2 font-medium text-right">金額</th>
                    <th class="py-2 px-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in badRows" :key="order.id" class="border-b last:border-0 hover:bg-muted/30">
                    <td class="py-2 px-4">
                      <div class="font-medium text-xs">{{ order.id }}</div>
                      <div class="text-xs text-muted-foreground">{{ order.name }}</div>
                    </td>
                    <td class="py-2 px-2 text-right text-xs tabular-nums">{{ order.amount }}</td>
                    <td class="py-2 px-4">
                      <div class="flex gap-1 justify-end">
                        <Button size="sm" variant="outline" class="h-6 px-2 text-[10px]"
                          @click="toast.success(`已核准 ${order.id}`)">核准</Button>
                        <Button size="sm" variant="outline" class="h-6 px-2 text-[10px]"
                          @click="toast.info(`匯出 ${order.id}`)">
                          <Download class="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline"
                          class="h-6 px-2 text-[10px] text-destructive hover:text-destructive"
                          @click="toast.error(`刪除 ${order.id}`)">
                          <Trash2 class="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="text-[11px] text-muted-foreground px-4 pt-3 pb-1 italic">
                要核准全部 5 筆，需手動點擊 5 次「核准」按鈕
              </p>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>提供批次選取功能與全局操作工具列，適合處理大量重複性任務</li>
                <li>支援「全選」與「範圍選取」，最大程度減少使用者在繁瑣任務中的點擊次數</li>
              </ul>
            </div>
          </div>

          <Card class="overflow-hidden">
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm">待處理訂單（{{ orders.length }} 筆）</CardTitle>
              </div>
            </CardHeader>

            <!-- Batch action bar -->
            <div class="flex items-center gap-2 px-4 py-2 border-b transition-all duration-200" :class="selectedIds.size > 0
              ? 'bg-primary/5 border-primary/20'
              : 'bg-transparent border-transparent'">
              <template v-if="selectedIds.size > 0">
                <span class="text-sm font-medium text-primary">已選 {{ selectedIds.size }} 筆</span>
                <div class="flex items-center gap-1.5 ml-2">
                  <Button size="sm" class="h-7 text-xs" @click="batchApprove">批次核准</Button>
                  <Button size="sm" variant="outline" class="h-7 text-xs" @click="batchExport">
                    <Download class="h-3 w-3 mr-1" />匯出
                  </Button>
                  <Button size="sm" variant="outline"
                    class="h-7 text-xs text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
                    @click="batchDelete">
                    <Trash2 class="h-3 w-3 mr-1" />刪除
                  </Button>
                </div>
                <Button size="sm" variant="ghost" class="h-7 w-7 p-0 ml-auto" @click="clearSelection">
                  <X class="h-3.5 w-3.5" />
                </Button>
              </template>
              <template v-else>
                <span class="text-xs text-muted-foreground">點擊勾選框以選擇多筆資料</span>
              </template>
            </div>

            <CardContent class="px-0 pb-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b text-left text-xs text-muted-foreground">
                    <th class="py-2 pl-4 pr-2 w-8">
                      <button @click="toggleAll" class="flex items-center justify-center w-4 h-4">
                        <CheckSquare v-if="allSelected" class="h-4 w-4 text-primary" />
                        <div v-else-if="someSelected"
                          class="h-4 w-4 border-2 border-primary rounded-sm bg-primary/20 flex items-center justify-center">
                          <div class="w-2 h-0.5 bg-primary rounded" />
                        </div>
                        <Square v-else class="h-4 w-4 text-muted-foreground/50" />
                      </button>
                    </th>
                    <th class="py-2 px-2 font-medium">訂單號</th>
                    <th class="py-2 px-2 font-medium text-right">金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id"
                    class="border-b last:border-0 transition-colors cursor-pointer"
                    :class="selectedIds.has(order.id) ? 'bg-primary/5' : 'hover:bg-muted/30'"
                    @click="toggleRow(order.id)">
                    <td class="py-2.5 pl-4 pr-2 w-8">
                      <div class="flex items-center justify-center w-4 h-4" @click.stop="toggleRow(order.id)">
                        <CheckSquare v-if="selectedIds.has(order.id)" class="h-4 w-4 text-primary" />
                        <Square v-else class="h-4 w-4 text-muted-foreground/40" />
                      </div>
                    </td>
                    <td class="py-2.5 px-2">
                      <div class="font-medium text-xs">{{ order.id }}</div>
                      <div class="text-xs text-muted-foreground">{{ order.name }}</div>
                    </td>
                    <td class="py-2.5 px-2 text-right text-xs tabular-nums">{{ order.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
