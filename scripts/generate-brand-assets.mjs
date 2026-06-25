import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import toIco from 'to-ico';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(rootDir, 'public');
const svgPath = join(publicDir, 'logo_favicon.svg');
const svg = readFileSync(svgPath);

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  });
  return resvg.render().asPng();
}

const logo512 = renderPng(512);
const logo192 = renderPng(192);
const favicon32 = renderPng(32);
const favicon16 = renderPng(16);

writeFileSync(join(publicDir, 'logo512.png'), logo512);
writeFileSync(join(publicDir, 'logo192.png'), logo192);
writeFileSync(
  join(publicDir, 'favicon.ico'),
  await toIco([favicon16, favicon32]),
);

console.log('Generated public/logo512.png (512x512)');
console.log('Generated public/logo192.png (192x192)');
console.log('Generated public/favicon.ico (16x16, 32x32)');
