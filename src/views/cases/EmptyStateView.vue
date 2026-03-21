<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import CaseBlock from '@/components/layout/CaseBlock.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FolderOpen, FileText, Plus, Package, Users } from 'lucide-vue-next'

const badTab = ref<'orders' | 'products' | 'users'>('orders')
const goodTab = ref<'orders' | 'products' | 'users'>('orders')

const tabs = [
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
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">UI 設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        企業系統中，資料清單為空時是極為常見的狀態。銀幕空白或只有「暫無資料」文字，
        會讓用戶感到茫然不知下一步。良好的空狀態設計應說明原因、引導下一步行動。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：空白或無意義提示" rightTitle="優秀的設計：有情境、有引導的空狀態">
      <template #left>
        <div class="flex-1 flex flex-col">
          <!-- Case 1: Completely blank table -->
          <CaseBlock index="1" title="資料表格無資料" description="表格顯示空欄，用戶不知道是沒資料還是載入中" tag="ui">
            <Card>
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
          </CaseBlock>

          <!-- Case 2: Bad text-only empty state -->
          <CaseBlock index="2" title="只顯示文字「暫無資料」" description="缺乏情境說明，用戶不知道要做什麼才能有資料" tag="ui">
            <Card>
              <CardHeader class="pb-2">
                <div class="flex gap-1 border-b pb-2">
                  <button v-for="tab in tabs" :key="tab.key" class="px-3 py-1.5 text-xs rounded transition-colors"
                    :class="badTab === tab.key ? 'bg-muted font-medium' : 'text-muted-foreground hover:text-foreground'"
                    @click="badTab = tab.key">{{ tab.label }}</button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="py-6 text-center text-sm text-muted-foreground">暫無資料</div>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>

      <template #right>
        <div class="flex-1 flex flex-col">
          <!-- Case 1: Proper empty state table -->
          <CaseBlock index="1" title="資料表格無資料" description="骨架結構 + 圖示 + 引導文案 + 主要 CTA 按鈕" tag="ui">
            <Card>
              <CardHeader class="pb-2">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-sm">訂單列表</CardTitle>
                  <Button size="sm">
                    <Plus class="h-3.5 w-3.5 mr-1" />新增訂單
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
                </table>
                <!-- Proper empty state -->
                <div class="py-8 flex flex-col items-center text-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <FolderOpen class="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">尚無訂單資料</p>
                    <p class="text-xs text-muted-foreground mt-0.5">目前沒有任何訂單，新增第一筆開始使用</p>
                  </div>
                  <Button size="sm">
                    <Plus class="h-3.5 w-3.5 mr-1" />新增訂單
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CaseBlock>

          <!-- Case 2: Context-aware empty state by tab -->
          <CaseBlock index="2" title="依情境顯示對應提示" description="不同分頁/模組顯示對應空狀態，並帶有相關 CTA" tag="ui">
            <Card>
              <CardHeader class="pb-2">
                <div class="flex gap-1 border-b pb-2">
                  <button v-for="tab in tabs" :key="tab.key" class="px-3 py-1.5 text-xs rounded transition-colors"
                    :class="goodTab === tab.key ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'"
                    @click="goodTab = tab.key">{{ tab.label }}</button>
                </div>
              </CardHeader>
              <CardContent>
                <div class="py-8 flex flex-col items-center text-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <component :is="tabs.find(t => t.key === goodTab)?.icon" class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ emptyMessages[goodTab].title }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5 max-w-[200px]">{{ emptyMessages[goodTab].desc }}</p>
                  </div>
                  <Button size="sm">
                    <Plus class="h-3.5 w-3.5 mr-1" />{{ emptyMessages[goodTab].cta }}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CaseBlock>
        </div>
      </template>
    </SplitView>
  </div>
</template>
