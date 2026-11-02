const fs = require('fs');
const html = fs.readFileSync('article-2.html', 'utf8');

const start = html.indexOf('<div class="entry-content');
const end = html.indexOf('</div><!-- .entry-content -->', start);
if (start !== -1) {
  const content = html.substring(start, end !== -1 ? end : start + 5000);
  console.log(content.replace(/<style[^>]*>.*?<\/style>/gs, '').substring(0, 3000));
} else {
  console.log('entry-content not found, searching article tag');
  const art = html.indexOf('<article');
  console.log(html.substring(art, art + 3000));
}
