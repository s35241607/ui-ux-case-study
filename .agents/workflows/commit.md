---
description: 建立標準化中文 Git Commit 提交規範
---

# Git Commit 標準化流程

這個 Workflow 用於建立符合 Conventional Commits 規範且易於閱讀的中文提交記錄。

## 流程規範

### 1. 檢視變更 (Git Status)
首先檢視目前所有已變更的檔案，並確認哪些是需要提交的。
```bash
git status
```

### 2. 暫存變更 (Git Add)
將確認後的變更加入暫存區。
```bash
git add .
```

### 3. 編寫 Commit 訊息 (Git Commit)
訊息必須包含 **分類 (Type)** 與 **具體描述**，並遵循以下格式：

**標題格式：** `<type>: <具體內容描述>`

**常用類別 (Types)：**
- `feat`: 新增功能 (Feature)
- `fix`: 修復錯誤 (Bug Fix)
- `docs`: 文檔變更 (Documentation)
- `style`: 程式碼格式調整 (不影響邏輯)
- `refactor`: 重構程式碼 (不影響功能)
- `perf`: 效能優化 (Performance)
- `test`: 測試相關變更
- `chore`: 建置過程或工具設定變更

**範例 Commit 命令：**
```bash
git commit -m "feat: 新增側邊欄收合功能並優化搜尋動畫

- 透過 collapsible='icon' 實現小螢幕下的自動隱藏
- 優化搜尋面板開啟時的過渡動畫效果
- 修正搜尋結果文字溢出容器的問題"
```

## 自動化指令組合 (One-liner)
如果當前變更非常明確，可以使用此組合指令（請將括號內的描述替換為具體改動）：
```bash
git add . ; git commit -m "(分類): (標題內容)"
```

## 關於此 Workflow
此 Workflow 會存放在 `.agents/workflows/commit.md`，未來可以直接使用 `/commit` 或是請我遵循此規範進行提交。
