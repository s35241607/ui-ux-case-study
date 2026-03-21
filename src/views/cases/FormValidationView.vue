<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// --- Bad Form State ---
const badEmail = ref('')
const badPassword = ref('')
const badError = ref(false)

const submitBadForm = () => {
  if (!badEmail.value.includes('@') || badPassword.value.length < 6) {
    badError.value = true
  } else {
    badError.value = false
    toast.success('表單送出', { description: '(這是不好的設計示範，實際上不應這樣做)' })
  }
}

// --- Good Form State ---
const goodEmail = ref('')
const goodPassword = ref('')
const isEmailDirty = ref(false)
const isPasswordDirty = ref(false)

const submitGoodForm = () => {
  isEmailDirty.value = true
  isPasswordDirty.value = true
  if (goodEmail.value.includes('@') && goodPassword.value.length >= 6) {
    toast.success('登入成功！', { description: '歡迎回來，表單驗證通過。' })
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">表單驗證與回饋 (Form Validation)</h1>
        <Badge variant="secondary" class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">系統回饋
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        在欄位輸入時即時顯示驗證結果，讓使用者能及早修正錯誤。
      </p>
    </div>

    <SplitView>
      <!-- ===== BAD Form ===== -->
      <template #left>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
            <li>只有點擊送出後才驗證</li>
            <li>錯誤訊息統整在最上方且模糊</li>
            <li>輸入框沒有錯誤狀態的視覺回饋</li>
          </ul>

          <Card>
            <CardHeader>
              <CardTitle>帳號登入</CardTitle>
              <CardDescription>請輸入您的登入資訊。</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitBadForm" class="space-y-4">
                <!-- Bad: top-level generic error -->
                <div v-if="badError"
                  class="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-3 rounded-md text-sm border border-red-200 dark:border-red-900">
                  發生錯誤，請檢查您的輸入資料！
                </div>

                <div class="space-y-2">
                  <Label for="bad-email">電子郵件</Label>
                  <Input id="bad-email" v-model="badEmail" placeholder="輸入信箱..." />
                </div>
                <div class="space-y-2">
                  <Label for="bad-password">密碼</Label>
                  <Input id="bad-password" type="password" v-model="badPassword" placeholder="輸入密碼..." />
                </div>

                <Button type="submit" class="w-full mt-2" variant="secondary">送出</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </template>

      <!-- ===== GOOD Form ===== -->
      <template #right>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
            <li>欄位旁直接顯示具意義的錯誤訊息</li>
            <li>正確輸入後給予視覺肯定（綠色✓）</li>
            <li>輸入框外框隨狀態改變顏色</li>
          </ul>

          <Card class="shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle>帳號登入</CardTitle>
              <CardDescription>請輸入您的電子郵件與密碼。</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitGoodForm" class="space-y-6">
                <!-- Good Email Field -->
                <div class="space-y-2">
                  <Label for="good-email"
                    :class="{ 'text-destructive': isEmailDirty && !goodEmail.includes('@') }">電子郵件</Label>
                  <div class="relative">
                    <Input id="good-email" v-model="goodEmail" @blur="isEmailDirty = true"
                      placeholder="example@domain.com" :class="{
                        'border-destructive focus-visible:ring-destructive pr-10': isEmailDirty && (!goodEmail || !goodEmail.includes('@')),
                        'border-green-500 focus-visible:ring-green-500 pr-10': isEmailDirty && goodEmail.includes('@')
                      }" />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="isEmailDirty && (!goodEmail || !goodEmail.includes('@'))"
                        class="h-4 w-4 text-destructive" />
                      <CheckCircle2 v-else-if="isEmailDirty && goodEmail.includes('@')"
                        class="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <p v-if="isEmailDirty && !goodEmail" class="text-xs text-destructive">此欄位為必填。</p>
                  <p v-else-if="isEmailDirty && !goodEmail.includes('@')" class="text-xs text-destructive">
                    請輸入有效的電子郵件格式（需包含 @）。</p>
                </div>

                <!-- Good Password Field -->
                <div class="space-y-2">
                  <Label for="good-password"
                    :class="{ 'text-destructive': isPasswordDirty && goodPassword.length < 6 }">密碼</Label>
                  <div class="relative">
                    <Input id="good-password" type="password" v-model="goodPassword" @blur="isPasswordDirty = true"
                      placeholder="至少 6 個字元" :class="{
                        'border-destructive focus-visible:ring-destructive pr-10': isPasswordDirty && goodPassword.length < 6,
                        'border-green-500 focus-visible:ring-green-500 pr-10': isPasswordDirty && goodPassword.length >= 6
                      }" />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="isPasswordDirty && goodPassword.length < 6" class="h-4 w-4 text-destructive" />
                      <CheckCircle2 v-else-if="isPasswordDirty && goodPassword.length >= 6"
                        class="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <p v-if="isPasswordDirty && goodPassword.length < 6" class="text-xs text-destructive">密碼長度必須至少為 6 個字元。
                  </p>
                </div>

                <Button type="submit" class="w-full">登入系統</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
