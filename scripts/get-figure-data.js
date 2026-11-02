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
    console.log('\n--- Article:', u);
    const html = await get(u);
    const figRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi;
    let m;
    while ((m = figRegex.exec(html)) !== null) {
      const figHtml = m[1];
      const dataOrig = figHtml.match(/data-orig-file="([^"]+)"/i);
      const dataLarge = figHtml.match(/data-large-file="([^"]+)"/i);
      const cap = figHtml.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);
      const url = (dataOrig && dataOrig[1]) || (dataLarge && dataLarge[1]);
      if (url) {
        console.log({
          url,
          caption: cap ? cap[1].replace(/<[^>]+>/g, '').trim() : ''
        });
      }
    }
  }
}

run().catch(console.error);
