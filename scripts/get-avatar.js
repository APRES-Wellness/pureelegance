const https = require('https');
const fs = require('fs');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },
      rejectUnauthorized: false
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const urls = [
    'https://www.picuki.com/profile/pure.eleganceagency',
    'https://imginn.com/pure.eleganceagency/'
  ];

  for (const u of urls) {
    try {
      console.log('Testing', u);
      const html = await get(u);
      const match = html.match(/<img[^>]+(?:class=["'][^"']*profile[^"']*["']|alt=["'][^"']*pure\.eleganceagency[^"']*["'])[^>]+src=["']([^"']+)["']/i) ||
                    html.match(/<img[^>]+src=["']([^"']+)["'][^>]+alt=["'][^"']*pure\.eleganceagency[^"']*["']/i) ||
                    html.match(/(https:\/\/[^"'\s]+\.cdninstagram\.com\/[^"'\s]+)/);
      if (match) {
        console.log('Found avatar URL from', u, ':', match[1]);
        return;
      }
    } catch (e) {
      console.log('Error with', u, e.message);
    }
  }
}

main();
