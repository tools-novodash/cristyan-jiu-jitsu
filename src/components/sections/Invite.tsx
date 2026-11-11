import { useRef } from 'react'
import { ABOUT, ACADEMY, SITE, TRIAL } from '../../data/site'
import { gsap, lines, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Cta } from '../ui/Cta'
import { Icon, type IconName } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag, TitleText } from '../ui/Title'

// the logo window, in vmin: the icon small in the middle (--m), its solid silhouette growing inside it (--f),
// then both past every corner of the screen (420vmin covers up to 32:9)
const OPEN = 420

/**
 * "Who are these people, and what happens if I go?" Right after the hero: the academy in two lines and its
 * values as a big outline marquee that slides with the scroll; then the dark stage, where the photo of the
 * whole academy shows through the logo itself (the exact icon, small in the middle), fills it and opens to the full frame and the free
 * class arrives as an admission ticket, perforated, with the four facts of the trial and the button.
 * Desktop: the stage is held for one screen while the diamond opens. Phones: no hold, the diamond opens on
 * arrival and the ticket follows.
 */
export function Invite({ withAcademy = true }: { withAcademy?: boolean }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    r.querySelectorAll('h2').forEach((h) => lines(h))
    const mq = r.querySelector('.iv__mq')
    if (mq) gsap.fromTo(mq, { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: mq, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
    const stage = r.querySelector<HTMLElement>('.iv__stage')!, win = r.querySelector('.iv__win'), tk = r.querySelector('.tk')
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: '+=110%', scrub: 0.6, pin: stage, anticipatePin: 1 } })
        .fromTo(win, { '--m': 46 }, { '--m': OPEN, ease: 'power2.in', duration: 1 }, 0)
        .fromTo(r.querySelector('.iv__win i'), { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.45 }, 0.4)
        .fromTo(win, { '--f': 0 }, { '--f': OPEN, ease: 'power2.in', duration: 0.6 }, 0.12)
        .fromTo(r.querySelector('.iv__win img'), { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(r.querySelector('.iv__h'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.45)
        .fromTo(tk, { autoAlpha: 0, y: 160, rotate: 7 }, { autoAlpha: 1, y: 0, rotate: -2, ease: 'back.out(1.3)', duration: 0.5 }, 0.55)
        .fromTo(r.querySelectorAll('.tk__pts li'), { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.25 }, 0.8)
    })
    mm.add('(max-width: 899px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 70%', once: true } })
        .fromTo(win, { '--m': 50 }, { '--m': OPEN, duration: 1.9, ease: 'power3.in' }, 0)
        .fromTo(r.querySelector('.iv__win i'), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'none' }, 0.9)
        .fromTo(win, { '--f': 0 }, { '--f': OPEN, duration: 1.1, ease: 'power2.in' }, 0.4)
      gsap.fromTo(tk, { autoAlpha: 0, y: 60, rotate: 4 }, { autoAlpha: 1, y: 0, rotate: -1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: tk, start: 'top 88%', once: true } })
    })
  }, { scope: root })

  return (
    <section className="iv" id="academy" aria-labelledby="iv-h" ref={root}>
      {withAcademy ? (
        <div className="iv__top" data-nav="dark">
          <div className="shell iv__intro">
            <Tag light>{ACADEMY.tag}</Tag>
            <h2 className="t t-1" id="iv-h"><TitleText title={ACADEMY.title} /></h2>
            <p className="lead">{ACADEMY.lead}</p>
          </div>
          <div className="iv__mqw" aria-hidden="true">
            <p className="iv__mq">{[...SITE.values, ...SITE.values].map((v, i) => <span key={i} className={i % 3 === 1 ? 'is-fill' : undefined}>{v}<Mark /></span>)}</p>
          </div>
        </div>
      ) : null}
      <div className="iv__stage" data-nav="dark">
        <div className="iv__win" aria-hidden="true"><Photo photo={ABOUT.team} alt="" sizes="100vw" /><i /></div>
        <div className="shell iv__grid">
          <h2 className="t t-1 iv__h" id={withAcademy ? undefined : 'iv-h'}><TitleText title={TRIAL.title} /></h2>
          <div className="tk">
            <div className="tk__main">
              <p className="tk__hd"><span>Admit one</span><span>Free trial · 60 min</span></p>
              <ul className="tk__pts" role="list">
                {TRIAL.points.map((p) => <li key={p.t}><span className="tk__ic" aria-hidden="true"><Icon name={p.icon as IconName} /></span><span><strong className="hand">{p.t}</strong>{p.d}</span></li>)}
              </ul>
              <div className="tk__acts"><Cta /><p>{TRIAL.privateOption}</p></div>
            </div>
            <div className="tk__stub" aria-hidden="true"><Mark /><span>Cristyan Jiu-Jitsu</span><span>No. 001</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
