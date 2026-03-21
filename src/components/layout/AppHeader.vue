<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Sun, Moon, Search } from 'lucide-vue-next'
import { useDark, useToggle } from '@vueuse/core'
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

const breadcrumbs = computed(() => {
  return route.matched.filter(r => r.meta && r.meta.title).map(r => ({
    title: r.meta.title as string,
    path: r.path
  }))
})
</script>

<template>
  <header class="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 backdrop-blur-md px-4 sm:px-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 flex-1 min-w-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" class="text-muted-foreground hover:text-foreground transition-colors text-sm">
              首頁
            </BreadcrumbLink>
          </BreadcrumbItem>
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage v-if="index === breadcrumbs.length - 1" class="text-sm font-medium max-w-[280px] truncate">
                {{ crumb.title }}
              </BreadcrumbPage>
              <BreadcrumbLink v-else :href="crumb.path" class="text-muted-foreground hover:text-foreground transition-colors text-sm">
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
        class="hidden sm:flex items-center gap-2 h-8 rounded-md border bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        <Search class="h-3.5 w-3.5" />
        <span class="text-xs">搜尋...</span>
        <kbd class="flex items-center gap-0.5 rounded border bg-background px-1 py-0.5 text-[10px] font-mono ml-1">
          <span>⌘</span><span>K</span>
        </kbd>
      </button>
      <button
        @click="emit('open-search')"
        class="flex sm:hidden items-center justify-center rounded-md h-8 w-8 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search class="h-4 w-4" />
      </button>

      <!-- Dark mode toggle -->
      <button
        @click="toggleDark()"
        class="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="切換深淺色模式"
      >
        <Sun v-if="isDark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
        <span class="sr-only">切換主題</span>
      </button>
    </div>
  </header>
</template>
