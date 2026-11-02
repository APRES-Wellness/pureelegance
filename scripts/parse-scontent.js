const fs = require('fs');

const html = fs.readFileSync('temp-ig-post.html', 'utf8');

// Match everything that looks like an image URL, including escaped ones
const matches = [];
const re = /(https:[^"'<>\s\\]+)/g;
let m;
while ((m = re.exec(html)) !== null) {
  let u = m[1].replace(/\\u0026/g, '&').replace(/&amp;/g, '&').replace(/\\/g, '');
  if (u.includes('scontent') || u.includes('fbcdn') || u.includes('.jpg') || u.includes('.png') || u.includes('.webp')) {
    matches.push(u);
  }
}

const unique = Array.from(new Set(matches));
console.log('Total image URLs found:', unique.length);

const scontent = unique.filter(u => u.includes('scontent'));
console.log('Scontent count:', scontent.length);
scontent.forEach((u, i) => {
  console.log(`[${i}] ${u.substring(0, 120)}...`);
});

fs.writeFileSync('all-scontent-urls.json', JSON.stringify(scontent, null, 2));
