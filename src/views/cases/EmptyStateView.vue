<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FolderOpen, FileText, Plus, Package, Users, AlertCircle, Zap } from 'lucide-vue-next'

const activeTab = ref('table') // 'table' | 'context'

const badTab = ref<'orders' | 'products' | 'users'>('orders')
const goodTab = ref<'orders' | 'products' | 'users'>('orders')

const tabsList = [
  { key: 'orders', label: '訂單管理', icon: FileText },
  { key: 'products', label: '商品管理', icon: Package },
  { key: 'users', label: '人員管理', icon: Users },
] as const

const emptyMessages: Record<string, { title: string; desc: string; cta: string }> = {
  orders: { title: '尚無訂單資料', desc: '目前沒有任何訂單，您可以新增第一筆訂單開始使用。', cta: '新增訂單' },
  products: { title: '尚無商品資料', desc: '商品庫存尚未建立，請先新增商品以開始管理。', cta: '新增商品' },
  users: { title: '尚無人員資料', desc: '目前沒有任何成員，點擊新增以開始建立團隊。', cta: '新增成員' },
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
          <h1 class="text-2xl font-bold tracking-tight">空狀態設計 (Empty State)</h1>
          <Badge variant="secondary" class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">系統回饋
          </Badge>
        </div>
        <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
          空狀態頁面搭配情境說明與行動引導 (CTA)，避免使用者在面對無從下手的空白頁時感到困惑。
        </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
          <TabsTrigger value="table">資料表格</TabsTrigger>
          <TabsTrigger value="context">依情境提示</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Ensure right side reveal state resets on tab change -->
    <SplitView :key="activeTab">
      <template #left>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Empty Table -->
          <div v-if="activeTab === 'table'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <p class="text-[11px] opacity-80">表格僅顯示空欄或表頭，用戶無法分辨是「資料庫為空」還是「資料仍在載入中」。</p>
              </div>
            </div>

            <Card class="max-w-md">
              <CardHeader class="pb-2">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-sm">訂單列表</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus class="h-3.5 w-3.5 mr-1" />新增
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b text-left text-muted-foreground text-xs">
                      <th class="py-2 pr-3 font-medium">訂單號</th>
                      <th class="py-2 pr-3 font-medium">客戶</th>
                      <th class="py-2 font-medium">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Empty: just blank rows -->
                    <tr v-for="i in 4" :key="i" class="border-b">
                      <td class="py-2.5 pr-3">&nbsp;</td>
                      <td class="py-2.5 pr-3">&nbsp;</td>
                      <td class="py-2.5">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          <!-- Case 2: Contextless text -->
          <div v-if="activeTab === 'context'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <p class="text-[11px] opacity-80">每個分頁都只顯示一句冷冰冰的「暫無資料」，沒有說明原因，也沒有告訴用戶下一步該怎麼辦。</p>
              </div>
            </div>

            <Card class="max-w-md">
              <CardHeader class="pb-2">
                <div class="flex gap-1 border-b pb-2">
                  <button v-for="tab in tabsList" :key="tab.key" class="px-3 py-1.5 text-xs rounded transition-colors"
                    :class="badTab === tab.key ? 'bg-muted font-medium' : 'text-muted-foreground hover:text-foreground'"
                    @click="badTab = tab.key">{{ tab.label }}</button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="py-12 text-center text-sm text-muted-foreground">暫無資料</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Proper empty state table -->
          <div v-if="activeTab === 'table'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <p class="text-[11px] opacity-80">保留表頭（骨架結構）讓用戶了解模組用途，下方以清晰的插圖、文案與主要 CTA 鼓勵操作。</p>
              </div>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader class="pb-2">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-sm">訂單列表</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <table class="w-full text-sm border-collapse">
                  <thead>
                    <tr class="border-b text-left text-muted-foreground text-xs">
                      <th class="py-2 pr-3 font-medium">訂單號</th>
                      <th class="py-2 pr-3 font-medium">客戶</th>
                      <th class="py-2 font-medium">金額</th>
                    </tr>
                  </thead>
                </table>
                <!-- Proper empty state -->
                <div class="py-8 flex flex-col items-center text-center gap-3 bg-muted/20 border-b border-dashed">
                  <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <FolderOpen class="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">尚無訂單資料</p>
                    <p class="text-xs text-muted-foreground mt-0.5">目前沒有任何訂單，新增第一筆開始使用</p>
                  </div>
                  <Button size="sm" class="mt-1 shadow-sm">
                    <Plus class="h-3.5 w-3.5 mr-1" />新增訂單
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Case 2: Context-aware empty state by tab -->
          <div v-if="activeTab === 'context'" class="flex flex-col gap-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <p class="text-[11px] opacity-80">不同的分頁或模組應顯示與其對應的情境圖示、文案，以及專屬的行動呼籲按鈕 (如：新增商品)。</p>
              </div>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader class="pb-2">
                <div class="flex gap-1 border-b pb-2">
                  <button v-for="tab in tabsList" :key="tab.key" class="px-3 py-1.5 text-xs rounded transition-colors"
                    :class="goodTab === tab.key ? 'bg-primary text-primary-foreground shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'"
                    @click="goodTab = tab.key">{{ tab.label }}</button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="py-10 flex flex-col items-center text-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <component :is="tabsList.find(t => t.key === goodTab)?.icon" class="h-6 w-6 text-primary" />
                  </div>
                  <div class="flex flex-col gap-1 items-center">
                    <p class="text-[13px] font-medium text-foreground">{{ emptyMessages[goodTab].title }}</p>
                    <p class="text-xs text-muted-foreground max-w-[200px] leading-relaxed">{{ emptyMessages[goodTab].desc }}</p>
                  </div>
                  <Button size="sm" class="mt-2 shadow-sm">
                    <Plus class="h-3.5 w-3.5 mr-1" />{{ emptyMessages[goodTab].cta }}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
