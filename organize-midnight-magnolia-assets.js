// Midnight Magnolia Asset Organizer
// Scans for product and design assets and moves them to a dedicated folder

const fs = require('fs');
const path = require('path');

// Source folders to scan for assets
const sourceFolders = [
  '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-website-main/public',
  '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-website-main/public/images',
  '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-theme/assets'
];

// Destination folder for Midnight Magnolia assets
const destFolder = '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-assets';

// Supported asset extensions
const assetExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.pdf', '.csv', '.xlsx', '.docx'];

// Ensure destination folder exists
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder);
}

function moveAssetsFromFolder(folder) {
  if (!fs.existsSync(folder)) return;
  const files = fs.readdirSync(folder);
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (assetExtensions.includes(ext)) {
      const srcPath = path.join(folder, file);
      const destPath = path.join(destFolder, file);
      // Avoid overwriting existing files
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Moved: ${file}`);
      } else {
        console.log(`Skipped (already exists): ${file}`);
      }
    }
  });
}

sourceFolders.forEach(moveAssetsFromFolder);

console.log('Midnight Magnolia asset organization complete.');
