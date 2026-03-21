# UI/UX Case Study

這是一個使用 Vue 3、TypeScript、Vite 與 Tailwind CSS 製作的 UI/UX 案例展示專案。

## 開發指令

```bash
pnpm install
pnpm dev
```

正式建置：

```bash
pnpm build
```

## GitHub Pages 自動部署

專案已包含 GitHub Actions workflow：[.github/workflows/deploy.yml](.github/workflows/deploy.yml)

部署流程：

1. 將 repository 推到 GitHub。
2. 預設在 push 到 `main` 或 `master` 分支後自動觸發部署。
3. Workflow 會自動：
	- 安裝 pnpm 與相依套件
	- 執行 Vite build
	- 產生 `404.html` 作為 Vue Router SPA fallback
	- 發佈 `dist` 到 GitHub Pages

## Base Path 設定

`vite.config.ts` 已支援 GitHub Pages：

- 如果是一般 repository pages，會在 GitHub Actions 中自動使用 `/${repo-name}/`。
- 如果是 `username.github.io` 這類 user/org pages，會自動使用 `/`。
- 如需手動覆寫，可設定環境變數 `VITE_BASE_PATH`。

例如：

```bash
VITE_BASE_PATH=/my-custom-path/ pnpm build
```

## 首次啟用注意事項

如果是第一次使用 GitHub Pages，請到 GitHub repository 的 `Settings > Pages` 確認部署來源為 GitHub Actions。
