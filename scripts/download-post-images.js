const https = require('https');
const fs = require('fs');

const url = 'https://www.instagram.com/p/DGIdQTsxapm/';

https.get(url, {
  rejectUnauthorized: false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none'
  }
}, res => {
  let d = '';
  res.on('data', chunk => d += chunk);
  res.on('end', () => {
    fs.writeFileSync('temp-ig-post.html', d);
    console.log('Saved temp-ig-post.html, size:', d.length);

    // Look for image urls
    const urls = [];
    const re = /https:\/\/[^"'\s\\]*(?:cdninstagram|fbcdn)[^"'\s\\]*/gi;
    let match;
    while ((match = re.exec(d)) !== null) {
      let u = match[0].replace(/\\u0026/g, '&').replace(/\\/g, '');
      urls.push(u);
    }
    const unique = Array.from(new Set(urls));
    console.log('Found unique URLs:', unique.length);
    fs.writeFileSync('extracted-ig-urls.json', JSON.stringify(unique, null, 2));

    // Also look for og:description or JSON state
    const jsonMatches = d.match(/\{"items":\[.*?\]\}/g);
    console.log('jsonMatches:', jsonMatches ? jsonMatches.length : 0);
  });
}).on('error', err => {
  console.error('Fetch error:', err);
});
