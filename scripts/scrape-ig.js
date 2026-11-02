const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching Instagram profile...');
  const html = await get('https://www.instagram.com/pure.eleganceagency/');
  console.log('HTML length:', html.length);
  // Match image URLs
  const imgRegex = /https:\/\/[^"'\s\\]+cdninstagram\.com\/[^"'\s\\]+/gi;
  const matches = html.match(imgRegex) || [];
  console.log('Found IG images:', matches.length);
  const unique = [...new Set(matches.map(m => m.replace(/\\u0026/g, '&')))];
  console.log('Unique:', unique.slice(0, 10));
}

run().catch(console.error);
