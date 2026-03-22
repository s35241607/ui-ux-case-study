<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2, Bell } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

interface Notification {
  id: number
  title: string
  desc: string
  time: string
}

const initialNotifications: Notification[] = [
  { id: 1, title: '專案提案審核通知', desc: '您的 Q2 提案已進入審核流程', time: '10 分鐘前' },
  { id: 2, title: '團隊週報已生成', desc: '本週工時摘要報告已就緒', time: '1 小時前' },
  { id: 3, title: '新成員申請加入', desc: '陳大志申請加入設計小組', time: '2 小時前' },
  { id: 4, title: '系統排程備份完成', desc: '資料庫快照備份成功', time: '昨天' },
]

// Bad: immediate delete, no recovery
const badItems = ref<Notification[]>(initialNotifications.map(n => ({ ...n })))

function badDelete(id: number) {
  badItems.value = badItems.value.filter(i => i.id !== id)
}

// Good: delete with timed undo
interface GoodNotification extends Notification {
  deleting: boolean
}

const goodItems = ref<GoodNotification[]>(
  initialNotifications.map(n => ({ ...n, deleting: false }))
)

function goodDelete(id: number) {
  const item = goodItems.value.find(i => i.id === id)
  if (!item) return

  item.deleting = true

  const timer = setTimeout(() => {
    goodItems.value = goodItems.value.filter(i => i.id !== id)
  }, 4000)

  toast(`「${item.title}」已刪除`, {
    action: {
      label: '撤銷',
      onClick: () => {
        clearTimeout(timer)
        const target = goodItems.value.find(i => i.id === id)
        if (target) target.deleting = false
      },
    },
    duration: 4000,
  })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">操作可撤銷設計 (Undo Action)</h1>
        <Badge variant="secondary" class="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30">可用性與防呆
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        日常刪除操作提供短暫的撤銷窗口，讓使用者在操作生效後仍可反悔，降低誤刪的損失而不需要前置確認彈窗。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>點擊刪除後立即移除，無法還原</li>
            <li>誤刪後只能重新建立或尋找備份</li>
            <li>對於低風險日常操作，確認彈窗反而增加摩擦</li>
          </ul>

          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <Bell class="h-4 w-4 text-muted-foreground" />
                <CardTitle class="text-sm">通知中心</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div v-if="badItems.length === 0" class="py-8 text-center text-sm text-muted-foreground">
                已清空所有通知
              </div>
              <div v-for="item in badItems" :key="item.id"
                class="flex items-start gap-3 px-4 py-3 border-b last:border-0 group">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ item.title }}</p>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ item.desc }}</p>
                  <p class="text-xs text-muted-foreground/60 mt-1">{{ item.time }}</p>
                </div>
                <Button variant="ghost" size="icon"
                  class="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive" @click="badDelete(item.id)">
                  <Trash2 class="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>刪除後顯示 Toast，4 秒內可點「撤銷」還原</li>
            <li>項目在撤銷窗口期間呈現淡化狀態</li>
            <li>時間到後才真正移除，兼顧效率與安全</li>
          </ul>

          <Card>
            <CardHeader class="pb-3">
              <div class="flex items-center gap-2">
                <Bell class="h-4 w-4 text-muted-foreground" />
                <CardTitle class="text-sm">通知中心</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="p-0">
              <div v-if="goodItems.length === 0" class="py-8 text-center text-sm text-muted-foreground">
                已清空所有通知
              </div>
              <div v-for="item in goodItems" :key="item.id"
                class="flex items-start gap-3 px-4 py-3 border-b last:border-0 group transition-opacity duration-300"
                :class="item.deleting ? 'opacity-40' : 'opacity-100'">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate"
                    :class="item.deleting ? 'line-through text-muted-foreground' : ''">
                    {{ item.title }}
                  </p>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ item.desc }}</p>
                  <p class="text-xs text-muted-foreground/60 mt-1">{{ item.time }}</p>
                </div>
                <Button variant="ghost" size="icon"
                  class="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive" :disabled="item.deleting"
                  @click="goodDelete(item.id)">
                  <Trash2 class="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
