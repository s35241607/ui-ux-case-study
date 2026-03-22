<script setup lang="ts">
import { ref } from 'vue'
import { XCircle, CheckCircle, Eye } from 'lucide-vue-next'

const isRevealed = ref(false)

const props = defineProps<{
  leftTitle?: string
  rightTitle?: string
}>()
</script>

<template>
  <!-- Height based on viewport minus header (h-11 = 44px) -->
  <div class="flex flex-col h-[calc(100vh-2.75rem)] lg:flex-row overflow-hidden border rounded-xl mx-4 lg:mx-6 mb-6">
    <!-- Bad Side (Left) -->
    <section
      class="flex-1 flex flex-col relative bg-red-50/50 dark:bg-red-950/10 border-b lg:border-b-0 lg:border-r overflow-hidden">
      <div
        class="sticky top-0 z-10 px-4 py-3 bg-red-50/80 dark:bg-red-950/20 backdrop-blur-md border-b border-red-200/60 dark:border-red-900/40 flex items-center gap-3">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          <XCircle class="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
        </div>
        <h2 class="text-sm font-semibold text-red-700 dark:text-red-400">
          {{ props.leftTitle || '修改前' }}
        </h2>
      </div>
      <div class="p-6 flex-1 flex flex-col overflow-y-auto">
        <slot name="left"></slot>
      </div>
    </section>

    <!-- Good Side (Right) -->
    <section class="flex-1 flex flex-col relative bg-green-50/30 dark:bg-green-950/10 overflow-hidden">
      <div
        class="sticky top-0 z-10 px-4 py-3 bg-green-50/80 dark:bg-green-950/20 backdrop-blur-md border-b border-green-200/60 dark:border-green-900/40 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <CheckCircle class="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          </div>
          <h2 class="text-sm font-semibold text-green-700 dark:text-green-400">
            {{ props.rightTitle || '修改後' }}
          </h2>
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col overflow-y-auto transition-all duration-500 relative z-0"
        :class="{ 'blur-md opacity-40 pointer-events-none select-none': !isRevealed }">
        <slot name="right"></slot>
      </div>

      <!-- Reveal Overlay -->
      <div v-if="!isRevealed"
        class="absolute inset-0 z-20 top-[49px] flex flex-col items-center justify-center bg-background/5 backdrop-blur-[1px]">
        <button @click="isRevealed = true"
          class="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-xl hover:bg-primary/90 transition-all hover:scale-105">
          <Eye class="h-4 w-4" /> 點擊查看改善結果
        </button>
      </div>
    </section>
  </div>
</template>
