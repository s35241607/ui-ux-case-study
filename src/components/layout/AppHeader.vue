<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Sun, Moon, Search, MonitorPlay } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { togglePresentationMode } from '@/composables/usePresentation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const route = useRoute()

const emit = defineEmits<{ 'open-search': [] }>()

// Only show breadcrumbs for non-home routes (exclude '/' itself)
const breadcrumbs = computed(() => {
  return route.matched
    .filter(r => r.path !== '/' && r.meta && r.meta.title)
    .map(r => ({
      title: r.meta.title as string,
      path: r.path
    }))
})
</script>

<template>
  <header class="sticky top-0 z-30 flex h-11 items-center gap-2 border-b bg-background/90 backdrop-blur-md px-3 sm:px-4">
    <!-- Sidebar toggle -->
    <SidebarTrigger class="shrink-0 -ml-1" />
    <div class="w-px h-4 bg-border shrink-0" />

    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 flex-1 min-w-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" class="text-muted-foreground hover:text-foreground transition-colors text-xs">
              首頁
            </BreadcrumbLink>
          </BreadcrumbItem>
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage v-if="index === breadcrumbs.length - 1" class="text-xs font-medium max-w-[280px] truncate">
                {{ crumb.title }}
              </BreadcrumbPage>
              <BreadcrumbLink v-else :href="crumb.path" class="text-muted-foreground hover:text-foreground transition-colors text-xs">
                {{ crumb.title }}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <!-- Search trigger -->
      <button
        @click="emit('open-search')"
        class="hidden sm:flex items-center gap-2 h-7 rounded-md border bg-muted/50 px-2.5 text-muted-foreground hover:bg-muted transition-colors"
      >
        <Search class="h-3 w-3" />
        <span class="text-xs">搜尋...</span>
        <kbd class="flex items-center gap-0.5 rounded border bg-background px-1 py-0.5 text-[10px] font-mono ml-0.5">
          <span>⌘</span><span>K</span>
        </kbd>
      </button>
      <button
        @click="emit('open-search')"
        class="flex sm:hidden items-center justify-center rounded-md h-7 w-7 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search class="h-3.5 w-3.5" />
      </button>

      <!-- Presentation toggle -->
      <button
        @click="togglePresentationMode"
        class="hidden sm:inline-flex items-center justify-center rounded-md h-7 w-7 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="簡報模式 (Shift+P)"
      >
        <MonitorPlay class="h-3.5 w-3.5" />
      </button>

      <!-- Dark mode toggle -->
      <button
        @click="toggleDark()"
        class="inline-flex items-center justify-center rounded-md h-7 w-7 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="切換深淺色模式"
      >
        <Sun v-if="isDark" class="h-3.5 w-3.5" />
        <Moon v-else class="h-3.5 w-3.5" />
        <span class="sr-only">切換主題</span>
      </button>
    </div>
  </header>
</template>
