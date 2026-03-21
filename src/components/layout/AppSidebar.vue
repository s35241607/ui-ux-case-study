<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader, SidebarFooter
} from '@/components/ui/sidebar'
import {
  Maximize2, AlignLeft, MousePointer2, LayoutTemplate,
  Loader2, Bell, Navigation, FileWarning, Layers, Home
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
  <Sidebar collapsible="icon">
    <!-- Header: Notion-style workspace header -->
    <SidebarHeader class="px-3 py-3 border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild size="lg" class="h-auto py-2 px-2 hover:bg-accent rounded-md" tooltip="Lan's UX Lab">
            <router-link to="/" class="flex items-center gap-2.5">
              <!-- Avatar style icon - Notion-like gradient monogram -->
              <div class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-sm">
                <span class="text-white font-bold text-xs tracking-tight">L</span>
              </div>
              <!-- Workspace name -->
              <div class="flex flex-col gap-0 leading-none group-data-[collapsible=icon]:hidden">
                <span class="text-[13px] font-semibold text-foreground">Lan's UX Lab</span>
                <span class="text-[11px] text-muted-foreground font-normal">互動式設計示範</span>
              </div>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="px-1 pt-1">
      <!-- Home -->
      <SidebarGroup class="py-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild :isActive="currentPath === '/'" tooltip="首頁">
              <router-link to="/" class="gap-2.5">
                <Home class="h-4 w-4 shrink-0 text-muted-foreground" />
                <span class="text-sm">首頁</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- Divider -->
      <div class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />

      <!-- UI Design Cases -->
      <SidebarGroup class="py-1">
        <SidebarGroupLabel class="flex items-center gap-1.5 text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 px-2 mb-0.5">
          <Layers class="h-3 w-3" />
          <span class="group-data-[collapsible=icon]:hidden">UI 設計</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uiCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path" :tooltip="item.title">
                <router-link :to="item.path" class="gap-2.5">
                  <component :is="item.icon" class="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span class="text-sm">{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Divider -->
      <div class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />

      <!-- UX Experience Cases -->
      <SidebarGroup class="py-1">
        <SidebarGroupLabel class="flex items-center gap-1.5 text-xs font-semibold text-violet-600/80 dark:text-violet-400/80 px-2 mb-0.5">
          <Layers class="h-3 w-3" />
          <span class="group-data-[collapsible=icon]:hidden">UX 體驗</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uxCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path" :tooltip="item.title">
                <router-link :to="item.path" class="gap-2.5">
                  <component :is="item.icon" class="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span class="text-sm">{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter class="border-t py-2.5 px-3">
      <div class="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
        <!-- Collapsed: show small L icon -->
        <div class="h-5 w-5 shrink-0 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
          <span class="text-white text-[9px] font-bold">L</span>
        </div>
        <p class="text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
          Made by <span class="font-medium text-foreground">Lan</span>
          <span class="mx-1">·</span>
          <span>{{ new Date().getFullYear() }}</span>
        </p>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
