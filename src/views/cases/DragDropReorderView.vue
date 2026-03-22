<script setup lang="ts">
import { ref } from 'vue'
import { 
  GripVertical, 
  ChevronUp, 
  ChevronDown, 
  ListTodo,
  AlertCircle
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
        <Badge variant="secondary" class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 text-xs py-0.5">效率設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        當需要頻繁調整清單順序時，拖拉操作比點擊按鈕更具直覺性。它模擬了真實世界的物理運動，讓使用者能精確地將項目放置在目標位置，減少重複點擊並縮短操作路徑。
      </p>
    </div>

    <!-- 對比區塊 -->
    <SplitView>
      <!-- 修改前 (Before): 傳統按鈕排序 -->
      <template #left>
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-4 text-sm text-red-600 dark:text-red-400">
            <AlertCircle class="h-4 w-4" />
            <span>按鈕排序：操作繁瑣且斷續</span>
          </div>

          <div class="border rounded-lg bg-background overflow-hidden shadow-sm">
            <div 
              v-for="(item, index) in beforeItems" 
              :key="item.id"
              class="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-accent/30 transition-colors"
            >
              <div class="flex-1">
                <div class="text-sm font-medium">{{ item.title }}</div>
                <div class="text-xs text-muted-foreground mt-0.5">{{ item.category }}</div>
              </div>
              
              <div class="flex items-center gap-1 ml-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                <button 
                  @click="moveUp(index)"
                  :disabled="index === 0"
                  class="p-1.5 rounded-md border bg-muted/50 hover:bg-background disabled:opacity-30"
                  title="上移"
                >
                  <ChevronUp class="h-4 w-4" />
                </button>
                <button 
                  @click="moveDown(index)"
                  :disabled="index === beforeItems.length - 1"
                  class="p-1.5 rounded-md border bg-muted/50 hover:bg-background disabled:opacity-30"
                  title="下移"
                >
                  <ChevronDown class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-orange-50/50 dark:bg-orange-950/10 border border-orange-200/50 dark:border-orange-900/30">
            <h4 class="text-xs font-semibold text-orange-800 dark:text-orange-400 mb-1">體驗痛點</h4>
            <p class="text-[11px] leading-relaxed text-orange-700/80 dark:text-orange-400/70">
              1. 項目較多時需連續點擊，反應不夠即時。 2. 視線需頻繁在按鈕與內容間跳轉。 3. 難以一次移動到跨距較遠的位置。
            </p>
          </div>
        </div>
      </template>

      <!-- 修改後 (After): 拖拉排序 -->
      <template #right>
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-4 text-sm text-green-600 dark:text-green-400 font-medium">
            <ListTodo class="h-4 w-4" />
            <span>拖拉排序：直覺、流暢且高效</span>
          </div>

          <div class="border rounded-lg bg-background overflow-hidden shadow-md">
            <TransitionGroup name="list" tag="div">
              <div 
                v-for="(item, index) in afterItems" 
                :key="item.id"
                draggable="true"
                @dragstart="handleDragStart(index)"
                @dragover.prevent="handleDragOver(index)"
                @dragend="handleDragEnd"
                class="flex items-center p-4 border-b last:border-b-0 cursor-grab active:cursor-grabbing hover:bg-accent/40 select-none transition-all duration-300"
                :class="{ 
                  'bg-primary/5 opacity-40 grayscale-[0.5]': dragItemIndex === index,
                  'border-t-2 border-t-primary': dragOverIndex === index && dragItemIndex !== index
                }"
              >
                <div class="mr-4 text-muted-foreground/50">
                  <GripVertical class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <div class="text-sm font-semibold tracking-tight">{{ item.title }}</div>
                  <div class="text-[11px] text-muted-foreground mt-0.5 px-1.5 py-0.5 rounded bg-muted w-fit inline-block">
                    {{ item.category }}
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <div class="p-4 rounded-lg bg-green-50/50 dark:bg-green-950/10 border border-green-200/50 dark:border-green-900/30">
            <h4 class="text-xs font-semibold text-green-800 dark:text-green-400 mb-1">設計亮點</h4>
            <p class="text-[11px] leading-relaxed text-green-700/80 dark:text-green-400/70">
              1. **空間直覺**：直接將項目「抓」到目的地。 2. **回饋即時**：透過動畫與預覽位置給予即時確認。 3. **跨步移動**：一次拖拉即可完成長距離的順序調整。
            </p>
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
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* 移除預設的拖拉視覺，改用自定義 */
[draggable="true"] {
  -webkit-user-drag: element;
}
</style>
