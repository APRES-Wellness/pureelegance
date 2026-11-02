const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching embed...');
  const html = await get('https://www.instagram.com/p/DGIdQTsxapm/embed/');
  console.log('Embed HTML length:', html.length);
  // Match images inside embed
  const imgMatches = html.match(/https:\/\/[^"'\s\\]+scontent[^"'\s\\]+/gi) || [];
  console.log('Found scontent in embed:', imgMatches.length);
  const cleaned = [...new Set(imgMatches.map(m => m.replace(/\\u0026/g, '&')))];
  console.log('Cleaned URLs:', cleaned);
  
  // Also match caption text
  const captionMatch = html.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/i);
  if (captionMatch) {
    console.log('\n--- Caption:\n', captionMatch[1].replace(/<[^>]+>/g, '').trim());
  }
}

run().catch(console.error);
