const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\real';
const destDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\activites';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const map = {
  'mannequin.jpg': 'pure-elegance-165.jpg',     // IMG_8794: Mannequinat / Shooting
  'hotesse.jpg': 'pure-elegance-174.jpg',       // IMG_8694: Hôtesses d'accueil en tenue
  'serveur.jpg': 'pure-elegance-14.jpg',        // BM-TW-189: Service en soirée VIP
  'traiteur.jpg': 'pure-elegance-144.jpg',      // IMG_8427: Cocktail & Traiteur
  'burger-fest.jpg': 'pure-elegance-61.jpg',    // BM-TW-215: Burger Fest
  'brunch-sol.jpg': 'pure-elegance-174.jpg',    // Brunch SOL
  'soiree-gala.jpg': 'pure-elegance-6.jpg',     // BM-TW-185: Gala Black Tie
  'equipe-officielle.jpg': 'pure-elegance-1.jpg' // BM-TW-194: Équipe officielle Pure Elegance
};

for (const [target, source] of Object.entries(map)) {
  const sPath = path.join(srcDir, source);
  const dPath = path.join(destDir, target);
  if (fs.existsSync(sPath)) {
    fs.copyFileSync(sPath, dPath);
    console.log(`Copied ${source} -> ${target}`);
  } else {
    console.warn(`Source not found: ${source}`);
  }
}

console.log('Activities images ready!');
