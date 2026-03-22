<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SearchModal from '@/components/SearchModal.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from 'vue-sonner'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { usePresentation } from '@/composables/usePresentation'

const isDark = useDark()
const searchModalRef = ref<InstanceType<typeof SearchModal> | null>(null)
const { isPresenting, togglePresentationMode, currentPage, totalPages } = usePresentation()
</script>

<template>
  <!--
    Teleport Toaster to body to ensure position:fixed works correctly.
    Without this, sidebar's CSS transforms create a new stacking context
    and break fixed positioning, causing toast to appear in wrong location.
  -->
  <Teleport to="body">
    <Toaster position="bottom-right" :theme="isDark ? 'dark' : 'light'" :toastOptions="{
      class: 'sonner-toast-custom',
    }" />

    <!-- Presentation Mode Overlay (Page info + Exit button) -->
    <Transition name="fade">
      <div v-if="isPresenting" class="fixed top-4 left-0 right-0 z-[100] px-4 flex justify-between items-center pointer-events-none">
        <!-- left side page indicator -->
        <div class="bg-black/40 text-white px-4 py-1.5 rounded-full text-xs backdrop-blur-sm font-medium">
          案例專注模式：第 {{ currentPage }} / {{ totalPages }} 頁
        </div>
        
        <!-- right side exit button -->
        <button @click="togglePresentationMode"
          class="pointer-events-auto bg-black/40 hover:bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm transition-all shadow-lg active:scale-95">
          <span class="flex items-center gap-1">
            <kbd class="font-mono bg-white/20 px-1 rounded">ESC</kbd> 或點擊離開
          </span>
        </button>
      </div>
    </Transition>
  </Teleport>

  <SidebarProvider>
    <SearchModal ref="searchModalRef" />
    <div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <AppSidebar v-show="!isPresenting" />
      <div class="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppHeader v-show="!isPresenting" @open-search="searchModalRef?.open()" />
        <main class="flex-1 overflow-y-auto" :class="{ 'p-6 sm:p-10': isPresenting }">
          <RouterView />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
