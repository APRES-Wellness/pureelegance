const fs = require('fs');
const path = require('path');

const realDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\real';
const actDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\activites';

const extraHd = {
  'tabacs-commeilfaut.jpg': 'pure-elegance-67.jpg', // 1.67 MB
  'belide-magazine-team.jpg': 'pure-elegance-77.jpg', // 1.77 MB
  'heineken-vip.jpg': 'pure-elegance-73.jpg', // 1.63 MB
  'soccer-match-vip.jpg': 'pure-elegance-83.jpg', // 1.98 MB
  'blue-polos-event.jpg': 'pure-elegance-75.jpg', // 1.63 MB
  'burger-fest-smile.jpg': 'pure-elegance-63.jpg' // 1.62 MB
};

for (const [dest, src] of Object.entries(extraHd)) {
  const sPath = path.join(realDir, src);
  const dPath = path.join(actDir, dest);
  fs.copyFileSync(sPath, dPath);
  const sz = (fs.statSync(dPath).size / 1024 / 1024).toFixed(2);
  console.log(`Extra HD replaced: ${dest} <- ${src} (${sz} MB)`);
}

console.log('All remaining images are now in Ultra HD!');
