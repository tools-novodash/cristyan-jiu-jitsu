// e2e.mjs: the Novo Dash kit's form wired to the site: every #book link opens it, a program's
// button opens it on that audience with the live classes, /book is the kit page alone, no console
// errors, no horizontal scroll on a phone. Never submits (the kit posts to the real GHL webhook).
//   node scripts/e2e.mjs [origin=http://localhost:4310]
import { chromium } from 'playwright'
const O = process.argv[2] ?? 'http://localhost:4310'
const b = await chromium.launch({ args: ['--mute-audio'] })
const fail = []
const ok = (c, w) => { console.log(`${c ? 'ok  ' : 'FAIL'} ${w}`); if (!c) fail.push(w) }
const page = await b.newPage({ viewport: { width: 1440, height: 900 } })
const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
let links = 0, opened = 0
for (const p of ['/', '/programs', '/programs/adult-brazilian-jiu-jitsu', '/schedule', '/instructors', '/about']) {
  await page.goto(O + p, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
  const n = await page.locator('a[href="#book"]').count(); links += n
  for (let i = 0; i < n; i++) {
    const a = page.locator('a[href="#book"]').nth(i)
    if (!(await a.isVisible())) { opened++; continue }
    await a.scrollIntoViewIfNeeded(); await a.click()
    if (await page.locator('.nd-dialog').waitFor({ timeout: 4000 }).then(() => true, () => false)) opened++
    await page.keyboard.press('Escape'); await page.waitForTimeout(400)
  }
}
ok(opened === links, `every booking button opens the kit form (${opened}/${links} on 6 pages)`)
await page.goto(O + '/programs/kids-brazilian-jiu-jitsu', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
await page.locator('.hc a[href="#book"]').click(); await page.locator('.nd-dialog').waitFor(); await page.waitForTimeout(4000)
const kids = await page.locator('.nd-option-title').allTextContents()
ok(kids.length > 0, `the kids page opens it on the live kids classes (${kids.join(', ')})`)
await page.keyboard.press('Escape')
ok(!(await page.locator('.board').count()), 'the program page has no schedule (it lives on /schedule)')
await page.goto(O + '/schedule', { waitUntil: 'networkidle' }); await page.waitForTimeout(1500)
await page.locator('.board .cls').first().scrollIntoViewIfNeeded(); await page.locator('.board .cls').first().click()
ok(await page.locator('.nd-dialog').isVisible(), 'a schedule class opens it')
ok(!errs.length, `no console errors ${errs.slice(0, 2).join(' | ')}`)
const r = await page.goto(O + '/book', { waitUntil: 'networkidle' }); await page.waitForTimeout(2000)
ok(r.status() === 200 && (await page.locator('.nd').count()) > 0 && !(await page.locator('#h1').count()), '/book is the kit page alone')
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage()
await m.goto(O + '/', { waitUntil: 'networkidle' }); await m.waitForTimeout(1500)
const hb = await m.evaluate(() => ({ cta: document.getElementById('heroCta').getBoundingClientRect().bottom, h: innerHeight, sx: document.documentElement.scrollWidth > innerWidth }))
ok(hb.cta < hb.h, `phone: the hero button is on the first screen (${Math.round(hb.cta)} < ${hb.h})`)
ok(!hb.sx, 'phone: no horizontal scroll')
await m.locator('.nav__menu').click(); ok(await m.locator('#menu').isVisible(), 'phone: the menu opens')
await b.close()
console.log(fail.length ? `\n${fail.length} failed` : '\nall passed'); process.exit(fail.length ? 1 : 0)
