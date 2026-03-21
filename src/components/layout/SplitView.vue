<script setup lang="ts">
import { XCircle, CheckCircle } from 'lucide-vue-next'

const props = defineProps<{
  leftTitle?: string
  rightTitle?: string
}>()
</script>

<template>
  <!-- Height based on viewport minus header (h-11 = 44px) -->
  <div class="flex flex-col h-[calc(100vh-2.75rem)] lg:flex-row overflow-hidden border rounded-xl mx-4 lg:mx-6 mb-6">
    <!-- Bad Side (Left) -->
    <section class="flex-1 flex flex-col relative bg-red-50/50 dark:bg-red-950/10 border-b lg:border-b-0 lg:border-r overflow-y-auto">
      <div class="sticky top-0 z-10 px-4 py-3 bg-red-50/80 dark:bg-red-950/20 backdrop-blur-md border-b border-red-200/60 dark:border-red-900/40 flex items-center gap-3">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          <XCircle class="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
        </div>
        <h2 class="text-sm font-semibold text-red-700 dark:text-red-400">
          {{ props.leftTitle || '不易用的設計 (Bad UX)' }}
        </h2>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <slot name="left"></slot>
      </div>
    </section>

    <!-- Good Side (Right) -->
    <section class="flex-1 flex flex-col relative bg-green-50/30 dark:bg-green-950/10 overflow-y-auto">
      <div class="sticky top-0 z-10 px-4 py-3 bg-green-50/80 dark:bg-green-950/20 backdrop-blur-md border-b border-green-200/60 dark:border-green-900/40 flex items-center gap-3">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
          <CheckCircle class="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
        </div>
        <h2 class="text-sm font-semibold text-green-700 dark:text-green-400">
          {{ props.rightTitle || '友善的設計 (Good UX)' }}
        </h2>
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <slot name="right"></slot>
      </div>
    </section>
  </div>
</template>
