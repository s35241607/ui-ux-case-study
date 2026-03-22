<script setup lang="ts">
import { ref } from 'vue'
import { FileText, X, AlertCircle, Zap, User, Clock } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import SplitView from '@/components/layout/SplitView.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 模擬資料
const mockTickets = [
  { id: 'T-1001', title: '無法登入系統', status: '待處理', priority: 'High', date: '2023-10-25', assignee: 'Lin', description: '使用者反應在登入頁面輸入正確帳密後提示 500 錯誤。' },
  { id: 'T-1002', title: '報表匯出破版', status: '處理中', priority: 'Medium', date: '2023-10-26', assignee: 'Wang', description: 'PDF 匯出時，表格寬度超出頁面範圍。' },
  { id: 'T-1003', title: '新增使用者權限', status: '已完成', priority: 'Low', date: '2023-10-27', assignee: 'Chen', description: '需要為行銷部門新增「活動編輯」權限。' },
  { id: 'T-1004', title: '伺服器空間不足警告', status: '待處理', priority: 'Critical', date: '2023-10-28', assignee: 'Zhang', description: '磁碟容量已達 95%，請儘速清理。' },
  { id: 'T-1005', title: '信件通知未發送', status: '處理中', priority: 'High', date: '2023-10-29', assignee: 'Lee', description: '系統自動發送的驗證信件遭到擋信。' },
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

const handleAction = (ticketId: string, action: string) => {
  toast.success(`${ticketId}：已成功執行「${action}」操作`)
  badSelectedTicket.value = null
  goodSelectedTicket.value = null
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">側邊抽屜預覽 (Contextual Drawer)</h1>
        <Badge variant="secondary" class="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30">互動設計
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        使用側邊抽屜預覽詳情，讓使用者無需跳至新頁即可完成操作。
      </p>
    </div>

    <SplitView>
      <!-- Bad Design -->
      <template #left>
        <div class="relative h-full flex flex-col">
          <div class="px-4 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
                <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                  <li>閱讀詳情後必須手動點擊「返回」才能回到列表，操作路徑中斷且不連貫</li>
                  <li>無法在查看細節的同時保持清單的可見性，導致頻繁的頁面切換與認知中斷</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 模擬局部 Modal 彈窗 (Bad Design: Scoped to the left side only) -->
          <Transition name="fade">
            <div v-if="badSelectedTicket" 
              class="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
              <!-- Modal Card (Enlarged) -->
              <div class="bg-card border shadow-2xl rounded-xl w-full max-w-[420px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <!-- Modal Header -->
                <div class="p-5 border-b flex items-start justify-between bg-muted/20">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText class="w-5 h-5 text-primary" />
                    </div>
                    <div class="flex flex-col">
                      <span class="text-xs text-muted-foreground font-mono leading-none mb-1.5">{{ badSelectedTicket.id }}</span>
                      <span class="text-base font-bold leading-tight">{{ badSelectedTicket.title }}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" @click="badSelectedTicket = null" class="h-8 w-8 rounded-full -mt-1 -mr-1">
                    <X class="h-4 w-4" />
                  </Button>
                </div>

                <!-- Modal Body (Increased Spacing) -->
                <div class="p-6 flex-1 overflow-y-auto space-y-6 text-sm">
                  <div class="grid grid-cols-2 gap-y-6 gap-x-10">
                    <div class="space-y-1.5 flex flex-col">
                      <span class="text-[11px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                        <Clock class="w-3.5 h-3.5" /> 當前狀態
                      </span>
                      <span class="font-medium">{{ badSelectedTicket.status }}</span>
                    </div>
                    <div class="space-y-1.5 flex flex-col">
                      <span class="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">優先級</span>
                      <Badge variant="outline" :class="getPriorityColor(badSelectedTicket.priority)" class="w-fit text-[10px] px-2 py-0.5 leading-none">
                        {{ badSelectedTicket.priority }}
                      </Badge>
                    </div>
                    <div class="space-y-1.5 flex flex-col">
                      <span class="text-[11px] text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                        <User class="w-3.5 h-3.5" /> 指派人員
                      </span>
                      <span class="font-medium">{{ badSelectedTicket.assignee }}</span>
                    </div>
                    <div class="space-y-1.5 flex flex-col">
                      <span class="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">建立日期</span>
                      <span class="font-medium">{{ badSelectedTicket.date }}</span>
                    </div>
                  </div>
                  
                  <div class="space-y-2 pt-2">
                    <h4 class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">問題描述</h4>
                    <p class="p-4 rounded-lg bg-muted/50 leading-relaxed text-foreground/80 border border-muted/50">
                      {{ badSelectedTicket.description }}
                    </p>
                  </div>
                </div>

                <!-- Modal Footer -->
                <div class="p-4 border-t bg-muted/5 flex justify-end gap-3 px-6 pb-6">
                  <Button variant="outline" @click="badSelectedTicket = null" class="px-6">取消</Button>
                  <Button @click="handleAction(badSelectedTicket.id, '開始處理')" class="px-6">開始處理</Button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- 列表頁 -->
          <div class="p-4">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              系統工單列表
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full font-normal">5 筆</span>
            </h3>
            <div class="border rounded-md divide-y">
              <div v-for="ticket in mockTickets" :key="ticket.id" @click="badSelectedTicket = ticket"
                class="p-4 flex flex-col gap-2 hover:bg-muted/50 cursor-pointer transition-colors bg-background">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-xs font-semibold">
                    {{ ticket.id }}
                  </span>
                  <Badge variant="outline" :class="getPriorityColor(ticket.priority)" class="text-[10px] px-1.5 py-0">
                    {{ ticket.priority }}
                  </Badge>
                </div>
                <div class="font-medium text-sm text-foreground">
                  {{ ticket.title }}
                </div>
                <div class="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                  <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ ticket.date }}</span>
                  <span class="flex items-center gap-1"><User class="w-3 h-3" /> {{ ticket.assignee }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

       <!-- Good Design -->
      <template #right>
        <div class="relative h-full flex flex-col overflow-hidden">
          <div class="px-4 mt-4">
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
                <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                  <li>點選項目後詳情於側邊抽屜展開，讓使用者在不中斷上下文的情況下快速瀏覽細節</li>
                  <li>支援即時更新與內聯操作，大幅減少頁面跳轉次數，提升作業流暢度</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 列表區塊 -->
          <div class="flex-1 p-4 overflow-y-auto transition-all duration-300"
            :class="{ 'opacity-40 pointer-events-none lg:opacity-100 lg:pointer-events-auto': goodSelectedTicket }">
            <h3 class="font-semibold mb-4 flex items-center gap-2">
              系統工單列表
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full font-normal">5 筆</span>
            </h3>
            <div class="border rounded-md divide-y overflow-hidden shadow-sm">
              <div v-for="ticket in mockTickets" :key="ticket.id" @click="goodSelectedTicket = ticket"
                class="p-4 flex flex-col gap-2 hover:bg-muted/50 cursor-pointer transition-colors"
                :class="[goodSelectedTicket?.id === ticket.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'bg-background border-l-2 border-l-transparent']">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-xs font-semibold" :class="{ 'text-primary': goodSelectedTicket?.id === ticket.id }">
                    {{ ticket.id }}
                  </span>
                  <Badge variant="outline" :class="getPriorityColor(ticket.priority)" class="text-[10px] px-1.5 py-0">
                    {{ ticket.priority }}
                  </Badge>
                </div>
                <div class="font-medium text-sm">{{ ticket.title }}</div>
                <div class="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                  <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ ticket.date }}</span>
                  <span class="flex items-center gap-1"><User class="w-3 h-3" /> {{ ticket.assignee }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide-out Drawer Panel -->
          <div
            class="absolute right-0 top-0 bottom-0 w-[360px] max-w-[85%] bg-card border-l shadow-2xl z-30 transition-transform duration-300 flex flex-col"
            :class="goodSelectedTicket ? 'translate-x-0' : 'translate-x-full'">
            <div v-if="goodSelectedTicket" class="flex-1 overflow-y-auto">
              <div class="flex items-center justify-between p-4 border-b bg-muted/10 sticky top-0 backdrop-blur-sm">
                <h3 class="font-semibold text-lg flex items-center gap-2">
                  <FileText class="w-4 h-4 text-muted-foreground" />
                  {{ goodSelectedTicket.id }}
                </h3>
                <Button variant="ghost" size="icon" @click="goodSelectedTicket = null"
                  class="w-8 h-8 rounded-full hover:bg-muted">
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
                    <span class="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock class="w-3 h-3" /> 當前狀態
                    </span>
                    <span class="font-medium text-sm">{{ goodSelectedTicket.status }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs text-muted-foreground flex items-center gap-1.5">
                      <User class="w-3 h-3" /> 指派人員
                    </span>
                    <span class="font-medium text-sm">{{ goodSelectedTicket.assignee }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xs text-muted-foreground">優先級</span>
                    <Badge variant="outline" :class="getPriorityColor(goodSelectedTicket.priority)" class="text-[10px] px-1.5 py-0">
                      {{ goodSelectedTicket.priority }}
                    </Badge>
                  </div>
                </div>

                <div class="space-y-2">
                  <h5 class="text-xs font-semibold text-muted-foreground">問題描述</h5>
                  <p class="text-sm text-foreground/80 leading-relaxed bg-background p-3 rounded border border-dashed">
                    {{ goodSelectedTicket.description }}
                  </p>
                </div>

                <div class="space-y-3 pt-2">
                  <h5 class="text-xs font-semibold text-muted-foreground">快速回覆內容</h5>
                  <textarea
                    class="w-full min-h-[100px] p-3 text-sm rounded-md border focus:ring-1 focus:ring-primary outline-none transition-all resize-none bg-background placeholder:text-muted-foreground"
                    placeholder="輸入處理紀錄..."></textarea>
                </div>
              </div>
            </div>

            <div class="p-4 border-t bg-card sticky bottom-0 flex justify-end gap-3 px-6 pb-6">
              <Button variant="outline" @click="goodSelectedTicket = null" class="px-6">關閉</Button>
              <Button @click="handleAction(goodSelectedTicket.id, '開始處理')" class="px-6">開始處理</Button>
            </div>
          </div>

          <!-- Desktop backdrop overlay -->
          <div v-if="goodSelectedTicket"
            class="absolute inset-0 bg-background/20 backdrop-blur-[1px] z-20 transition-opacity lg:hidden"
            @click="goodSelectedTicket = null"></div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
