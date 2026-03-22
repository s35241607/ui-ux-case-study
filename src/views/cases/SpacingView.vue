<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const activeTab = ref('list')
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">視覺間距與舒適度 (Spacing)</h1>
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">視覺設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        透過一致的 8pt 間距系統建立視覺層級，讓元素間擁有充足的呼吸空間，大幅降低介面的視覺擁擠感與閱讀負擔。
      </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-3 sm:w-auto sm:inline-grid">
          <TabsTrigger value="list">訂單列表</TabsTrigger>
          <TabsTrigger value="form">搜尋篩選</TabsTrigger>
          <TabsTrigger value="info">帳戶資訊</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Ensure right side reveal state resets on tab change -->
    <SplitView :key="activeTab">
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <div
            class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
            <strong>過於擁擠 (Too Cramped)</strong><br />
            <span class="opacity-80">特徵：元素緊貼在一起、沒有視覺分隔、文字行距過密、點擊目標過小，容易誤觸。</span>
          </div>

          <!-- Scenario 1: List -->
          <div v-if="activeTab === 'list'"
            class="mt-4 border border-border/80 rounded overflow-hidden text-sm bg-background max-w-lg">
            <div class="bg-muted/50 border-b border-border/80 p-1 font-bold text-xs text-foreground">訂單列表</div>
            <div class="divide-y divide-border/80">
              <div v-for="row in [
                { id: 'ORD-1001', name: '王小明', status: '已付款', amount: 12800 },
                { id: 'ORD-1002', name: '陳大志', status: '處理中', amount: 4500 },
                { id: 'ORD-1003', name: '林美華', status: '已付款', amount: 98200 },
                { id: 'ORD-1004', name: '張志遠', status: '待付款', amount: 2100 },
              ]" :key="row.id" class="flex items-center p-1 gap-1 text-xs">
                <span class="font-mono text-muted-foreground">#{{ row.id }}</span>
                <span class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{{ row.name }}</span>
                <span :class="{
                  'text-green-600': row.status === '已付款',
                  'text-blue-600': row.status === '處理中',
                  'text-amber-600': row.status === '待付款',
                }">{{ row.status }}</span>
                <span class="tabular-nums">${{ row.amount.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Scenario 2: Form -->
          <div v-if="activeTab === 'form'"
            class="mt-4 border border-border/80 rounded p-1 text-xs bg-background max-w-lg flex flex-col">
            <div class="font-bold mb-0 text-foreground">搜尋篩選</div>
            <div class="flex gap-0.5 flex-wrap">
              <input class="border border-border/80 rounded px-1 h-6 bg-background text-foreground" placeholder="訂單編號"
                style="width: 80px;" />
              <input class="border border-border/80 rounded px-1 h-6 bg-background text-foreground" placeholder="客戶名稱"
                style="width: 80px;" />
              <select class="border border-border/80 rounded px-1 h-6 bg-background text-foreground">
                <option>所有狀態</option>
              </select>
              <button class="bg-primary text-primary-foreground rounded px-1 h-6">搜尋</button>
            </div>
          </div>

          <!-- Scenario 3: Info -->
          <div v-if="activeTab === 'info'"
            class="mt-4 border border-border/80 rounded p-1 text-foreground bg-background max-w-sm flex flex-col">
            <div class="text-xs font-bold">帳戶資訊</div>
            <div class="text-xs">姓名：王小明</div>
            <div class="text-xs">信箱：wang@example.com</div>
            <div class="text-xs">電話：0912-345-678</div>
            <div class="text-xs">地址：台北市信義區市府路1號</div>
            <div class="flex gap-1 mt-0.5">
              <button class="bg-primary text-primary-foreground text-xs rounded px-1 py-0.5">編輯資訊</button>
              <button
                class="bg-secondary text-secondary-foreground border border-border/80 text-xs rounded px-1 py-0.5">取消</button>
            </div>
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <div
            class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
            <strong>舒適層級 (Comfortable Spacing)</strong><br />
            <span class="opacity-80">特徵：元素間有充足的 8pt 格線系統間距、卡片邊界清晰、操作按鈕有標準指尖寬度的點擊目標 (大於 40px)。</span>
          </div>

          <!-- Scenario 1: List -->
          <Card v-if="activeTab === 'list'" class="mt-4 max-w-lg border-border/60 shadow-sm">
            <CardHeader class="pb-3 border-b">
              <CardTitle class="text-sm">訂單列表</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div class="divide-y divide-border/60">
                <div v-for="row in [
                  { id: 'ORD-1001', name: '王小明', status: '已付款', amount: 12800 },
                  { id: 'ORD-1002', name: '陳大志', status: '處理中', amount: 4500 },
                  { id: 'ORD-1003', name: '林美華', status: '已付款', amount: 98200 },
                  { id: 'ORD-1004', name: '張志遠', status: '待付款', amount: 2100 },
                ]" :key="row.id" class="flex items-center px-4 py-3 gap-3 hover:bg-muted/40 transition-colors">
                  <span class="font-mono text-xs text-muted-foreground w-20 shrink-0">#{{ row.id }}</span>
                  <span class="flex-1 text-sm font-medium">{{ row.name }}</span>
                  <span class="text-[11px] px-2 py-0.5 rounded-full font-medium" :class="{
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400': row.status === '已付款',
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400': row.status === '處理中',
                    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400': row.status === '待付款',
                  }">{{ row.status }}</span>
                  <span class="text-sm font-medium tabular-nums text-right w-20">NT${{ row.amount.toLocaleString()
                  }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Scenario 2: Form -->
          <Card v-if="activeTab === 'form'" class="mt-4 max-w-xl border-border/60 shadow-sm overflow-hidden">
            <CardHeader class="pb-4 bg-muted/20 border-b">
              <CardTitle class="text-sm">搜尋與篩選訂單</CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div class="space-y-2">
                  <Label class="text-[11px] text-muted-foreground uppercase font-semibold">訂單編號</Label>
                  <Input class="h-9 text-sm bg-background border-border/60" placeholder="訂單編號" />
                </div>
                <div class="space-y-2">
                  <Label class="text-[11px] text-muted-foreground uppercase font-semibold">客戶名稱</Label>
                  <Input class="h-9 text-sm bg-background border-border/60" placeholder="客戶名稱" />
                </div>
                <div class="space-y-2">
                  <Label class="text-[11px] text-muted-foreground uppercase font-semibold">訂單狀態</Label>
                  <Select>
                    <SelectTrigger class="h-9 text-sm bg-background border-border/60">
                      <SelectValue placeholder="所有狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有狀態</SelectItem>
                      <SelectItem value="paid">已付款</SelectItem>
                      <SelectItem value="pending">待付款</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="flex">
                  <Button class="w-full h-9 text-sm font-medium shadow-sm">搜尋</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Scenario 3: Info -->
          <Card v-if="activeTab === 'info'" class="mt-4 max-w-sm border-border/60 shadow-sm">
            <CardHeader class="pb-4 border-b">
              <CardTitle class="text-sm">帳戶資訊</CardTitle>
            </CardHeader>
            <CardContent class="pt-5">
              <dl class="space-y-4 text-sm">
                <div class="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                  <dt class="text-muted-foreground text-xs uppercase sm:w-16 shrink-0 mb-1 sm:mb-0">客戶姓名</dt>
                  <dd class="font-medium text-foreground">王小明</dd>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                  <dt class="text-muted-foreground text-xs uppercase sm:w-16 shrink-0 mb-1 sm:mb-0">聯絡信箱</dt>
                  <dd class="text-foreground">wang@example.com</dd>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                  <dt class="text-muted-foreground text-xs uppercase sm:w-16 shrink-0 mb-1 sm:mb-0">聯絡電話</dt>
                  <dd class="text-foreground font-mono">0912-345-678</dd>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-4 sm:items-start">
                  <dt class="text-muted-foreground text-xs uppercase sm:w-16 shrink-0 mb-1 sm:mb-0">寄送地址</dt>
                  <dd class="text-foreground leading-relaxed">台北市信義區市府路1號</dd>
                </div>
              </dl>

              <div class="flex gap-3 justify-end mt-6 pt-6 border-t">
                <Button variant="outline" class="h-9 px-4 text-sm">取消</Button>
                <Button class="h-9 px-5 text-sm">編輯資訊</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
