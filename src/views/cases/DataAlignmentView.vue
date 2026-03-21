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
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">UI 設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        文字靠左以符合閱讀習慣；數字靠右讓位數對齊、大小一眼看出；金額加上千分位分隔符幫助快速判讀數量級。
        這些細節直接影響報表與後台系統的易用性。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：對齊混亂、數字難以判讀" rightTitle="優秀的設計：文字靠左、數字靠右、千分位格式">
      <template #left>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>所有欄位一律置中或靠左，數字無法對齊比較</li>
            <li>金額沒有千分位，7位數字需要數才知道是幾百萬</li>
            <li>正負變化沒有顏色區分</li>
          </ul>

          <!-- Bad data table -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">經營指標（不良格式）</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b bg-muted/40">
                    <th class="text-center p-3 font-medium">指標名稱</th>
                    <th class="text-center p-3 font-medium">數值</th>
                    <th class="text-center p-3 font-medium">變化</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-for="row in rawData" :key="row.name" class="hover:bg-muted/20">
                    <td class="text-center p-3">{{ row.name }}</td>
                    <td class="text-center p-3">
                      <!-- Bad: no formatting, no alignment -->
                      {{ row.type === 'money' ? `NT$${row.value}` : row.type === 'percent' ? `${row.value}` : row.value }}
                    </td>
                    <td class="text-center p-3">{{ row.change > 0 ? '+' : '' }}{{ row.change }}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <!-- Bad: mixed alignment paragraph -->
          <Card>
            <CardContent class="pt-4">
              <div class="text-sm space-y-2 text-center">
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
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>說明文字靠左對齊，數字欄位靠右並使用 tabular-nums</li>
            <li>金額加上千分位（1,582萬 vs 15820000）</li>
            <li>漲跌用綠紅色快速傳達方向</li>
          </ul>

          <!-- Good data table -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">經營指標（正確格式）</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b bg-muted/40">
                    <th class="text-left p-3 font-medium">指標名稱</th>
                    <th class="text-right p-3 font-medium">數值</th>
                    <th class="text-right p-3 font-medium">變化</th>
                  </tr>
                </thead>
                <tbody class="divide-y">
                  <tr v-for="row in rawData" :key="row.name" class="hover:bg-muted/20">
                    <!-- Good: text left -->
                    <td class="text-left p-3 font-medium">{{ row.name }}</td>
                    <!-- Good: numbers right, formatted -->
                    <td class="text-right p-3 tabular-nums font-mono">{{ fmt(row.value, row.type) }}</td>
                    <!-- Good: colored change -->
                    <td class="text-right p-3 tabular-nums font-medium"
                      :class="row.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                    >
                      {{ row.change > 0 ? '▲' : '▼' }} {{ Math.abs(row.change) }}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <!-- Good: proper layout card -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">訂單明細</CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">訂單編號</dt>
                  <dd class="font-mono text-xs">ORD-20241215-00042</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">客戶</dt>
                  <dd class="font-medium text-right max-w-[60%] leading-tight">王小明企業有限公司</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">數量</dt>
                  <dd class="tabular-nums font-medium">1,240 件</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted-foreground">優惠折扣</dt>
                  <dd class="tabular-nums text-red-600 dark:text-red-400 font-medium">-NT$500,000</dd>
                </div>
                <div class="flex justify-between border-t pt-2 mt-2">
                  <dt class="font-semibold">總金額</dt>
                  <dd class="tabular-nums font-bold text-lg">NT$15,820,000</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
