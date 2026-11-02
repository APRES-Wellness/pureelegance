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
  const urls = [
    'https://belidemag.net/culture/pure-elegance-agency-deux-ans-de-defis-releves-et-un-avenir-qui-se-dessine/',
    'https://belidemag.net/culture/pure-elegance-agency-lart-de-sublimer-chaque-evenement-avec-grace-et-professionnalisme/'
  ];

  for (const u of urls) {
    const html = await get(u);
    const ogImg = html.match(/<meta property="og:image" content="([^"]+)"/i);
    console.log(u);
    console.log('OG Image:', ogImg ? ogImg[1] : 'none');
    // Also check galleries or article figures
    const fig = html.match(/<figure[^>]*>([\s\S]*?)<\/figure>/gi);
    if (fig) console.log('Figures count:', fig.length);
  }
}

run().catch(console.error);
