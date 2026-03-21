<script setup lang="ts">
import { ref, computed } from 'vue'
import { AlertTriangle, Trash2 } from 'lucide-vue-next'
import SplitView from '@/components/layout/SplitView.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'vue-sonner'

// 模擬資料
const projectName = 'Production-DB-Root'

// --- Bad Design State ---
const showBadModal = ref(false)
const deleteBad = () => {
  showBadModal.value = false
  toast.error(`專案 ${projectName} 已遭到刪除`, { description: '(這可能是一場因為盲按造成的災難)' })
}

// --- Good Design State ---
const showGoodModal = ref(false)
const confirmText = ref('')

const isDeleteEnabled = computed(() => confirmText.value === projectName)

const deleteGood = () => {
  if (!isDeleteEnabled.value) return
  showGoodModal.value = false
  confirmText.value = ''
  toast.success(`專案 ${projectName} 已安全刪除`, { description: '強制確認機制成功防止了意外操作' })
}
const cancelGood = () => {
  showGoodModal.value = false
  confirmText.value = ''
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">破壞性操作的雙重確認 (Destructive Action Safeguards)</h1>
        <Badge variant="secondary" class="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30">可用性與防呆
        </Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        重大破壞性操作加入手動輸入確認，防止誤操作意外執行。
      </p>
    </div>

    <SplitView>
      <!-- Bad Design -->
      <template #left>
        <div class="space-y-6 flex flex-col items-center justify-center h-full min-h-[400px]">

          <div class="text-center space-y-4">
            <h3 class="font-medium text-lg">專案設定: {{ projectName }}</h3>
            <Button variant="destructive" @click="showBadModal = true">
              <Trash2 class="w-4 h-4 mr-2" />
              刪除專案
            </Button>
          </div>

          <!-- 模擬彈窗 -->
          <div v-if="showBadModal"
            class="fixed rounded-lg border bg-background shadow-lg max-w-sm w-full mx-4 z-50 p-6 animate-in fade-in zoom-in-95"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3 text-destructive">
                <AlertTriangle class="w-6 h-6" />
                <h4 class="font-semibold text-lg">確認刪除</h4>
              </div>
              <p class="text-sm text-muted-foreground">
                您確定要刪除 <b>{{ projectName }}</b> 嗎？此操作無法復原。
              </p>
              <div class="flex justify-end gap-3 mt-4">
                <Button variant="outline" @click="showBadModal = false">取消</Button>
                <!-- 紅色按鈕非常顯眼，使用者通常會直接點擊它 -->
                <Button variant="destructive" @click="deleteBad">確定刪除</Button>
              </div>
            </div>
          </div>

          <!-- Overlay -->
          <div v-if="showBadModal" class="absolute inset-0 bg-background/50 backdrop-blur-sm z-40"
            @click="showBadModal = false"></div>

          <p class="text-xs text-muted-foreground max-w-xs text-center mt-auto">
            <b>盲點：</b> 右下角的紅色「確定」按鈕太過理所當然，使用者在 0.5 秒內就會無意識地按下，無法起到攔截錯誤的保護作用。
          </p>
        </div>
      </template>

      <!-- Good Design -->
      <template #right>
        <div class="space-y-6 flex flex-col items-center justify-center h-full min-h-[400px] relative">

          <div class="text-center space-y-4">
            <h3 class="font-medium text-lg">專案設定: {{ projectName }}</h3>
            <Button variant="outline" class="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              @click="showGoodModal = true">
              <Trash2 class="w-4 h-4 mr-2" />
              刪除專案
            </Button>
          </div>

          <!-- 安全防呆彈窗 -->
          <div v-if="showGoodModal"
            class="fixed rounded-lg border border-destructive/20 bg-background shadow-xl max-w-md w-full mx-4 z-50 p-6 animate-in fade-in zoom-in-95"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <div class="flex flex-col gap-5">
              <h4 class="font-semibold text-xl">嚴重警告：這項操作極度危險</h4>

              <div
                class="bg-destructive/10 text-destructive text-sm p-4 rounded-md border border-destructive/20 space-y-2">
                <p>您即將永久刪除 <b>{{ projectName }}</b>。</p>
                <p>這將會清除所有資料庫紀錄及備份，且絕對無法在日後還原。請謹慎評估。</p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium">
                  請在下方輸入 <span class="font-bold select-all bg-muted px-1 py-0.5 rounded">{{ projectName }}</span> 以確認刪除：
                </label>
                <input v-model="confirmText" type="text"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="">
              </div>

              <div class="flex justify-end gap-3 mt-2">
                <Button variant="outline" @click="cancelGood">取消保留</Button>
                <!-- 必須輸入正確文字才會解鎖按鈕 -->
                <Button variant="destructive" @click="deleteGood" :disabled="!isDeleteEnabled" class="transition-all">
                  確認並永久刪除
                </Button>
              </div>
            </div>
          </div>

          <!-- Overlay -->
          <div v-if="showGoodModal" class="absolute inset-0 bg-background/80 backdrop-blur-sm z-40" @click="cancelGood">
          </div>

          <p class="text-xs text-muted-foreground max-w-xs text-center mt-auto">
            <b>強大保護：</b> 將按鈕預設為鎖定狀態。強迫大腦切換到打字模式，輸入完整名稱後才能解鎖刪除按鈕，100% 杜絕「肌肉記憶」帶來的意外手滑災難。
          </p>
        </div>
      </template>
    </SplitView>
  </div>
</template>
