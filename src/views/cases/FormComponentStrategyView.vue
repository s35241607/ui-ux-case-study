<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, X, Info, Search, Tag, MapPin, Package, ArrowRight, AlertTriangle } from 'lucide-vue-next'

// --- Scenario tabs ---
const activeScenario = ref('few')

type ScenarioKey = 'few' | 'medium' | 'many' | 'multi'

const scenarioInfo: Record<ScenarioKey, { bad: string; good: string }> = {
  few: {
    bad: '只有 3 個選項卻使用了下拉選單，隱藏了資訊且增加點擊次數。',
    good: '直接展開為分段控件或單選卡片，一眼完成比較與點擊。',
  },
  medium: {
    bad: '將中量清單全部展開，佔據過多版面空間，增加掃描負擔。',
    good: '使用標準下拉選單收納，保持表單整潔並維持良好的空間效率。',
  },
  many: {
    bad: '清單過長卻無搜尋引導，使用者必須逐一滾動找尋。',
    good: 'Autocomplete 輸入即搜尋，大量資料也能在秒內鎖定目標。',
  },
  multi: {
    bad: '多選狀態不明顯，難以一眼清點已選項並進行管理。',
    good: '整合清單並即刻視覺化「已選項目」，管理起來更加直覺。',
  },
}

const currentInfo = computed(() => scenarioInfo[activeScenario.value as ScenarioKey])

// --- Scenario 1: Few options (2-4) ---
const badFewValue = ref('')
const goodFewValue = ref('pro')
const fewOptions = [
  { id: 'basic', label: '基本版', desc: '適合個人及小型專案', price: 'NT$ 0' },
  { id: 'pro', label: '專業版', desc: '進階功能與多人協作', price: 'NT$ 799' },
  { id: 'enterprise', label: '企業版', desc: '全面防護與優先技術支援', price: 'NT$ 2,999' },
]

// --- Scenario 2: Medium options (5-10) ---
const badMediumSelected = ref<string[]>([])
const goodMediumValue = ref('')
const mediumOptions = ['台北', '新北', '桃園', '台中', '台南', '高雄', '基隆', '新竹']
function toggleBadMedium(opt: string) {
  const i = badMediumSelected.value.indexOf(opt)
  if (i === -1) badMediumSelected.value.push(opt)
  else badMediumSelected.value.splice(i, 1)
}

// --- Scenario 3: Many options (10+) ---
const badManyValue = ref('')
const goodManySearch = ref('')
const goodManyFound = ref('')
const goodManyFocused = ref(false)
const countries = ['台灣', '日本', '韓國', '泰國', '越南', '新加坡', '馬來西亞', '美國', '英國', '法國', '德國', '澳洲', '加拿大']
const filteredCountries = computed(() => {
  const q = goodManySearch.value.trim().toLowerCase()
  if (!q) return countries.slice(0, 5)
  return countries.filter(c => c.toLowerCase().includes(q)).slice(0, 5)
})
function selectCountry(c: string) {
  goodManyFound.value = c
  goodManySearch.value = c
  goodManyFocused.value = false
}

// --- Scenario 4: Multi-select ---
const tags = ['設計', '工程', '產品', '行銷', '業務', '人資', '法務', '財務']
const badMultiSelected = ref<string[]>([])
const goodMultiSelected = ref<string[]>(['設計', '產品'])
const goodMultiSearch = ref('')
const goodMultiFocused = ref(false)
const filteredTags = computed(() => {
  const q = goodMultiSearch.value.trim().toLowerCase()
  return tags.filter(t => !goodMultiSelected.value.includes(t) && t.toLowerCase().includes(q))
})
function toggleTag(t: string) {
  if (goodMultiSelected.value.includes(t)) {
    goodMultiSelected.value = goodMultiSelected.value.filter(x => x !== t)
  } else {
    goodMultiSelected.value.push(t)
    goodMultiSearch.value = ''
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">表單元件選擇策略</h1>
        <Badge variant="secondary" class="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30">互動設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        依據資料特性（數量、多選、關聯性）選擇最佳元件，最小化使用者的互動成本。
      </p>
    </div>

    <!-- Scenario Switcher -->
    <div class="px-4 lg:px-6 mb-3">
      <Tabs v-model="activeScenario" class="w-full">
        <TabsList class="grid grid-cols-4 lg:max-w-xl">
          <TabsTrigger value="few">少量 (2-4)</TabsTrigger>
          <TabsTrigger value="medium">中量 (5-10)</TabsTrigger>
          <TabsTrigger value="many">大量 (10+)</TabsTrigger>
          <TabsTrigger value="multi">多選情境</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <SplitView>
      <template #left>
        <!-- Description banner for "bad" side -->
        <div class="mb-5 flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
          <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
          <p class="text-xs leading-relaxed">{{ currentInfo.bad }}</p>
        </div>

        <!-- FEW: Bad -->
        <Card v-if="activeScenario === 'few'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Package class="h-3.5 w-3.5" />
              選擇訂閱方案
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div class="space-y-1.5">
              <Label class="text-xs text-muted-foreground">選擇您的方案</Label>
              <Select v-model="badFewValue">
                <SelectTrigger class="h-10">
                  <SelectValue placeholder="點擊查看可用方案..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in fewOptions" :key="opt.id" :value="opt.id">
                    {{ opt.label }} ({{ opt.price }})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-start gap-2 py-1.5 px-2.5 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle class="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span class="text-[11px]">使用者必須點擊才能看到所有選項，無法直接比較各方案的價格差異。</span>
            </div>
          </CardContent>
        </Card>

        <!-- MEDIUM: Bad -->
        <Card v-else-if="activeScenario === 'medium'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <MapPin class="h-3.5 w-3.5" />
              選擇居住地區
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="opt in mediumOptions"
                :key="opt"
                class="flex items-center gap-2 p-2 border dark:border-border rounded-md bg-background hover:bg-muted/50 transition-colors cursor-pointer"
                @click="toggleBadMedium(opt)"
              >
                <div
                  class="h-4 w-4 rounded border dark:border-border flex items-center justify-center shrink-0 transition-colors"
                  :class="badMediumSelected.includes(opt)
                    ? 'bg-primary border-primary'
                    : 'border-input'"
                >
                  <Check v-if="badMediumSelected.includes(opt)" class="h-3 w-3 text-primary-foreground" stroke-width="3" />
                </div>
                <span class="text-xs">{{ opt }}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- MANY: Bad -->
        <Card v-else-if="activeScenario === 'many'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Search class="h-3.5 w-3.5" />
              選擇出生國家
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <div class="border dark:border-border rounded-md divide-y dark:divide-border max-h-[180px] overflow-y-auto bg-background">
              <div
                v-for="c in countries"
                :key="c"
                @click="badManyValue = c"
                class="p-2.5 text-xs hover:bg-muted cursor-pointer transition-colors flex items-center justify-between"
              >
                <span>{{ c }}</span>
                <Check v-if="badManyValue === c" class="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
            <p class="mt-2 text-[10px] text-muted-foreground text-center">無搜尋功能，只能逐一滾動查找...</p>
          </CardContent>
        </Card>

        <!-- MULTI: Bad -->
        <Card v-else-if="activeScenario === 'multi'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Tag class="h-3.5 w-3.5" />
              選擇感興趣的標籤
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <div class="flex flex-wrap gap-2">
              <div
                v-for="t in tags"
                :key="t"
                @click="badMultiSelected.includes(t)
                  ? (badMultiSelected = badMultiSelected.filter(x => x !== t))
                  : badMultiSelected.push(t)"
                class="flex items-center gap-1.5 px-3 py-1.5 border dark:border-border rounded-full text-xs transition-all cursor-pointer"
                :class="badMultiSelected.includes(t)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background hover:border-primary/50'"
              >
                {{ t }}
              </div>
            </div>
            <p class="mt-4 text-[11px] text-muted-foreground">
              目前已選：<span class="font-medium">{{ badMultiSelected.length > 0 ? badMultiSelected.join('、') : '（尚未選取）' }}</span>
            </p>
          </CardContent>
        </Card>
      </template>

      <template #right>
        <!-- Description banner for "good" side -->
        <div class="mb-5 flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
          <Check class="h-4 w-4 shrink-0 mt-0.5" />
          <p class="text-xs leading-relaxed">{{ currentInfo.good }}</p>
        </div>

        <!-- FEW: Good -->
        <Card v-if="activeScenario === 'few'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Package class="h-3.5 w-3.5" />
              選擇訂閱方案
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 space-y-3">
            <div
              v-for="opt in fewOptions"
              :key="opt.id"
              @click="goodFewValue = opt.id"
              class="relative border dark:border-border rounded-xl p-3 flex items-start gap-4 cursor-pointer transition-all hover:shadow-sm bg-background"
              :class="goodFewValue === opt.id
                ? 'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10'
                : 'hover:border-primary/40'"
            >
              <div
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border mt-0.5 transition-colors"
                :class="goodFewValue === opt.id
                  ? 'bg-primary border-primary'
                  : 'border-input'"
              >
                <div v-if="goodFewValue === opt.id" class="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-0.5">
                  <span class="text-sm font-bold">{{ opt.label }}</span>
                  <span class="text-xs font-mono font-bold text-primary">{{ opt.price }}</span>
                </div>
                <p class="text-[11px] text-muted-foreground">{{ opt.desc }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- MEDIUM: Good -->
        <Card v-else-if="activeScenario === 'medium'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <MapPin class="h-3.5 w-3.5" />
              選擇居住地區
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <div class="space-y-1.5">
              <Label class="text-xs text-muted-foreground">選擇您的居住縣市</Label>
              <Select v-model="goodMediumValue">
                <SelectTrigger class="h-10">
                  <SelectValue placeholder="選擇地區..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="opt in mediumOptions" :key="opt" :value="opt">{{ opt }}</SelectItem>
                </SelectContent>
              </Select>
              <p class="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <Info class="h-3 w-3 shrink-0" />
                中量選項推薦使用 Select 收納，保持表單整潔。
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- MANY: Good -->
        <Card v-else-if="activeScenario === 'many'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Search class="h-3.5 w-3.5" />
              選擇出生國家
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-3">
            <div class="relative">
              <div class="flex items-center gap-2 border dark:border-border rounded-md px-3 h-10 bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-ring transition-all">
                <Search class="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  v-model="goodManySearch"
                  class="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="輸入關鍵字（如：台、美）"
                  @focus="goodManyFocused = true"
                  @blur="setTimeout(() => goodManyFocused = false, 200)"
                />
                <button v-if="goodManySearch" @click="goodManySearch = ''; goodManyFound = ''" class="text-muted-foreground hover:text-foreground transition-colors">
                  <X class="h-3.5 w-3.5" />
                </button>
              </div>
              <!-- Suggestions -->
              <div
                v-if="goodManyFocused && filteredCountries.length"
                class="absolute top-full left-0 right-0 mt-1.5 bg-popover border dark:border-border rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div
                  v-for="c in filteredCountries"
                  :key="c"
                  @click="selectCountry(c)"
                  class="p-2.5 text-xs hover:bg-accent cursor-pointer transition-colors border-b dark:border-border last:border-0 flex items-center justify-between group text-popover-foreground"
                >
                  <span>{{ c }}</span>
                  <ArrowRight class="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </div>
            <div
              v-if="goodManyFound"
              class="flex items-center gap-2 p-3 bg-primary rounded-xl text-primary-foreground shadow-lg"
            >
              <Check class="h-4 w-4 shrink-0" />
              <div class="flex-1 min-w-0">
                <p class="text-[11px] opacity-70 uppercase tracking-tighter">已確認國家</p>
                <p class="text-sm font-bold">{{ goodManyFound }}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- MULTI: Good -->
        <Card v-else-if="activeScenario === 'multi'" class="border-border dark:border-border shadow-sm">
          <CardHeader class="pb-3 border-b dark:border-border">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Tag class="h-3.5 w-3.5" />
              選擇感興趣的標籤
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <!-- Visualized Selected Items -->
            <div class="flex flex-wrap gap-1.5 p-3 min-h-[46px] bg-muted/30 dark:bg-muted/20 border dark:border-border border-dashed rounded-xl content-start">
              <TransitionGroup name="tag-list">
                <div
                  v-for="t in goodMultiSelected"
                  :key="t"
                  class="flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold shadow-sm"
                >
                  {{ t }}
                  <button @click="toggleTag(t)" class="p-0.5 hover:bg-white/20 rounded-full transition-colors">
                    <X class="h-3 w-3" />
                  </button>
                </div>
              </TransitionGroup>
              <span v-if="!goodMultiSelected.length" class="text-xs text-muted-foreground pt-1.5 pl-1 italic">點擊下方標籤進行選取...</span>
            </div>

            <!-- Tag Input Field -->
            <div class="relative">
              <div class="flex items-center gap-2 border dark:border-border rounded-md px-3 h-10 bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-ring transition-all">
                <Tag class="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input
                  v-model="goodMultiSearch"
                  class="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  placeholder="搜尋標籤..."
                  @focus="goodMultiFocused = true"
                  @blur="setTimeout(() => goodMultiFocused = false, 200)"
                />
              </div>
              <!-- Suggestions -->
              <div
                v-if="goodMultiFocused && filteredTags.length"
                class="absolute top-full left-0 right-0 mt-1.5 bg-popover border dark:border-border rounded-xl shadow-xl z-50 overflow-hidden"
              >
                <div
                  v-for="t in filteredTags"
                  :key="t"
                  @click="toggleTag(t)"
                  class="p-2.5 text-xs hover:bg-accent cursor-pointer transition-colors border-b dark:border-border last:border-0 text-popover-foreground"
                >
                  {{ t }}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </template>
    </SplitView>
  </div>
</template>

<style scoped>
.tag-list-move, .tag-list-enter-active, .tag-list-leave-active {
  transition: all 0.2s ease;
}
.tag-list-enter-from, .tag-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
