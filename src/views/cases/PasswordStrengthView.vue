<script setup lang="ts">
import { ref, computed } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, Zap } from 'lucide-vue-next'

// Bad: no strength feedback
const badPassword = ref('')
const badConfirm = ref('')
const badShowPwd = ref(false)
const badSubmitted = ref(false)

// Good: real-time feedback
const goodPassword = ref('')
const goodConfirm = ref('')
const goodShowPwd = ref(false)

const checks = computed(() => [
  { label: '至少 8 個字元', pass: goodPassword.value.length >= 8 },
  { label: '包含大寫字母', pass: /[A-Z]/.test(goodPassword.value) },
  { label: '包含小寫字母', pass: /[a-z]/.test(goodPassword.value) },
  { label: '包含數字', pass: /[0-9]/.test(goodPassword.value) },
  { label: '包含特殊符號', pass: /[^A-Za-z0-9]/.test(goodPassword.value) },
])

const passedCount = computed(() => checks.value.filter(c => c.pass).length)

const strength = computed(() => {
  if (!goodPassword.value) return null
  const score = passedCount.value
  if (score <= 1) return { label: '非常弱', width: '20%', barClass: 'bg-red-500', textClass: 'text-red-600 dark:text-red-400' }
  if (score === 2) return { label: '弱', width: '40%', barClass: 'bg-orange-500', textClass: 'text-orange-600 dark:text-orange-400' }
  if (score === 3) return { label: '普通', width: '60%', barClass: 'bg-amber-500', textClass: 'text-amber-600 dark:text-amber-400' }
  if (score === 4) return { label: '強', width: '80%', barClass: 'bg-emerald-500', textClass: 'text-emerald-600 dark:text-emerald-400' }
  return { label: '非常強', width: '100%', barClass: 'bg-green-500', textClass: 'text-green-600 dark:text-green-400' }
})

const confirmMismatch = computed(() =>
  goodConfirm.value.length > 0 && goodPassword.value !== goodConfirm.value
)
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">密碼強度指示器 (Password Strength)</h1>
        <Badge variant="secondary" class="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30">可用性與防呆
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        設定密碼時即時顯示強度評估與需求清單，引導使用者建立安全性足夠的密碼，避免設定後才發現不符規則。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <!-- Alert Box (Before) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>密碼欄位缺乏即時規則說明，用戶須猜測格式</li>
                <li>僅在送出後才顯示錯誤，造成反覆修改的挫折感</li>
                <li>兩次輸入是否一致缺乏即時提示，增加認知負荷</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">設定密碼</CardTitle>
              <CardDescription class="text-xs">請輸入新密碼</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <label class="text-xs text-muted-foreground mb-1 block">新密碼</label>
                <div class="relative">
                  <input v-model="badPassword" :type="badShowPwd ? 'text' : 'password'"
                    class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none pr-9"
                    placeholder="請輸入密碼" />
                  <button type="button" @click="badShowPwd = !badShowPwd"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <EyeOff v-if="badShowPwd" class="h-4 w-4" />
                    <Eye v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label class="text-xs text-muted-foreground mb-1 block">確認密碼</label>
                <input v-model="badConfirm" :type="badShowPwd ? 'text' : 'password'"
                  class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none" placeholder="再次輸入密碼" />
              </div>
              <Button class="w-full" @click="badSubmitted = true">確認設定</Button>
              <div v-if="badSubmitted" class="space-y-1">
                <p v-if="badPassword.length < 8" class="text-xs text-destructive">
                  密碼長度至少需要 8 個字元
                </p>
                <p v-if="!/[A-Z]/.test(badPassword)" class="text-xs text-destructive">
                  密碼需包含大寫字母
                </p>
                <p v-if="badPassword !== badConfirm" class="text-xs text-destructive">
                  兩次輸入的密碼不一致
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4 px-1">
          <!-- Alert Box (After) -->
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>即時顯示強度進度條與等級，提供清晰的安全反饋</li>
                <li>互動式檢查清單逐條標記狀態，引導用戶完成補全</li>
                <li>在滿足所有規則前限制操作，預防錯誤提交</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">設定密碼</CardTitle>
              <CardDescription class="text-xs">請依下方規則設定安全密碼</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <div>
                <label class="text-xs text-muted-foreground mb-1 block">新密碼</label>
                <div class="relative">
                  <input v-model="goodPassword" :type="goodShowPwd ? 'text' : 'password'"
                    class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none pr-9"
                    placeholder="請輸入密碼" />
                  <button type="button" @click="goodShowPwd = !goodShowPwd"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <EyeOff v-if="goodShowPwd" class="h-4 w-4" />
                    <Eye v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- Strength bar -->
              <div v-if="goodPassword" class="space-y-1">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-muted-foreground">密碼強度</span>
                  <span class="text-xs font-medium" :class="strength?.textClass">{{ strength?.label }}</span>
                </div>
                <div class="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-300" :class="strength?.barClass"
                    :style="{ width: strength?.width }" />
                </div>
              </div>

              <!-- Requirements checklist -->
              <div class="rounded-md border bg-muted/30 p-3 space-y-1.5">
                <p class="text-xs font-medium text-muted-foreground mb-2">密碼規則</p>
                <div v-for="check in checks" :key="check.label" class="flex items-center gap-1.5 text-xs"
                  :class="check.pass ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'">
                  <CheckCircle2 v-if="check.pass" class="h-3.5 w-3.5 shrink-0" />
                  <XCircle v-else class="h-3.5 w-3.5 shrink-0" />
                  {{ check.label }}
                </div>
              </div>

              <div>
                <label class="text-xs text-muted-foreground mb-1 block">確認密碼</label>
                <input v-model="goodConfirm" :type="goodShowPwd ? 'text' : 'password'"
                  class="w-full border rounded-md px-3 h-9 text-sm bg-background outline-none"
                  :class="confirmMismatch ? 'border-destructive' : ''" placeholder="再次輸入密碼" />
                <p v-if="confirmMismatch" class="text-xs text-destructive mt-1">
                  兩次輸入的密碼不一致
                </p>
              </div>

              <Button class="w-full" :disabled="passedCount < 5 || confirmMismatch || goodConfirm.length === 0">
                {{ passedCount < 5 ? `還需完成 ${5 - passedCount} 項規則` : '確認設定' }} </Button>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
