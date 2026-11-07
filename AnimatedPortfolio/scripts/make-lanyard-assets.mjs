import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const aboutSrc = path.join(publicDir, 'about.jpg');

async function generateAssets() {
  console.log('Generating Lanyard assets in:', publicDir);

  if (!fs.existsSync(aboutSrc)) {
    throw new Error(`Base image not found at ${aboutSrc}`);
  }

  // 1. card-front.png: 800x1200
  // Crop photo to fill 800x1200, overlay dark gradient + text in cream
  const frontOverlaySvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b0b0b" stop-opacity="0.1" />
          <stop offset="55%" stop-color="#0b0b0b" stop-opacity="0.3" />
          <stop offset="80%" stop-color="#0b0b0b" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0b0b0b" stop-opacity="0.98" />
        </linearGradient>
      </defs>
      <rect width="800" height="1200" fill="url(#grad)" />
      
      <!-- Top Monogram Accent -->
      <circle cx="400" cy="120" r="32" fill="#0b0b0b" fill-opacity="0.6" stroke="#fbece3" stroke-width="2" stroke-opacity="0.4" />
      <text x="400" y="132" font-family="Inter Tight, sans-serif" font-size="28" font-weight="600" fill="#fbece3" text-anchor="middle">S</text>

      <!-- Bottom Details -->
      <text x="400" y="990" font-family="Inter Tight, sans-serif" font-size="46" font-weight="600" letter-spacing="-0.03em" fill="#fbece3" text-anchor="middle">Sudhanshu Baberwal</text>
      <text x="400" y="1045" font-family="Inter Tight, sans-serif" font-size="24" font-weight="400" letter-spacing="0.08em" fill="#fbece3" fill-opacity="0.75" text-anchor="middle">BACKEND SOFTWARE ENGINEER</text>
      <line x1="320" y1="1085" x2="480" y2="1085" stroke="#fbece3" stroke-opacity="0.25" stroke-width="1.5" />
    </svg>
  `;

  await sharp(aboutSrc)
    .resize(800, 1200, { fit: 'cover', position: 'center' })
    .composite([{ input: Buffer.from(frontOverlaySvg), top: 0, left: 0 }])
    .png()
    .toFile(path.join(publicDir, 'card-front.png'));

  console.log('✓ card-front.png generated');

  // 2. card-back.png: 800x1200
  // Near black #0b0b0b with large cream "S" monogram, "IIIT Dharwad" and "B.Tech CSE"
  const backSvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1200" fill="#0b0b0b" />
      
      <!-- Subtle outer border line -->
      <rect x="36" y="36" width="728" height="1128" rx="24" fill="none" stroke="#fbece3" stroke-opacity="0.12" stroke-width="2" />
      
      <!-- Center Monogram -->
      <circle cx="400" cy="520" r="140" fill="#141414" stroke="#fbece3" stroke-opacity="0.2" stroke-width="3" />
      <text x="400" y="585" font-family="Inter Tight, sans-serif" font-size="190" font-weight="500" fill="#fbece3" text-anchor="middle">S</text>

      <!-- Institutional Details -->
      <text x="400" y="780" font-family="Inter Tight, sans-serif" font-size="34" font-weight="500" letter-spacing="-0.02em" fill="#fbece3" text-anchor="middle">IIIT Dharwad</text>
      <text x="400" y="825" font-family="Inter Tight, sans-serif" font-size="22" font-weight="400" letter-spacing="0.1em" fill="#fbece3" fill-opacity="0.65" text-anchor="middle">B.TECH CSE</text>
    </svg>
  `;

  await sharp(Buffer.from(backSvg))
    .png()
    .toFile(path.join(publicDir, 'card-back.png'));

  console.log('✓ card-back.png generated');

  // 3. band.png: tileable strap texture (256x64)
  // Near black with repeating cream text "SUDHANSHU BABERWAL" in small caps
  const bandSvg = `
    <svg width="256" height="64" viewBox="0 0 256 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="64" fill="#111111" />
      <line x1="0" y1="4" x2="256" y2="4" stroke="#fbece3" stroke-opacity="0.1" stroke-width="1" />
      <line x1="0" y1="60" x2="256" y2="60" stroke="#fbece3" stroke-opacity="0.1" stroke-width="1" />
      <text x="128" y="38" font-family="Inter Tight, sans-serif" font-size="15" font-weight="600" letter-spacing="0.18em" fill="#fbece3" fill-opacity="0.85" text-anchor="middle">SUDHANSHU BABERWAL</text>
    </svg>
  `;

  await sharp(Buffer.from(bandSvg))
    .png()
    .toFile(path.join(publicDir, 'band.png'));

  console.log('✓ band.png generated');
}

generateAssets().catch((err) => {
  console.error('Failed to generate lanyard assets:', err);
  process.exit(1);
});
