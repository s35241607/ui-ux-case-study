import os
import re

updates = {
    '視覺間距與舒適度': '視覺間距與舒適度 (Spacing)',
    '資料對齊與數字格式': '資料對齊與數字格式 (Data Alignment)',
    '按鈕階層設計': '按鈕階層設計 (Button Hierarchy)',
    '內聯編輯 vs 彈窗編輯': '內聯編輯 vs 彈窗編輯 (Inline Edit)',
    '側邊抽屜預覽': '側邊抽屜預覽 (Contextual Drawer)',
    '複雜操作的收納與壓縮': '複雜操作的收納與壓縮 (Action Compression)', # Actually Button Overflow is better
    '事件回饋：Toast vs Modal': '事件回饋：Toast vs Modal (Success Feedback)',
    '表單元件選擇策略': '表單元件選擇策略 (Form Component Strategy)',
    '載入狀態反饋': '載入狀態反饋 (Loading Feedback)',
    '表單驗證與即時回饋': '表單驗證與即時回饋 (Form Validation)',
    '空狀態設計': '空狀態設計 (Empty State)',
    '破壞性操作的雙重確認': '破壞性操作的雙重確認 (Destructive Action)',
    '未儲存資料提示': '未儲存資料提示 (Unsaved Changes)',
    '批次操作設計': '批次操作設計 (Batch Actions)',
    '篩選器狀態顯示': '篩選器狀態顯示 (Filter State)',
    '導覽狀態保留': '導覽狀態保留 (Navigation State)',
    '麵包屑導覽設計': '麵包屑導覽設計 (Breadcrumb Navigation)'
}

# Override button overflow English translation
updates['複雜操作的收納與壓縮'] = '複雜操作的收納與壓縮 (Button Overflow)'

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    for old, new in updates.items():
        if f'>{old}<' in content or f'> {old} <' in content or f"'{old}'" in content or f'"{old}"' in content or f" {old}" in content:
            # Simple replacement
            n_content = content.replace(f"'{old}'", f"'{new}'")
            n_content = n_content.replace(f'"{old}"', f'"{new}"')
            n_content = n_content.replace(f'> {old} <', f'> {new} <')
            n_content = n_content.replace(f'>{old}<', f'>{new}<')
            
            # Use regex for just the title without the parens to prevent double replacement
            # For H1 tag `<h1 class="...">視覺間距與舒適度</h1>` vs `<h1 class="...">視覺間距與舒適度 (Spacing)</h1>`
            n_content = re.sub(f'>{old}(?! \()(?=<)', f'>{new}', n_content)
            
            if content != n_content:
                content = n_content
                changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')

replace_in_file('src/config/cases.ts')
replace_in_file('src/router/index.ts')

views_dir = 'src/views/cases'
for filename in os.listdir(views_dir):
    if filename.endswith('.vue'):
        replace_in_file(os.path.join(views_dir, filename))

print('Done!')
