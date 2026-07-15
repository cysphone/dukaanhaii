const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'src', 'app', 'store', '[slug]');

const toDelete = [
  'page.tsx',
  '[...path]',
  'about',
  'contact',
  'product',
  'shop'
];

toDelete.forEach(item => {
  const fullPath = path.join(basePath, item);
  if (fs.existsSync(fullPath)) {
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted directory: ${item}`);
    } else {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${item}`);
    }
  }
});
