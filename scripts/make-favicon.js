const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../assets/img/real/pure-elegance-108.jpg');
const dest = path.join(__dirname, '../assets/img/logo.jpg');
const faviconPng = path.join(__dirname, '../favicon.png');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  fs.copyFileSync(src, faviconPng);
  console.log('Copied pure-elegance-108.jpg to logo.jpg and favicon.png');
} else {
  console.log('src not found:', src);
}
