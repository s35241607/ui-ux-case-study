<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import { AlertTriangle, Save, X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

// ---- BAD: no unsaved warning ----
const badName = ref('')
const badEmail = ref('')
const badNote = ref('')
function badNavigateAway() {
  // Just navigates, loses all data
  badName.value = ''
  badEmail.value = ''
  badNote.value = ''
  toast.info('（模擬跳轉，資料已遺失）')
}

// ---- GOOD: unsaved changes guard ----
const goodName = ref('')
const goodEmail = ref('')
const goodNote = ref('')
const showUnsavedDialog = ref(false)
const isDraft = ref(false)
const hasSavedDraft = ref(false)

function goodMarkDirty() {
  isDraft.value = true
}

function goodSave() {
  // Simulate save
  hasSavedDraft.value = true
  isDraft.value = false
  toast.success('已儲存！')
}

function goodSaveDraft() {
  hasSavedDraft.value = true
  showUnsavedDialog.value = false
  toast.info('草稿已儲存', { description: '下次開啟時可以繼續編輯。' })
}

function goodDiscardAndLeave() {
  goodName.value = ''
  goodEmail.value = ''
  goodNote.value = ''
  isDraft.value = false
  hasSavedDraft.value = false
  showUnsavedDialog.value = false
  toast.info('（模擬跳轉，資料已放棄）')
}

function goodAttemptNavigate() {
  if (isDraft.value) {
    showUnsavedDialog.value = true
  } else {
    goodDiscardAndLeave()
    toast.info('（模擬跳轉，沒有未儲存的資料）')
  }
}

// Auto-save draft every 30s simulation
let autoSaveTimer = setInterval(() => {
  if (isDraft.value && (goodName.value || goodEmail.value || goodNote.value)) {
    hasSavedDraft.value = true
    // silent - don't bother user
  }
}, 10000)

onBeforeUnmount(() => clearInterval(autoSaveTimer))
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">未儲存資料提示 (Unsaved Changes)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        用戶填寫表單到一半意外點到其他按鈕時，必須給予提示或自動保存草稿，
        避免用戶心血白費。好的系統會在「放棄」前確認，或悄悄 auto-save 草稿。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：直接跳轉，資料無聲消失" rightTitle="優秀的設計：提示保存或自動草稿">
      <template #left>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>點擊「取消」或導覽離開，所有輸入無聲消失</li>
            <li>沒有草稿機制，無法恢復</li>
            <li>用戶只能重新填寫，體驗極差</li>
          </ul>

          <Card>
            <CardHeader>
              <CardTitle class="text-sm">新增聯絡人</CardTitle>
              <CardDescription class="text-xs">（輸入資料後點擊「取消」，觀察資料命運）</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="space-y-1.5">
                <Label class="text-xs">姓名</Label>
                <Input v-model="badName" placeholder="輸入姓名..." class="h-8 text-sm" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">電子郵件</Label>
                <Input v-model="badEmail" placeholder="email@example.com" class="h-8 text-sm" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">備註</Label>
                <textarea
                  v-model="badNote"
                  placeholder="輸入備註..."
                  class="w-full border rounded-md px-3 py-2 text-sm bg-background outline-none focus:ring-1 focus:ring-ring resize-none h-20"
                />
              </div>
            </CardContent>
            <CardFooter class="gap-2">
              <Button size="sm" @click="toast.success('已儲存')">儲存</Button>
              <!-- Bad: no warning, just clears -->
              <Button variant="outline" size="sm" @click="badNavigateAway">
                <X class="h-3.5 w-3.5 mr-1" />
                取消（資料直接消失）
              </Button>
            </CardFooter>
          </Card>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-5 mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>離開前顯示確認對話框，提供「儲存草稿」選項</li>
            <li>有未儲存狀態徽章提示用戶</li>
            <li>後台靜默 auto-save 草稿（不打擾用戶）</li>
          </ul>

          <Card>
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="text-sm">新增聯絡人</CardTitle>
                <Badge v-if="isDraft" variant="outline" class="text-amber-600 dark:text-amber-400 border-amber-300 text-[10px]">
                  未儲存變更
                </Badge>
                <Badge v-else-if="hasSavedDraft" variant="outline" class="text-green-600 dark:text-green-400 border-green-300 text-[10px]">
                  草稿已儲存
                </Badge>
              </div>
              <CardDescription class="text-xs">（輸入後點擊「取消」，會跳出確認）</CardDescription>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="space-y-1.5">
                <Label class="text-xs">姓名</Label>
                <Input v-model="goodName" placeholder="輸入姓名..." class="h-8 text-sm" @input="goodMarkDirty" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">電子郵件</Label>
                <Input v-model="goodEmail" placeholder="email@example.com" class="h-8 text-sm" @input="goodMarkDirty" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-xs">備註</Label>
                <textarea
                  v-model="goodNote"
                  placeholder="輸入備註..."
                  class="w-full border rounded-md px-3 py-2 text-sm bg-background outline-none focus:ring-1 focus:ring-ring resize-none h-20"
                  @input="goodMarkDirty"
                />
              </div>
            </CardContent>
            <CardFooter class="gap-2">
              <Button size="sm" @click="goodSave">
                <Save class="h-3.5 w-3.5 mr-1.5" />
                儲存
              </Button>
              <!-- Good: triggers warning if dirty -->
              <Button variant="outline" size="sm" @click="goodAttemptNavigate">
                取消
              </Button>
            </CardFooter>
          </Card>

          <!-- Unsaved changes dialog -->
          <Dialog :open="showUnsavedDialog" @update:open="showUnsavedDialog = false">
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle class="flex items-center gap-2">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <AlertTriangle class="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  有未儲存的變更
                </DialogTitle>
                <DialogDescription class="mt-2">
                  你有未儲存的資料，離開後將會遺失。是否要儲存為草稿，或直接放棄？
                </DialogDescription>
              </DialogHeader>
              <DialogFooter class="flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" @click="goodDiscardAndLeave" class="text-destructive border-destructive/40 hover:bg-destructive/5">
                  放棄並離開
                </Button>
                <Button size="sm" @click="goodSaveDraft">
                  <Save class="h-3.5 w-3.5 mr-1.5" />
                  儲存草稿
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </template>
    </SplitView>
  </div>
</template>
