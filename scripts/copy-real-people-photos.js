const fs = require('fs');
const path = require('path');

const realDir = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/real';
const actDir = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/activites';

const mapping = {
  'realisation-1.jpg': 'pure-elegance-174.jpg', // 1024 KB - Hôtesses d'accueil VIP en tenue
  'realisation-2.jpg': 'pure-elegance-169.jpg', // 981 KB - Hôtesse & Modèle de prestige
  'realisation-3.jpg': 'pure-elegance-184.jpg', // 1179 KB - Protocole & Réception en soirée
  'realisation-4.jpg': 'pure-elegance-179.jpg', // 1001 KB - Équipe sur le terrain
  'realisation-5.jpg': 'pure-elegance-164.jpg', // 803 KB - Mannequinat & Shooting éditorial
  'realisation-6.jpg': 'pure-elegance-129.jpg'  // 839 KB - Équipe officielle en événement
};

for (const [dest, src] of Object.entries(mapping)) {
  const sPath = path.join(realDir, src);
  const dPath = path.join(actDir, dest);
  fs.copyFileSync(sPath, dPath);
  console.log(`Copied: ${dest} <- ${src} (${(fs.statSync(dPath).size/1024).toFixed(0)} KB)`);
}

console.log('Real people event photos copied successfully!');
