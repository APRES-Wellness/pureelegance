const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetch('https://www.instagram.com/p/DGIdQTsxapm/');
  console.log('HTML length:', html.length);
  const regex = /https:\/\/[^"'\s\\]*scontent[^"'\s\\]+/g;
  const urls = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    let u = m[0].replace(/\\u0026/g, '&');
    if (u.includes('.jpg') || u.includes('.webp') || u.includes('.png')) {
      urls.push(u);
    }
  }
  const unique = [...new Set(urls)];
  console.log('Found unique URLs:', unique.length);
  fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/scripts/ig-urls.json', JSON.stringify(unique, null, 2));
}

run().catch(console.error);
