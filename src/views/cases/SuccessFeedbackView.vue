<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const activeTab = ref('lightweight') // 'lightweight' | 'destructive'

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
          <h1 class="text-2xl font-bold tracking-tight">事件回饋：Toast vs Modal (Success Feedback)</h1>
          <Badge variant="secondary" class="text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30">互動設計</Badge>
        </div>
        <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
          依操作的重要程度與可逆性選擇最適合的反饋方式，避免無謂的彈窗過度打斷使用者工作流。
        </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
          <TabsTrigger value="lightweight">輕量級操作</TabsTrigger>
          <TabsTrigger value="destructive">危險性操作</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Ensure right side reveal state resets on tab change -->
    <SplitView :key="activeTab">
      <template #left>
        <div class="flex flex-col gap-4 mt-4">
          <!-- Bad: Lightweight (using Modals for trivial info) -->
          <div v-if="activeTab === 'lightweight'" class="flex flex-col gap-4">
            <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
              <strong>濫用彈窗中斷流程 (Interruption Abuse)</strong><br />
              <span class="opacity-80">不管成功或失敗的常規通知都使用 Modal，強迫用戶手動點擊關閉才能繼續工作，體驗極差。</span>
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
          </div>

          <!-- Bad: Destructive (using basic Modal without severity) -->
          <div v-if="activeTab === 'destructive'" class="flex flex-col gap-4">
            <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg text-sm text-red-800 dark:text-red-300">
              <strong>缺乏警覺的確認框 (Weak Destructive Confirm)</strong><br />
              <span class="opacity-80">危險操作（如刪除）使用和普通通知一模一樣的 Modal，沒有視覺警示，用戶容易慣性略過。</span>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle class="text-sm">資料維護 (危險操作)</CardTitle>
              </CardHeader>
              <CardContent class="flex flex-col gap-2">
                <Button variant="outline" size="sm" class="justify-start" @click="badDeleteDialog = true">
                  <AlertTriangle class="h-4 w-4 mr-2 text-amber-500" />
                  刪除訂單（危險→常規 Modal）
                </Button>
              </CardContent>
            </Card>
          </div>

          <!-- Modals (globally rendered when active) -->
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
        <div class="flex flex-col gap-4 mt-4">
          <!-- Good: Lightweight (using Toasts) -->
          <div v-if="activeTab === 'lightweight'" class="flex flex-col gap-4">
            <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
              <strong>非阻斷式通知 (Non-blocking Toast)</strong><br />
              <span class="opacity-80">常規的成功或系統狀態利用 Toast 通知，數秒後自動消失，給予回饋的同時不打擾當前操作。</span>
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

          <!-- Good: Destructive (using rigorous Modal) -->
          <div v-if="activeTab === 'destructive'" class="flex flex-col gap-4">
            <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg text-sm text-green-800 dark:text-green-300">
              <strong>明確阻斷與警告 (Obvious Destruction Warning)</strong><br />
              <span class="opacity-80">對於資料刪除、修改密碼等不可逆行為，強制彈出 Modal 阻斷流程，並使用警示色提示用戶嚴重性。</span>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle class="text-sm">危險不可逆操作 → 使用 Modal</CardTitle>
                <CardDescription class="text-xs">需要用戶主動確認才繼續的破壞性操作</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" class="w-full shadow-sm" @click="goodConfirmDialog = true">
                  <AlertTriangle class="h-4 w-4 mr-2" />
                  永久刪除訂單（需 Modal 確認）
                </Button>
              </CardContent>
            </Card>
          </div>

          <!-- Good delete modal - properly styled danger confirm -->
          <Dialog :open="goodConfirmDialog" @update:open="goodConfirmDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle class="h-5 w-5 text-destructive" />
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="text-lg">確認刪除訂單？</span>
                    <span class="text-xs font-mono text-muted-foreground">ORD-2024-00042</span>
                  </div>
                </DialogTitle>
                <DialogDescription class="mt-4 text-sm leading-relaxed text-foreground">
                  此操作 <strong>無法復原</strong>。該筆訂單及相關的付款記錄、出貨資訊都將從資料庫中被永久清除。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="gap-2 sm:gap-2 pt-2">
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
