<script setup lang="ts">
import SplitView from '@/components/layout/SplitView.vue'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Info, ArrowRight } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="mb-6 px-4 lg:px-6">
      <h1 class="text-2xl font-bold tracking-tight mb-2">按鈕階層設計 (Button Hierarchy)</h1>
      <p class="text-muted-foreground w-full max-w-3xl text-sm leading-relaxed">
        按鈕設計需要明確的視覺階層，讓用戶第一眼就知道「主要操作」在哪。缺乏階層的按鈕設計會讓用戶感到迷惑，增加認知負荷。
      </p>
    </div>

    <SplitView leftTitle="不良的設計：視覺重點混亂" rightTitle="優秀的設計：清晰的主要與次要動作">
      <!-- ===== BAD Side ===== -->
      <template #left>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
            <li>主要與次要按鈕視覺重量相同（皆實心填色）</li>
            <li>取消與確認按鈕位置違反慣例</li>
            <li>危險操作按鈕缺乏警示顏色</li>
          </ul>

          <Card>
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
            <CardFooter class="flex flex-col gap-2 sm:flex-row sm:justify-start">
              <!-- Bad: 兩個實心按鈕，且位置顛倒 -->
              <Button
                class="w-full sm:w-auto bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-white"
                @click="() => toast.info('已取消')"
              >取消操作</Button>
              <Button
                class="w-full sm:w-auto bg-neutral-500 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white"
                @click="() => toast.info('已刪除')"
              >確認刪除</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>升級方案</CardTitle>
              <CardDescription>獲取更多進階功能與儲存空間。</CardDescription>
            </CardHeader>
            <CardFooter class="flex flex-col gap-2">
              <!-- Bad: 三個按鈕視覺重量一樣 -->
              <Button class="w-full flex items-center justify-between">
                <span>升級至 Pro 方案</span>
                <ArrowRight class="h-4 w-4" />
              </Button>
              <Button class="w-full flex items-center justify-between">
                <span>升級至 Team 方案</span>
                <ArrowRight class="h-4 w-4" />
              </Button>
              <Button
                class="w-full bg-neutral-600 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white"
              >
                查看詳情
              </Button>
            </CardFooter>
          </Card>
        </div>
      </template>

      <!-- ===== GOOD Side ===== -->
      <template #right>
        <div class="flex-1 flex flex-col gap-6 max-w-sm mx-auto w-full mt-4">
          <ul class="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
            <li>只有一個主要操作按鈕（Primary Button）</li>
            <li>破壞性操作使用紅色警示（Destructive）</li>
            <li>次要操作使用 Ghost 或 Outline 樣式</li>
          </ul>

          <Card class="transition-all duration-200 hover:shadow-sm">
            <CardHeader>
              <CardTitle>確定要刪除專案嗎？</CardTitle>
              <CardDescription>此操作將無法復原，專案內所有資料都會被清除。</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-2 p-3 bg-destructive/10 text-destructive dark:text-red-400 rounded-md text-sm border border-destructive/20">
                <Info class="h-4 w-4 shrink-0" />
                <span>將會永久刪除「Project Alpha」。</span>
              </div>
            </CardContent>
            <CardFooter class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <!-- Good: outline 取消 + destructive 確認，正確順序 -->
              <Button variant="outline" class="w-full sm:w-auto" @click="() => toast.success('操作已取消')">取消</Button>
              <Button variant="destructive" class="w-full sm:w-auto" @click="() => toast.error('專案已永久刪除')">確認刪除</Button>
            </CardFooter>
          </Card>

          <Card class="transition-all duration-200 hover:shadow-sm">
            <CardHeader>
              <CardTitle>升級方案</CardTitle>
              <CardDescription>獲取更多進階功能與儲存空間。</CardDescription>
            </CardHeader>
            <CardFooter class="flex flex-col gap-2">
              <!-- Good: 明確主次 -->
              <Button class="w-full group/btn" size="lg" @click="() => toast.success('跳轉至 Pro 方案頁面')">
                升級至 Pro 方案
                <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="secondary" class="w-full" @click="() => toast.info('跳轉至 Team 方案頁面')">
                升級至 Team 方案
              </Button>
              <Button variant="ghost" class="w-full text-muted-foreground" @click="() => toast.info('查看方案差異')">
                查看詳情
              </Button>
            </CardFooter>
          </Card>
        </div>
      </template>
    </SplitView>
  </div>
</template>
