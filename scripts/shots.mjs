// shots.mjs: scroll-through screenshots of pages for review, one contact sheet per page and width.
//   node scripts/shots.mjs <outDir> <width>x<height> /path /path ...
import { chromium } from 'playwright'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const [out, size, ...paths] = process.argv.slice(2)
const [W, H] = size.split('x').map(Number)
fs.mkdirSync(out, { recursive: true })
const b = await chromium.launch({ args: ['--mute-audio'] })
const ctx = await b.newContext({ viewport: { width: W, height: H }, ...(W < 768 ? { isMobile: true, hasTouch: true } : {}) })
for (const p of paths) {
  const page = await ctx.newPage()
  const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  await page.goto('http://localhost:4310' + p, { waitUntil: 'networkidle' }); await page.waitForTimeout(1800)
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  const tiles = []
  for (let y = 0; y < total && tiles.length < 14; y += Math.round(H * 0.92)) {
    await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(800)
    tiles.push(await page.screenshot())
  }
  const tw = W > 1000 ? 720 : 300, th = Math.round(tw * H / W), cols = W > 1000 ? 2 : 6
  const rows = Math.ceil(tiles.length / cols)
  const imgs = await Promise.all(tiles.map((t) => sharp(t).resize(tw, th).png().toBuffer()))
  const name = (p === '/' ? 'home' : p.slice(1).replace(/\//g, '_')) + `-${W}.png`
  await sharp({ create: { width: tw * cols + (cols - 1) * 8, height: th * rows + (rows - 1) * 8, channels: 3, background: '#ff00ff' } })
    .composite(imgs.map((input, i) => ({ input, left: (i % cols) * (tw + 8), top: Math.floor(i / cols) * (th + 8) }))).png().toFile(path.join(out, name))
  console.log(name, tiles.length, 'screens', errs.length ? 'ERRORS ' + errs.slice(0, 2).join(' | ') : '')
  await page.close()
}
await b.close()
