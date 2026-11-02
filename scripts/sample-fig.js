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
  const u = 'https://belidemag.net/culture/pure-elegance-agency-deux-ans-de-defis-releves-et-un-avenir-qui-se-dessine/';
  const html = await get(u);
  const fig = html.match(/<figure[^>]*>[\s\S]*?<\/figure>/i);
  if (fig) {
    console.log('Sample figure from article 1:\n', fig[0]);
  }
}

run().catch(console.error);
