const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const u1 = 'https://belidemag.net/culture/pure-elegance-agency-deux-ans-de-defis-releves-et-un-avenir-qui-se-dessine/';
  const u2 = 'https://belidemag.net/culture/pure-elegance-agency-lart-de-sublimer-chaque-evenement-avec-grace-et-professionnalisme/';
  
  const [h1, h2] = await Promise.all([get(u1), get(u2)]);
  
  const imgSet = new Set();
  
  // From article 1: <a href="https://belidemag.net/wp-content/uploads/2026/10/BM-TW-xxx.jpg"
  const m1 = h1.match(/href="(https:\/\/belidemag\.net\/wp-content\/uploads\/[0-9\/]+\/BM-TW-[^"]+\.jpg)"/gi) || [];
  m1.forEach(link => {
    const clean = link.match(/href="([^"]+)"/)[1];
    imgSet.add(clean);
  });
  
  // From article 2: <img ... src="https://belidemag.net/wp-content/uploads/2025/10/IMG_xxx.jpg"
  const m2 = h2.match(/https:\/\/belidemag\.net\/wp-content\/uploads\/2025\/10\/IMG_[0-9]+[^"'\s\)]+/gi) || [];
  m2.forEach(url => {
    // remove thumbnails like -225x300, get original
    const orig = url.replace(/-[0-9]+x[0-9]+/, '');
    imgSet.add(orig);
  });
  
  console.log('Total verified article images:', imgSet.size);
  console.log(Array.from(imgSet));
}

run().catch(console.error);
