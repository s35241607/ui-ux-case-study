<script setup lang="ts">
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const rawData = [
  { name: '2024 Q4 總營收', value: 15820000, change: 12.4, type: 'money' },
  { name: '活躍用戶數', value: 84231, change: 3.2, type: 'count' },
  { name: '平均訂單金額', value: 4820, change: -2.1, type: 'money' },
  { name: '退款率', value: 0.032, change: -0.8, type: 'percent' },
]

function fmt(val: number, type: string) {
  if (type === 'money') return `NT$${val.toLocaleString()}`
  if (type === 'percent') return `${(val * 100).toFixed(1)}%`
  return val.toLocaleString()
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">資料對齊與數字格式 (Data Alignment)</h1>
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">視覺設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        統一欄位對齊方式與數字格式，提升表格資料的閱讀效率。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-5 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>所有欄位一律靠左，數字無法垂直對齊進行大小比較</li>
                <li>金額缺乏千分位與單位，大額數字閱讀負擔重且易讀錯</li>
                <li>數值變化缺乏顏色與趨勢圖示呈現，無法快速判斷盈虧</li>
              </ul>
            </div>
          </div>

          <!-- Bad data table -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">經營指標</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b bg-muted/40 text-[11px] text-muted-foreground">
                    <th class="text-center p-3 font-medium">指標名稱</th>
                    <th class="text-center p-3 font-medium">數值</th>
                    <th class="text-center p-3 font-medium">變化</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-for="row in rawData" :key="row.name" class="hover:bg-muted/20">
                    <td class="text-center p-3 text-[13px]">{{ row.name }}</td>
                    <td class="text-center p-3 text-[13px]">
                      <!-- Bad: no formatting, no alignment -->
                      {{ row.type === 'money' ? `NT$${row.value}` : row.type === 'percent' ? `${row.value}` : row.value
                      }}
                    </td>
                    <td class="text-center p-3 text-[13px] font-mono">{{ row.change > 0 ? '+' : '' }}{{ row.change }}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <!-- Bad: mixed alignment paragraph -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">訂單明細</CardTitle>
            </CardHeader>
            <CardContent class="pt-2">
              <div class="text-[13px] space-y-2 text-center opacity-70">
                <div>訂單編號：ORD-20241215-00042</div>
                <div>客戶：王小明企業有限公司</div>
                <div>金額：NT$15820000</div>
                <div>數量：1240</div>
                <div>優惠折扣：-NT$500000</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-5 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>文字靠左、數字靠右並搭配橫向間隔，方便視線快速掃描比較</li>
                <li>數字導入千分位與 Tabular Nums 字體，確保各行位數對齊</li>
                <li>利用導義語意顏色（紅/綠）與趨勢箭頭，強化指標變化的反饋</li>
              </ul>
            </div>
          </div>

          <!-- Good data table -->
          <Card class="shadow-sm">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">經營指標</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b bg-muted/40 text-[11px] text-muted-foreground">
                    <th class="text-left p-3 font-medium">指標名稱</th>
                    <th class="text-right p-3 font-medium">數值</th>
                    <th class="text-right p-3 font-medium">變化</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-for="row in rawData" :key="row.name" class="hover:bg-muted/20 transition-colors">
                    <!-- Good: text left -->
                    <td class="text-left p-3 font-medium text-[13px] text-foreground">{{ row.name }}</td>
                    <!-- Good: numbers right, formatted -->
                    <td class="text-right p-3 tabular-nums font-mono text-[13px]">{{ fmt(row.value, row.type) }}</td>
                    <!-- Good: colored change -->
                    <td class="text-right p-3 tabular-nums font-medium text-[13px]"
                      :class="row.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ row.change > 0 ? '▲' : '▼' }} {{ Math.abs(row.change) }}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <!-- Good: proper layout card -->
          <Card class="shadow-sm">
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">訂單明細</CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="space-y-2 text-[13px]">
                <div class="flex justify-between items-center">
                  <dt class="text-muted-foreground">訂單編號</dt>
                  <dd class="font-mono text-[11px]">ORD-20241215-00042</dd>
                </div>
                <div class="flex justify-between items-start">
                  <dt class="text-muted-foreground mr-4">客戶</dt>
                  <dd class="font-medium text-right max-w-[60%] leading-tight">王小明企業有限公司</dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-muted-foreground">數量</dt>
                  <dd class="tabular-nums font-medium">1,240 件</dd>
                </div>
                <div class="flex justify-between items-center">
                  <dt class="text-muted-foreground">優惠折扣</dt>
                  <dd class="tabular-nums text-red-600 dark:text-red-400 font-medium">-NT$500,000</dd>
                </div>
                <div class="flex justify-between border-t pt-2 mt-2 items-end">
                  <dt class="font-semibold text-foreground">總金額</dt>
                  <dd class="tabular-nums font-bold text-lg tracking-tight">NT$15,820,000</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
