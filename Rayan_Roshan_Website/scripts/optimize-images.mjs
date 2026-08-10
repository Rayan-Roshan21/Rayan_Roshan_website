/**
 * Asset optimizer.
 *
 * Resizes source images down to the largest size they are ever
 * displayed at, then writes a WebP alongside a recompressed
 * fallback in the original format. Emits a manifest of intrinsic
 * dimensions so every <img> can carry width/height and reserve its
 * space before the bytes land.
 *
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, '..', 'src', 'assets');

// Widest each image is ever painted, times two for retina.
const MAX_WIDTH = {
  'profile-image.JPG': 720,   // hero avatar, 360px max
  'Picture2.jpg': 920,        // carousel, 460px max
  'Picture3.jpg': 920,
  'DSC_1262.jpeg': 920,
  default: 1200,              // project cards, ~590px max
};

const SKIP = new Set(['react.svg']);

const bytes = (n) => `${(n / 1048576).toFixed(2)} MB`;

const files = (await readdir(ASSETS)).filter((f) => {
  if (SKIP.has(f) || f.startsWith('.')) return false;
  return /\.(jpe?g|png)$/i.test(f);
});

const manifest = {};
let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(ASSETS, file);
  const originalSize = (await stat(src)).size;
  before += originalSize;

  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const isPng = /\.png$/i.test(ext);
  const maxWidth = MAX_WIDTH[file] ?? MAX_WIDTH.default;

  // Read once into a buffer — we write back over the source file,
  // so we cannot keep a lazy handle open on it.
  const input = await sharp(src).rotate().toBuffer();
  const meta = await sharp(input).metadata();
  const targetWidth = Math.min(meta.width, maxWidth);

  const resized = sharp(input).resize({ width: targetWidth, withoutEnlargement: true });

  const webpPath = path.join(ASSETS, `${base}.webp`);
  await resized.clone().webp({ quality: 80, effort: 6 }).toFile(webpPath);

  const fallback = isPng
    ? await resized.clone().png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer()
    : await resized.clone().jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(src, fallback);

  const webpSize = (await stat(webpPath)).size;
  after += webpSize;

  manifest[file] = { width: targetWidth, height: Math.round((meta.height / meta.width) * targetWidth) };

  console.log(
    `${file.padEnd(34)} ${bytes(originalSize).padStart(9)} → ${bytes(webpSize).padStart(9)}  (${targetWidth}px)`
  );
}

await writeFile(
  path.join(ASSETS, 'dimensions.json'),
  JSON.stringify(manifest, null, 2) + '\n'
);

console.log(`\nTotal (webp): ${bytes(before)} → ${bytes(after)}  — ${(100 - (after / before) * 100).toFixed(1)}% smaller`);
