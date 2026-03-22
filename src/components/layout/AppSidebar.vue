<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarHeader, SidebarFooter
} from '@/components/ui/sidebar'
import {
  Layers, Home, Github
} from 'lucide-vue-next'

const GITHUB_URL = 'https://github.com/s35241607/ui-ux-case-study'
import { caseGroups, categoryMeta } from '@/config/cases'

const route = useRoute()
const router = useRouter()
const currentPath = computed(() => route.path)
</script>

<template>
  <Sidebar collapsible="icon">
    <!-- Header -->
    <SidebarHeader class="px-2 py-2.5 border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <!-- Logo: use asChild + router-link but force center in collapsed -->
          <SidebarMenuButton asChild size="lg"
            class="h-auto py-1.5 px-1.5 hover:bg-accent rounded-md group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
            tooltip="Lan's UX Lab">
            <router-link to="/" class="flex items-center gap-2.5">
              <div
                class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 shadow-sm">
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
            <!-- NOT asChild: let SidebarMenuButton own the 8×8 collapsed box so hover is always centered -->
            <SidebarMenuButton :isActive="currentPath === '/'" tooltip="首頁" @click="router.push('/')" 
              class="gap-2.5 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center">
              <Home class="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>首頁</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <div class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />

      <!-- Case Groups -->
      <template v-for="(group, idx) in caseGroups" :key="group.label">
        <div v-if="idx > 0" class="mx-2 h-px bg-border/60 group-data-[collapsible=icon]:hidden" />
        <SidebarGroup class="py-1">
          <SidebarGroupLabel class="flex items-center gap-1.5 text-xs font-semibold px-2 mb-0.5"
            :class="categoryMeta[group.label].labelColor">
            <Layers class="h-3 w-3 shrink-0" />
            <span class="group-data-[collapsible=icon]:hidden">{{ group.label }}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in group.cases" :key="item.path">
                <SidebarMenuButton :isActive="currentPath === item.path" :tooltip="item.title"
                  @click="router.push(item.path)" 
                  class="gap-2.5 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center">
                  <component :is="item.icon" class="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{{ item.title }}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </template>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter class="border-t py-2.5 px-2">
      <div class="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
        <div
          class="h-5 w-5 shrink-0 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
          <span class="text-white text-[9px] font-bold">L</span>
        </div>
        <div class="flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden min-w-0">
          <p class="text-[11px] text-muted-foreground">
            Made by <span class="font-medium text-foreground">Lan</span>
            <span class="mx-1">·</span>
            <span>{{ new Date().getFullYear() }}</span>
          </p>
          <a :href="GITHUB_URL" target="_blank" rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-accent"
            title="GitHub">
            <Github class="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </SidebarFooter>
  </Sidebar>
</template>
