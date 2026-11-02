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
    console.log('\n=== Article:', u);
    const html = await get(u);
    // Find entry-content
    const entryMatch = html.match(/<div class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (entryMatch) {
      const content = entryMatch[1];
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let m;
      while ((m = imgRegex.exec(content)) !== null) {
        console.log('Image in content:', m[1]);
      }
    }
  }
}

run().catch(console.error);
