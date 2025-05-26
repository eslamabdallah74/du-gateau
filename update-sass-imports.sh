#!/bin/bash

# Find all Vue files with @import statements for variables.scss
find src -name "*.vue" -exec grep -l "@import.*variables.scss" {} \; | while read file; do
  # Replace @import with @use and add 'as *'
  sed -i 's/@import.*variables.scss';/@use '"'"'@\/assets\/styles\/variables'"'"' as *;/g' "$file"
  echo "Updated $file"
done

# Update the special case for CartPage.vue which uses a relative path
sed -i 's/@import.*\.\.\/assets\/styles\/variables.scss';/@use '"'"'@\/assets\/styles\/variables'"'"' as *;/g' src/pages/CartPage.vue
echo "Updated src/pages/CartPage.vue"

# Update App.vue which imports main.scss
sed -i 's/@import.*\.\/assets\/styles\/main.scss';/@use '"'"'\.\/assets\/styles\/main'"'"' as *;/g' src/App.vue
echo "Updated src/App.vue"

echo "All Sass imports have been updated to use the modern @use syntax"
