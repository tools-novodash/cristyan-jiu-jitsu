import { useRef } from 'react'
import { PROFESSOR } from '../../data/site'
import { gsap, lines, rise, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Accordion } from '../ui/Accordion'
import { Cta } from '../ui/Cta'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag } from '../ui/Title'

const MARKS = [-2, -1, 0, 1, 2]

/**
 * "Who teaches?" Lobo's structure (Adryan, 10/11): one white card. On top, left the title with his name in
 * the red box, right the facts and the button; below, the dark panel with the logo's marks in a row and the
 * professor standing on its bottom edge. Scrolling, the panel rises, the marks grow, he climbs.
 */
export function Professor() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    lines(r.querySelector('.pf__h1')!)
    gsap.fromTo('.pf__box', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, delay: 0.2, ease: 'expo.inOut', scrollTrigger: { trigger: r, start: 'top 75%', once: true } })
    rise('.pf__acc .qa', r, { start: 'top 70%', stagger: 0.06 })
    gsap.timeline({ scrollTrigger: { trigger: '.pf__stage', start: 'top 95%', end: 'top 30%', scrub: 0.7 } })
      .fromTo('.pf__panel', { scaleY: 0.55, opacity: 0 }, { scaleY: 1, opacity: 1, ease: 'power2.out' }, 0)
      .fromTo('.pf__marks svg', { scale: 0.8 }, { scale: 1, ease: 'power2.out', stagger: { each: 0.04, from: 'center' } }, 0)
      .fromTo('.pf__me', { yPercent: 22 }, { yPercent: 0, ease: 'power2.out' }, 0.1)
  }, { scope: root })
  return (
    <section className="sec pf" id="professor" aria-labelledby="pf-h" ref={root}>
      <div className="shell">
        <div className="pf__card">
          <div className="pf__top">
            <div>
              <Tag>The head coach</Tag>
              <h2 className="t t-1 pf__h" id="pf-h"><span className="pf__h1">Meet Professor</span> <span className="pf__box">{PROFESSOR.name}</span></h2>
            </div>
            <div className="pf__r">
              <Accordion items={PROFESSOR.creds} className="pf__acc" />
            </div>
          </div>
          <div className="pf__stage">
            <div className="pf__panel" data-nav="dark" aria-hidden="true"><div className="pf__marks">{MARKS.map((i) => <Mark key={i} />)}</div></div>
            <div className="pf__me"><Photo photo={PROFESSOR.cutout} sizes="(max-width: 899px) 76vw, 400px" /></div>
          </div>
          <div className="pf__acts"><Cta /></div>
        </div>
      </div>
    </section>
  )
}
