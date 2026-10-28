import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Export the approved ImageGen silhouette without changing its proportions.
// The transparent master is retained in assets/reference.
const master = new URL('../assets/reference/brand-walker-imagegen.png', import.meta.url).pathname;
const logo = new URL('../public/images/brand-walker-v2.png', import.meta.url).pathname;
await sharp(master).resize({height:384}).png().toFile(logo);
const mask = await sharp(master).resize({height:256}).png().toBuffer();
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<defs><mask id="walker" mask-type="alpha"><image href="data:image/png;base64,${mask.toString('base64')}" x="17" y="2" width="30" height="60" preserveAspectRatio="xMidYMid meet"/></mask></defs>
<rect width="64" height="64" rx="13" fill="#972d2b"/>
<rect width="64" height="64" fill="#f5f3eb" mask="url(#walker)"/>
</svg>`;
await writeFile(new URL('../public/favicon.svg', import.meta.url), icon);
for (const [name, size] of [['favicon-16.png',16],['favicon-32.png',32],['apple-touch-icon.png',180]]) {
  await sharp(Buffer.from(icon)).resize(size,size).png().toFile(new URL(`../public/${name}`,import.meta.url).pathname);
}
console.log('Logo and icons exported from transparent master:', await sharp(master).metadata().then(({width,height,hasAlpha})=>({width,height,hasAlpha})));
