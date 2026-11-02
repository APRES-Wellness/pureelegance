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
  const data = await get('https://belidemag.net/?s=Pure+Elegance');
  const regex = /href="([^"]+)"[^>]*rel="bookmark">([^<]+)<\/a>/gi;
  let m;
  const articles = [];
  while ((m = regex.exec(data)) !== null) {
    articles.push({ title: m[2].trim(), url: m[1] });
  }
  console.log('Found articles:', articles);
}

run().catch(console.error);
