const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/real';
const files = fs.readdirSync(dir);

console.log('Sample files in assets/img/real:');
files.slice(0, 15).forEach(f => {
  const stat = fs.statSync(path.join(dir, f));
  console.log(f, 'size:', (stat.size / 1024).toFixed(1) + 'KB', 'created:', stat.birthtime);
});
