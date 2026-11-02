const fs = require('fs');
const path = require('path');

const realDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\real';
const actDir = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency\\assets\\img\\activites';

if (!fs.existsSync(actDir)) {
  fs.mkdirSync(actDir, { recursive: true });
}

// Map each activity to its official camera HD original (>1MB to 3.6MB)
const hdMapping = {
  // 1. Burger Fest - 4 Hostesses in custom t-shirts (3.56 MB)
  'burger-fest.jpg': 'pure-elegance-61.jpg',
  
  // 2. Gala Séduction / Prestige - Evening gowns photoshoot (1.36 MB)
  'gala-seduction.jpg': 'pure-elegance-6.jpg',
  
  // 3. Reception & Protocole d'Accueil VIP (2.14 MB)
  'equipe-reception.jpg': 'pure-elegance-10.jpg',
  
  // 4. Bar d'Élite & Mixologie VIP (2.34 MB)
  'serveur.jpg': 'pure-elegance-14.jpg',
  
  // 5. Haute Couture & Mannequinat (1.69 MB)
  'mannequin.jpg': 'pure-elegance-20.jpg',
  
  // 6. Akuna Club / Red Carpet VIP (1.81 MB)
  'akuna-vip.jpg': 'pure-elegance-22.jpg',
  
  // 7. Brunch SOL - Accueil & Coordination (2.76 MB)
  'brunch-sol.jpg': 'pure-elegance-89.jpg',
  
  // 8. Green Vibe Festival - Hôtesses Souriantes (2.50 MB)
  'green-vibe-team.jpg': 'pure-elegance-79.jpg',
  
  // 9. Casami & Événements Privés (2.22 MB)
  'casami-event.jpg': 'pure-elegance-69.jpg',
  
  // 10. Remise de Trophées & Protocole Officiel (2.25 MB)
  'ceremonie-prestige.jpg': 'pure-elegance-81.jpg',
  
  // 11. Équipe Officielle Pure Elegance (0.94 MB)
  'equipe-officielle.jpg': 'pure-elegance-1.jpg',
  
  // 12. Hôtesse d'Accueil VIP (1.52 MB)
  'hotesse.jpg': 'pure-elegance-16.jpg',
  
  // 13. Service Traiteur & Cocktail (1.63 MB)
  'traiteur.jpg': 'pure-elegance-59.jpg',
  
  // 14. Soirée Gala VIP (1.30 MB)
  'soiree-gala.jpg': 'pure-elegance-8.jpg'
};

console.log('Copying Ultra HD images from real to activites:');
for (const [dest, src] of Object.entries(hdMapping)) {
  const srcPath = path.join(realDir, src);
  const destPath = path.join(actDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const sz = (fs.statSync(destPath).size / 1024 / 1024).toFixed(2);
    console.log(`[OK] ${dest} <- ${src} (${sz} MB)`);
  } else {
    console.error(`[MISSING] ${src}`);
  }
}

console.log('Finished copying all Ultra HD photos!');
