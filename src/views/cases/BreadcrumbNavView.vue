<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, ArrowLeft, Home, Settings, Shield, Download } from 'lucide-vue-next'

type PageKey = 'home' | 'settings' | 'privacy' | 'export'

interface PageDef {
  key: PageKey
  label: string
  parent: PageKey | null
  children?: { key: PageKey; label: string; desc: string }[]
  desc?: string
}

const pages: Record<PageKey, PageDef> = {
  home: { key: 'home', label: '首頁', parent: null, children: [{ key: 'settings', label: '系統設定', desc: '管理帳號、通知與隱私設定' }] },
  settings: { key: 'settings', label: '系統設定', parent: 'home', children: [{ key: 'privacy', label: '隱私設定', desc: '管理資料收集與分享偏好' }] },
  privacy: { key: 'privacy', label: '隱私設定', parent: 'settings', children: [{ key: 'export', label: '資料匯出', desc: '下載您的個人資料副本' }] },
  export: { key: 'export', label: '資料匯出', parent: 'privacy', desc: '您可以申請匯出帳號中所有的個人資料。處理時間約 1-3 個工作天。' },
}

function getBreadcrumb(key: PageKey): PageDef[] {
  const trail: PageDef[] = []
  let current: PageKey | null = key
  while (current) {
    trail.unshift(pages[current])
    current = pages[current].parent
  }
  return trail
}

// Bad: no breadcrumb, only Back button
const badPage = ref<PageKey>('home')

function badNavigate(key: PageKey) {
  badPage.value = key
}

function badGoBack() {
  const parent = pages[badPage.value].parent
  if (parent) badPage.value = parent
}

// Good: with breadcrumb
const goodPage = ref<PageKey>('home')

function goodNavigate(key: PageKey) {
  goodPage.value = key
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">麵包屑導覽設計 (Breadcrumb)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">導覽與狀態
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        在多層級頁面中顯示完整的路徑軌跡，讓使用者隨時了解所在位置並能快速跳回任一上層頁面。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>進入深層頁面後，不清楚自己處於哪個層級</li>
            <li>只能逐層點擊返回，無法直接跳到特定上層</li>
            <li>分享連結後對方同樣不知道當前位置的脈絡</li>
          </ul>

          <Card class="flex-1">
            <CardHeader class="pb-3 border-b">
              <!-- Only back button, no path -->
              <div class="flex items-center gap-2">
                <button v-if="badPage !== 'home'" @click="badGoBack"
                  class="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground transition-colors">
                  <ArrowLeft class="h-3.5 w-3.5" />
                  返回
                </button>
                <CardTitle class="text-sm">{{ pages[badPage].label }}</CardTitle>
              </div>
            </CardHeader>
            <CardContent class="pt-4">
              <!-- Home -->
              <div v-if="badPage === 'home'" class="space-y-2">
                <button v-for="child in pages.home.children" :key="child.key" @click="badNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Settings -->
              <div v-else-if="badPage === 'settings'" class="space-y-2">
                <button v-for="child in pages.settings.children" :key="child.key" @click="badNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Privacy -->
              <div v-else-if="badPage === 'privacy'" class="space-y-2">
                <button v-for="child in pages.privacy.children" :key="child.key" @click="badNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Export -->
              <div v-else-if="badPage === 'export'" class="space-y-4">
                <p class="text-sm text-muted-foreground">{{ pages.export.desc }}</p>
                <Button size="sm">
                  <Download class="h-4 w-4 mr-2" />
                  申請匯出資料
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>頂部顯示完整路徑，清楚呈現當前所在層級</li>
            <li>可點擊任一麵包屑節點直接跳回對應頁面</li>
            <li>首頁以 Home 圖示表示，視覺辨識度高</li>
          </ul>

          <Card class="flex-1">
            <CardHeader class="pb-3 border-b">
              <!-- Breadcrumb with full path -->
              <nav class="flex items-center flex-wrap gap-0.5 text-xs mb-2">
                <template v-for="(crumb, idx) in getBreadcrumb(goodPage)" :key="crumb.key">
                  <button v-if="idx < getBreadcrumb(goodPage).length - 1" @click="goodNavigate(crumb.key)"
                    class="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-1 rounded">
                    <Home v-if="crumb.key === 'home'" class="h-3 w-3" />
                    <Settings v-else-if="crumb.key === 'settings'" class="h-3 w-3" />
                    <Shield v-else-if="crumb.key === 'privacy'" class="h-3 w-3" />
                    <span>{{ crumb.key !== 'home' ? crumb.label : '' }}</span>
                  </button>
                  <span v-else class="flex items-center gap-1 text-foreground font-medium px-1">
                    <Download v-if="crumb.key === 'export'" class="h-3 w-3" />
                    <Shield v-else-if="crumb.key === 'privacy'" class="h-3 w-3" />
                    <Settings v-else-if="crumb.key === 'settings'" class="h-3 w-3" />
                    {{ crumb.key !== 'home' ? crumb.label : '' }}
                  </span>
                  <ChevronRight v-if="idx < getBreadcrumb(goodPage).length - 1"
                    class="h-3 w-3 text-muted-foreground/50 shrink-0" />
                </template>
              </nav>
              <CardTitle class="text-sm">{{ pages[goodPage].label }}</CardTitle>
            </CardHeader>
            <CardContent class="pt-4">
              <!-- Home -->
              <div v-if="goodPage === 'home'" class="space-y-2">
                <button v-for="child in pages.home.children" :key="child.key" @click="goodNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Settings -->
              <div v-else-if="goodPage === 'settings'" class="space-y-2">
                <button v-for="child in pages.settings.children" :key="child.key" @click="goodNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Privacy -->
              <div v-else-if="goodPage === 'privacy'" class="space-y-2">
                <button v-for="child in pages.privacy.children" :key="child.key" @click="goodNavigate(child.key)"
                  class="w-full flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors text-left">
                  <div>
                    <p class="text-sm font-medium">{{ child.label }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ child.desc }}</p>
                  </div>
                  <ChevronRight class="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              <!-- Export -->
              <div v-else-if="goodPage === 'export'" class="space-y-4">
                <p class="text-sm text-muted-foreground">{{ pages.export.desc }}</p>
                <Button size="sm">
                  <Download class="h-4 w-4 mr-2" />
                  申請匯出資料
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
