const https = require('https');
const fs = require('fs');

const url = 'https://belidemag.net/culture/pure-elegance-agency-lart-de-sublimer-chaque-evenement-avec-grace-et-professionnalisme/';

https.get(url, {
  rejectUnauthorized: false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  }
}, res => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('article-2.html', html);
    console.log('Saved article-2.html, size:', html.length);
    
    // Extract figures and images
    const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
    let m;
    const images = [];
    while ((m = imgRegex.exec(html)) !== null) {
      if (m[1].includes('belidemag.net/wp-content/uploads/')) {
        images.push(m[1]);
      }
    }
    console.log('Found article images:', images.length);
    console.log(images.slice(0, 15));
  });
}).on('error', console.error);
