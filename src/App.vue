<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SearchModal from '@/components/SearchModal.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from 'vue-sonner'
import { ref } from 'vue'

const searchModalRef = ref<InstanceType<typeof SearchModal> | null>(null)
</script>

<template>
  <!--
    Teleport Toaster to body to ensure position:fixed works correctly.
    Without this, sidebar's CSS transforms create a new stacking context
    and break fixed positioning, causing toast to appear in wrong location.
  -->
  <Teleport to="body">
    <Toaster position="bottom-right" richColors />
  </Teleport>

  <SidebarProvider>
    <SearchModal ref="searchModalRef" />
    <div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <AppSidebar />
      <div class="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppHeader @open-search="searchModalRef?.open()" />
        <main class="flex-1 overflow-y-auto">
          <RouterView />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
