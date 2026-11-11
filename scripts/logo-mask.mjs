// The logo's icon as a mask for the trial stage (Adryan, 11/11: "the image effect using the logo itself, its
// exact shape"). Crops the square icon out of the full-size logo and writes its ink (black and red, not the
// white) as alpha: public/images/logo-mask.png. The solid diamond that fills the gaps as it opens is a plain
// SVG with the same box (public/images/logo-diamond.svg), so both mask layers line up.
import sharp from 'sharp'

const SRC = 'reference/current-site/images/logo.png'
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const W = info.width, H = info.height
const at = (x, y) => (y * W + x) * 4
const ink = (x, y) => { const i = at(x, y); return data[i + 3] > 128 && Math.min(data[i], data[i + 1], data[i + 2]) < 200 }

// the icon is the left block: find where the first ink column run ends (the gap before the wordmark)
let x0 = W, x1 = 0, y0 = H, y1 = 0
const cols = []
for (let x = 0; x < W; x++) { let any = false; for (let y = 0; y < H; y++) if (ink(x, y)) { any = true; break } cols.push(any) }
const start = cols.indexOf(true)
let end = start; while (cols[end + 1]) end++
for (let y = 0; y < H; y++) for (let x = start; x <= end; x++) if (ink(x, y)) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y) }
const side = Math.max(x1 - x0, y1 - y0) + 1
const cx = Math.round((x0 + x1) / 2), cy = Math.round((y0 + y1) / 2)
const left = cx - Math.floor(side / 2), top = cy - Math.floor(side / 2)
console.log(`icon ${x0}..${x1} × ${y0}..${y1}, square ${side}px`)

const out = Buffer.alloc(side * side * 4)
for (let y = 0; y < side; y++) for (let x = 0; x < side; x++) {
  const sx = left + x, sy = top + y, o = (y * side + x) * 4
  let a = 0
  if (sx >= 0 && sy >= 0 && sx < W && sy < H) {
    const i = at(sx, sy)
    a = Math.round(Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]) * (data[i + 3] / 255))
  }
  out[o] = out[o + 1] = out[o + 2] = 0; out[o + 3] = a
}
await sharp(out, { raw: { width: side, height: side, channels: 4 } }).png({ compressionLevel: 9 }).toFile('public/images/logo-mask.png')
console.log('wrote public/images/logo-mask.png')
