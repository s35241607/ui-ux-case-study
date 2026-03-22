import os
import re

files_to_update = [
    'SpacingView.vue',
    'ButtonHierarchyView.vue',
    'SuccessFeedbackView.vue',
    'EmptyStateView.vue',
    'LoadingFeedbackView.vue'
]

views_dir = 'src/views/cases'

# 1. replace `<div class="mb-4 px-4 lg:px-6 pt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">`
# with `<div class="mb-4 px-4 lg:px-6 pt-6">`
# 2. replace `      <div>` right after with nothing (remove it, and dedent everything until `      </div>`)
# actually, skipping the `<div>` removal is also fine, it just adds an extra nested div. Let's just remove the `<div>` and dedent or just leave it.

for file in files_to_update:
    filepath = os.path.join(views_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Change the main div layout
    content = content.replace(
        '<div class="mb-4 px-4 lg:px-6 pt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">',
        '<div class="mb-4 px-4 lg:px-6 pt-6">'
    )

    # Step 2: Remove the `<div>` right inside it and its matching `</div>`
    content = content.replace(
        '      <div>\n        <div class="flex items-center gap-2 mb-2">',
        '      <div class="flex items-center gap-2 mb-2">'
    )
    
    # regex replace `</p>\n      </div>\n\n      <!-- Tabs Navigation -->`
    # with `</p>\n    </div>\n\n    <div class="px-4 lg:px-6 mb-3">\n      <!-- Tabs Navigation -->`
    content = re.sub(
        r'</p>\s*</div>\s*<!-- Tabs Navigation -->',
        '</p>\n    </div>\n\n    <div class="px-4 lg:px-6 mb-3">\n      <!-- Tabs Navigation -->',
        content
    )

    # Step 3: Change `</Tabs>\n    </div>\n\n    <!-- Ensure right side`
    # to `</Tabs>\n    </div>\n\n    <!-- Ensure right side`
    # wait, it's just `</Tabs>\n    </div>` but the div is already closed previously.
    # The structure was:
    # </p>
    # </div>
    # <Tabs ...>...</Tabs>
    # </div>
    
    # We replaced `</p>\n</div>` with `</p>\n    </div>\n\n    <div class="px-4 lg:px-6 mb-3">`
    # The ending `</div>` for the header flex box got consumed and used to close the new top div.
    # So the `<div class="px-4 lg:px-6 mb-3">` will be closed by the original `</div>` that was at the end of Tabs.
    # This works perfectly.
    
    # Step 4: Change `<TabsList ...>` classes to avoid `sm:w-auto` expanding strangely when placed normally.
    # We want it to be like form-component-strategy: <TabsList class="grid w-full sm:w-auto sm:inline-grid"> (approx)
    # The current one might be `class="grid w-full grid-cols-2 sm:w-auto sm:flex w-fit"`
    content = re.sub(
        r'<TabsList class="grid w-full[^>]*">',
        lambda m: m.group(0).replace('sm:flex', 'sm:inline-grid').replace('w-fit', 'sm:w-auto'),
        content
    )

    # Make Tabs full width or whatever
    content = content.replace(
        '<Tabs v-model="activeTab" class="w-full sm:w-auto">',
        '<Tabs v-model="activeTab" class="w-full">'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated {file}")
