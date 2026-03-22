<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Clock, X, User } from 'lucide-vue-next'

// --- Data ---
const allResults = [
  { id: 'ORD-001', name: '王小明', amount: 12800, status: '已付款' },
  { id: 'ORD-002', name: '陳大志', amount: 4500, status: '處理中' },
  { id: 'ORD-003', name: '林美華', amount: 98200, status: '已付款' },
  { id: 'ORD-004', name: '張志遠', amount: 2100, status: '待付款' },
  { id: 'ORD-005', name: '劉雅婷', amount: 7600, status: '已付款' },
  { id: 'ORD-006', name: '王大明', amount: 5400, status: '已付款' },
  { id: 'ORD-007', name: '陳小志', amount: 3200, status: '處理中' },
  { id: 'ORD-008', name: '林小美', amount: 12000, status: '已付款' },
  { id: 'ORD-009', name: '黃怡君', amount: 8800, status: '待付款' },
  { id: 'ORD-010', name: '劉建宏', amount: 15600, status: '處理中' },
]

// --- Bad: plain input, no suggestions ---
const badQuery = ref('')
const badSearched = ref(false)
const badFilteredResults = computed(() => {
  if (!badSearched.value || !badQuery.value) return []
  return allResults.filter(
    r => r.name.includes(badQuery.value) || r.id.includes(badQuery.value)
  ).slice(0, 5)
})

// --- Good: autocomplete with suggestions ---
const goodQuery = ref('')
const goodIsFocused = ref(false)
const goodSelected = ref<typeof allResults[0] | null>(null)
const recentSearches = ref(['王小明', '陳大志'])

const filteredSuggestions = computed(() => {
  const q = goodQuery.value.trim()
  if (!q) return []
  return allResults
    .filter(r => r.name.includes(q) || r.id.includes(q))
    .map(r => r.name)
    .filter((v, i, a) => a.indexOf(v) === i) // unique names
    .slice(0, 6)
})

const showDropdown = computed(() =>
  goodIsFocused.value && (filteredSuggestions.value.length > 0 || (!goodQuery.value && recentSearches.value.length > 0))
)

// The actual results shown in the "Good" side
const goodFilteredResults = computed(() => {
  const q = goodQuery.value.trim()
  if (goodSelected.value) return [goodSelected.value]
  if (!q) return []
  return allResults.filter(r => r.name.includes(q) || r.id.includes(q)).slice(0, 3)
})

function selectSuggestion(name: string) {
  goodQuery.value = name
  goodIsFocused.value = false
  // Update selected item if exists
  goodSelected.value = allResults.find(r => r.name === name) ?? null
  
  // Add to recent
  if (!recentSearches.value.includes(name)) {
    recentSearches.value.unshift(name)
    if (recentSearches.value.length > 3) recentSearches.value.pop()
  }
}

function handleEnter() {
  if (filteredSuggestions.value.length > 0) {
    selectSuggestion(filteredSuggestions.value[0])
  }
}

function clearGoodQuery() {
  goodQuery.value = ''
  goodSelected.value = null
}

function handleGoodBlur() {
  // Delay blur to allow clicks on dropdown
  setTimeout(() => { goodIsFocused.value = false }, 200)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">搜尋自動完成 (Search Autocomplete)</h1>
        <Badge variant="secondary" class="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30">
          效率設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        輸入部分關鍵字即時顯示精準建議，降低打字量並引導使用者快速鎖定目標資料。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>必須精確輸入完整姓名方可搜尋</li>
            <li>輸入過程中無任何引導，容易拼錯</li>
            <li>送出後才告知結果，操作往返成本高</li>
          </ul>

          <Card class="max-w-md mx-auto w-full shadow-sm">
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">客戶查詢</CardTitle>
              <CardDescription class="text-xs">請輸入完整姓名後按搜尋</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex gap-2">
                <input v-model="badQuery" 
                  class="flex-1 border rounded-md px-3 h-9 text-sm bg-background focus:ring-1 focus:ring-primary outline-none"
                  placeholder="輸入客戶姓名 (如: 王小明)" />
                <Button size="sm" class="h-9" @click="badSearched = true">
                  <Search class="h-4 w-4 mr-1.5" />
                  搜尋
                </Button>
              </div>

              <div v-if="badSearched" class="space-y-2">
                <template v-if="badFilteredResults.length > 0">
                  <div v-for="r in badFilteredResults" :key="r.id" class="flex items-center gap-3 px-3 py-2 text-sm border rounded-md">
                    <User class="h-4 w-4 text-muted-foreground" />
                    <span class="flex-1 font-medium">{{ r.name }}</span>
                    <span class="text-xs text-muted-foreground">{{ r.id }}</span>
                  </div>
                </template>
                <div v-else-if="badQuery" class="py-6 text-center text-sm text-muted-foreground bg-muted/20 rounded-lg">
                  找不到「{{ badQuery }}」
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>即時匹配建議項目，省去繁瑣打字</li>
            <li>展示最近搜尋，加快高頻任務速度</li>
            <li>視覺重點標註搜尋詞，降低掃描負擔</li>
          </ul>

          <Card class="max-w-md mx-auto w-full shadow-md border-primary/10">
            <CardHeader class="pb-3">
              <CardTitle class="text-sm">智能搜尋</CardTitle>
              <CardDescription class="text-xs">輸入關鍵字，智能引導至目標客戶</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="relative">
                <div class="flex items-center gap-2 border rounded-md px-3 h-10 bg-background transition-all"
                  :class="goodIsFocused ? 'ring-2 ring-primary/20 border-primary' : ''">
                  <Search class="h-4 w-4 text-muted-foreground shrink-0" />
                  <input v-model="goodQuery" 
                    class="flex-1 text-sm bg-transparent outline-none h-full" 
                    placeholder="輸入名稱 (例: 王、陳...)"
                    @focus="goodIsFocused = true" 
                    @blur="handleGoodBlur"
                    @keydown.enter="handleEnter" />
                  <button v-if="goodQuery" @click="clearGoodQuery"
                    class="p-1 rounded-full hover:bg-muted text-muted-foreground transition-all">
                    <X class="h-3.5 w-3.5" />
                  </button>
                </div>

                <!-- Autocomplete Dropdown -->
                <Transition name="fade">
                  <div v-if="showDropdown"
                    class="absolute top-full left-0 right-0 mt-2 bg-popover border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                    
                    <!-- Recent searches -->
                    <template v-if="!goodQuery && recentSearches.length > 0">
                      <div class="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70 bg-muted/30">
                        最近搜尋
                      </div>
                      <button v-for="s in recentSearches" :key="s"
                        class="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent transition-colors text-left"
                        @mousedown.prevent="selectSuggestion(s)">
                        <Clock class="h-4 w-4 text-muted-foreground/50 shrink-0" />
                        {{ s }}
                      </button>
                    </template>

                    <!-- Matching Suggestions -->
                    <template v-else-if="filteredSuggestions.length > 0">
                      <div class="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70 bg-muted/30">
                        建議項目
                      </div>
                      <button v-for="s in filteredSuggestions" :key="s"
                        class="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors text-left group"
                        @mousedown.prevent="selectSuggestion(s)">
                        <User class="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
                        <span>
                          <template v-if="s.includes(goodQuery)">
                            {{ s.slice(0, s.indexOf(goodQuery)) }}<span class="text-primary font-bold">{{ goodQuery }}</span>{{ s.slice(s.indexOf(goodQuery) + goodQuery.length) }}
                          </template>
                          <template v-else>{{ s }}</template>
                        </span>
                      </button>
                    </template>

                    <div v-else class="px-3 py-8 text-sm text-muted-foreground text-center">
                      無匹配建議項目
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Results Area -->
              <div class="space-y-2">
                <template v-if="goodFilteredResults.length > 0">
                  <div v-for="r in goodFilteredResults" :key="r.id" 
                    class="flex items-center gap-3 px-3 py-2.5 text-sm border border-border/50 rounded-lg hover:border-primary/20 hover:bg-primary/[0.02] transition-all">
                    <User class="h-4 w-4 text-muted-foreground" />
                    <div class="flex-1">
                      <div class="font-medium">{{ r.name }}</div>
                      <div class="text-[10px] text-muted-foreground">{{ r.id }}</div>
                    </div>
                    <Badge variant="outline" class="text-[10px] py-0 h-5" :class="{
                      'border-green-200 bg-green-50 text-green-700': r.status === '已付款',
                      'border-blue-200 bg-blue-50 text-blue-700': r.status === '處理中',
                      'border-amber-200 bg-amber-50 text-amber-700': r.status === '待付款',
                    }">{{ r.status }}</Badge>
                  </div>
                </template>
                <div v-else-if="goodQuery && !showDropdown" 
                  class="py-8 text-center text-sm text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  找不到與「{{ goodQuery }}」相符的結果
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

