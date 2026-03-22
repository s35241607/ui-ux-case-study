<script setup lang="ts">
import { ref } from 'vue'
import { 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  AlertCircle,
  Zap
} from 'lucide-vue-next'
import SplitView from '@/components/layout/SplitView.vue'
import Badge from '@/components/ui/badge/Badge.vue'

// 模擬資料
const initialItems = [
  { id: 1, title: '系統環境檢查 (Environment Check)', category: '基礎設施' },
  { id: 2, title: '資料庫遷移腳本 (DB Migration)', category: '後端開發' },
  { id: 3, title: '身份驗證模組 (Auth Module)', category: '核心邏輯' },
  { id: 4, title: '前端佈局實作 (UI Layout)', category: '前端介面' },
  { id: 5, title: '單元測試撰寫 (Unit Testing)', category: '品質保證' },
]

// 修改前資料 (按鈕排序)
const beforeItems = ref([...initialItems])

// 修改後資料 (拖拉排序)
const afterItems = ref([...initialItems])

// --- 按鈕排序邏輯 (Before) ---
const moveUp = (index: number) => {
  if (index === 0) return
  const items = [...beforeItems.value]
  const [removed] = items.splice(index, 1)
  items.splice(index - 1, 0, removed)
  beforeItems.value = items
}

const moveDown = (index: number) => {
  if (index === beforeItems.value.length - 1) return
  const items = [...beforeItems.value]
  const [removed] = items.splice(index, 1)
  items.splice(index + 1, 0, removed)
  beforeItems.value = items
}

// --- 拖拉排序邏輯 (After) ---
const dragItemIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const handleDragStart = (index: number) => {
  dragItemIndex.value = index
}

const handleDragOver = (index: number) => {
  if (dragItemIndex.value === null) return
  dragOverIndex.value = index
}

const handleDragEnd = () => {
  if (dragItemIndex.value !== null && dragOverIndex.value !== null && dragItemIndex.value !== dragOverIndex.value) {
    const items = [...afterItems.value]
    const [removed] = items.splice(dragItemIndex.value, 1)
    items.splice(dragOverIndex.value, 0, removed)
    afterItems.value = items
  }
  dragItemIndex.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- 標題與描述區 -->
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">拖拉排序 (Drag & Drop Reordering)</h1>
        <Badge variant="secondary" class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30">效率設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        當需要頻繁調整清單順序時，拖拉操作比點擊按鈕更具直覺性。它模擬了真實世界的物理運動，讓使用者能精確地將項目放置在目標位置，減少重複點擊並縮短操作路徑。
      </p>
    </div>

    <!-- 對比區塊 -->
    <SplitView>
      <!-- 修改前 (Before): 傳統按鈕排序 -->
      <template #left>
        <div class="space-y-4 mt-4 px-1">
          <!-- Alert Box (Before) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>必須點擊「上移/下移」按鈕才能調整順序，在大規模調整時極其低效</li>
                <li>缺乏拖拉的直覺物理反饋，用戶難以預測調整後的最終位置</li>
                <li>在大清單中頻繁點擊小按鈕容易產生操作疲勞</li>
              </ul>
            </div>
          </div>

          <div class="border rounded-lg bg-background overflow-hidden shadow-sm">
            <div 
              v-for="(item, index) in beforeItems" 
              :key="item.id"
              class="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/10 transition-colors"
            >
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium truncate">{{ item.title }}</div>
                <div class="text-[10px] text-muted-foreground uppercase opacity-70">{{ item.category }}</div>
              </div>
              
              <div class="flex items-center gap-1 ml-4 shrink-0">
                <button 
                  @click="moveUp(index)"
                  :disabled="index === 0"
                  class="p-1.5 rounded-md border bg-muted/50 hover:bg-background disabled:opacity-20 transition-all"
                  title="上移"
                >
                  <ChevronUp class="h-3.5 w-3.5" />
                </button>
                <button 
                  @click="moveDown(index)"
                  :disabled="index === beforeItems.length - 1"
                  class="p-1.5 rounded-md border bg-muted/50 hover:bg-background disabled:opacity-20 transition-all"
                  title="下移"
                >
                  <ChevronDown class="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 修改後 (After): 拖拉排序 -->
      <template #right>
        <div class="space-y-4 mt-4 px-1">
          <!-- Alert Box (After) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>採用 Drag & Drop 互動，抓取即可移動，操作路徑最短</li>
                <li>動態過渡動畫提供即時順位預覽，物理反饋清晰直覺</li>
                <li>抓取手柄暗示可移動性，符合真實世界直覺</li>
              </ul>
            </div>
          </div>

          <div class="border rounded-lg bg-background overflow-hidden shadow-sm relative min-h-[300px]">
            <TransitionGroup name="list" tag="div">
              <div 
                v-for="(item, index) in afterItems" 
                :key="item.id"
                draggable="true"
                @dragstart="handleDragStart(index)"
                @dragover.prevent="handleDragOver(index)"
                @drop="handleDragEnd"
                @dragend="dragItemIndex = null; dragOverIndex = null"
                class="flex items-center gap-3 p-3 border-b last:border-b-0 bg-card transition-all cursor-grab active:cursor-grabbing group hover:bg-muted/10 select-none"
                :class="{ 
                  'opacity-40 bg-muted scale-95 border-primary/40': dragItemIndex === index,
                  'border-t-2 border-t-primary/50': dragOverIndex === index && dragItemIndex !== index 
                }"
              >
                <GripVertical class="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0" />
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium truncate">{{ item.title }}</div>
                  <div class="text-[10px] text-muted-foreground uppercase opacity-70">{{ item.category }}</div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </template>
    </SplitView>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
