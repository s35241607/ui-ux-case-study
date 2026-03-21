<script setup lang="ts">
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Download, Trash2, Edit, Share2, Copy, MoreHorizontal,
  Star, Archive, Lock, FileText, Printer, RefreshCw
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const allActions = [
  { label: '編輯', icon: Edit, primary: true },
  { label: '下載', icon: Download, primary: true },
  { label: '分享', icon: Share2, primary: true },
  { label: '複製', icon: Copy, primary: false },
  { label: '加入星號', icon: Star, primary: false },
  { label: '封存', icon: Archive, primary: false },
  { label: '鎖定', icon: Lock, primary: false },
  { label: '匯出報表', icon: FileText, primary: false },
  { label: '列印', icon: Printer, primary: false },
  { label: '重新整理', icon: RefreshCw, primary: false },
  { label: '刪除', icon: Trash2, primary: false, destructive: true },
]

const primaryActions = allActions.filter(a => a.primary)
const overflowActions = allActions.filter(a => !a.primary)
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">按鈕收納與工具列 (Button Overflow)</h1>
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">UI 設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        將次要操作收納至下拉選單，避免版面被大量按鈕佔滿。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>11 個按鈕全部顯示，不知道哪個最重要</li>
            <li>「刪除」等危險操作沒有保護，容易誤按</li>
            <li>工具列擠滿後換行、視覺混亂</li>
          </ul>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">Project Alpha</CardTitle>
              <CardDescription class="text-xs">最後編輯：2024年12月15日</CardDescription>
            </CardHeader>
            <CardContent>
              <!-- Bad: all buttons shown -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <Button v-for="action in allActions" :key="action.label" size="sm"
                  :variant="action.destructive ? 'destructive' : 'secondary'" class="h-7 text-xs px-2.5"
                  @click="() => toast.info(`點擊了「${action.label}」`)">
                  <component :is="action.icon" class="h-3 w-3 mr-1" />
                  {{ action.label }}
                </Button>
              </div>
              <div class="text-xs text-muted-foreground/70 italic">哪個是主要操作？需要逐一閱讀按鈕內容</div>
            </CardContent>
          </Card>

          <!-- Row example -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">文件列表</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="i in 3" :key="i" class="border-b last:border-0 px-4 py-3">
                <div class="flex flex-col gap-2">
                  <span class="text-sm font-medium">報告文件 {{ ['2024-Q4', '2024-Q3', '2024-Q2'][i - 1] }}</span>
                  <div class="flex flex-wrap gap-1">
                    <Button v-for="action in allActions.slice(0, 6)" :key="action.label" size="sm" variant="outline"
                      class="h-6 text-xs px-2" @click="() => toast.info(`${action.label}`)">
                      {{ action.label }}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>主要操作（編輯、下載、分享）直接顯示</li>
            <li>次要功能收在 ⋯ 更多選單</li>
            <li>危險操作加分隔線隔開，降低誤操作風險</li>
          </ul>

          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">Project Alpha</CardTitle>
              <CardDescription class="text-xs">最後編輯：2024年12月15日</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-2 mb-4">
                <!-- Good: only primary actions shown -->
                <Button v-for="action in primaryActions" :key="action.label" size="sm"
                  :variant="action === primaryActions[0] ? 'default' : 'outline'" class="h-8"
                  @click="() => toast.success(`${action.label}成功`)">
                  <component :is="action.icon" class="h-3.5 w-3.5 mr-1.5" />
                  {{ action.label }}
                </Button>

                <!-- Good: overflow in dropdown -->
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" class="h-8 px-2">
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" class="w-40">
                    <DropdownMenuItem v-for="action in overflowActions.filter(a => !a.destructive)" :key="action.label"
                      @click="() => toast.info(`${action.label}`)" class="gap-2">
                      <component :is="action.icon" class="h-3.5 w-3.5 text-muted-foreground" />
                      {{ action.label }}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem v-for="action in overflowActions.filter(a => a.destructive)" :key="action.label"
                      @click="() => toast.error(`${action.label}`)"
                      class="gap-2 text-destructive focus:text-destructive">
                      <component :is="action.icon" class="h-3.5 w-3.5" />
                      {{ action.label }}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div class="text-xs text-muted-foreground/70 italic">主要操作一目了然，其他收納在 ⋯ 選單裡</div>
            </CardContent>
          </Card>

          <!-- Good: row with inline actions -->
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-sm">文件列表</CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <div v-for="i in 3" :key="i"
                class="flex items-center border-b last:border-0 px-4 py-3 gap-3 group hover:bg-muted/30 transition-colors">
                <span class="text-sm font-medium flex-1">報告文件 {{ ['2024-Q4', '2024-Q3', '2024-Q2'][i - 1] }}</span>
                <!-- Inline actions only visible on hover -->
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" class="h-7 px-2" @click="() => toast.success('編輯')">
                    <Edit class="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" class="h-7 px-2" @click="() => toast.success('下載')">
                    <Download class="h-3.5 w-3.5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" class="h-7 px-2">
                        <MoreHorizontal class="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-36">
                      <DropdownMenuItem @click="() => toast.info('分享')" class="gap-2">
                        <Share2 class="h-3.5 w-3.5 text-muted-foreground" />分享
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem @click="() => toast.error('刪除')"
                        class="gap-2 text-destructive focus:text-destructive">
                        <Trash2 class="h-3.5 w-3.5" />刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
