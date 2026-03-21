<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, FileText, X, ChevronRight } from 'lucide-vue-next'
import SplitView from '@/components/layout/SplitView.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 模擬資料
const mockTickets = [
  { id: 'T-1001', title: '無法登入系統', status: '待處理', priority: 'High', date: '2023-10-25' },
  { id: 'T-1002', title: '報表匯出破版', status: '處理中', priority: 'Medium', date: '2023-10-26' },
  { id: 'T-1003', title: '新增使用者權限', status: '已完成', priority: 'Low', date: '2023-10-27' },
  { id: 'T-1004', title: '伺服器空間不足警告', status: '待處理', priority: 'Critical', date: '2023-10-28' },
  { id: 'T-1005', title: '信件通知未發送', status: '處理中', priority: 'High', date: '2023-10-29' },
]

// --- Bad Design State ---
const badSelectedTicket = ref<any | null>(null)

// --- Good Design State ---
const goodSelectedTicket = ref<any | null>(null)

const getPriorityColor = (p: string) => {
  switch (p) {
    case 'Critical': return 'bg-red-500/10 text-red-600 border-red-500/20'
    case 'High': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    case 'Medium': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">側邊抽屜預覽 (Contextual Drawer)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        內部系統經常需要「審核清單」或「大量走訪資料」。傳統點擊跳頁的設計會讓使用者不斷在「列表 ↔ 詳情頁」之間來回穿梭，失去對整體的掌控感（Context Loss）。
        利用固定在側邊的**抽屜 (Drawer/Panel)**，能在不離開列表的情況下快速預覽與操作，是極大提升效率的關鍵。
      </p>
    </div>

    <SplitView>
      <!-- Bad Design -->
      <template #left>
        <div class="relative h-full flex flex-col">
          <!-- 模擬整頁跳轉後的詳情頁 -->
          <div v-if="badSelectedTicket" class="absolute inset-0 bg-background z-20 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            <div class="p-4 border-b flex items-center gap-4 bg-muted/30">
              <Button variant="ghost" size="icon" @click="badSelectedTicket = null" class="w-8 h-8 rounded-full">
                <ArrowLeft class="w-4 h-4" />
              </Button>
              <h3 class="font-medium">返回工單列表</h3>
            </div>
            <div class="p-8 max-w-lg mx-auto w-full">
              <div class="flex items-center gap-3 mb-6">
                <FileText class="w-8 h-8 text-muted-foreground" />
                <div>
                  <h2 class="text-2xl font-bold">{{ badSelectedTicket.id }}</h2>
                  <p class="text-muted-foreground">{{ badSelectedTicket.title }}</p>
                </div>
              </div>
              <div class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5 flex flex-col">
                    <span class="text-sm text-muted-foreground">狀態</span>
                    <span class="font-medium">{{ badSelectedTicket.status }}</span>
                  </div>
                  <div class="space-y-1.5 flex flex-col">
                    <span class="text-sm text-muted-foreground">優先級</span>
                    <Badge variant="outline" :class="getPriorityColor(badSelectedTicket.priority)" class="w-fit">
                      {{ badSelectedTicket.priority }}
                    </Badge>
                  </div>
                  <div class="space-y-1.5 flex flex-col">
                    <span class="text-sm text-muted-foreground">建立日期</span>
                    <span class="font-medium">{{ badSelectedTicket.date }}</span>
                  </div>
                </div>
                <div class="pt-6 border-t flex justify-end gap-3">
                  <Button variant="outline">退回</Button>
                  <Button>開始處理</Button>
                </div>
              </div>
            </div>
            <div class="mt-auto p-4 text-center text-xs text-muted-foreground bg-muted/20 border-t">
              <b>痛點：</b> 閱讀完後必須點擊「返回」才能尋找下一筆，極度中斷思緒與流暢度。
            </div>
          </div>

          <!-- 列表頁 -->
          <div class="p-4">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              系統工單列表 
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full font-normal">5 筆</span>
            </h3>
            <div class="border rounded-md divide-y">
              <div 
                v-for="ticket in mockTickets" 
                :key="ticket.id"
                @click="badSelectedTicket = ticket"
                class="p-4 flex items-center justify-between hover:bg-muted/50 cursor-pointer group transition-colors bg-background"
              >
                <div>
                  <div class="font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                    {{ ticket.id }} - {{ ticket.title }}
                  </div>
                  <div class="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                    <span>{{ ticket.date }}</span>
                    <span>{{ ticket.status }}</span>
                  </div>
                </div>
                <ChevronRight class="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Good Design -->
      <template #right>
        <div class="relative h-full flex overflow-hidden">
          <!-- 列表區塊 (Flex 縮放) -->
          <div class="flex-1 p-4 overflow-y-auto transition-all duration-300" :class="{ 'pr-4': !goodSelectedTicket, 'opacity-40 pointer-events-none lg:opacity-100 lg:pointer-events-auto': goodSelectedTicket }">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              系統工單列表 
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full font-normal">5 筆</span>
            </h3>
            <div class="border rounded-md divide-y overflow-hidden shadow-sm">
              <div 
                v-for="ticket in mockTickets" 
                :key="ticket.id"
                @click="goodSelectedTicket = ticket"
                class="p-4 flex flex-col lg:flex-row lg:items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors"
                :class="[goodSelectedTicket?.id === ticket.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'bg-background border-l-2 border-l-transparent']"
              >
                <div>
                  <div class="font-medium" :class="{ 'text-primary': goodSelectedTicket?.id === ticket.id }">
                    {{ ticket.id }}
                  </div>
                  <div class="text-sm mt-0.5">{{ ticket.title }}</div>
                </div>
                <div class="mt-2 lg:mt-0 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 lg:gap-1">
                  <Badge variant="outline" :class="getPriorityColor(ticket.priority)">
                    {{ ticket.priority }}
                  </Badge>
                  <span class="text-xs text-muted-foreground">{{ ticket.status }}</span>
                </div>
              </div>
            </div>
            <div class="mt-8 text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <b>優勢：</b> 點選項目後，詳情會於側邊展開。你可以一邊看著清單，一邊快速瀏覽各個項目的細節，不需跳頁返回。
            </div>
          </div>

          <!-- Slide-out Drawer Panel -->
          <div 
            class="absolute right-0 top-0 bottom-0 w-[360px] max-w-[85%] bg-card border-l shadow-2xl z-30 transition-transform duration-300 flex flex-col"
            :class="goodSelectedTicket ? 'translate-x-0' : 'translate-x-full'"
          >
            <div v-if="goodSelectedTicket" class="flex-1 overflow-y-auto">
              <div class="flex items-center justify-between p-4 border-b bg-muted/10 sticky top-0 backdrop-blur-sm">
                <h3 class="font-semibold text-lg flex items-center gap-2">
                  <FileText class="w-4 h-4 text-muted-foreground" />
                  {{ goodSelectedTicket.id }}
                </h3>
                <Button variant="ghost" size="icon" @click="goodSelectedTicket = null" class="w-8 h-8 rounded-full hover:bg-muted">
                  <X class="w-4 h-4" />
                </Button>
              </div>
              
              <div class="p-5 space-y-6">
                <div>
                  <h4 class="text-lg font-bold mb-1">{{ goodSelectedTicket.title }}</h4>
                  <p class="text-sm text-muted-foreground">報修日期: {{ goodSelectedTicket.date }}</p>
                </div>
                
                <div class="bg-muted/30 p-4 rounded-lg space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-muted-foreground">當前狀態</span>
                    <span class="font-medium text-sm">{{ goodSelectedTicket.status }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-muted-foreground">優先處置</span>
                    <Badge variant="outline" :class="getPriorityColor(goodSelectedTicket.priority)">
                      {{ goodSelectedTicket.priority }}
                    </Badge>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-muted-foreground">指派人員</span>
                    <span class="text-sm">未指派</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <h5 class="text-sm font-semibold">快速回覆內容</h5>
                  <textarea class="w-full min-h-[100px] p-3 text-sm rounded-md border focus:ring-1 focus:ring-primary outline-none transition-all resize-none bg-background placeholder:text-muted-foreground" placeholder="輸入處理紀錄..."></textarea>
                </div>
              </div>
            </div>
            
            <div class="p-4 border-t bg-card sticky bottom-0 flex justify-end gap-3">
              <Button variant="outline" @click="goodSelectedTicket = null">關閉</Button>
              <Button>儲存紀錄</Button>
            </div>
          </div>
          
          <!-- Desktop backdrop overlay -->
          <div 
            v-if="goodSelectedTicket" 
            class="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-20 transition-opacity lg:hidden"
            @click="goodSelectedTicket = null"
          ></div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
