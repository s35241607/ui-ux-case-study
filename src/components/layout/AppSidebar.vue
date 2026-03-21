<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader, SidebarFooter
} from '@/components/ui/sidebar'
import {
  Layers, Home
} from 'lucide-vue-next'
import { caseGroups, categoryMeta } from '@/config/cases'

const route = useRoute()



const currentPath = computed(() => route.path)
</script>

<template>
  <Sidebar collapsible="icon">
    <!-- Header: Notion-style workspace header -->
    <SidebarHeader class="px-3 py-3 border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild size="lg" class="h-auto py-2 px-2 hover:bg-accent rounded-md"
            tooltip="Lan's UX Lab">
            <router-link to="/" class="flex items-center gap-2.5">
              <div
                class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-sm">
                <span class="text-white font-bold text-xs tracking-tight">L</span>
              </div>
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

      <div class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />

      <!-- Case Groups (data-driven, 6 categories) -->
      <template v-for="(group, idx) in caseGroups" :key="group.label">
        <div v-if="idx > 0" class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />
        <SidebarGroup class="py-1">
          <SidebarGroupLabel class="flex items-center gap-1.5 text-xs font-semibold px-2 mb-0.5"
            :class="categoryMeta[group.label].labelColor">
            <Layers class="h-3 w-3" />
            <span class="group-data-[collapsible=icon]:hidden">{{ group.label }}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in group.cases" :key="item.path">
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
      </template>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter class="border-t py-2.5 px-3">
      <div class="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
        <div
          class="h-5 w-5 shrink-0 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
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
