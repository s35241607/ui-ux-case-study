<script setup lang="ts">
import { ref } from 'vue'
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info, ArrowRight, RotateCcw, AlertTriangle, Zap } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const activeTab = ref('delete') // 'delete' | 'upgrade' | 'settings'
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-4 px-4 lg:px-6 pt-6">
      <div class="flex items-center gap-2 mb-2">
        <h1 class="text-2xl font-bold tracking-tight">按鈕階層設計 (Button Hierarchy)</h1>
        <Badge variant="secondary" class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30">視覺設計</Badge>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        透過明確的視覺層級 (Primary, Secondary, Ghost, Destructive)，引導使用者優先關注主要操作並區分危險行為。
      </p>
    </div>

    <div class="px-4 lg:px-6 mb-3">
      <!-- Tabs Navigation -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full grid-cols-3 sm:w-auto sm:inline-grid">
          <TabsTrigger value="delete">刪除確認</TabsTrigger>
          <TabsTrigger value="upgrade">方案升級</TabsTrigger>
          <TabsTrigger value="settings">設定儲存</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Ensure right side reveal state resets on tab change -->
    <SplitView :key="activeTab">
      <!-- ===== BAD Side ===== -->
      <template #left>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Delete confirmation -->
          <div v-if="activeTab === 'delete'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">缺乏警告與錯誤順序 (Lack of Warning & Wrong Order)</p>
                <p class="opacity-80">危險操作無警示色，且取消與確認按鈕視覺強度相同、順序風倒，容易造成誤刪。</p>
              </div>
            </div>

            <Card class="max-w-md">
              <CardHeader>
                <CardTitle>確定要刪除專案嗎？</CardTitle>
                <CardDescription>此操作將無法復原，專案內所有資料都會被清除。</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="flex items-center gap-2 p-3 bg-muted rounded-md text-sm">
                  <Info class="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>將會永久刪除「Project Alpha」。</span>
                </div>
              </CardContent>
              <CardFooter class="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <!-- Bad: 兩個實心按鈕，且位置顛倒 -->
                <Button
                  class="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-white"
                  @click="() => toast.info('已取消')">取消</Button>
                <Button
                  class="w-full sm:w-auto bg-neutral-500 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white"
                  @click="() => toast.info('已刪除')">確認刪除</Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 2: Upgrade CTA -->
          <div v-if="activeTab === 'upgrade'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">全部平鋪 (No Visual Hierarchy)</p>
                <p class="opacity-80">三個按鈕視覺重量完全相同，用戶在採視時無法分轮哪個是系統推薦的主要操作。</p>
              </div>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle>升級方案</CardTitle>
                <CardDescription>獲取更多進階功能與儲存空間。</CardDescription>
              </CardHeader>
              <CardFooter class="flex flex-col gap-2">
                <Button class="w-full flex items-center">
                  <span>升級至 Pro 方案</span>
                  <ArrowRight class="h-4 w-4" />
                </Button>
                <Button class="w-full flex items-center">
                  <span>升級至 Team 方案</span>
                  <ArrowRight class="h-4 w-4" />
                </Button>
                <Button
                  class="w-full bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white">
                  查看詳情
                </Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 3: Settings Save Actions -->
          <div v-if="activeTab === 'settings'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400">
              <AlertTriangle class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">等重按鍵混淆意圖 (Same Weight, No Priority)</p>
                <p class="opacity-80">三個操作按鍵視覺強度相同，無法在採視時辨別主要操作，次要動作（取消、重置）也不夠收摂。</p>
              </div>
            </div>

            <Card class="max-w-sm">
              <CardHeader>
                <CardTitle>個人通知設定</CardTitle>
                <CardDescription>管理你偏好的通知接收方式。</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 text-sm">
                <div class="flex items-center justify-between py-1">
                  <span>電子郵件通知</span>
                  <span class="text-muted-foreground text-xs">已開啟</span>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span>簡訊通知</span>
                  <span class="text-muted-foreground text-xs">已關閉</span>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span>推播通知</span>
                  <span class="text-muted-foreground text-xs">已開啟</span>
                </div>
              </CardContent>
              <CardFooter class="flex gap-2 justify-end">
                <!-- Bad: 3 buttons all the same weight/style -->
                <Button
                  class="bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs px-3"
                  size="sm" @click="() => toast.info('已取消')">取消</Button>
                <Button
                  class="bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs px-3"
                  size="sm" @click="() => toast.info('已重置')">重置為預設</Button>
                <Button
                  class="bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white text-xs px-3"
                  size="sm" @click="() => toast.info('已儲存')">儲存設定</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </template>

      <!-- ===== GOOD Side ===== -->
      <template #right>
        <div class="flex-1 flex flex-col mt-4">
          <!-- Case 1: Delete confirmation -->
          <div v-if="activeTab === 'delete'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">明確意圖與防呆防護 (Clear Intent & Prevention)</p>
                <p class="opacity-80">使用 Destructive 紅色警示危險操作；次要操作 (取消) 使用 Outline，且位於左側。</p>
              </div>
            </div>

            <Card class="max-w-md transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle>確定要刪除專案嗎？</CardTitle>
                <CardDescription>此操作將無法復原，專案內所有資料都會被清除。</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  class="flex items-center gap-2 p-3 bg-destructive/10 text-destructive dark:text-red-400 rounded-md text-sm border border-destructive/20">
                  <Info class="h-4 w-4 shrink-0" />
                  <span>將會永久刪除「Project Alpha」。</span>
                </div>
              </CardContent>
              <CardFooter class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button variant="outline" class="w-full sm:w-auto" @click="() => toast.success('操作已取消')">取消</Button>
                <Button variant="destructive" class="w-full sm:w-auto"
                  @click="() => toast.error('專案已永久刪除')">確認刪除</Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 2: Upgrade CTA -->
          <div v-if="activeTab === 'upgrade'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">強調主要操作 (Primary Call to Action)</p>
                <p class="opacity-80">利用 Primary > Secondary > Ghost 的視覺重量層差，清楚引導用戶執行高轉換率的最佳路徑。</p>
              </div>
            </div>

            <Card class="max-w-sm transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle>升級方案</CardTitle>
                <CardDescription>獲取更多進階功能與儲存空間。</CardDescription>
              </CardHeader>
              <CardFooter class="flex flex-col gap-2">
                <Button class="w-full group/btn" size="lg" @click="() => toast.success('跳轉至 Pro 方案頁面')">
                  升級至 Pro 方案
                  <ArrowRight class="h-4 w-4" />
                </Button>
                <Button variant="secondary" class="w-full" @click="() => toast.info('跳轉至 Team 方案頁面')">
                  升級至 Team 方案
                  <ArrowRight class="h-4 w-4" />
                </Button>
                <Button variant="ghost" class="w-full text-muted-foreground" @click="() => toast.info('查看方案差異')">
                  查看詳情
                </Button>
              </CardFooter>
            </Card>
          </div>

          <!-- Case 3: Settings Save Actions -->
          <div v-if="activeTab === 'settings'" class="flex flex-col gap-4">
            <div
              class="flex items-start gap-2.5 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400">
              <Zap class="h-4 w-4 shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed space-y-0.5">
                <p class="font-semibold">層次分明的操作安排 (Layered Action Weight)</p>
                <p class="opacity-80">主要操作（儲存）使用 Primary，次要操作（重置）使用 Outline，最低優先度（取消）使用 Ghost，視覺重量與操作重要性完全對應。</p>
              </div>
            </div>

            <Card class="max-w-sm transition-all duration-200 hover:shadow-sm">
              <CardHeader>
                <CardTitle>個人通知設定</CardTitle>
                <CardDescription>管理你偏好的通知接收方式。</CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 text-sm">
                <div class="flex items-center justify-between py-1">
                  <span>電子郵件通知</span>
                  <span class="text-muted-foreground text-xs">已開啟</span>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span>簡訊通知</span>
                  <span class="text-muted-foreground text-xs">已關閉</span>
                </div>
                <div class="flex items-center justify-between py-1">
                  <span>推播通知</span>
                  <span class="text-muted-foreground text-xs">已開啟</span>
                </div>
              </CardContent>
              <CardFooter class="flex justify-between items-center">
                <!-- Good: Cancel (ghost/left), Reset (outline), Save (primary/right) -->
                <Button variant="ghost" size="sm" class="text-muted-foreground text-xs"
                  @click="() => toast.info('已取消')">取消</Button>
                <div class="flex gap-2">
                  <Button variant="outline" size="sm" class="text-xs" @click="() => toast.info('已重置為預設值')">
                    <RotateCcw class="h-3.5 w-3.5 mr-1.5" />重置為預設
                  </Button>
                  <Button size="sm" class="text-xs" @click="() => toast.success('設定已儲存')">儲存設定</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </template>
    </SplitView>
  </div>
</template>
