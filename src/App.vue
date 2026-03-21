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
  <SidebarProvider>
    <Toaster position="bottom-right" richColors />
    <SearchModal ref="searchModalRef" />
    <div class="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar />
      <div class="flex flex-1 flex-col overflow-hidden">
        <AppHeader @open-search="searchModalRef?.open()" />
        <main class="flex-1 overflow-auto pt-4">
          <RouterView />
        </main>
      </div>
    </div>
  </SidebarProvider>
</template>
