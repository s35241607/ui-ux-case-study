<script setup lang="ts">
import { ref, reactive } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2, Zap } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// --- 表單共用資料 ---

// --- Bad Form State ---
const badForm = reactive({
  company: '',
  taxId: '',
  email: '',
  budget: ''
})
const badError = ref(false)

const submitBadForm = () => {
  if (!badForm.company || badForm.taxId.length !== 8 || !badForm.email.includes('@') || !badForm.budget) {
    badError.value = true
    toast.error('儲存失敗', { description: '請檢查上方紅框處的錯誤訊息' })
  } else {
    badError.value = false
    toast.success('表單送出成功')
  }
}

// --- Good Form State ---
const goodForm = reactive({
  company: '',
  taxId: '',
  email: '',
  category: '',
  budget: ''
})

const touched = reactive({
  company: false,
  taxId: false,
  email: false,
  budget: false
})

const validation = {
  company: (v: string) => v.length >= 2,
  taxId: (v: string) => /^\d{8}$/.test(v),
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  budget: (v: string) => Number(v) >= 1000
}

const getStatus = (field: keyof typeof validation) => {
  if (!touched[field]) return 'none'
  return validation[field](goodForm[field]) ? 'success' : 'error'
}

const submitGoodForm = () => {
  Object.keys(touched).forEach(k => touched[k as keyof typeof touched] = true)
  const isValid = Object.keys(validation).every(k => validation[k as keyof typeof validation](goodForm[k as keyof typeof goodForm]))

  if (isValid) {
    toast.success('申請已送出', { description: '我們將在 3 個工作天內完成審核。' })
  } else {
    toast.error('無法送出表單', { description: '請修正標註紅色的欄位內容。' })
  }
}
</script>

<template>
  <div class="h-full flex flex-col uppercase-none">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">表單驗證與即時回饋 (Form Validation)</h1>
        <Badge variant="secondary" class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">系統回饋
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        在複雜表單中，即時且具體的驗證能大幅降低使用者的挫折感。
      </p>
    </div>

    <SplitView>
      <!-- ===== BAD Form ===== -->
      <template #left>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 mb-2">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>採用全頁提交模式，使用者必須在送出後才能獲知錯誤資訊</li>
                <li>錯誤訊息籠統且模糊，未明確標註發生錯誤的具體欄位</li>
                <li>數字與特定格式（如統編、Email）缺乏即時引導，增加填寫難度</li>
              </ul>
            </div>
          </div>

          <Card>
            <CardHeader class="pb-4">
              <CardTitle class="text-base">供應商合約申請</CardTitle>
              <CardDescription>請填寫基本營運資料以進行審核。</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitBadForm" class="space-y-4">
                <div v-if="badError"
                  class="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 p-3 rounded-md text-xs border border-red-200 dark:border-red-900">
                  表單欄位內容有誤，請檢查公司名稱、統編與預算是否符合規範。
                </div>

                <div class="space-y-1.5">
                  <Label class="text-xs">公司名稱</Label>
                  <Input v-model="badForm.company" placeholder="例如：萬事通股份有限公司" class="h-9" />
                </div>
                <div class="space-y-1.5">
                  <Label class="text-xs">統一編號</Label>
                  <Input v-model="badForm.taxId" placeholder="8 位數字" class="h-9" />
                </div>
                <div class="space-y-1.5">
                  <Label class="text-xs">聯絡信箱</Label>
                  <Input v-model="badForm.email" placeholder="email@example.com" class="h-9" />
                </div>
                <div class="space-y-1.5">
                  <Label class="text-xs">預算金額</Label>
                  <Input v-model="badForm.budget" type="number" placeholder="請輸入金額" class="h-9" />
                </div>

                <Button type="submit" class="w-full mt-2" variant="secondary">送出申請</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </template>

      <!-- ===== GOOD Form ===== -->
      <template #right>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400 mb-2">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>導入 Blur 或輸入即時檢核，讓使用者在操作當下獲取即時反饋</li>
                <li>精確告知錯誤原因與修正建議，確保使用者能快速排除問題</li>
                <li>利用邊框顏色與圖示狀態視覺化，顯著提升表單的可讀性與穩定感</li>
              </ul>
            </div>
          </div>

          <Card class="shadow-sm">
            <CardHeader class="pb-4">
              <CardTitle class="text-base">供應商合約申請</CardTitle>
              <CardDescription>所有標記 * 的欄位皆為必填項目。</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitGoodForm" class="space-y-5">
                <!-- Company -->
                <div class="space-y-1.5">
                  <Label class="text-xs" :class="{ 'text-destructive': getStatus('company') === 'error' }">
                    公司名稱 *
                  </Label>
                  <div class="relative">
                    <Input v-model="goodForm.company" @blur="touched.company = true" placeholder="至少兩個字" :class="{
                      'border-destructive focus-visible:ring-destructive pr-9': getStatus('company') === 'error',
                      'border-green-500 focus-visible:ring-green-500 pr-9': getStatus('company') === 'success'
                    }" class="h-9" />
                    <div class="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="getStatus('company') === 'error'" class="h-3.5 w-3.5 text-destructive" />
                      <CheckCircle2 v-if="getStatus('company') === 'success'" class="h-3.5 w-3.5 text-green-500" />
                    </div>
                  </div>
                  <p v-if="getStatus('company') === 'error'" class="text-[11px] text-destructive">請輸入完整的公司名稱。</p>
                </div>

                <!-- Tax ID -->
                <div class="space-y-1.5">
                  <Label class="text-xs" :class="{ 'text-destructive': getStatus('taxId') === 'error' }">統一編號 *</Label>
                  <div class="relative">
                    <Input v-model="goodForm.taxId" @blur="touched.taxId = true" placeholder="8 位數字" maxlength="8" :class="{
                      'border-destructive focus-visible:ring-destructive pr-9': getStatus('taxId') === 'error',
                      'border-green-500 focus-visible:ring-green-500 pr-9': getStatus('taxId') === 'success'
                    }" class="h-9" />
                    <div class="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="getStatus('taxId') === 'error'" class="h-3.5 w-3.5 text-destructive" />
                      <CheckCircle2 v-if="getStatus('taxId') === 'success'" class="h-3.5 w-3.5 text-green-500" />
                    </div>
                  </div>
                  <p v-if="getStatus('taxId') === 'error'" class="text-[11px] text-destructive">請輸入正確的 8 位數字統編格式。</p>
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <Label class="text-xs" :class="{ 'text-destructive': getStatus('email') === 'error' }">聯絡信箱 *</Label>
                  <div class="relative">
                    <Input v-model="goodForm.email" @blur="touched.email = true" placeholder="email@example.com" :class="{
                      'border-destructive focus-visible:ring-destructive pr-9': getStatus('email') === 'error',
                      'border-green-500 focus-visible:ring-green-500 pr-9': getStatus('email') === 'success'
                    }" class="h-9" />
                    <div class="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="getStatus('email') === 'error'" class="h-3.5 w-3.5 text-destructive" />
                      <CheckCircle2 v-if="getStatus('email') === 'success'" class="h-3.5 w-3.5 text-green-500" />
                    </div>
                  </div>
                  <p v-if="getStatus('email') === 'error'" class="text-[11px] text-destructive">請輸入有效的電子郵件地址。</p>
                </div>

                <!-- Budget -->
                <div class="space-y-1.5">
                  <Label class="text-xs" :class="{ 'text-destructive': getStatus('budget') === 'error' }">預算金額 (NTD) *</Label>
                  <div class="relative">
                    <Input v-model="goodForm.budget" type="number" @blur="touched.budget = true" placeholder="不低於 1,000" :class="{
                      'border-destructive focus-visible:ring-destructive pr-9': getStatus('budget') === 'error',
                      'border-green-500 focus-visible:ring-green-500 pr-9': getStatus('budget') === 'success'
                    }" class="h-9" />
                    <div class="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <AlertCircle v-if="getStatus('budget') === 'error'" class="h-3.5 w-3.5 text-destructive" />
                      <CheckCircle2 v-if="getStatus('budget') === 'success'" class="h-3.5 w-3.5 text-green-500" />
                    </div>
                  </div>
                  <p v-if="getStatus('budget') === 'error'" class="text-[11px] text-destructive">採購預算金額最低需為 1,000 元。</p>
                </div>

                <Button type="submit" class="w-full h-9">送出申請</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>

