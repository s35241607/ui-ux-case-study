<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader
} from '@/components/ui/sidebar'
import {
  Maximize2, AlignLeft, MousePointer2, LayoutTemplate,
  Loader2, Bell, Navigation, FileWarning, Layers
} from 'lucide-vue-next'

const route = useRoute()

const uiCases = [
  { title: '視覺間距與舒適度', path: '/case/spacing', icon: Maximize2 },
  { title: '資料對齊與數字格式', path: '/case/data-alignment', icon: AlignLeft },
  { title: '按鈕階層設計', path: '/case/button-hierarchy', icon: MousePointer2 },
  { title: '按鈕收納與工具列', path: '/case/button-overflow', icon: LayoutTemplate },
]

const uxCases = [
  { title: '表單驗證與即時回饋', path: '/case/form-validation', icon: LayoutTemplate },
  { title: '載入狀態反饋', path: '/case/loading-feedback', icon: Loader2 },
  { title: '事件回饋：Toast vs Modal', path: '/case/success-feedback', icon: Bell },
  { title: '導覽狀態保留', path: '/case/navigation-state', icon: Navigation },
  { title: '未儲存資料提示', path: '/case/unsaved-changes', icon: FileWarning },
]

const currentPath = computed(() => route.path)
</script>

<template>
  <Sidebar>
    <SidebarHeader class="border-b px-4 py-3.5">
      <router-link to="/" class="flex items-center gap-2.5 font-semibold hover:opacity-80 transition-opacity">
        <div class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md text-xs font-bold">
          UX
        </div>
        <div class="leading-tight">
          <div class="text-sm font-semibold">UI/UX Case Study</div>
          <div class="text-[10px] text-muted-foreground font-normal">互動式設計示範</div>
        </div>
      </router-link>
    </SidebarHeader>

    <SidebarContent class="px-2">
      <!-- UI Design Cases -->
      <SidebarGroup>
        <SidebarGroupLabel class="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <Layers class="h-3 w-3" />
          UI 設計
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uiCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path">
                <router-link :to="item.path" class="gap-2.5">
                  <component :is="item.icon" class="h-4 w-4 shrink-0" />
                  <span class="text-sm">{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- UX Experience Cases -->
      <SidebarGroup>
        <SidebarGroupLabel class="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
          <Layers class="h-3 w-3" />
          UX 體驗
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uxCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path">
                <router-link :to="item.path" class="gap-2.5">
                  <component :is="item.icon" class="h-4 w-4 shrink-0" />
                  <span class="text-sm">{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
