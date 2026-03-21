<script setup lang="ts">
import { ref } from 'vue'
import { Check, X, Pencil, Edit2 } from 'lucide-vue-next'
import SplitView from '@/components/layout/SplitView.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'vue-sonner'

// 模擬資料
const mockData = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 3, name: 'Charlie Lin', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Pending' },
]

// --- Bad Design State ---
const badData = ref(JSON.parse(JSON.stringify(mockData)))
const badEditingId = ref<number | null>(null)
const badEditForm = ref({ role: '', status: '' })

const startBadEdit = (row: any) => {
  badEditingId.value = row.id
  badEditForm.value = { role: row.role, status: row.status }
}
const cancelBadEdit = () => {
  badEditingId.value = null
}
const saveBadEdit = (row: any) => {
  row.role = badEditForm.value.role
  row.status = badEditForm.value.status
  badEditingId.value = null
  toast.success(`更新 ${row.name} 資料成功`, { description: '需要 3 次點擊完成' })
}

// --- Good Design State ---
const goodData = ref(JSON.parse(JSON.stringify(mockData)))

// 快速內聯更新狀態或權限
const quickUpdateGood = (row: any, field: 'role' | 'status', value: string) => {
  row[field] = value
  toast.success(`已將 ${field === 'role' ? '權限' : '狀態'} 更新為 ${value}`, {
    description: '1 次點擊即時保存，無須等待或中斷',
  })
}

const statusOptions = ['Active', 'Inactive', 'Pending']
const roleOptions = ['Admin', 'Editor', 'Viewer']

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    case 'Inactive': return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
    default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">內聯編輯 vs 彈窗編輯 (Inline Edit)</h1>
        <Badge variant="secondary" class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30">UX 體驗</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        在企業內部系統中，使用者每天可能要修改數百筆資料的狀態。若是每次修改都需要點擊「編輯」進入特殊模式或彈出對話框，將會造成嚴重的效率瓶頸與認知中斷。
        提供直接點擊單元格進行<b>內聯編輯 (Inline Editing)</b>，是提昇 Power User 效率的關鍵體驗。
      </p>
    </div>

    <SplitView>
      <!-- Bad Design -->
      <template #left>
        <div class="space-y-4">
          <div class="border rounded-md bg-card overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground">姓名 / Email</th>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground">狀態</th>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="row in badData" :key="row.id">
                  <tr class="border-b last:border-0 hover:bg-muted/30">
                    <td class="p-4">
                      <div class="font-medium">{{ row.name }}</div>
                      <div class="text-xs text-muted-foreground">{{ row.email }}</div>
                    </td>
                    <td class="p-4">
                      <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
                            :class="getStatusColor(row.status)">
                        {{ row.status }}
                      </span>
                      <div class="text-xs text-muted-foreground mt-1">{{ row.role }}</div>
                    </td>
                    <td class="p-4">
                      <Button variant="outline" size="sm" @click="startBadEdit(row)" class="bad-btn-override" :disabled="badEditingId === row.id">
                        <Edit2 class="w-3.5 h-3.5 mr-1" />
                        編輯
                      </Button>
                    </td>
                  </tr>
                  <!-- 傳統冗長編輯模式 -->
                  <tr v-if="badEditingId === row.id" class="bg-muted/50 border-b">
                    <td colspan="3" class="p-4">
                      <div class="flex items-end gap-3 p-3 bg-background border rounded-md shadow-sm">
                        <div class="grid w-full gap-1.5">
                          <label class="text-xs font-medium">狀態修改</label>
                          <Select v-model="badEditForm.status">
                            <SelectTrigger class="h-9 w-full">
                              <SelectValue placeholder="選擇狀態" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem v-for="opt in statusOptions" :key="opt" :value="opt">{{ opt }}</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div class="grid w-full gap-1.5">
                          <label class="text-xs font-medium">權限修改</label>
                          <Select v-model="badEditForm.role">
                            <SelectTrigger class="h-9 w-full">
                              <SelectValue placeholder="選擇權限" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem v-for="opt in roleOptions" :key="opt" :value="opt">{{ opt }}</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div class="flex items-center justify-end gap-2 shrink-0 pt-4">
                          <Button variant="outline" size="sm" @click="cancelBadEdit">取消</Button>
                          <Button size="sm" @click="saveBadEdit(row)">儲存</Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-muted-foreground">
            <b>繁瑣流程：</b> 點擊編輯 → 切換視線到新出現的表單 → 選擇新狀態 → 點擊儲存。<br>每次微調都需要 3-4 次操作，且破壞原有的表格閱讀流。
          </p>
        </div>
      </template>

      <!-- Good Design -->
      <template #right>
        <div class="space-y-4">
          <div class="border rounded-md bg-card overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground w-1/3">姓名 / Email</th>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground w-1/3">權限 (點擊修改)</th>
                  <th class="h-10 px-4 text-left font-medium text-muted-foreground w-1/3">狀態 (點擊修改)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in goodData" :key="row.id" class="border-b last:border-0 hover:bg-primary/5 transition-colors group cursor-default">
                  <td class="p-4">
                    <div class="font-medium">{{ row.name }}</div>
                    <div class="text-xs text-muted-foreground">{{ row.email }}</div>
                  </td>
                  <td class="p-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger class="w-full h-full px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors text-left focus:outline-none focus:ring-1 focus:ring-ring focus:ring-inset rounded-sm group/cell">
                        <span class="font-medium text-sm">{{ row.role }}</span>
                        <Pencil class="w-3 h-3 text-muted-foreground/30 group-hover/cell:text-muted-foreground/70 transition-colors shrink-0" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem v-for="opt in roleOptions" :key="opt" @click="quickUpdateGood(row, 'role', opt)">
                          <span :class="{'font-bold': row.role === opt}">{{ opt }}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td class="p-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger class="w-full h-full px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors text-left focus:outline-none focus:ring-1 focus:ring-ring focus:ring-inset rounded-sm group/cell">
                        <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border" :class="getStatusColor(row.status)">
                          {{ row.status }}
                        </span>
                        <Pencil class="w-3 h-3 text-muted-foreground/30 group-hover/cell:text-muted-foreground/70 transition-colors shrink-0" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem v-for="opt in statusOptions" :key="opt" @click="quickUpdateGood(row, 'status', opt)">
                          <span :class="{'font-bold': row.status === opt}">{{ opt }}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-muted-foreground">
            <b>極致效率：</b> 表格文字或 Badge 本身就是下拉選單。將游標移過去會有微弱的鉛筆圖示暗示可編輯。<br>不破壞表格結構，一次點擊、選擇即可完成操作。
          </p>
        </div>
      </template>
    </SplitView>
  </div>
</template>
