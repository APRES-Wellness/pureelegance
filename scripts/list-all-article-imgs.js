const fs = require('fs');
const html = fs.readFileSync('article-2.html', 'utf8');

const regex = /<img[^>]+src="([^">]+)"/gi;
let m;
const list = [];
while ((m = regex.exec(html)) !== null) {
  if (m[1].includes('2025/10/')) {
    list.push(m[1]);
  }
}
console.log('All 2025/10 images in Article 2:');
list.forEach(u => console.log(u));
