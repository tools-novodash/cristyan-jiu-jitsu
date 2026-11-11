import { useEffect, useRef, useState } from 'react'
import { CTA, NAV, SITE, TRACKS } from '../../data/site'
import { img } from '../../data/img'
import { Icon } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'

// [CONFIRMAR] a photo of the storefront for this card; until then the training floor
const PLACE = img('about_hero', 'The 5,000 sq ft training floor of Cristyan Jiu-Jitsu with the logo on the wall')

/**
 * The footer. On top, "Find us" as in Lobo (Adryan, 10/11): the title centred, the real map as the section's
 * background (rising from the ink, falling into the footer), the pin on the academy where Google drops its
 * marker; on the map the photo of the academy on the left and the visit card on the right (address,
 * directions, call, the contacts). Below, the facts and the links (kept as they were). The map loads only
 * near the screen.
 */
export function Footer() {
  const root = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect() } }, { rootMargin: '700px' })
    io.observe(root.current!)
    return () => io.disconnect()
  }, [])
  return (
    <footer className="foot" data-nav="dark" ref={root}>
      <section className="find" id="visit" aria-labelledby="find-h">
        <div className="find__map" aria-hidden="true">
          {near && <iframe title={`Map: ${SITE.academy}, ${SITE.address.line}`} src={SITE.maps.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} />}
          <span className="find__shade" />
          <span className="find__pin"><i /><i /><Mark /></span>
        </div>
        <div className="shell find__in">
          <div className="find__head">
            <p className="tag tag--l">Visit the academy</p>
            <h2 className="t t-1" id="find-h">Find us in <span className="hl">Hyannis.</span></h2>
            <p>On Iyannough Rd, with students from Hyannis, Barnstable, Yarmouth and Mashpee.</p>
          </div>
          <div className="find__grid">
            <figure className="find__ph"><Photo photo={PLACE} sizes="(max-width: 899px) 92vw, 380px" /><figcaption>The training floor, 5,000 sq ft</figcaption></figure>
            <div className="find__card">
              <b>{SITE.address.street}</b>
              <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
              <div className="find__btns">
                <a className="cta cta--sm" href="#book"><span>{CTA}</span></a>
                <a className="chip chip--l" href={SITE.maps.directions} target="_blank" rel="noopener"><Icon name="pin" />Get directions</a>
              </div>
              <ul className="find__list" role="list">
                <li><a href={SITE.phone.tel}><Icon name="phone" /><span>{SITE.phone.display}<small>Call or text</small></span></a></li>
                <li><a href={`mailto:${SITE.email}`}><Icon name="mail" /><span>{SITE.email}</span></a></li>
                <li><a href={SITE.social.instagram} target="_blank" rel="noopener"><Icon name="ig" /><span>@cristyanbjj</span></a></li>
                <li><span className="find__hours"><Icon name="clock" /><span>Mon to Fri, 4:30 to 9:00 PM<small>Saturday and Sunday closed</small></span></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="shell foot__grid">
        <div className="foot__brand">
          <img src={SITE.logoWhite.src} width={SITE.logoWhite.w} height={SITE.logoWhite.h} alt={SITE.name} loading="lazy" />
          <p>{SITE.academy}. A family academy in Hyannis, on Cape Cod.</p>
          <div className="foot__social">
            <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="ig" /></a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="fb" /></a>
            <a href={SITE.social.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="yt" /></a>
          </div>
        </div>
        <nav className="foot__col" aria-label="Programs">
          <p className="foot__h">Programs</p>
          {TRACKS.map((t) => <a key={t.slug} href={`/programs/${t.slug}`}>{t.short}</a>)}
        </nav>
        <nav className="foot__col" aria-label="The academy">
          <p className="foot__h">The academy</p>
          {NAV.filter((l) => l.href !== '/programs').map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="/book">Book a trial</a>
        </nav>
        <div className="foot__col">
          <p className="foot__h">Contact</p>
          <a href={SITE.phone.tel}><Icon name="phone" />{SITE.phone.display}</a>
          <a href={`mailto:${SITE.email}`}><Icon name="mail" />{SITE.email}</a>
          <a href={SITE.maps.directions} target="_blank" rel="noopener"><Icon name="pin" />{SITE.address.line}</a>
        </div>
      </div>
      <div className="shell foot__base">
        <p>© 2026 {SITE.legalName}</p>
        <p>Website by <a href="https://novodash.com" target="_blank" rel="noopener">Novo Dash</a></p>
      </div>
    </footer>
  )
}
