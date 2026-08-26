const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "public", "videos", "Sokha_Realty_Hero_mvp_frames");
const FRAME_COUNT = 192;
const TARGET_WIDTH = 1600;
const JPEG_QUALITY = 68;

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (let i = 1; i <= FRAME_COUNT; i++) {
    const name = `frame_${String(i).padStart(3, "0")}.jpg`;
    const filePath = path.join(DIR, name);
    const before = fs.statSync(filePath).size;

    const buffer = await sharp(filePath)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const tmpPath = `${filePath}.tmp`;
    fs.writeFileSync(tmpPath, buffer);
    fs.renameSync(tmpPath, filePath);

    totalBefore += before;
    totalAfter += buffer.length;

    if (i % 32 === 0) console.log(`processed ${i}/${FRAME_COUNT}`);
  }

  console.log(`before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`after:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
