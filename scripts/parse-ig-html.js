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
  // Search for any unescaped or escaped image URLs
  const unescaped = html.replace(/\\u0026/g, '&').replace(/\\\//g, '/');
  const urls = unescaped.match(/https:\/\/[^"'\s\\]+cdninstagram\.com\/[^"'\s\\]+/gi) || [];
  console.log('Found cdninstagram URLs:', urls.length);
  const scontent = unescaped.match(/https:\/\/[^"'\s\\]+scontent[^"'\s\\]+/gi) || [];
  console.log('Found scontent URLs:', scontent.length);
  
  const all = [...new Set([...urls, ...scontent])];
  console.log('Total unique URLs:', all.length);
  if (all.length > 0) {
    fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/scripts/ig-post-images.json', JSON.stringify(all, null, 2));
    console.log('First 5:', all.slice(0, 5));
  }
}

run().catch(console.error);
