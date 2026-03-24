<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight, Layers } from 'lucide-vue-next'
import { caseGroups, categoryMeta } from '@/config/cases'

const router = useRouter()
</script>

<template>
  <div class="max-w-5xl mx-auto flex flex-col gap-8 px-6 pb-10 lg:px-8">
    <!-- Hero -->
    <div class="py-8">
      <div class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4">
        <Layers class="h-3 w-3" />
        互動式設計思考示範
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight mb-3">UI/UX Case Study</h1>
      <p class="text-muted-foreground text-base max-w-2xl leading-relaxed">
        每個案例都是可操作的真實元件，讓你親身感受「不好的設計」與「好的設計」帶來的體驗差異。
        按下 <kbd class="inline-flex items-center rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">⌘K</kbd>
        快速搜尋案例。
      </p>
    </div>

    <!-- Case Sections (data-driven, 6 categories) -->
    <section v-for="group in caseGroups" :key="group.label">
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-2">
          <div class="h-4 w-1 rounded-full" :class="categoryMeta[group.label].dotColor"></div>
          <h2 class="text-lg font-semibold">{{ group.label }}</h2>
        </div>
        <span class="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{{ group.cases.length }}
          個案例</span>
      </div>
      <p class="text-sm text-muted-foreground mb-4">{{ categoryMeta[group.label].homeDesc }}</p>
      <div class="grid gap-3 sm:grid-cols-2">
        <button v-for="item in group.cases" :key="item.path" @click="router.push(item.path)"
          class="group text-left rounded-xl border bg-card p-4 transition-all hover:shadow-sm"
          :class="categoryMeta[group.label].hoverBorder">
          <div class="flex items-start gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              :class="categoryMeta[group.label].iconClass">
              <component :is="item.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold">{{ item.title.split(' (')[0] }}</span>
                <ArrowRight
                  class="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <div class="text-[12px] font-medium mb-1" :class="categoryMeta[group.label].typeTextClass">{{ item.type }}
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </button>
      </div>
    </section>
  </div>
</template>
