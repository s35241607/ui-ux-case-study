<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Download, Trash2, Edit, Share2, Copy, MoreHorizontal,
  Star, Archive, Lock, FileText, Printer, RefreshCw,
  AlertTriangle, Zap, Info, Plus, Upload, Filter, Eye, Bell
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

type ScenarioKey = 'overflow' | 'icon_only' | 'toggle'
const activeScenario = ref<ScenarioKey>('overflow')

const scenarioInfo: Record<ScenarioKey, { bad: string; good: string; badLabel: string; goodLabel: string }> = {
  overflow: {
    bad: '11 個操作按鈕全部平鋪展示，使用者無法分辨輕重緩急，容易引起視覺疲乏，且缺乏對危險操作（如刪除）的保護。',
    good: '收納次要與危險操作：只外顯最常用的 2~3 個主要功能，其餘收進「更多」下拉選單，危險操作需以顏色標示並加分隔線。',
    badLabel: '全部平鋪 (無主次劃分)',
    goodLabel: '漸進揭露 (Overflow Menu)'
  },
  icon_only: {
    bad: '表格列操作區過寬：在寬度受限的表格列中，使用大量文字按鈕會擠壓核心資訊（如檔名），甚至導致跑版。',
    good: '主要操作保留文字，次要操作壓縮為 Icon-only：移除高頻/次要操作的文字標籤，減少空間佔用，並搭配 Tooltip 確保辨識度。',
    badLabel: '純文字按鈕區塊',
    goodLabel: '純圖示按鈕 + Tooltip'
  },
  toggle: {
    bad: '二元狀態切換（如關注/取消關注）若使用文字按鈕，點擊後文字改變會造成按鈕寬度跳動，視覺重心不穩。',
    good: '二元狀態使用圖示填色（如空心/實心）做切換，按鈕大小固定，視覺回饋更立即。',
    badLabel: '文字狀態切換',
    goodLabel: '圖示狀態切換 (Toggle Icon)'
  }
}

const currentInfo = computed(() => scenarioInfo[activeScenario.value])

// Tooltip logic (simulated for Icon-only)
const tooltip = ref({ visible: false, text: '', x: 0, y: 0 })
function showTooltip(e: MouseEvent, text: string) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  tooltip.value = { visible: true, text, x: rect.left + rect.width / 2, y: rect.bottom + 8 }
}
function hideTooltip() {
  tooltip.value.visible = false
}

// Data for Overflow Scenario
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

const goodFavorited = ref(false)
const badFavorited = ref(false)
const goodNotified = ref(false)
const goodWatching = ref(true)

</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">複雜操作的收納與壓縮 (Button Overflow)</h1>
        <Badge variant="secondary" class="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30">互動設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        當介面中的操作選項過多或空間嚴重受限時，需透過漸進揭露（將次要功能收納至選單）或純圖示化（Icon-only）來降低視覺噪音。
      </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <Tabs v-model="activeScenario" class="w-full">
        <TabsList class="grid grid-cols-3 lg:max-w-md">
          <TabsTrigger value="overflow">漸進揭露收納</TabsTrigger>
          <TabsTrigger value="icon_only">純圖示壓縮</TabsTrigger>
          <TabsTrigger value="toggle">狀態切換按鈕</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <SplitView :key="activeScenario">
      <!-- LEFT: BAD -->
      <template #left>
        <div class="mb-4 flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
          <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
          <div class="text-xs leading-relaxed space-y-0.5">
            <p class="font-semibold">{{ currentInfo.badLabel }}</p>
            <p class="opacity-80">{{ currentInfo.bad }}</p>
          </div>
        </div>

        <!-- 1. OVERFLOW: BAD -->
        <Card v-if="activeScenario === 'overflow'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">頂部工具列</CardTitle>
          </CardHeader>
          <CardContent class="pt-4 flex flex-col gap-4">
            <div class="flex flex-wrap gap-1.5 border p-3 rounded-md bg-muted/20">
              <Button v-for="action in allActions" :key="action.label" size="sm"
                :variant="action.destructive ? 'destructive' : 'secondary'" class="h-7 text-xs px-2.5"
                @click="() => toast.info(`點擊了「${action.label}」`)">
                <component :is="action.icon" class="h-3 w-3 mr-1" />
                {{ action.label }}
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- 2. ICON ONLY: BAD -->
        <Card v-else-if="activeScenario === 'icon_only'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">文件列表操作列</CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <div class="divide-y dark:divide-border border-b dark:border-border">
              <div v-for="i in 3" :key="i" class="flex items-center px-4 py-3 gap-3 bg-muted/10">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">2024年Q{{ i }}_財務報表總結_最終版.xlsx</p>
                </div>
                <!-- Inline actions: full text, taking too much space -->
                <div class="flex items-center gap-1 shrink-0">
                  <Button variant="outline" size="sm" class="h-7 text-[11px] px-2 gap-1">
                    <Eye class="h-3 w-3" />預覽
                  </Button>
                  <Button variant="outline" size="sm" class="h-7 text-[11px] px-2 gap-1">
                    <Edit class="h-3 w-3" />編輯
                  </Button>
                  <Button variant="outline" size="sm" class="h-7 text-[11px] px-2 gap-1 text-destructive hover:text-destructive">
                    <Trash2 class="h-3 w-3" />刪除
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- 3. TOGGLE: BAD -->
        <Card v-else-if="activeScenario === 'toggle'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">文章操作</CardTitle>
          </CardHeader>
          <CardContent class="pt-4">
            <div class="p-4 border rounded-lg flex items-center justify-between">
              <span class="text-sm font-medium">系統架構指南</span>
              <Button variant="outline" size="sm" class="h-8 gap-1.5 transition-all" :class="badFavorited ? 'w-[102px]' : 'w-[98px]'" @click="badFavorited = !badFavorited">
                <Star class="h-3.5 w-3.5 text-muted-foreground" :class="{ 'fill-amber-400 text-amber-500': badFavorited }" />
                {{ badFavorited ? '取消收藏' : '加入收藏' }}
              </Button>
            </div>
            <div class="text-[11px] text-muted-foreground mt-2 italic flex gap-1 items-start">
              <AlertTriangle class="h-3 w-3 mt-0.5 shrink-0" />
              文字在此情境過於厚重，點擊切換為「取消收藏」時可能會因為字數不同造成畫面跳動。
            </div>
          </CardContent>
        </Card>
      </template>

      <!-- RIGHT: GOOD -->
      <template #right>
        <div class="mb-4 flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
          <Zap class="h-4 w-4 shrink-0 mt-0.5" />
          <div class="text-xs leading-relaxed space-y-0.5">
            <p class="font-semibold">{{ currentInfo.goodLabel }}</p>
            <p class="opacity-80">{{ currentInfo.good }}</p>
          </div>
        </div>

        <!-- 1. OVERFLOW: GOOD -->
        <Card v-if="activeScenario === 'overflow'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">頂部工具列</CardTitle>
          </CardHeader>
          <CardContent class="pt-4">
            <div class="flex items-center gap-1.5 border p-3 rounded-md bg-muted/20">
              <!-- Good: only primary actions shown -->
              <Button v-for="action in primaryActions" :key="action.label" size="sm"
                :variant="action === primaryActions[0] ? 'default' : 'outline'" class="h-8 shadow-sm text-xs"
                @click="() => toast.success(`${action.label}成功`)">
                <component :is="action.icon" class="h-3.5 w-3.5" :class="action === primaryActions[0] ? 'mr-1.5' : 'mr-1'" />
                {{ action.label }}
              </Button>

              <!-- Good: overflow in dropdown -->
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" class="h-8 px-2 shadow-sm ml-1" @mouseenter="showTooltip($event, '更多操作')" @mouseleave="hideTooltip">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="w-40 z-[9999]">
                  <DropdownMenuItem v-for="action in overflowActions.filter(a => !a.destructive)" :key="action.label"
                    @click="() => toast.info(`${action.label}`)" class="gap-2 text-xs py-2">
                    <component :is="action.icon" class="h-3.5 w-3.5 text-muted-foreground" />
                    {{ action.label }}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem v-for="action in overflowActions.filter(a => a.destructive)" :key="action.label"
                    @click="() => toast.error(`${action.label}`)"
                    class="gap-2 text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10">
                    <component :is="action.icon" class="h-3.5 w-3.5" />
                    {{ action.label }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p class="text-[10px] text-muted-foreground flex items-center gap-1 mt-3">
              <Info class="h-3 w-3 shrink-0" />
              次要功能收納於下拉選單，危險操作在最底部並加分隔線隔離。
            </p>
          </CardContent>
        </Card>

        <!-- 2. ICON ONLY: GOOD -->
        <Card v-else-if="activeScenario === 'icon_only'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">文件列表操作列</CardTitle>
          </CardHeader>
          <CardContent class="p-0">
            <div class="divide-y dark:divide-border border-b dark:border-border">
              <div v-for="i in 3" :key="i" class="flex items-center px-4 py-3 gap-3 group hover:bg-muted/30 transition-colors">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">2024年Q{{ i }}_財務報表總結_最終版.xlsx</p>
                </div>
                <!-- Inline actions: Icon only -> much more space! -->
                <div class="flex items-center gap-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    @mouseenter="showTooltip($event, '預覽')" @mouseleave="hideTooltip"
                    class="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Eye class="h-3.5 w-3.5" />
                  </button>
                  <button
                    @mouseenter="showTooltip($event, '編輯')" @mouseleave="hideTooltip"
                    class="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Edit class="h-3.5 w-3.5" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        @mouseenter="showTooltip($event, '更多操作')" @mouseleave="hideTooltip"
                        class="h-7 w-7 flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <MoreHorizontal class="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-32 z-[9999]" @mouseleave="hideTooltip">
                      <DropdownMenuItem class="gap-2 text-xs py-1.5"><Download class="h-3.5 w-3.5 text-muted-foreground"/>下載</DropdownMenuItem>
                      <DropdownMenuItem class="gap-2 text-xs py-1.5"><Copy class="h-3.5 w-3.5 text-muted-foreground"/>複製</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem class="gap-2 text-xs py-1.5 text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 class="h-3.5 w-3.5"/>刪除</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <div class="px-4 py-3">
              <p class="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info class="h-3 w-3 shrink-0" />
                將文字拔除改為懸停 Tooltip 展示，極大化保留檔名的閱讀空間，最不常用的操作也可一併塞進下拉清單。
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- 3. TOGGLE: GOOD -->
        <Card v-else-if="activeScenario === 'toggle'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground">文章操作</CardTitle>
          </CardHeader>
          <CardContent class="pt-4">
            <div class="p-4 border rounded-lg flex items-center justify-between transition-colors" :class="goodFavorited ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20' : ''">
              <span class="text-sm font-medium">系統架構指南</span>
              <div class="flex items-center gap-1">
                <button
                  @click="goodFavorited = !goodFavorited"
                  @mouseenter="showTooltip($event, goodFavorited ? '取消收藏' : '加入收藏')"
                  @mouseleave="hideTooltip"
                  class="h-8 w-8 flex items-center justify-center rounded-md border dark:border-border transition-all"
                  :class="goodFavorited ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-500 shadow-sm' : 'bg-background text-muted-foreground hover:text-amber-500 hover:border-amber-200'"
                >
                  <Star class="h-4 w-4" :class="goodFavorited ? 'fill-amber-400 text-amber-500' : ''" />
                </button>
              </div>
            </div>

            <p class="text-[10px] text-muted-foreground flex items-center gap-1 mt-4">
              <Info class="h-3 w-3 shrink-0" />
              搭配填色與邊框高亮，即時回饋當前狀態。固定寬高的方塊按鈕讓版面結構穩定。
            </p>
          </CardContent>
        </Card>

      </template>
    </SplitView>

    <!-- Global Tooltip (portal-like fixed overlay) -->
    <Teleport to="body">
      <Transition name="tooltip">
        <div
          v-if="tooltip.visible"
          class="fixed z-[9999] pointer-events-none"
          :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px', transform: 'translateX(-50%)' }"
        >
          <div class="bg-zinc-900 dark:bg-zinc-700 text-white text-[11px] font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
            {{ tooltip.text }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px);
}
</style>
