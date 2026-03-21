<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// Bad: using modal for everything
const badSuccessDialog = ref(false)
const badErrorDialog = ref(false)
const badDeleteDialog = ref(false)

// Good: appropriate use of toast vs modal
const goodConfirmDialog = ref(false)

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
        <h1 class="text-2xl font-bold tracking-tight">事件回饋：Toast vs Modal</h1>
        <Badge variant="secondary" class="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        <strong>Toast</strong> 適合輕量、非破壞性的操作回饋（成功、失敗通知）；
        <strong>Modal</strong> 適合需要用戶確認才能繼續的重要操作（刪除、不可逆動作）。
        混用或濫用會讓用戶感到干擾或不安。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：用 Modal 回饋所有操作" rightTitle="優秀的設計：適切選用 Toast 或 Modal">
      <template #left>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>每個操作都用 Modal，高度打斷用戶流程</li>
            <li>用 Modal 顯示成功訊息，需要用戶手動關閉</li>
            <li>危險操作（刪除）和普通通知用同樣的 Modal</li>
          </ul>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">訂單操作</CardTitle>
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
              <Button variant="outline" size="sm" class="justify-start" @click="badDeleteDialog = true">
                <AlertTriangle class="h-4 w-4 mr-2 text-amber-500" />
                刪除訂單（危險→也是Modal）
              </Button>
            </CardContent>
          </Card>

          <!-- Bad success modal -->
          <Dialog :open="badSuccessDialog" @update:open="badSuccessDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-green-600">
                  <CheckCircle2 class="h-5 w-5" />
                  操作成功
                </DialogTitle>
                <DialogDescription>
                  訂單已成功確認！訂單編號 ORD-2024-00042。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button @click="badSuccessDialog = false">確定</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <!-- Bad error modal -->
          <Dialog :open="badErrorDialog" @update:open="badErrorDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2 text-destructive">
                  <XCircle class="h-5 w-5" />
                  操作失敗
                </DialogTitle>
                <DialogDescription>網路連線異常，請稍後再試。</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" @click="badErrorDialog = false">關閉</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <!-- Bad delete modal (looks same as others) -->
          <Dialog :open="badDeleteDialog" @update:open="badDeleteDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>刪除訂單</DialogTitle>
                <DialogDescription>確定要刪除嗎？</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button @click="badDeleteDialog = false">確定</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>輕量操作用 Toast 通知：自動消失，不打斷流程</li>
            <li>Toast 有成功/錯誤/警告/資訊四種語意顏色</li>
            <li>只有「不可逆的危險操作」才使用 Modal 確認</li>
          </ul>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">輕量操作 → 使用 Toast</CardTitle>
              <CardDescription class="text-xs">操作後不需要用戶確認，系統直接通知結果</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col gap-2">
              <Button variant="outline" size="sm" class="justify-start" @click="showGoodSuccess">
                <CheckCircle2 class="h-4 w-4 mr-2 text-green-500" />
                確認訂單 → Toast 成功
              </Button>
              <Button variant="outline" size="sm" class="justify-start" @click="showGoodError">
                <XCircle class="h-4 w-4 mr-2 text-destructive" />
                送出失敗 → Toast 錯誤
              </Button>
              <Button variant="outline" size="sm" class="justify-start" @click="showGoodWarning">
                <AlertTriangle class="h-4 w-4 mr-2 text-amber-500" />
                部分失敗 → Toast 警告
              </Button>
              <Button variant="outline" size="sm" class="justify-start" @click="showGoodInfo">
                <Info class="h-4 w-4 mr-2 text-blue-500" />
                自動儲存 → Toast 資訊
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">危險/不可逆操作 → 使用 Modal</CardTitle>
              <CardDescription class="text-xs">需要用戶主動確認才繼續的破壞性操作</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" size="sm" @click="goodConfirmDialog = true">
                <AlertTriangle class="h-4 w-4 mr-2" />
                永久刪除訂單（需 Modal 確認）
              </Button>
            </CardContent>
          </Card>

          <!-- Good delete modal - properly styled danger confirm -->
          <Dialog :open="goodConfirmDialog" @update:open="goodConfirmDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle class="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div>確認刪除訂單？</div>
                    <div class="text-sm font-normal text-muted-foreground mt-0.5">ORD-2024-00042</div>
                  </div>
                </DialogTitle>
                <DialogDescription class="mt-2">
                  此操作<strong>無法復原</strong>。訂單及相關的付款記錄、出貨資訊都將被永久刪除。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="gap-2">
                <Button variant="outline" @click="goodConfirmDialog = false">取消，不刪除</Button>
                <Button variant="destructive" @click="() => { goodConfirmDialog = false; toast.success('訂單已刪除') }">
                  確認永久刪除
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </template>
    </SplitView>
  </div>
</template>
