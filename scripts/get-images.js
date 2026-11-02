const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, rejectUnauthorized: false }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const searchUrl = 'https://belidemag.net/?s=Pure+Elegance+Agency';
  console.log('Searching:', searchUrl);
  const searchRes = await get(searchUrl);
  const regex = /href=["'](https:\/\/belidemag\.net\/[^"']+)["']/gi;
  let match;
  const articleUrls = new Set();
  while ((match = regex.exec(searchRes.data)) !== null) {
    if (match[1].includes('pure-elegance') && !match[1].includes('/category/') && !match[1].includes('/tag/')) {
      articleUrls.add(match[1]);
    }
  }

  console.log('Found article URLs:', Array.from(articleUrls));

  const allImages = new Set();
  for (const aUrl of articleUrls) {
    console.log('\n--- Fetching article:', aUrl);
    const aRes = await get(aUrl);
    // Find wp-content/uploads images
    const imgRegex = /(https:\/\/belidemag\.net\/wp-content\/uploads\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp))/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(aRes.data)) !== null) {
      const img = imgMatch[1];
      if (!img.includes('Logo') && !img.includes('banner') && !img.includes('emoji')) {
        allImages.add(img);
      }
    }
  }

  console.log('\nTotal real Pure Elegance images discovered:', allImages.size);
  const imgArray = Array.from(allImages);
  console.log(imgArray);

  const outDir = path.join(__dirname, '../assets/img/real');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let index = 1;
  for (const imgUrl of imgArray) {
    const ext = path.extname(imgUrl.split('?')[0]) || '.jpg';
    const filename = `pure-elegance-${index}${ext}`;
    const dest = path.join(outDir, filename);
    console.log(`Downloading ${imgUrl} -> ${filename}`);
    try {
      await download(imgUrl, dest);
      console.log(`Saved ${filename}`);
      index++;
    } catch (e) {
      console.error(`Failed to download ${imgUrl}:`, e.message);
    }
  }

  console.log('Finished downloading all real images!');
}

main().catch(console.error);
