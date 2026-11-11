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
// timeline units: an intro hold on the whole room, then per stop a camera move (1) and a hold (0.7),
// then back out to the whole room with the facts and the button
const T0 = 0.6, STEP = 1.7, END = T0 + S.length * STEP + 1.8

/**
 * The space (Adryan, 11/11: the idea of walking in, not Lobo's walk-in carousel). One photo of the empty
 * academy and a camera: it starts on the whole room, flies to the front door, then walks the room the way
 * a visitor would (the parents' seats, the mat, the gear corner, the logo wall), a numbered pin landing on
 * each real spot and a card telling what happens there, with a photo of it in use; then it pulls back to
 * the whole room with every pin on it, the numbers and the button. Desktop: a sticky stage, scrubbed.
 * Phones and reduced motion (Adryan, 11/11: the first version was busy): only the stops, one slide each,
 * the photo zoomed on that spot over its red card, arrows and a count, then the numbers and the button.
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
      const stage = r.querySelector<HTMLElement>('.tr__stage')!, scene = r.querySelector<HTMLElement>('.tr__scene')!
      const cam = { s: 1, x: 0, y: 0 }
      const aim = (j: number) => {
        const st = S[j], W = stage.clientWidth, H = stage.clientHeight, Ws = scene.offsetWidth, Hs = scene.offsetHeight
        const s = st.z, mx = Math.max(0, (Ws * s - W) / 2), my = Math.max(0, (Hs * s - H) / 2)
        const x = W * 0.1 - (st.x / 100 - 0.5) * Ws * s, y = -(st.y / 100 - 0.5) * Hs * s
        return { s, x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) }
      }
      const put = () => { scene.style.setProperty('--s', String(cam.s)); scene.style.setProperty('--x', `${cam.x}px`); scene.style.setProperty('--y', `${cam.y}px`) }
      let last = -2
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 1 },
        onUpdate: () => {
          put()
          const t = tl.time()
          const i = t < T0 + 0.8 ? -1 : Math.min(S.length, Math.floor((t - T0 - 0.8) / STEP))
          if (i !== last) { last = i; setAt(i) }
        },
        scrollTrigger: { trigger: r, start: 'top top', end: 'bottom bottom', scrub: 0.7, invalidateOnRefresh: true },
      })
      tl.set({}, {}, 0)
      S.forEach((_, j) => tl.to(cam, { s: () => aim(j).s, x: () => aim(j).x, y: () => aim(j).y }, T0 + j * STEP))
      tl.to(cam, { s: 1, x: 0, y: 0 }, T0 + S.length * STEP).set({}, {}, END)
      put()
      r.classList.add('is-live')
      return () => { r.classList.remove('is-live'); setAt(-1) }
    })
    mm.add('(max-width: 899px)', () => {
      gsap.fromTo(r.querySelectorAll('.tr__slide'), { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: r.querySelector('.tr__slides'), start: 'top 85%', once: true } })
    })
  }, { scope: root })

  const pins = S.map((p, j) => (
    <span key={p.title} className={`tr__pin${j === at ? ' on' : ''}${j < at || at === S.length ? ' seen' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true"><i /><b>{j + 1}</b></span>
  ))
  const facts = <dl className="tr__facts">{TOUR.facts.map(([b, t]) => <div key={t}><dt>{t}</dt><dd>{b}</dd></div>)}</dl>
  const head = (id: string) => <><Tag light>{TOUR.tag}</Tag><h2 className="t t-1" id={id}><TitleText title={TOUR.title} /></h2><p className="lead">{TOUR.lead}</p></>

  return (
    <section className={`tr${at >= 0 && at < S.length ? ' is-stop' : ''}${at === S.length ? ' is-end' : ''}`} id="inside" data-nav="dark" aria-labelledby="tr-h" ref={root}>
      <div className="tr__stage">
        <div className="tr__scene"><Photo photo={TOUR.photo} sizes="100vw" />{pins}</div>
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
                <Photo photo={TOUR.photo} sizes="80vw" alt="" style={{ objectPosition: `${p.x}% ${p.y}%`, transformOrigin: `${p.x}% ${p.y}%`, transform: `scale(${(p.z * 0.85).toFixed(2)})` }} />
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
