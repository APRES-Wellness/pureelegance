const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await get('https://www.instagram.com/p/DGIdQTsxapm/embed/captioned/');
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  [32, 57].forEach(idx => {
    const s = scripts[idx] || '';
    const urls = s.match(/https:\\\/\\\/[^"'\s\\]+/gi) || [];
    console.log(`Script ${idx} escaped URLs:`, urls.length);
    const unescaped = urls.map(u => u.replace(/\\\//g, '/').replace(/\\u0026/g, '&'));
    const imgUrls = unescaped.filter(u => u.includes('cdninstagram') || u.includes('fbcdn') || u.includes('.jpg') || u.includes('.webp'));
    console.log(`Script ${idx} image URLs:`, imgUrls.length);
    if (imgUrls.length > 0) {
      console.log('Sample image URLs:', imgUrls.slice(0, 8));
    }
  });
}

run().catch(console.error);
