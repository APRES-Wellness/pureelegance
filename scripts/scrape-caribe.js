const https = require('https');
const fs = require('fs');

const url = 'https://caribe-motors-jade.vercel.app/';
console.log('Fetching', url);

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = data.match(/<title>(.*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1] : 'N/A');

    // CSS links
    const cssMatches = [...data.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('CSS links:', cssMatches);

    // Scripts
    const scriptMatches = [...data.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('Scripts:', scriptMatches);

    // Links
    const linkMatches = [...data.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi)]
      .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
      .filter(l => l.text);
    console.log('Navigation links:', linkMatches.slice(0, 15));

    // Save sample HTML to review structure
    fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/scripts/caribe-sample.html', data.substring(0, 8000), 'utf8');
    console.log('Saved caribe-sample.html');
  });
}).on('error', e => console.error(e));
