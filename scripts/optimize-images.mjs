/**
 * optimize-images.mjs
 * ─────────────────────────────────────────────────────────────────────────
 * Converts and compresses the 4 images flagged by PageSpeed Insights.
 * Run once: node scripts/optimize-images.mjs
 *
 * Required: npm install sharp --save-dev
 *
 * Savings targets:
 *   logo.png          → logo.webp       (7004x7842 → 720x806, quality 85)
 *   logo-ar.png       → logo-ar.webp    (same)
 *   infrastructure_premium.png → *.webp (1024x700, quality 82)
 *   hero-bg.webp      → re-compress     (1280x1280, quality 80)
 *   whatsapp.png      → whatsapp.webp   (128x128,  quality 90)
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const tasks = [
  // logo — displayed at max 360px wide, 2x DPR = 720px
  {
    input:   join(PUBLIC, 'logo.png'),
    output:  join(PUBLIC, 'logo.webp'),
    width:   720,
    height:  806,
    quality: 85,
    fit:     sharp.fit.inside,
  },
  // arabic logo — same dimensions
  {
    input:   join(PUBLIC, 'logo-ar.png'),
    output:  join(PUBLIC, 'logo-ar.webp'),
    width:   720,
    height:  806,
    quality: 85,
    fit:     sharp.fit.inside,
  },
  // infrastructure — displayed at ~630px wide, 2x DPR = 1260px
  // original is 1024x700 PNG — convert to WebP
  {
    input:   join(PUBLIC, 'infrastructure_premium.png'),
    output:  join(PUBLIC, 'infrastructure_premium.webp'),
    width:   1260,
    height:  null, // preserve AR
    quality: 82,
    fit:     sharp.fit.inside,
  },
  // hero-bg — already webp but over-compressed (850 KiB)
  // displayed at 1280px max on large screens, 800px on mobile
  {
    input:   join(PUBLIC, 'hero-bg.webp'),
    output:  join(PUBLIC, 'hero-bg-opt.webp'),
    width:   1280,
    height:  null,
    quality: 78,
    fit:     sharp.fit.inside,
  },
  // whatsapp — displayed at 64px (header) / 96px (contact) — 2x = 192px max
  {
    input:   join(PUBLIC, 'whatsapp.png'),
    output:  join(PUBLIC, 'whatsapp.webp'),
    width:   192,
    height:  192,
    quality: 90,
    fit:     sharp.fit.cover,
  },
];

let totalSavedKiB = 0;

for (const task of tasks) {
  if (!existsSync(task.input)) {
    console.warn(`⚠️  Skipping (not found): ${task.input}`);
    continue;
  }

  const { input, output, width, height, quality, fit } = task;
  const instance = sharp(input).resize({ width, height, fit, withoutEnlargement: true });

  // Detect output format from extension
  if (output.endsWith('.webp')) {
    instance.webp({ quality, effort: 6, smartSubsample: true });
  }

  await instance.toFile(output);

  // Log size delta
  const { size: inSize }  = await sharp(input).metadata().then(() => import('fs').then(f => f.statSync(input)));
  const { size: outSize } = await sharp(output).metadata().then(() => import('fs').then(f => f.statSync(output)));
  const savedKiB = (inSize - outSize) / 1024;
  totalSavedKiB += savedKiB;

  console.log(
    `✓  ${input.split('/').pop().split('\\').pop().padEnd(35)} → ${output.split('/').pop().split('\\').pop().padEnd(35)} | saved ${savedKiB.toFixed(1)} KiB`
  );
}

console.log(`\n🏁 Done. Total saved: ${totalSavedKiB.toFixed(1)} KiB`);
console.log('\nNext step: replace file references in components:');
console.log('  /logo.png        → /logo.webp');
console.log('  /logo-ar.png     → /logo-ar.webp');
console.log('  /infrastructure_premium.png → /infrastructure_premium.webp');
console.log('  /hero-bg.webp    → /hero-bg-opt.webp (then rename to hero-bg.webp)');
console.log('  /whatsapp.png    → /whatsapp.webp');
