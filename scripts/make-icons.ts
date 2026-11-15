/** Generates the PWA icons (a white 工 on red) with no image dependencies. */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf: Buffer) => {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type: string, data: Buffer) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

function png(size: number, maskable: boolean): Buffer {
  const bg = [0xb4, 0x23, 0x2c];
  const fg = [0xfa, 0xf7, 0xf2];
  const radius = maskable ? 0 : size * 0.22;
  const scale = maskable ? 0.62 : 0.78; // keep the glyph inside the maskable safe zone
  const g = (x: number) => size / 2 + (x - 0.5) * size * scale;
  // 工: top bar, stem, bottom bar (unit coordinates)
  const rects = [
    [0.22, 0.24, 0.78, 0.33],
    [0.455, 0.24, 0.545, 0.76],
    [0.12, 0.67, 0.88, 0.76],
  ].map(([x0, y0, x1, y1]) => [g(x0), g(y0), g(x1), g(y1)]);
  const rows: Buffer[] = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    for (let x = 0; x < size; x++) {
      // rounded-square alpha
      const dx = Math.max(radius - x - 0.5, x + 0.5 - (size - radius), 0);
      const dy = Math.max(radius - y - 0.5, y + 0.5 - (size - radius), 0);
      const inside = radius === 0 || Math.hypot(dx, dy) <= radius;
      const onGlyph = rects.some(([x0, y0, x1, y1]) => x + 0.5 >= x0 && x + 0.5 <= x1 && y + 0.5 >= y0 && y + 0.5 <= y1);
      const c = onGlyph ? fg : bg;
      row.set([c[0], c[1], c[2], inside ? 255 : 0], 1 + x * 4);
    }
    rows.push(row);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(Buffer.concat(rows))), chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/icon-192.png', png(192, false));
writeFileSync('public/icons/icon-512.png', png(512, false));
writeFileSync('public/icons/icon-maskable-512.png', png(512, true));
console.log('icons written');
