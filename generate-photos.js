const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'src', 'com', 'travel', 'assets');
const MARKDOWN_TEMPLATE = (
`---
title: "{title}"
index: false
isOriginal: true
category:
  - "{category}"
tag:
  - 生活日志
order: {order}
---

<style>
.masonry-grid {
  column-count: 3;
  column-gap: 20px;
  margin: 30px 0;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}
.masonry-item:hover {
  transform: translateY(-5px);
}
.masonry-img {
  width: 100%;
  height: auto;
  display: block;
}
.masonry-caption {
  padding: 8px 12px;
  background: white;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}
@media (max-width: 768px) {
  .masonry-grid { column-count: 2; }
}
@media (max-width: 480px) {
  .masonry-grid { column-count: 1; }
}
</style>

# {title}

拍摄时间：{date}

<div class="masonry-grid">

{items}

</div>`
);

function formatTimestamp(filename) {
  // Filename format: YYYY-MM-DD HHMMSS.ext
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2})(\d{2})(\d{2})/);
  if (!match) return null;
  const [, date, hour, min, sec] = match;
  return { date, time: `${hour}:${min}:${sec}` };
}

function generateMarkdown(folderName, files) {
  const sortedFiles = files.sort((a, b) => {
    const ta = formatTimestamp(a);
    const tb = formatTimestamp(b);
    if (!ta || !tb) return 0;
    return ta.time.localeCompare(tb.time);
  });

  const title = folderName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const date = sortedFiles[0] ? formatTimestamp(sortedFiles[0]).date : '未知日期';
  
  const pngFiles = sortedFiles.map(f => {
    const base = path.basename(f, path.extname(f));
    return `${base}.png`;
  });

  const items = pngFiles.map((f, i) => {
    const { date, time } = formatTimestamp(f.replace('.png', ''));
    const alt = `照片 ${i + 1}`;
    const imgPath = path.join('assets', folderName, f);
    return `  <div class="masonry-item">
    <img class="masonry-img" src="${imgPath}" alt="${alt}">
    <div class="masonry-caption">${time}</div>
  </div>`;
  }).join('\n');

  return MARKDOWN_TEMPLATE
    .replace('{title}', title)
    .replace('{category}', folderName)
    .replace('{order}', sortedFiles.length)
    .replace('{date}', date)
    .replace('{items}', items);
}

function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('Assets directory not found:', ASSETS_DIR);
    process.exit(1);
  }

  const folders = fs.readdirSync(ASSETS_DIR)
    .filter(f => {
      const fullPath = path.join(ASSETS_DIR, f);
      return fs.statSync(fullPath).isDirectory();
    });

  for (const folder of folders) {
    const folderPath = path.join(ASSETS_DIR, folder);
    const files = fs.readdirSync(folderPath)
      .filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.heic' || ext === '.png';
      });

    if (files.length > 0) {
      const markdown = generateMarkdown(folder, files);
      const mdPath = path.join(folderPath, `${folder}.md`);
      fs.writeFileSync(mdPath, markdown);
      console.log(`Generated: ${mdPath}`);
    }
  }

  console.log('Done! All markdown files generated.');
}

main();