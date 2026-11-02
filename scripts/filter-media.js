const fs = require('fs');
const urls = JSON.parse(fs.readFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/scripts/ig-post-images.json', 'utf8'));

const media = urls.filter(u => !u.includes('static.cdninstagram.com'));
console.log('Non-static media count:', media.length);
media.forEach(u => console.log(u));
