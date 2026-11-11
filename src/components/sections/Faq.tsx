import { useRef } from 'react'
import { FAQ, SITE } from '../../data/site'
import { lines, rise, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Accordion } from '../ui/Accordion'
import { Cta } from '../ui/Cta'
import { Icon } from '../ui/Icon'
import { Tag } from '../ui/Title'

/** "What if I still have questions?" Centred (Adryan, 10/11): the title, the list in one column, the
 *  button and the phone below. The questions of the current site, answered from the onboarding form. */
export function Faq() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => { if (motionOK()) { lines(root.current!.querySelector('h2')!); rise('.qa', root.current!, { stagger: 0.05 }) } }, { scope: root })
  return (
    <section className="sec faq" id="faq" aria-labelledby="faq-h" ref={root}>
      <div className="shell faq__in">
        <div className="head head--c">
          <Tag>FAQ</Tag>
          <h2 className="t t-1" id="faq-h">Before your <span className="hl">first class.</span></h2>
        </div>
        <Accordion items={FAQ} />
        <div className="faq__acts"><Cta /><a className="call" href={SITE.phone.tel}><Icon name="phone" />{SITE.phone.display}</a></div>
      </div>
    </section>
  )
}
