import { useRef } from 'react'
import { HERO, SITE } from '../../data/site'
import type { Img } from '../../data/img'
import { gsap, lines, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Cta, Ghost } from '../ui/Cta'
import { Icon } from '../ui/Icon'
import { Photo } from '../ui/Photo'
import { TitleText, type Title } from '../ui/Title'

type Props = {
  eyebrow: string; title: Title; sub: string; photo: Img; home?: boolean; pos?: string
  // a second photo for desktop, where the card is much wider than tall (Adryan, 11/11: the family photo
  // cut everyone's head on /instructors); phones keep `photo`
  wide?: { photo: Img; pos?: string }
  crumbs?: { label: string; href: string }[]; second?: { label: string; href: string }; audience?: 'kids' | 'adults'
}

/**
 * Every page opens the same way (Adryan, 10/11: the white page with a card, the photo and the text inside
 * the card): a square card on the paper, the photo filling it under a long ink gradient, the title, the
 * line, the booking button. As you scroll the card opens to the edges and the photo pushes in (the zoom
 * right after the hero). Phones: the photo is a band at the top of the card and the text sits below it on
 * the ink, never over faces, the button on the first screen.
 */
export function Hero({ eyebrow, title, sub, photo, home, pos = '50% 45%', wide, crumbs, second, audience }: Props) {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    lines(r.querySelector('h1')!, 'top 95%')
    gsap.matchMedia().add('(min-width: 900px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: r, start: 'top top', end: 'bottom top', scrub: 0.5 } })
        .fromTo(r, { '--open': 0 }, { '--open': 1, ease: 'power2.out', duration: 0.6 }, 0)
        .fromTo(r.querySelector('.hc__bg img'), { scale: 1.06 }, { scale: 1.2, ease: 'none', duration: 1 }, 0)
        .fromTo(r.querySelector('.hc__dim'), { opacity: 0 }, { opacity: 0.5, ease: 'none', duration: 1 }, 0)
        .to(r.querySelectorAll('.hc__in, .hc__vsl'), { y: -70, autoAlpha: 0, ease: 'power1.in', duration: 0.5 }, 0)
    })
  }, { scope: root })

  return (
    <section className={`hc${home ? ' hc--home' : ''}`} ref={root} aria-labelledby="h1">
      <div className="hc__card" data-nav="dark">
        <div className="hc__bg" aria-hidden="true">
          {wide ? (
            <picture>
              <source media="(min-width: 900px)" srcSet={wide.photo.sm ? `${wide.photo.src.replace(/\.webp$/, '-sm.webp')} ${wide.photo.sm}w, ${wide.photo.src} ${wide.photo.w}w` : wide.photo.src} sizes="96vw" width={wide.photo.w} height={wide.photo.h} />
              <Photo photo={photo} eager alt="" sizes="100vw" style={{ objectPosition: pos, ['--wpos' as string]: wide.pos ?? '50% 45%' }} className="hc__pic" />
            </picture>
          ) : <Photo photo={photo} eager alt="" sizes="(max-width: 899px) 100vw, 96vw" style={{ objectPosition: pos }} />}
          <i className="hc__dim" />
        </div>
        <div className="shell hc__copy">
          <div className="hc__in">
            {crumbs ? (
              <nav className="crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a>
                {crumbs.map((c) => <a key={c.href} href={c.href}>{c.label}</a>)}
              </nav>
            ) : null}
            <p className="tag tag--l">{eyebrow}</p>
            <h1 className={`t ${home ? 't-hero' : 't-1'}`} id="h1"><TitleText title={title} /></h1>
            <p className="hc__sub">{sub}</p>
            <div className="hc__acts">
              <Cta id={home ? 'heroCta' : undefined} audience={audience} />
              {second ? <Ghost href={second.href} className="ghost--l">{second.label}</Ghost> : null}
            </div>
            <a className="proof" href={SITE.google.url} target="_blank" rel="noopener">
              <span className="proof__stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" />)}</span>
              <span><b>{SITE.google.rating}</b> on Google · {SITE.google.count} reviews</span>
            </a>
          </div>
          {home ? (
            // [CONFIRMAR VSL iContent] the frame for the sales video the client is producing with iContent;
            // the poster stands in until the file arrives, then this becomes a click-to-play facade.
            <figure className="hc__vsl" aria-label={HERO.vsl.label}>
              <Photo photo={HERO.vsl.poster} sizes="(max-width: 899px) 92vw, 560px" alt="" />
              <span className="hc__play" aria-hidden="true"><i /></span>
              <figcaption><b>{HERO.vsl.title}</b><span>{HERO.vsl.note}</span></figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  )
}
