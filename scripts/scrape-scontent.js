const https = require('https');
const fs = require('fs');

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
  const html = await get('https://www.instagram.com/pure.eleganceagency/');
  // Search scontent image links
  const regex = /https:\/\/[^"'\s\\]*scontent[^"'\s\\]+/gi;
  const matches = html.match(regex) || [];
  console.log('scontent matches:', matches.length);
  const cleaned = [...new Set(matches.map(m => m.replace(/\\u0026/g, '&')))];
  console.log('Cleaned scontent URLs:', cleaned);
}

run().catch(console.error);
