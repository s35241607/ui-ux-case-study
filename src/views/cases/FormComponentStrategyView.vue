<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Check, AlertCircle, Info, Zap, ChevronDown, X,
  ToggleLeft, ToggleRight, Package, Building2,
  ListFilter
} from 'lucide-vue-next'

type ScenarioKey = 'toggle' | 'cards' | 'chips' | 'filter'
const activeScenario = ref<ScenarioKey>('toggle')

const scenarioInfo: Record<ScenarioKey, { bad: string; good: string; badLabel: string; goodLabel: string }> = {
  toggle: {
    bad: '以下拉選單呈現「是 / 否」的二元選擇，隱藏了當前狀態，每次都需要展開才能操作。',
    good: '使用 Switch 開關讓使用者一眼看出目前狀態，單次點擊即可切換，無需任何下拉互動。',
    badLabel: '下拉選單（Select）',
    goodLabel: 'Switch 開關元件',
  },
  cards: {
    bad: '選項藏在下拉選單中，使用者無法同時比較各選項的內容，必須反覆展開才能做決策。',
    good: '改用 Radio Card 卡片組，全部選項一覽無遺，方便並排比較後直接點選，減少認知負荷。',
    badLabel: '下拉選單（Select）',
    goodLabel: 'Radio Card 卡片組',
  },
  chips: {
    bad: '多選情境使用單次下拉，使用者每次只能選一項，且頁面無法即時顯示已選狀態。',
    good: '改用 Chip Toggle Group，選項以膠囊按鈕橫向排列，點擊即切換，已選狀態一目了然，操作效率提升。',
    badLabel: '多選下拉（模擬）',
    goodLabel: 'Chip Toggle Group',
  },
  filter: {
    bad: '以下拉選單切換清單的篩選狀態，每次篩選都需展開、選取、收合，且無法一眼看出目前所在的篩選維度。',
    good: '改用橫向 Button Filter Bar，將所有狀態平鋪在一列，目前所在狀態高亮顯示，單次點擊即完成切換。',
    badLabel: '下拉選單（Select）',
    goodLabel: 'Button Filter Bar',
  },
}

const currentInfo = computed(() => scenarioInfo[activeScenario.value])

// ── Toggle scenario ──────────────────────────────────────
const badToggles = ref([
  { id: 'email', label: '電子郵件通知', value: '' },
  { id: 'sms', label: '簡訊通知', value: '' },
  { id: 'push', label: '推播通知', value: '' },
])
const goodToggles = ref([
  { id: 'email', label: '電子郵件通知', desc: '接收簽核結果與系統公告', enabled: true },
  { id: 'sms', label: '簡訊通知', desc: '僅接收重要安全驗證簡訊', enabled: false },
  { id: 'push', label: '推播通知', desc: '應用程式內的即時提醒', enabled: true },
])

// ── Cards scenario ────────────────────────────────────────
const badCardValue = ref('')
const goodCardValue = ref('editor')
const roles = [
  {
    id: 'viewer',
    label: '檢視者',
    desc: '可查看資料，無法進行任何修改',
    permissions: ['查看報表', '匯出 PDF', '查看工單'],
  },
  {
    id: 'editor',
    label: '編輯者',
    desc: '可新增、編輯，但不能刪除或管理成員',
    permissions: ['查看報表', '建立工單', '編輯資料', '匯出 Excel'],
  },
  {
    id: 'admin',
    label: '管理員',
    desc: '具備完整的系統操作與成員管理權限',
    permissions: ['所有編輯者權限', '刪除資料', '管理成員', '系統設定'],
  },
]

// ── Chips scenario ─────────────────────────────────────────
const departments = ['業務部', '工程部', '財務部', '人資部', '行銷部', '法務部', '產品部', '客服部']
// Bad: dropdown approach (one-at-a-time add)
const badChipsOpen = ref(false)
const badChipsSelected = ref<string[]>([])
const badChipsAvailable = computed(() => departments.filter(d => !badChipsSelected.value.includes(d)))
function badAddDept(dept: string) {
  badChipsSelected.value.push(dept)
  badChipsOpen.value = false
}
function badRemoveDept(dept: string) {
  badChipsSelected.value = badChipsSelected.value.filter(d => d !== dept)
}

// Good: chip toggle
const goodChipsSelected = ref<string[]>(['工程部', '產品部'])
function toggleGoodChip(dept: string) {
  const i = goodChipsSelected.value.indexOf(dept)
  if (i === -1) goodChipsSelected.value.push(dept)
  else goodChipsSelected.value.splice(i, 1)
}

// ── Filter scenario ───────────────────────────────────────
const badFilterValue = ref('all')
const goodFilterValue = ref('all')
const filterStatuses = [
  { id: 'all', label: '全部', count: 5 },
  { id: 'pending', label: '待處理', count: 2 },
  { id: 'in_progress', label: '進行中', count: 1 },
  { id: 'review', label: '審核中', count: 1 },
  { id: 'done', label: '已完成', count: 1 },
]

const allTickets = [
  { id: 'T-001', title: '採購申請 - 辦公設備', dept: '行政部', status: 'pending' },
  { id: 'T-002', title: '差旅費報銷', dept: '業務部', status: 'review' },
  { id: 'T-003', title: '軟體授權申請', dept: '工程部', status: 'in_progress' },
  { id: 'T-004', title: '員工教育訓練費', dept: '人資部', status: 'done' },
  { id: 'T-005', title: '網路設備維修', dept: '資訊部', status: 'pending' },
]

const statusLabelMap: Record<string, string> = {
  pending: '待處理',
  in_progress: '進行中',
  review: '審核中',
  done: '已完成',
}
const statusColorMap: Record<string, string> = {
  pending: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30',
  in_progress: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
  review: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30',
  done: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30',
}

const badFilteredTickets = computed(() => {
  if (badFilterValue.value === 'all') return allTickets
  return allTickets.filter(t => t.status === badFilterValue.value)
})
const goodFilteredTickets = computed(() => {
  if (goodFilterValue.value === 'all') return allTickets
  return allTickets.filter(t => t.status === goodFilterValue.value)
})


</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">表單元件選擇策略 (Form Component Strategy)</h1>
        <Badge variant="secondary" class="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30">互動設計
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        許多情境下選單（Select）並非最佳解，根據資料的型態與互動頻率，選擇更直覺的元件能有效降低使用者的操作成本。
      </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <Tabs v-model="activeScenario" class="w-full">
        <TabsList class="grid grid-cols-4 lg:max-w-xl">
          <TabsTrigger value="toggle">開關型選擇</TabsTrigger>
          <TabsTrigger value="cards">角色權限</TabsTrigger>
          <TabsTrigger value="chips">Chip 多選</TabsTrigger>
          <TabsTrigger value="filter">狀態篩選</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <SplitView :key="activeScenario">
      <!-- ════════════════ LEFT: BAD ════════════════ -->
      <template #left>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <!-- Alert Box (Before) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <p class="text-[11px] opacity-80">{{ currentInfo.bad }}</p>
            </div>
          </div>

        <!-- TOGGLE: Bad -->
        <Card v-if="activeScenario === 'toggle'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <ToggleLeft class="h-3.5 w-3.5" />
              通知設定
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div v-for="item in badToggles" :key="item.id" class="flex flex-col gap-1.5">
              <Label class="text-xs text-muted-foreground">{{ item.label }}</Label>
              <Select v-model="item.value">
                <SelectTrigger class="h-9">
                  <SelectValue placeholder="請選擇..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">開啟</SelectItem>
                  <SelectItem value="no">關閉</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              class="flex items-start gap-2 p-2.5 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle class="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span class="text-[11px]">每個開關都需展開下拉才能看到目前狀態，3 個選項共需 6 次點擊才能完成設定。</span>
            </div>
          </CardContent>
        </Card>

        <!-- CARDS: Bad -->
        <Card v-else-if="activeScenario === 'cards'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Package class="h-3.5 w-3.5" />
              指派角色
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div class="space-y-1.5">
              <Label class="text-xs text-muted-foreground">使用者角色</Label>
              <Select v-model="badCardValue">
                <SelectTrigger class="h-9">
                  <SelectValue placeholder="請選擇角色..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="r in roles" :key="r.id" :value="r.id">{{ r.label }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              class="flex items-start gap-2 p-2.5 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle class="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span class="text-[11px]">下拉僅顯示角色名稱，管理者無法直接對照各角色的權限差異，容易分配錯誤。</span>
            </div>
          </CardContent>
        </Card>

        <!-- CHIPS: Bad — 下拉式（每次只選一項加入） -->
        <Card v-else-if="activeScenario === 'chips'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Building2 class="h-3.5 w-3.5" />
              選擇可查看部門
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <Label class="text-xs text-muted-foreground">可存取的部門（可複選）</Label>

              <!-- Simulated multi-select via repeated dropdown -->
              <div class="relative">
                <button @click="badChipsOpen = !badChipsOpen"
                  class="w-full h-9 flex items-center justify-between px-3 rounded-md border dark:border-border bg-background text-sm text-muted-foreground hover:bg-muted/40 transition-colors">
                  <span>新增部門...</span>
                  <ChevronDown class="h-4 w-4 opacity-50" :class="{ 'rotate-180': badChipsOpen }" />
                </button>
                <div v-if="badChipsOpen"
                  class="absolute top-full left-0 right-0 mt-1 bg-popover border dark:border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  <div v-for="dept in badChipsAvailable" :key="dept" @click="badAddDept(dept)"
                    class="px-3 py-2 text-sm text-popover-foreground hover:bg-accent cursor-pointer border-b dark:border-border last:border-0">
                    {{ dept }}
                  </div>
                  <div v-if="badChipsAvailable.length === 0" class="px-3 py-2 text-xs text-muted-foreground">
                    所有部門已加入
                  </div>
                </div>
              </div>

              <!-- Selected tags (cramped style, no easy manage) -->
              <div class="min-h-[36px] flex flex-wrap gap-1.5 p-2 rounded-md border dark:border-border bg-muted/20">
                <span v-for="dept in badChipsSelected" :key="dept"
                  class="flex items-center gap-1 px-2 py-1 bg-muted border dark:border-border rounded text-xs text-muted-foreground">
                  {{ dept }}
                  <button @click="badRemoveDept(dept)" class="hover:text-foreground ml-0.5">
                    <X class="h-3 w-3" />
                  </button>
                </span>
                <span v-if="!badChipsSelected.length"
                  class="text-xs text-muted-foreground italic px-1 pt-1">尚未加入任何部門</span>
              </div>
            </div>

            <div
              class="flex items-start gap-2 p-2.5 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle class="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span class="text-[11px]">每次只能透過下拉加入一個部門，無法快速瀏覽、切換或一眼確認所有可選項目。</span>
            </div>
          </CardContent>
        </Card>

        <!-- FILTER: Bad -->
        <Card v-else-if="activeScenario === 'filter'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <ListFilter class="h-3.5 w-3.5" />
              費用申請工單
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div class="space-y-1.5">
              <Label class="text-xs text-muted-foreground">篩選狀態</Label>
              <Select v-model="badFilterValue">
                <SelectTrigger class="h-9">
                  <SelectValue placeholder="所有狀態..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="s in filterStatuses" :key="s.id" :value="s.id">
                    {{ s.label }}（{{ s.count }}）
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="border dark:border-border rounded-md divide-y dark:divide-border">
              <div class="grid grid-cols-3 px-3 py-2 bg-muted/40 text-[11px] font-medium text-muted-foreground">
                <span>工單編號</span>
                <span class="truncate">主旨</span>
                <span class="text-right">狀態</span>
              </div>
              <div v-for="t in badFilteredTickets" :key="t.id"
                class="grid grid-cols-3 px-3 py-2.5 text-xs items-center">
                <span class="font-mono text-muted-foreground text-[11px]">{{ t.id }}</span>
                <span class="truncate pr-2">{{ t.title }}</span>
                <span class="text-right">
                  <span class="px-1.5 py-0.5 rounded-full text-[10px] font-medium" :class="statusColorMap[t.status]">
                    {{ statusLabelMap[t.status] }}
                  </span>
                </span>
              </div>
              <div v-if="badFilteredTickets.length === 0" class="px-3 py-4 text-xs text-muted-foreground text-center">
                此狀態下無工單
              </div>
            </div>
            <div
              class="flex items-start gap-2 p-2.5 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
              <AlertTriangle class="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span class="text-[11px]">切換篩選條件需要展開、選取、收合三個步驟，且無法直接看出各狀態的數量分布。</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </template>

      <!-- ════════════════ RIGHT: GOOD ════════════════ -->
      <template #right>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <!-- Alert Box (After) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <p class="text-[11px] opacity-80">{{ currentInfo.good }}</p>
            </div>
          </div>

        <!-- TOGGLE: Good — ✅ fixed switch colors -->
        <Card v-if="activeScenario === 'toggle'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <ToggleRight class="h-3.5 w-3.5" />
              通知設定
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-3">
            <div v-for="item in goodToggles" :key="item.id" @click="item.enabled = !item.enabled"
              class="flex items-center justify-between p-3 rounded-xl border dark:border-border bg-background cursor-pointer transition-all hover:bg-muted/40"
              :class="item.enabled ? 'border-emerald-500/40 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20' : ''">
              <div class="flex-1 min-w-0 mr-4">
                <p class="text-sm font-medium">{{ item.label }}</p>
                <p class="text-[11px] text-muted-foreground mt-0.5">{{ item.desc }}</p>
              </div>
              <!-- Switch with explicit semantic colors, not CSS tokens -->
              <div class="relative h-6 w-11 rounded-full transition-colors duration-200 shrink-0" :class="item.enabled
                ? 'bg-emerald-500'
                : 'bg-zinc-300 dark:bg-zinc-600'">
                <div class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200"
                  :class="item.enabled ? 'translate-x-5' : 'translate-x-0.5'" />
              </div>
            </div>
            <p class="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
              <Info class="h-3 w-3 shrink-0" />
              綠色代表已開啟，灰色代表已關閉，無需展開選單即可確認所有狀態。
            </p>
          </CardContent>
        </Card>

        <!-- CARDS: Good -->
        <Card v-else-if="activeScenario === 'cards'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Package class="h-3.5 w-3.5" />
              指派角色
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-2.5">
            <div v-for="role in roles" :key="role.id" @click="goodCardValue = role.id"
              class="border dark:border-border rounded-xl p-3.5 cursor-pointer transition-all" :class="goodCardValue === role.id
                ? 'border-primary ring-1 ring-primary bg-primary/5 dark:bg-primary/10'
                : 'hover:border-primary/40 bg-background'">
              <div class="flex items-center gap-2.5 mb-2">
                <div class="h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                  :class="goodCardValue === role.id ? 'border-primary bg-primary' : 'border-muted-foreground/40'">
                  <div v-if="goodCardValue === role.id" class="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </div>
                <span class="text-sm font-bold">{{ role.label }}</span>
              </div>
              <p class="text-[11px] text-muted-foreground mb-2 pl-[26px]">{{ role.desc }}</p>
              <div class="flex flex-wrap gap-1 pl-[26px]">
                <span v-for="perm in role.permissions" :key="perm"
                  class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                  {{ perm }}
                </span>
              </div>
            </div>
            <p class="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
              <Info class="h-3 w-3 shrink-0" />
              各角色的權限範圍直接呈現，管理者可直接比對後選擇，降低指派錯誤的風險。
            </p>
          </CardContent>
        </Card>

        <!-- CHIPS: Good -->
        <Card v-else-if="activeScenario === 'chips'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <Building2 class="h-3.5 w-3.5" />
              選擇可查看部門
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-5 flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <Label class="text-xs text-muted-foreground">可存取的部門（可複選）</Label>
              <div class="flex flex-wrap gap-2">
                <button v-for="dept in departments" :key="dept" @click="toggleGoodChip(dept)"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                  :class="goodChipsSelected.includes(dept)
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background dark:border-border text-foreground hover:border-primary/50 hover:bg-muted/50'">
                  <Check v-if="goodChipsSelected.includes(dept)" class="h-3 w-3" stroke-width="3" />
                  {{ dept }}
                </button>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-muted/30 border dark:border-border">
              <p class="text-[11px] text-muted-foreground mb-1">目前已選（{{ goodChipsSelected.length }} 個部門）</p>
              <p class="text-sm font-medium">
                <span v-if="goodChipsSelected.length">{{ goodChipsSelected.join('、') }}</span>
                <span v-else class="text-muted-foreground italic text-xs">尚未選擇任何部門</span>
              </p>
            </div>

            <p class="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info class="h-3 w-3 shrink-0" />
              所有選項橫向排列，已選狀態高亮，點擊即切換，選取結果即時匯總顯示。
            </p>
          </CardContent>
        </Card>

        <!-- FILTER: Good — ✅ fixed badge contrast in dark mode -->
        <Card v-else-if="activeScenario === 'filter'" class="border-border shadow-sm">
          <CardHeader class="pb-3 border-b">
            <CardTitle class="text-[13px] text-muted-foreground flex items-center gap-1.5">
              <ListFilter class="h-3.5 w-3.5" />
              費用申請工單
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-4 flex flex-col gap-3">
            <div class="flex gap-1.5 flex-wrap">
              <button v-for="s in filterStatuses" :key="s.id" @click="goodFilterValue = s.id"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                :class="goodFilterValue === s.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background dark:border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'">
                {{ s.label }}
                <!-- 修正：選中時用 primary-foreground/primary 確保雙模式對比，未選中時確保 badge 可見 -->
                <span
                  class="inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full text-[10px] font-bold transition-colors"
                  :class="goodFilterValue === s.id
                    ? 'bg-primary-foreground text-primary'
                    : 'bg-foreground/10 text-foreground/70'">
                  {{ s.count }}
                </span>
              </button>
            </div>

            <div class="border dark:border-border rounded-md divide-y dark:divide-border min-h-[220px]">
              <div class="grid grid-cols-3 px-3 py-2 bg-muted/40 text-[11px] font-medium text-muted-foreground">
                <span>工單編號</span>
                <span class="truncate">主旨</span>
                <span class="text-right">狀態</span>
              </div>
              <TransitionGroup name="row">
                <div v-for="t in goodFilteredTickets" :key="t.id"
                  class="grid grid-cols-3 px-3 py-2.5 text-xs items-center">
                  <span class="font-mono text-muted-foreground text-[11px]">{{ t.id }}</span>
                  <span class="truncate pr-2">{{ t.title }}</span>
                  <span class="text-right">
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] font-medium" :class="statusColorMap[t.status]">
                      {{ statusLabelMap[t.status] }}
                    </span>
                  </span>
                </div>
              </TransitionGroup>
              <div v-if="goodFilteredTickets.length === 0" class="px-3 py-4 text-xs text-muted-foreground text-center">
                此狀態下無工單
              </div>
            </div>

            <p class="text-[10px] text-muted-foreground flex items-center gap-1">
              <Info class="h-3 w-3 shrink-0" />
              所有狀態與數量一覽無遺，單次點擊即切換篩選，無需展開任何選單。
            </p>
          </CardContent>
        </Card>
      </div>
    </template>
    </SplitView>
  </div>
</template>

<style scoped>
.fade-label-enter-active,
.fade-label-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-label-enter-from,
.fade-label-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease;
}

.row-enter-from,
.row-leave-to {
  opacity: 0;
}
</style>
