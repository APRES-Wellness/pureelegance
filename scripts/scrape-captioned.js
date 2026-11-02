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
  // Search for any img tags
  const imgs = html.match(/<img[^>]+src="([^"]+)"[^>]*>/gi) || [];
  console.log('Imgs in captioned embed:', imgs.length);
  imgs.forEach(i => console.log(i));
  // Search for JSON payload
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log('Scripts count:', scripts.length);
  for (const s of scripts) {
    if (s.includes('display_url') || s.includes('shortcode_media') || s.includes('caption')) {
      console.log('Found script with media info!');
    }
  }
}

run().catch(console.error);
