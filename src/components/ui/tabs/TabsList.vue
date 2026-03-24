<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsList } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn(
      'inline-flex items-center justify-start sm:justify-center rounded-lg bg-muted p-1 text-muted-foreground overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
