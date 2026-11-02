const fs = require('fs');
const html = fs.readFileSync('article-2.html', 'utf8');

const regex = /<img[^>]+src="([^">]+IMG_[^">]+)"/gi;
let m;
const list = [];
while ((m = regex.exec(html)) !== null) {
  if (m[1].includes('scaled') || !m[1].includes('-')) {
    list.push(m[1]);
  }
}
console.log('Main event images in Article 2:');
list.forEach(u => console.log(u));
