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
    const figRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi;
    let m;
    while ((m = figRegex.exec(html)) !== null) {
      const figHtml = m[1];
      const src = figHtml.match(/src="([^"]+)"/i);
      const cap = figHtml.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const alt = figHtml.match(/alt="([^"]*)"/i);
      if (src && !src[1].includes('banner') && !src[1].includes('Icon-BM')) {
        console.log({
          src: src[1],
          caption: cap ? cap[1].replace(/<[^>]+>/g, '').trim() : '',
          alt: alt ? alt[1] : ''
        });
      }
    }
  }
}

run().catch(console.error);
