import { useEffect, useRef, useState } from 'react'
import { CTA, NAV, SITE, TRACKS } from '../../data/site'
import { TrackTabs } from '../sections/Tracks'
import { Icon } from '../ui/Icon'

/**
 * The floating pill: logo, five links, the phone. It takes the colour of the section under it
 * (black over the dark ones, data-nav="dark"; white over the light ones). No booking button in the
 * nav (every page carries it in the hero and at the end). Phones: a menu button opens the full menu.
 */
export function Nav({ path }: { path: string }) {
  const ref = useRef<HTMLElement>(null)
  const [light, setLight] = useState(false)
  const [open, setOpen] = useState(false)
  const [dd, setDd] = useState(false)
  const ddT = useRef(0)
  const ddOpen = () => { clearTimeout(ddT.current); setDd(true) }
  const ddClose = (ms = 160) => { clearTimeout(ddT.current); ddT.current = window.setTimeout(() => setDd(false), ms) }
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const nav = ref.current!, r = nav.querySelector('.nav__in')!.getBoundingClientRect()
      const under = document.elementsFromPoint(innerWidth / 2, r.top + r.height / 2).find((e) => !nav.contains(e))
      setLight(!!under && !under.closest('[data-nav="dark"]'))
    }
    const on = () => { raf ||= requestAnimationFrame(read) }
    read()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  useEffect(() => { document.documentElement.classList.toggle('menu-open', open) }, [open])
  const on = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))

  return (
    <header className={`nav${light && !open ? ' is-light' : ''}${open ? ' is-open' : ''}`} ref={ref}>
      <div className="nav__in">
        <a className="nav__logo" href="/" aria-label={`${SITE.name}, home`}>
          <img className="nav__lg nav__lg--w" src={SITE.logoWhite.src} width={SITE.logoWhite.w} height={SITE.logoWhite.h} alt={SITE.name} />
          <img className="nav__lg nav__lg--k" src={SITE.logo.src} width={SITE.logo.w} height={SITE.logo.h} alt="" aria-hidden="true" fetchPriority="low" />
        </a>
        <nav className="nav__links" aria-label="Main">
          {NAV.map((l) => l.href === '/programs' ? (
            <div key={l.href} className={`nav__dd${dd ? ' is-open' : ''}`}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') ddOpen() }} onPointerLeave={(e) => { if (e.pointerType === 'mouse') ddClose() }}
              onFocus={ddOpen} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) ddClose(0) }} onKeyDown={(e) => { if (e.key === 'Escape') { ddClose(0); (e.currentTarget.querySelector('a') as HTMLElement).focus() } }}>
              <a href={l.href} aria-current={on(l.href) ? 'page' : undefined} aria-haspopup="true" aria-expanded={dd}>{l.label}<i className="nav__chev" aria-hidden="true" /></a>
              <div className="nav__panel"><TrackTabs variant="menu" /></div>
            </div>
          ) : <a key={l.href} href={l.href} aria-current={on(l.href) ? 'page' : undefined}>{l.label}</a>)}
        </nav>
        <a className="nav__tel" href={SITE.phone.tel} aria-label={`Call ${SITE.phone.display}`}><Icon name="phone" /><span>{SITE.phone.display}</span></a>
        <button type="button" className="nav__menu" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <div className="menu" id="menu" hidden={!open} data-nav="dark">
        <nav aria-label="Menu">
          <a href="/" aria-current={path === '/' ? 'page' : undefined}>Home</a>
          {NAV.map((l) => [
            <a key={l.href} href={l.href} aria-current={on(l.href) ? 'page' : undefined}>{l.label}</a>,
            l.href === '/programs' ? <div key="tracks" className="menu__sub">{TRACKS.map((t) => <a key={t.slug} href={`/programs/${t.slug}`} aria-current={path === `/programs/${t.slug}` ? 'page' : undefined}>{t.short}</a>)}</div> : null,
          ])}
        </nav>
        <a className="cta menu__cta" href="#book" onClick={() => setOpen(false)}><span>{CTA}</span></a>
        <a className="menu__tel" href={SITE.phone.tel}><Icon name="phone" />{SITE.phone.display}</a>
      </div>
    </header>
  )
}
