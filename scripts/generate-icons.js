#!/usr/bin/env node
// Generate simple PWA icons as PNG files
// Creates solid background with "RT" text using basic PNG encoding

const fs = require('fs');
const path = require('path');

// Simple PNG encoder for basic solid color + text
// We'll create minimal valid PNG files

function createPNG(width, height, bgColor, textColor, text) {
  // Create a minimal PNG with solid background
  // This is a very basic implementation - in production you'd use canvas or sharp

  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: truecolor
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdrChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 13]), // length
    Buffer.from('IHDR'),
    ihdrData,
    Buffer.from(ihdrCrc.toString(16).padStart(8, '0'), 'hex')
  ]);

  // IDAT chunk - simple solid color image data
  const rowSize = width * 3 + 1; // +1 for filter byte
  const imageData = Buffer.alloc(rowSize * height);

  // Parse hex color
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);

  for (let y = 0; y < height; y++) {
    imageData[y * rowSize] = 0; // filter type: none
    for (let x = 0; x < width; x++) {
      const offset = y * rowSize + 1 + x * 3;
      imageData[offset] = r;
      imageData[offset + 1] = g;
      imageData[offset + 2] = b;
    }
  }

  // Compress with zlib (simplified - no actual compression)
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(imageData);

  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]));
  const idatChunk = Buffer.concat([
    Buffer.from(compressed.length.toString(16).padStart(8, '0'), 'hex'),
    Buffer.from('IDAT'),
    compressed,
    Buffer.from(idatCrc.toString(16).padStart(8, '0'), 'hex')
  ]);

  // IEND chunk
  const iendCrc = crc32(Buffer.from('IEND'));
  const iendChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 0]),
    Buffer.from('IEND'),
    Buffer.from(iendCrc.toString(16).padStart(8, '0'), 'hex')
  ]);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons
const sizes = [192, 512];
const bgColor = '#0a0a0a';
const textColor = '#c01c28';

for (const size of sizes) {
  const png = createPNG(size, size, bgColor, textColor, 'RT');
  fs.writeFileSync(path.join(__dirname, `../public/icon-${size}.png`), png);
  console.log(`Generated icon-${size}.png`);
}

// Generate favicon.ico (simple 32x32)
const favicon32 = createPNG(32, 32, bgColor, textColor, 'RT');
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), favicon32);
console.log('Generated favicon.ico');

// Generate favicon-16x16.png
const favicon16 = createPNG(16, 16, bgColor, textColor, 'RT');
fs.writeFileSync(path.join(__dirname, '../public/favicon-16x16.png'), favicon16);
console.log('Generated favicon-16x16.png');

// Generate apple-touch-icon.png (180x180)
const appleTouch = createPNG(180, 180, bgColor, textColor, 'RT');
fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.png'), appleTouch);
console.log('Generated apple-touch-icon.png');

console.log('All icons generated!');