import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { allCases } from '@/config/cases'

// Global state for presentation mode
export const isPresenting = ref(false)

export function togglePresentationMode() {
  isPresenting.value = !isPresenting.value
  
  // Also request full screen if possible
  if (isPresenting.value) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  } else {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }
}

export function usePresentation() {
  const router = useRouter()
  const route = useRoute()

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

    // Toggle presentation mode with 'P' (shift+P to avoid accidental) or F11
    if ((e.key === 'p' && e.shiftKey) || e.key === 'F11') {
      // Browsers handle F11 fullscreen natively, but we can sync our state
      if (e.key === 'p' && e.shiftKey) {
        e.preventDefault()
        togglePresentationMode()
      }
    }

    // Navigation with Arrow/Page Keys - ONLY in presentation mode
    if (isPresenting.value) {
      const currentIndex = allCases.findIndex(c => c.path === route.path)
      if (currentIndex !== -1) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
          e.preventDefault()
          const next = allCases[currentIndex + 1] || allCases[0] // Loop back to start if at end
          router.push(next.path)
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
          e.preventDefault()
          const prev = allCases[currentIndex - 1] || allCases[allCases.length - 1] // Loop to end if at start
          router.push(prev.path)
        }
      }
    }
  }

  // Handle native fullscreen change to sync state
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      isPresenting.value = false
    }
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
    togglePresentationMode
  }
}
