// Travel Photos Processor - Strip EXIF GPS data, keep capture time
// This script requires exiftool to be installed: npm i exiftool-cli or system install
// Usage: node scripts/process-travel-photos.js
//
// Processes photos in src/com/travel/assets/
// - Finds .heic and .jpg files
// - Extracts GPS coordinates and CaptureDateTime via exiftool
// - Strips all EXIF data except CaptureDate
// - Renames files to: YYYY-MM-DD_HH-MM-SS.jpg/heic
// - Generates gallery-manifest.json for the VuePress component
// - Photos are NOT displayed on blog homepage (controlled via sidebar config)

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.resolve('src/com/travel/assets');
const MANIFEST_PATH = path.resolve('src/com/travel/gallery-manifest.json');

// Find all image files recursively
const supportedExtensions = ['.heic', '.jpg', '.jpeg'];
let imageFiles = [];

function walkDir(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (supportedExtensions.includes(path.extname(entry.name).toLowerCase())) {
        imageFiles.push(fullPath);
      }
    }
  } catch (e) {
    console.error(`Error reading ${dir}:`, e.message);
  }
}

walkDir(ASSETS_DIR);
console.log(`Found ${imageFiles.length} image files\n`);

const manifest = {
  photos: [],
  generated: new Date().toISOString(),
  sourceDir: ASSETS_DIR,
};

for (const filePath of imageFiles) {
  console.log(`Processing: ${path.basename(filePath)}`);

  try {
    // Use exiftool to extract metadata
    const output = execSync(
      `exiftool -json -DateTimeOriginal -CreateDate -GPSTag -gps:all "${filePath}"`,
      { encoding: 'utf8' }
    );
    const data = JSON.parse(output);
    const info = data[0] || {};

    const photo = {
      originalName: path.basename(filePath),
      originalPath: filePath,
      captureTime: null,
      hasGps: false,
    };

    // Extract capture time
    if (info.DateTimeOriginal) {
      photo.captureTime = info.DateTimeOriginal; // "YYYY:MM:DD HH:MM:SS"
    }

    // Check for GPS data
    if (info.GPSTag) {
      photo.hasGps = true;
      console.log(`  GPS: present (will be stripped)`);
    } else {
      console.log(`  GPS: none`);
    }

    // Print capture time
    console.log(`  Capture time: ${photo.captureTime || 'N/A'}`);

    // --- Strip EXIF and rename ---
    if (photo.captureTime) {
      // Parse "YYYY:MM:DD HH:MM:SS" -> "YYYY-MM-DD_HH-MM-SS"
      const match = photo.captureTime.match(/^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/);
      if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const hour = match[4];
        const minute = match[5];
        const second = match[6];
        const newStem = `${year}-${month}-${day}_${hour}-${minute}-${second}`;
        const ext = path.extname(filePath).toLowerCase(); // .heic or .jpg
        const newFileName = `${newStem}${ext}`;
        const newFilePath = path.join(path.dirname(filePath), newFileName);

        if (path.basename(filePath) !== newFileName) {
          // Use exiftool to copy only CaptureDate to new file, stripping everything else
          const tempNewPath = newFilePath + '.tmp';
          const cmd = `exiftool -CaptureDate="${photo.captureTime}" "${filePath}" -o "${tempNewPath}"`;
          execSync(cmd, { encoding: 'utf8', stdio: 'ignore' });

          if (fs.existsSync(tempNewPath)) {
            fs.renameSync(tempNewPath, newFilePath);
            photo.newPath = newFilePath;
            photo.newFileName = newFileName;
            console.log(`  → Renamed to: ${newFileName}`);
          } else {
            fs.renameSync(filePath, newFilePath);
            photo.newPath = newFilePath;
            photo.newFileName = newFileName;
            console.log(`  → Renamed (no strip): ${newFileName}`);
          }
        } else {
          photo.newPath = filePath;
          photo.newFileName = path.basename(filePath);
        }
      } else {
        photo.newPath = filePath;
        photo.newFileName = path.basename(filePath);
      }
    } else {
      photo.newPath = filePath;
      photo.newFileName = path.basename(filePath);
    }

    manifest.photos.push({
      ...photo,
      displayName: path.basename(photo.newFileName, path.extname(photo.newFileName)),
      displayPath: `/com/travel/assets/${photo.newFileName}`,
    });

  } catch (err) {
    console.error(`  Error:`, err.message);
    manifest.photos.push({
      originalName: path.basename(filePath),
      originalPath: filePath,
      error: err.message,
      displayName: path.basename(filePath),
      displayPath: `/com/travel/assets/${path.basename(filePath)}`,
    });
  }
}

// Sort by capture time (oldest first)
manifest.photos.sort((a, b) => {
  const timeA = a.captureTime || '';
  const timeB = b.captureTime || '';
  return timeA.localeCompare(timeB);
});

// Save manifest
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`\nManifest saved: ${MANIFEST_PATH}`);
console.log(`Total photos: ${manifest.photos.length}`);

// --- Generate VuePress component ---
generateGalleryComponent(manifest);
}

function generateGalleryComponent(manifest) {
  const componentPath = path.resolve('src/.vuepress/components/TravelGallery.vue');
  fs.mkdirSync(path.dirname(componentPath), { recursive: true });

  let items = '';
  for (const photo of manifest.photos) {
    if (photo.error) continue;
    const caption = photo.captureTime || '无日期';
    items += `  <div class="masonry-item">
    <img class="masonry-img" src="${photo.displayPath}" alt="${photo.displayName}">
    <div class="masonry-caption">${caption}</div>
  </div>`;
  }

  const component = `
/*
 * Travel Photo Gallery - Masonry (瀑布流) Style
 * Based on pure CSS masonry from:
 * @src/com/other/Markdown原生图片.md - CSS网格/瀑布流模拟
 * 
 * Features:
 * - Pure CSS column-count masonry layout
 * - Shows capture time as photo caption
 * - Photos EXIF GPS data stripped, capture time preserved
 * - NOT displayed on blog homepage (sidebar config)
 */

<style>
.masonry-grid {
  column-count: 3;
  column-gap: 20px;
  margin: 30px 0;
  font-size: 0;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  max-width: 100%;
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
  max-height: 250px;
  object-fit: cover;
  display: block;
}
.masonry-caption {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #eee;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (max-width: 768px) {
  .masonry-grid { column-count: 2; }
}
@media (max-width: 480px) {
  .masonry-grid { column-count: 1; }
}
</style>

<div class="masonry-grid">
${items}
</div>
`;

  fs.writeFileSync(componentPath, component.trim());
  console.log(`Gallery component: ${componentPath}`);
}

console.log('=== Processing Complete ===');