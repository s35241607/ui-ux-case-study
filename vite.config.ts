import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1]
  const isUserOrOrgPages = repositoryName?.endsWith('.github.io')
  const base = env.VITE_BASE_PATH
    || (env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrgPages
      ? `/${repositoryName}/`
      : '/')

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
