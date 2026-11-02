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
  for (const s of scripts) {
    if (s.includes('shortcode_media') || s.includes('display_url')) {
      // Find URLs in script
      const urls = s.match(/https:\/\/[^"'\s\\]+scontent[^"'\s\\]+/gi) || [];
      console.log('Found scontent in script:', urls.length);
      const unique = [...new Set(urls.map(u => u.replace(/\\u0026/g, '&')))];
      console.log('Sample URLs:', unique.slice(0, 10));
    }
  }
}

run().catch(console.error);
