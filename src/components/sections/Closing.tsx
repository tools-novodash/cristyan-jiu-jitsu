import { useRef } from 'react'
import { ABOUT, SITE } from '../../data/site'
import { gsap, lines, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Cta } from '../ui/Cta'
import { Icon } from '../ui/Icon'
import { Photo } from '../ui/Photo'

/** Every page ends here: the whole academy on the mats, fading into the footer's ink; the line, the
 *  button, the phone. */
export function Closing({ title = 'Your first class is on us.', audience }: { title?: string; audience?: 'kids' | 'adults' }) {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    lines(root.current!.querySelector('h2')!)
    gsap.fromTo('.cl__bg img', { yPercent: -6, scale: 1.12 }, { yPercent: 4, scale: 1.05, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  }, { scope: root })
  return (
    <section className="cl" data-nav="dark" aria-labelledby="cl-h" ref={root}>
      <div className="cl__bg" aria-hidden="true"><Photo photo={ABOUT.team} alt="" sizes="100vw" /></div>
      <div className="shell cl__in">
        <h2 className="t t-1" id="cl-h">{title}</h2>
        <p>60 minutes, a kimono on loan, no sparring. Come see the academy and meet Professor Cristyan.</p>
        <div className="cl__acts"><Cta audience={audience} /><a className="call call--l" href={SITE.phone.tel}><Icon name="phone" />{SITE.phone.display}</a></div>
      </div>
    </section>
  )
}
