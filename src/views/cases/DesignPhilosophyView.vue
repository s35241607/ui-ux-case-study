<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { 
  Zap,
  MousePointerClick,
  BellRing,
  ShieldCheck
} from 'lucide-vue-next'

const philosophies = [
  {
    value: '直覺 (Intuition)',
    userVoice: '「別讓我思考」',
    desc: '介面元件的行為應符合直感與大眾慣例。當使用者不需要停下來思考，才是成功的設計。',
    icon: MousePointerClick,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100/50 dark:bg-amber-900/20'
  },
  {
    value: '效率 (Efficiency)',
    userVoice: '「越快搞定越好」',
    desc: '減少點擊次數與不必要的跳轉。在對的流程、對的位置提供工具，讓使用者能流暢地完成任務處理。',
    icon: Zap,
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-100/50 dark:bg-violet-900/20'
  },
  {
    value: '信任 (Trust)',
    userVoice: '「現在怎麼了？」',
    desc: '系統狀態必須透明。無論是處理中或成功，都應提供即時回饋，消除等待中的不安感與不確定性。',
    icon: BellRing,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100/50 dark:bg-emerald-900/20'
  },
  {
    value: '安全 (Security)',
    userVoice: '「萬一我按錯呢？」',
    desc: '設計完善的防呆與確認機制。高風險操作需二次確認，並提供撤銷的可能，鼓勵大膽探索新功能。',
    icon: ShieldCheck,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-100/50 dark:bg-rose-900/20'
  }
]
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-background">
    <!-- Header: Consistent with project standards -->
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">設計思維 (Design Philosophy)</h1>
        <Badge variant="secondary" class="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/40">核心原則</Badge>
      </div>
      <p class="text-muted-foreground text-sm italic opacity-80 max-w-3xl">
        "Good design is invisible. It’s only when design fails that we notice it."
      </p>
    </div>

    <!-- Grid Container: Balanced width for high resolution -->
    <div class="flex-1 px-4 lg:px-6 pb-12 overflow-y-auto">
      <div class="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 auto-rows-fr">
        <div v-for="p in philosophies" :key="p.value" 
          class="relative flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-slate-100/40 dark:bg-white/[0.02] rounded-[2.5rem] p-10 lg:p-12 hover:bg-slate-100/70 dark:hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden"
        >
          <!-- Massive Faded Background Icon (Premium Aesthetic) -->
          <component :is="p.icon" class="absolute -right-12 -bottom-12 w-64 h-64 opacity-[0.03] dark:opacity-[0.05] -z-0 group-hover:scale-110 transition-transform duration-700" />

          <!-- Icon Wrapper -->
          <div :class="['relative z-10 w-20 h-20 shrink-0 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-200/50 dark:shadow-none', p.bgColor]">
            <component :is="p.icon" :class="['w-10 h-10', p.color]" />
          </div>

          <div class="relative z-10 flex flex-col text-center sm:text-left">
            <div class="mb-4">
              <span :class="['text-[11px] font-bold uppercase tracking-[0.3em] opacity-60 block mb-2', p.color]">{{ p.value }}</span>
              <h2 class="text-2xl font-bold tracking-tight lg:text-3xl text-slate-900 dark:text-slate-100">{{ p.userVoice }}</h2>
            </div>
            <p class="text-sm lg:text-base text-muted-foreground/90 leading-relaxed max-w-md">
              {{ p.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Pure CSS solution for smooth animations */
.max-w-7xl {
  transition: max-width 0.3s ease;
}
</style>

<style scoped>
/* Ensure grid items stretch appropriately */
.auto-rows-fr {
  grid-auto-rows: 1fr;
}
</style>
