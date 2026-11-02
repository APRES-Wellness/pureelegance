const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const url = 'https://www.instagram.com/p/DGIdQTsxapm/';
  console.log('Fetching post:', url);
  const html = await get(url);
  console.log('Length:', html.length);
  // Match caption
  const desc = html.match(/<meta property="og:description" content="([^"]+)"/i);
  if (desc) console.log('Description:', desc[1]);
  const title = html.match(/<title>([^<]+)<\/title>/i);
  if (title) console.log('Title:', title[1]);
  // Match images
  const ogImg = html.match(/<meta property="og:image" content="([^"]+)"/i);
  if (ogImg) console.log('OG Image:', ogImg[1]);
  
  // Search all cdn / scontent
  const matches = html.match(/https:\/\/[^"'\s\\]+cdninstagram\.com\/[^"'\s\\]+/gi) || [];
  console.log('cdn matches:', matches.length);
  const scontent = html.match(/https:\/\/[^"'\s\\]*scontent[^"'\s\\]+/gi) || [];
  console.log('scontent matches:', scontent.length);
  if (scontent.length > 0) {
    console.log('Sample scontent:', scontent.slice(0, 5));
  }
}

run().catch(console.error);
