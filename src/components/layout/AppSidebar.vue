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
    <SidebarHeader class="border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild size="lg" tooltip="UI/UX Case Study">
            <router-link to="/" class="flex items-center gap-2.5">
              <div class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs tracking-wide">
                UX
              </div>
              <div class="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span class="text-sm font-semibold">UI/UX Case Study</span>
                <span class="text-[10px] text-muted-foreground font-normal">互動式設計示範</span>
              </div>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="px-1">
      <!-- Home -->
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild :isActive="currentPath === '/'" tooltip="首頁">
              <router-link to="/" class="gap-2">
                <Home class="h-4 w-4 shrink-0" />
                <span class="text-sm">首頁</span>
              </router-link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <!-- UI Design Cases -->
      <SidebarGroup>
        <SidebarGroupLabel class="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
          <Layers class="h-3 w-3" />
          <span>UI 設計</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uiCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path" :tooltip="item.title">
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
          <span>UX 體驗</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in uxCases" :key="item.path">
              <SidebarMenuButton asChild :isActive="currentPath === item.path" :tooltip="item.title">
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

    <SidebarFooter class="border-t py-2">
      <div class="px-3 group-data-[collapsible=icon]:hidden">
        <p class="text-[10px] text-muted-foreground">Made by <span class="font-medium text-foreground">Lan</span> · {{ new Date().getFullYear() }}</p>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
