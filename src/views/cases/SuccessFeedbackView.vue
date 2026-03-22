<script setup lang="ts">
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { CheckCircle2, XCircle, AlertCircle, Info, Zap } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { ref } from 'vue'

// Bad: using modal for everything
const badSuccessDialog = ref(false)
const badErrorDialog = ref(false)

function showGoodSuccess() {
  toast.success('訂單送出成功！', { description: '訂單編號 ORD-2024-00042，預計 3 個工作天出貨。' })
}
function showGoodError() {
  toast.error('送出失敗', { description: '網路連線異常，請稍後再試。' })
}
function showGoodWarning() {
  toast.warning('部分資料未儲存', { description: '電話欄位格式不正確，已跳過儲存。' })
}
function showGoodInfo() {
  toast.info('自動儲存完成', { description: '草稿已於 09:42 自動儲存。' })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">事件回饋：Toast vs Modal (Success Feedback)</h1>
        <Badge variant="secondary" class="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">系統回饋
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        依操作的重要程度與可逆性選擇最適合的反饋方式，避免無謂的彈窗過度打斷使用者工作流。
      </p>
    </div>

    <SplitView>
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
            <AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">問題點 (Pain Points)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>不論成功或失敗皆使用中斷式 Modal，強迫用戶手動點擊關閉</li>
                <li>過度的系統回饋中斷了用戶的流暢思緒，造成操作摩擦</li>
                <li>低風險或常規狀態通知卻佔據螢幕中心，顯得過於笨重</li>
              </ul>
            </div>
          </div>

          <Card class="max-w-sm">
            <CardHeader>
              <CardTitle class="text-sm">訂單操作 (常規通知)</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-2">
              <Button variant="outline" size="sm" class="justify-start" @click="badSuccessDialog = true">
                <CheckCircle2 class="h-4 w-4 mr-2 text-green-500" />
                確認訂單（成功→Modal）
              </Button>
              <Button variant="outline" size="sm" class="justify-start" @click="badErrorDialog = true">
                <XCircle class="h-4 w-4 mr-2 text-destructive" />
                送出失敗（失敗→Modal）
              </Button>
            </CardContent>
          </Card>

          <!-- Bad modals -->
          <Dialog :open="badSuccessDialog" @update:open="badSuccessDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-green-600">
                  <CheckCircle2 class="h-5 w-5" /> 操作成功
                </DialogTitle>
                <DialogDescription>訂單已成功確認！訂單編號 ORD-2024-00042。</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button @click="badSuccessDialog = false">確定</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog :open="badErrorDialog" @update:open="badErrorDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-destructive">
                  <XCircle class="h-5 w-5" /> 操作失敗
                </DialogTitle>
                <DialogDescription>網路連線異常，請稍後再試。</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" @click="badErrorDialog = false">關閉</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-4 mt-4">
          <div class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
            <Zap class="h-4 w-4 shrink-0 mt-0.5" />
            <div class="text-xs leading-relaxed space-y-0.5">
              <p class="font-semibold text-[13px]">優化方案 (Optimization)</p>
              <ul class="text-[11px] opacity-80 list-disc list-inside space-y-0.5">
                <li>將低權重通知轉換為自消失的 Toast，在反饋同時保留流暢性</li>
                <li>僅在需要用戶立即決策或處理嚴重錯誤時才使用 Modal 彈窗</li>
                <li>利用色彩與圖示快速傳編訊息類型，減少閱讀負擔</li>
              </ul>
            </div>
          </div>

          <Card class="max-w-sm">
            <CardHeader>
              <CardTitle class="text-sm">常規操作 → 使用側邊 Toast</CardTitle>
              <CardDescription class="text-xs">操作可逆或僅為系統狀態，無須用戶手動干預</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col gap-2">
              <Button variant="outline" size="sm" class="justify-start shadow-sm" @click="showGoodSuccess">
                <CheckCircle2 class="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                確認訂單 → Toast 成功
              </Button>
              <Button variant="outline" size="sm" class="justify-start shadow-sm" @click="showGoodError">
                <XCircle class="h-4 w-4 mr-2 text-destructive" />
                送出失敗 → Toast 錯誤
              </Button>
              <Button variant="outline" size="sm" class="justify-start shadow-sm" @click="showGoodWarning">
                <AlertTriangle class="h-4 w-4 mr-2 text-amber-500" />
                部分失敗 → Toast 警告
              </Button>
              <Button variant="outline" size="sm" class="justify-start shadow-sm" @click="showGoodInfo">
                <Info class="h-4 w-4 mr-2 text-blue-500" />
                自動儲存 → Toast 資訊
              </Button>
            </CardContent>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
