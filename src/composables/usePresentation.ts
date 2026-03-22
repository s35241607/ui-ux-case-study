import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { allCases } from '@/config/cases'

// Global state for presentation mode
export const isPresenting = ref(false)

export function togglePresentationMode() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }
}

export function usePresentation() {
  const router = useRouter()
  const route = useRoute()

  const currentIndex = computed(() => {
    return allCases.findIndex(c => c.path === route.path)
  })

  const currentPage = computed(() => {
    return currentIndex.value === -1 ? 0 : currentIndex.value + 1
  })

  const totalPages = computed(() => allCases.length)

  const handleKeydown = (e: KeyboardEvent) => {
    // Only handle if we aren't typing in an input/textarea
    const activeEl = document.activeElement as HTMLElement | null
    if (
      activeEl?.tagName === 'INPUT' || 
      activeEl?.tagName === 'TEXTAREA' ||
      activeEl?.isContentEditable
    ) {
      return
    }

    // Override F11 for presentation mode (which includes fullscreen + our UI)
    if (e.key === 'F11') {
      e.preventDefault()
      togglePresentationMode()
      return
    }

    // Navigation with Arrow/Page Keys - ONLY in presentation mode
    if (isPresenting.value) {
      if (e.key === 'Escape') {
        e.preventDefault()
        togglePresentationMode()
        return
      }

      const currentIndexIdx = allCases.findIndex(c => c.path === route.path)
      if (currentIndexIdx !== -1) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
          e.preventDefault()
          const next = allCases[currentIndexIdx + 1] || allCases[0] 
          router.push(next.path)
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
          e.preventDefault()
          const prev = allCases[currentIndexIdx - 1] || allCases[allCases.length - 1]
          router.push(prev.path)
        }
      }
    }
  }

  // Handle native fullscreen change to sync state
  const handleFullscreenChange = () => {
    isPresenting.value = !!document.fullscreenElement
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  })

  return {
    isPresenting,
    togglePresentationMode,
    currentPage,
    totalPages
  }
}
