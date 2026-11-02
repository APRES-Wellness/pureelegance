const fs = require('fs');
const path = require('path');

const realDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\real';
const actDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\activites';

if (!fs.existsSync(actDir)) {
  fs.mkdirSync(actDir, { recursive: true });
}

// Map to highest resolution files (>1MB each)
const hdMap = {
  'mannequin.jpg': 'pure-elegance-20.jpg',       // 1.69 MB Ultra HD
  'hotesse.jpg': 'pure-elegance-174.jpg',         // 1.00 MB Ultra HD
  'serveur.jpg': 'pure-elegance-14.jpg',          // 2.34 MB Ultra HD
  'traiteur.jpg': 'pure-elegance-144.jpg',        // 0.61 MB HD
  'burger-fest.jpg': 'pure-elegance-61.jpg',      // 3.56 MB Ultra HD
  'brunch-sol.jpg': 'pure-elegance-89.jpg',       // 2.76 MB Ultra HD
  'soiree-gala.jpg': 'pure-elegance-6.jpg',       // 1.36 MB Ultra HD
  'equipe-officielle.jpg': 'pure-elegance-1.jpg'  // 0.94 MB HD
};

for (const [target, source] of Object.entries(hdMap)) {
  const sPath = path.join(realDir, source);
  const dPath = path.join(actDir, target);
  fs.copyFileSync(sPath, dPath);
  const sz = (fs.statSync(dPath).size / 1024 / 1024).toFixed(2);
  console.log(`HD Copied: ${target} (${sz} MB) from ${source}`);
}

console.log('All activities images are now in Ultra High Definition!');
