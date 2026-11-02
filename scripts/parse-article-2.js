const fs = require('fs');
const html = fs.readFileSync('article-2.html', 'utf8');

// Find text and image contexts
const regex = /<p>(.*?)<\/p>|<figure[^>]*>(.*?)<\/figure>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  const text = (m[1] || m[2]).replace(/<[^>]+>/g, ' ').trim();
  if (text.length > 20 && !text.includes('cookie') && !text.includes('menu')) {
    console.log('---');
    console.log(text.substring(0, 300));
  }
}
