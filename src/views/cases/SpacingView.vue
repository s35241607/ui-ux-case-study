<script setup lang="ts">
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">視覺間距與舒適度 (Spacing)</h1>
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">UI 設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        適當的 padding 和 margin 讓介面有「呼吸感」，元素間距不足會讓視覺感到壓迫、難以閱讀；
        過多則讓頁面顯得空洞無主次。好的間距設計能讓用戶更快找到需要的內容。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：過度擁擠或混亂的間距" rightTitle="優秀的設計：有層次的視覺呼吸空間">
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <p class="text-sm text-muted-foreground list-disc list-inside">
            特徵：元素緊貼在一起、沒有視覺分隔、文字行距過密、點擊目標過小
          </p>

          <!-- Bad: cramped card -->
          <div class="border rounded overflow-hidden text-sm">
            <div class="bg-muted/50 border-b p-1 font-bold text-xs">訂單列表</div>
            <div class="divide-y">
              <div v-for="i in 4" :key="i" class="flex items-center p-1 gap-1 text-xs">
                <span class="font-mono">#ORD-{{ 1000 + i }}</span>
                <span class="flex-1">客戶{{ ['王小明','陳大志','林美華','張志遠'][i-1] }}</span>
                <span class="text-green-600">已付款</span>
                <span>${{ [12800, 4500, 98200, 2100][i-1] }}</span>
              </div>
            </div>
          </div>

          <!-- Bad: cramped form -->
          <div class="border rounded p-1 text-xs">
            <div class="font-bold mb-0">搜尋篩選</div>
            <div class="flex gap-0.5 flex-wrap">
              <input class="border rounded px-1 h-6 bg-background" placeholder="訂單編號" />
              <input class="border rounded px-1 h-6 bg-background" placeholder="客戶名稱" />
              <select class="border rounded px-1 h-6 bg-background"><option>所有狀態</option></select>
              <button class="bg-primary text-primary-foreground rounded px-1 h-6">搜尋</button>
            </div>
          </div>

          <!-- Bad: info card -->
          <div class="border rounded p-1">
            <div class="text-xs font-bold">帳戶資訊</div>
            <div class="text-xs">姓名：王小明</div>
            <div class="text-xs">信箱：wang@example.com</div>
            <div class="text-xs">電話：0912-345-678</div>
            <div class="text-xs">地址：台北市信義區市府路1號</div>
            <div class="flex gap-1 mt-0.5">
              <button class="bg-primary text-primary-foreground text-xs rounded px-1 py-0.5">編輯</button>
              <button class="bg-destructive text-destructive-foreground text-xs rounded px-1 py-0.5">刪除</button>
            </div>
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-5 mt-4">
          <p class="text-sm text-muted-foreground">
            特徵：元素間有充足間距、標題與內容有明確層次、操作按鈕有足夠點擊目標
          </p>

          <!-- Good: spacious table -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">訂單列表</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div class="divide-y">
                <div
                  v-for="(row, i) in [
                    { id:'ORD-1001', name:'王小明', status:'已付款', amount:12800 },
                    { id:'ORD-1002', name:'陳大志', status:'處理中', amount:4500 },
                    { id:'ORD-1003', name:'林美華', status:'已付款', amount:98200 },
                    { id:'ORD-1004', name:'張志遠', status:'待付款', amount:2100 },
                  ]"
                  :key="row.id"
                  class="flex items-center px-4 py-3 gap-3 hover:bg-muted/40 transition-colors"
                >
                  <span class="font-mono text-xs text-muted-foreground w-24 shrink-0">#{{ row.id }}</span>
                  <span class="flex-1 text-sm font-medium">{{ row.name }}</span>
                  <span
                    class="text-xs px-2 py-0.5 rounded-full font-medium"
                    :class="{
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': row.status === '已付款',
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400': row.status === '處理中',
                      'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': row.status === '待付款',
                    }"
                  >{{ row.status }}</span>
                  <span class="text-sm font-medium tabular-nums text-right">NT${{ row.amount.toLocaleString() }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Good: spacious form -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">搜尋篩選</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-3">
                <input class="border rounded-md px-3 h-9 text-sm bg-background focus:ring-1 focus:ring-ring outline-none" placeholder="訂單編號" />
                <input class="border rounded-md px-3 h-9 text-sm bg-background focus:ring-1 focus:ring-ring outline-none" placeholder="客戶名稱" />
                <select class="border rounded-md px-3 h-9 text-sm bg-background focus:ring-1 focus:ring-ring outline-none"><option>所有狀態</option></select>
                <button class="bg-primary text-primary-foreground rounded-md px-4 h-9 text-sm font-medium hover:bg-primary/90 transition-colors">搜尋</button>
              </div>
            </CardContent>
          </Card>

          <!-- Good: info card -->
          <Card>
            <CardHeader>
              <CardTitle class="text-sm">帳戶資訊</CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="space-y-2 text-sm">
                <div class="flex gap-2"><dt class="text-muted-foreground w-12 shrink-0">姓名</dt><dd class="font-medium">王小明</dd></div>
                <div class="flex gap-2"><dt class="text-muted-foreground w-12 shrink-0">信箱</dt><dd>wang@example.com</dd></div>
                <div class="flex gap-2"><dt class="text-muted-foreground w-12 shrink-0">電話</dt><dd>0912-345-678</dd></div>
                <div class="flex gap-2"><dt class="text-muted-foreground w-12 shrink-0">地址</dt><dd>台北市信義區市府路1號</dd></div>
              </dl>
              <div class="flex gap-2 mt-4 pt-4 border-t">
                <button class="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">編輯資訊</button>
                <button class="border rounded-md px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">取消</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
