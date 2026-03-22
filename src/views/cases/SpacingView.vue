<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, Zap } from 'lucide-vue-next'
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
        <div class="flex flex-col gap-4 mt-4 px-1">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <p class="text-[11px] opacity-80">
                特徵：元素緊貼在一起、沒有視覺分隔、文字行距過密、點擊目標過小，容易誤觸，大幅增加用戶的認知負荷。
              </p>
            </div>
          </div>

          <!-- Scenario 1: List -->
          <Card v-if="activeTab === 'list'" class="mt-2 max-w-lg border-border/60 shadow-none bg-background overflow-hidden">
            <CardHeader class="pb-2 pt-3 px-3 bg-muted/20 border-b">
              <CardTitle class="text-[11px] font-bold uppercase tracking-tight text-muted-foreground">訂單列表 (擁擠版本)</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div class="divide-y divide-border/60">
                <div v-for="row in [
                  { id: 'ORD-1001', name: '王小明', status: '已付款', amount: 12800 },
                  { id: 'ORD-1002', name: '陳大志', status: '處理中', amount: 4500 },
                  { id: 'ORD-1003', name: '林美華', status: '已付款', amount: 98200 },
                  { id: 'ORD-1004', name: '張志遠', status: '待付款', amount: 2100 },
                ]" :key="row.id" class="flex items-center p-1 px-2 gap-1 text-[11px]">
                  <span class="font-mono text-muted-foreground">#{{ row.id }}</span>
                  <span class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{{ row.name }}</span>
                  <span :class="{
                    'text-green-600': row.status === '已付款',
                    'text-blue-600': row.status === '處理中',
                    'text-amber-600': row.status === '待付款',
                  }">{{ row.status }}</span>
                  <span class="tabular-nums font-mono">${{ row.amount }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Scenario 2: Form -->
          <Card v-if="activeTab === 'form'" class="mt-2 max-w-lg border-border/60 shadow-none bg-background p-2">
             <div class="text-[11px] font-bold mb-2 uppercase text-muted-foreground px-1">搜尋與篩選</div>
             <div class="flex gap-1 flex-wrap">
               <input class="border border-border/60 rounded px-2 h-7 text-[12px] bg-background w-24" placeholder="編號" />
               <input class="border border-border/60 rounded px-2 h-7 text-[12px] bg-background w-24" placeholder="姓名" />
               <select class="border border-border/60 rounded px-2 h-7 text-[12px] bg-background">
                 <option>所有狀態</option>
               </select>
               <button class="bg-primary text-primary-foreground rounded px-3 h-7 text-[12px]">搜尋</button>
             </div>
          </Card>

          <!-- Scenario 3: Info -->
          <Card v-if="activeTab === 'info'" class="mt-2 max-w-sm border-border/60 shadow-none bg-background p-3">
            <div class="text-[11px] font-bold mb-2 uppercase text-muted-foreground">帳戶個人資訊</div>
            <div class="space-y-0.5 text-[12px]">
              <div>姓名：王小明</div>
              <div>信箱：wang@example.com</div>
              <div>電話：0912-345-678</div>
              <div>地址：台北市信義區市府路1號</div>
            </div>
            <div class="flex gap-2 mt-3">
              <button class="bg-primary text-primary-foreground text-[11px] rounded px-3 py-1">編輯</button>
              <button class="border border-border/60 text-[11px] rounded px-3 py-1">取消</button>
            </div>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <p class="text-[11px] opacity-80">
                特徵：遵循 8pt 格線系統提供充足間距、層級清晰、點擊目標符合人體工學 (大於 40px)，閱讀感舒適流暢。
              </p>
            </div>
          </div>

          <!-- Scenario 1: List -->
          <Card v-if="activeTab === 'list'" class="mt-2 max-w-lg border-border/60 shadow-sm overflow-hidden">
            <CardHeader class="pb-3 pt-4 px-4 bg-muted/10 border-b">
              <CardTitle class="text-[13px] font-semibold">訂單列表</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div class="divide-y divide-border/60 text-[13px]">
                <div v-for="row in [
                  { id: 'ORD-1001', name: '王小明', status: '已付款', amount: 12800 },
                  { id: 'ORD-1002', name: '陳大志', status: '處理中', amount: 4500 },
                  { id: 'ORD-1003', name: '林美華', status: '已付款', amount: 98200 },
                  { id: 'ORD-1004', name: '張志遠', status: '待付款', amount: 2100 },
                ]" :key="row.id" class="flex items-center px-4 py-3.5 gap-4 hover:bg-muted/30 transition-colors">
                  <span class="font-mono text-xs text-muted-foreground w-20 shrink-0">#{{ row.id }}</span>
                  <span class="flex-1 font-medium">{{ row.name }}</span>
                  <Badge variant="secondary" :class="{
                    'text-green-600 bg-green-50 dar:bg-green-900/20': row.status === '已付款',
                    'text-blue-600 bg-blue-50 dark:bg-blue-900/20': row.status === '處理中',
                    'text-amber-600 bg-amber-50 dark:bg-amber-900/20': row.status === '待付款',
                  }" class="text-[10px] px-2 py-0 h-5">{{ row.status }}</Badge>
                  <span class="font-semibold tabular-nums text-right w-24">NT${{ row.amount.toLocaleString() }}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Scenario 2: Form -->
          <Card v-if="activeTab === 'form'" class="mt-2 max-w-xl border-border/60 shadow-sm p-5">
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div class="space-y-1.5">
                  <Label class="text-[10px] text-muted-foreground uppercase font-bold px-1">訂單編號</Label>
                  <Input class="h-10 text-[13px]" placeholder="搜尋編號..." />
                </div>
                <div class="space-y-1.5">
                  <Label class="text-[10px] text-muted-foreground uppercase font-bold px-1">客戶姓名</Label>
                  <Input class="h-10 text-[13px]" placeholder="搜尋姓名..." />
                </div>
                <div class="space-y-1.5">
                  <Label class="text-[10px] text-muted-foreground uppercase font-bold px-1">訂單狀態</Label>
                  <Select>
                    <SelectTrigger class="h-10 text-[13px]">
                      <SelectValue placeholder="所有狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有狀態</SelectItem>
                      <SelectItem value="paid">已付款</SelectItem>
                      <SelectItem value="pending">待付款</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button class="h-10 text-[13px] font-bold">執行搜尋</Button>
              </div>
          </Card>

          <!-- Scenario 3: Info -->
          <Card v-if="activeTab === 'info'" class="mt-2 max-w-sm border-border/60 shadow-sm p-6">
            <div class="text-[11px] font-bold mb-4 uppercase text-muted-foreground tracking-widest px-1">Account Information</div>
            <dl class="space-y-4 text-[13px]">
              <div class="flex items-center">
                <dt class="text-muted-foreground w-20 shrink-0">客戶姓名</dt>
                <dd class="font-medium">王小明</dd>
              </div>
              <div class="flex items-center border-t border-border/40 pt-3">
                <dt class="text-muted-foreground w-20 shrink-0">電子信箱</dt>
                <dd>wang@example.com</dd>
              </div>
              <div class="flex items-center border-t border-border/40 pt-3">
                <dt class="text-muted-foreground w-20 shrink-0">聯絡電話</dt>
                <dd class="font-mono">0912-345-678</dd>
              </div>
            </dl>
            <div class="flex gap-3 justify-end mt-8">
              <Button variant="outline" class="h-9 px-4 text-xs font-semibold">取消作業</Button>
              <Button class="h-9 px-6 text-xs font-bold">儲存變更</Button>
            </div>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
