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
const { isPresenting, togglePresentationMode } = usePresentation()
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

    <!-- Presentation Mode Exit Button (only visible when presenting) -->
    <Transition name="fade">
      <button v-if="isPresenting" @click="togglePresentationMode"
        class="fixed top-4 right-4 z-[100] bg-black/40 hover:bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-2 backdrop-blur-sm transition-all">
        <span class="flex items-center gap-1"><kbd class="font-mono bg-white/20 px-1 rounded">ESC</kbd> 或點擊離開簡報模式</span>
      </button>
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
