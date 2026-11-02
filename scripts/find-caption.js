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
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    if (s.includes('caption') || s.includes('hilairealissa8')) {
      console.log(`Script ${i} length: ${s.length}`);
      // Find strings matching hilaire or alissa or phone
      const lines = s.split('\n');
      for (const l of lines) {
        if (l.includes('hilaire') || l.includes('4732') || l.includes('Fourniture')) {
          console.log('Line:', l.slice(0, 200));
        }
      }
    }
  }
}

run().catch(console.error);
