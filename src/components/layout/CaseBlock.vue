<script setup lang="ts">
defineProps<{
  index?: number | string
  title: string
  description?: string
  tag?: 'ui' | 'ux'
}>()
</script>

<template>
  <section class="mb-10 last:mb-0">
    <!-- Case header -->
    <div class="flex items-start gap-3 mb-4 pb-3 border-b">
      <div
        v-if="index !== undefined"
        class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5"
        :class="tag === 'ux'
          ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'"
      >
        {{ index }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-semibold leading-snug">{{ title }}</h3>
        <p v-if="description" class="text-sm text-muted-foreground mt-0.5 leading-relaxed">{{ description }}</p>
      </div>
    </div>
    <!-- Case content -->
    <slot />
  </section>
</template>
