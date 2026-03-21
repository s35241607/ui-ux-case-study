<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowRight } from 'lucide-vue-next'
import { allCases as allPages } from '@/config/cases'

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const resultRefs = ref<HTMLElement[]>([])



const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return allPages
  return allPages.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.type.toLowerCase().includes(q)
  )
})

watch(query, () => {
  selectedIndex.value = 0
})

watch(filteredResults, async () => {
  await nextTick()
  scrollActiveIntoView()
})

function scrollActiveIntoView() {
  const el = resultRefs.value[selectedIndex.value]
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}

function open() {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}

function close() {
  isOpen.value = false
  query.value = ''
}

function navigate(page: typeof allPages[0]) {
  router.push(page.path)
  close()
}

function selectAndNavigate() {
  const page = filteredResults.value[selectedIndex.value]
  if (page) navigate(page)
}

function handleKeydown(e: KeyboardEvent) {
  // Open with Ctrl+K or Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    if (isOpen.value) close()
    else open()
    return
  }

  if (!isOpen.value) return

  switch (e.key) {
    case 'Escape':
      close()
      break
    case 'ArrowDown':
      e.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredResults.value.length - 1)
      scrollActiveIntoView()
      break
    case 'ArrowUp':
      e.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      scrollActiveIntoView()
      break
    case 'Enter':
      e.preventDefault()
      selectAndNavigate()
      break
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

// expose open for header button
defineExpose({ open })
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="search-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="close"
      />
    </Transition>

    <!-- Modal -->
    <Transition name="search-modal">
      <div
        v-if="isOpen"
        class="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
      >
        <div class="rounded-xl border bg-popover shadow-2xl overflow-hidden">
          <!-- Search input -->
          <div class="flex items-center gap-3 px-4 border-b">
            <Search class="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="搜尋案例... (輸入標題、分類或關鍵字)"
              class="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd class="hidden sm:flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
              ESC
            </kbd>
          </div>

          <!-- Results -->
          <div class="max-h-[360px] overflow-y-auto p-2">
            <div v-if="filteredResults.length === 0" class="py-10 text-center text-sm text-muted-foreground">
              找不到相關案例
            </div>

            <template v-else>
              <!-- Group by category -->
              <template v-for="category in ['UI 設計', 'UX 體驗']" :key="category">
                <div
                  v-if="filteredResults.some(r => r.category === category)"
                  class="mb-1"
                >
                  <div class="flex items-center gap-2 px-2 py-1.5 mb-1">
                    <span
                      class="text-[10px] font-semibold tracking-wider uppercase"
                      :class="category === 'UI 設計' ? 'text-blue-500 dark:text-blue-400' : 'text-purple-500 dark:text-purple-400'"
                    >
                      {{ category }}
                    </span>
                  </div>
                  <button
                    v-for="(page, globalIdx) in filteredResults.filter(r => r.category === category)"
                    :key="page.path"
                    :ref="el => { if (el) resultRefs[filteredResults.indexOf(page)] = el as HTMLElement }"
                    @click="navigate(page)"
                    @mouseenter="selectedIndex = filteredResults.indexOf(page)"
                    class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors"
                    :class="selectedIndex === filteredResults.indexOf(page)
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50'"
                  >
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                      :class="category === 'UI 設計'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'"
                    >
                      <component :is="page.icon" class="h-4 w-4" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium truncate">{{ page.title }}</div>
                      <div class="text-xs text-muted-foreground truncate">{{ page.desc }}</div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                      <span class="text-[10px] px-1.5 py-0.5 rounded-full border text-muted-foreground">{{ page.type }}</span>
                      <ArrowRight v-if="selectedIndex === filteredResults.indexOf(page)" class="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </button>
                </div>
              </template>
            </template>
          </div>

          <!-- Footer -->
          <div class="flex items-center gap-4 border-t px-4 py-2 text-[11px] text-muted-foreground">
            <span class="flex items-center gap-1.5">
              <kbd class="rounded border bg-muted px-1 py-0.5 font-mono">↑↓</kbd> 選擇
            </span>
            <span class="flex items-center gap-1.5">
              <kbd class="rounded border bg-muted px-1 py-0.5 font-mono">↵</kbd> 前往
            </span>
            <span class="flex items-center gap-1.5">
              <kbd class="rounded border bg-muted px-1 py-0.5 font-mono">ESC</kbd> 關閉
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-backdrop-enter-active,
.search-backdrop-leave-active {
  transition: opacity 0.15s ease;
}
.search-backdrop-enter-from,
.search-backdrop-leave-to {
  opacity: 0;
}

.search-modal-enter-active,
.search-modal-leave-active {
  transition: all 0.15s ease;
}
.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px) scale(0.97);
}
</style>
