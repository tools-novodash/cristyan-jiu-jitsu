import { useRef, useState } from 'react'
import { TOUR } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { useRail } from '../../lib/useRail'
import { RailNav } from './Tracks'
import { Cta } from '../ui/Cta'
import { Photo } from '../ui/Photo'
import { Tag, TitleText } from '../ui/Title'

const S = TOUR.stops
const pad = (n: number) => String(n).padStart(2, '0')
// timeline units: an intro hold on the storefront, then per stop a move (1) and a hold (0.7), then a hold
// on the last room with the facts and the button
const T0 = 0.6, STEP = 1.7, END = T0 + S.length * STEP + 1.8

/**
 * The space (Adryan, 11/11: the idea of walking in, not Lobo's walk-in carousel; then real photos of each
 * room, sent by Arthur). A walk from the sidewalk to the mat, one photo per stop: the storefront, then the
 * camera steps toward the door, and each next room slides in over the last one while it drifts closer, as
 * if you kept walking; a red card tells what happens there. Desktop: a sticky stage, scrubbed by the scroll.
 * Phones and reduced motion: the same stops as a swipeable rail of slides, then the numbers and the button.
 */
export function Tour() {
  const root = useRef<HTMLElement>(null)
  const [at, setAt] = useState(-1)
  const rail = useRail<HTMLOListElement>()
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const shots = gsap.utils.toArray<HTMLElement>('.tr__shot', r)
      const imgs = shots.map((s) => s.querySelector('img')!)
      let last = -2
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 1 },
        onUpdate: () => {
          const t = tl.time()
          // a stop's card turns on halfway through its photo's entrance, so the card and the room arrive together
          const i = t < T0 + 0.5 ? -1 : Math.min(S.length, Math.floor((t - T0 - 0.5) / STEP))
          if (i !== last) { last = i; setAt(i) }
        },
        scrollTrigger: { trigger: r, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
      })
      tl.set({}, {}, 0)
      gsap.set(shots.slice(1), { clipPath: 'inset(0% 0% 0% 100%)' })
      S.forEach((_, j) => {
        const at0 = T0 + j * STEP
        // the storefront: a step toward the door; every next room: it slides in and keeps drifting closer
        if (j === 0) tl.fromTo(imgs[0], { scale: 1 }, { scale: 1.16, duration: STEP, ease: 'none' }, at0)
        else {
          tl.to(shots[j], { clipPath: 'inset(0% 0% 0% 0%)' }, at0)
          tl.fromTo(imgs[j], { scale: 1.22, xPercent: 4 }, { scale: 1.04, xPercent: 0, duration: STEP + 0.4, ease: 'power1.out' }, at0)
        }
      })
      tl.set({}, {}, END)
      r.classList.add('is-live')
      return () => { r.classList.remove('is-live'); setAt(-1) }
    })
    mm.add('(max-width: 899px)', () => {
      gsap.fromTo(r.querySelectorAll('.tr__slide'), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: r.querySelector('.tr__slides'), start: 'top 85%', once: true } })
    })
  }, { scope: root })

  const facts = <dl className="tr__facts">{TOUR.facts.map(([b, t]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}</dl>
  const head = (id: string) => <><Tag light>{TOUR.tag}</Tag><h2 className="t t-1" id={id}><TitleText title={TOUR.title} /></h2><p className="lead">{TOUR.lead}</p></>

  return (
    <section className={`tr${at >= 0 && at < S.length ? ' is-stop' : ''}${at === S.length ? ' is-end' : ''}`} id="inside" data-nav="dark" aria-labelledby="tr-h" ref={root}>
      <div className="tr__stage">
        {S.map((p) => (
          <i key={p.title} className="tr__shot" aria-hidden="true"><Photo photo={p.shot} sizes="100vw" alt="" style={{ objectPosition: p.pos, transformOrigin: p.pos }} /></i>
        ))}
        <i className="tr__dim" aria-hidden="true" />
        <div className="shell tr__ui">
          <div className="tr__intro">{head('tr-h')}</div>
          <ol className="tr__caps" role="list">
            {S.map((p, j) => (
              <li key={p.title} className={`tr__cap${j === at ? ' on' : ''}${p.photo ? ' has-ph' : ''}`}>
                {p.photo ? <span className="tr__ph"><Photo photo={p.photo} sizes="220px" /></span> : null}
                <span className="tr__body"><span className="tr__n">Stop {pad(j + 1)} / {pad(S.length)}</span><b>{p.title}</b><span>{p.text}</span></span>
              </li>
            ))}
          </ol>
          <div className="tr__end"><p className="t t-2">See it <span className="hl">in person.</span></p>{facts}<Cta /></div>
          <span className="tr__rail" aria-hidden="true">{S.map((p, j) => <i key={p.title} className={j === at ? 'on' : j < at ? 'done' : ''} />)}</span>
        </div>
      </div>
      <div className="shell tr__flat">
        {head('tr-h2')}
        <ol className="tr__slides" role="list" aria-label="The stops of the tour" ref={rail.ref}>
          {S.map((p, j) => (
            <li key={p.title} className="tr__slide">
              <i className="tr__crop" aria-hidden="true">
                <Photo photo={p.shot} sizes="(max-width: 899px) 84vw, 360px" alt="" style={{ objectPosition: p.pos }} />
                <span className="tr__lno">{j + 1}</span>
              </i>
              <span className="tr__scard">
                <span className="tr__n">Stop {pad(j + 1)} / {pad(S.length)}</span>
                <b>{p.title}</b>
                <span>{p.text}</span>
              </span>
            </li>
          ))}
        </ol>
        <RailNav go={rail.go} at={rail.at} count={S.length} label="stop" light />
        {facts}
        <div className="tr__fend"><Cta /></div>
      </div>
    </section>
  )
}
