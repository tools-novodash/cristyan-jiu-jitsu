import { useRef, useState } from 'react'
import { ABOUT, SITE, VALUES } from '../../data/site'
import { gsap, lines, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag, TitleText } from '../ui/Title'

const pad = (n: number) => String(n).padStart(2, '0')

/** About · the approach: the client's text lights up word by word as you read it (scrubbed), beside the
 *  family photo developing from the bottom and drifting slower than the page. */
export function Story() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    lines(r.querySelector('h2')!)
    // the paragraphs rise line by line (Adryan, 11/11: no more text filling in), the polaroid drops onto the page
    r.querySelectorAll<HTMLElement>('.st__read').forEach((p) => lines(p, 'top 85%'))
    gsap.fromTo('.st__pol', { y: 80, rotate: 8, autoAlpha: 0 }, { y: 0, rotate: -3, autoAlpha: 1, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.st__ph', start: 'top 82%', once: true } })
  }, { scope: root })
  return (
    <section className="sec st" id="approach" aria-labelledby="st-h" ref={root}>
      <div className="shell st__grid">
        <div>
          <Tag>Our approach</Tag>
          <h2 className="t t-1" id="st-h"><TitleText title={ABOUT.title} /></h2>
          {ABOUT.story.map((s) => <p key={s.slice(0, 20)} className="st__read">{s}</p>)}
        </div>
        <figure className="st__ph">
          <span className="st__pol"><Photo photo={ABOUT.mission} sizes="(max-width: 899px) 86vw, 520px" /><span className="st__hand hand" aria-hidden="true">Our team, Hyannis MA</span></span>
        </figure>
      </div>
    </section>
  )
}

/** About · the growth, made literal: a small square of mat (the 1,000 sq ft room, 44.7% of the side of a
 *  room five times larger) opens into the full photo of the 5,000 sq ft floor as the number counts up;
 *  then the students. Held for one screen on desktop; on phones it plays once on arrival. */
export function Growth() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    const room = r.querySelector('.gw__room'), num = r.querySelector<HTMLElement>('.gw__n b')!, stu = r.querySelector<HTMLElement>('.gw__s b')!
    const n = { v: 1000, s: 0 }
    const paint = () => { num.textContent = Math.round(n.v / 10) * 10 >= 1000 ? Math.round(n.v).toLocaleString('en-US') : '1,000'; stu.textContent = String(Math.round(n.s)) }
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: r, start: 'top top', end: '+=120%', scrub: 0.6, pin: r.querySelector('.gw__stage'), anticipatePin: 1 }, onUpdate: paint })
        .fromTo(room, { clipPath: 'inset(27.6% 27.6% 27.6% 27.6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 1 }, 0)
        .fromTo(r.querySelector('.gw__room img'), { scale: 1.6 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
        .fromTo(n, { v: 1000 }, { v: 5000, ease: 'power2.inOut', duration: 1 }, 0)
        .fromTo(n, { s: 0 }, { s: SITE.students, ease: 'power1.out', duration: 0.5 }, 0.7)
        .fromTo(r.querySelector('.gw__then'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0.1)
    })
    mm.add('(max-width: 899px)', () => {
      gsap.timeline({ scrollTrigger: { trigger: room, start: 'top 75%', once: true }, onUpdate: paint })
        .fromTo(room, { clipPath: 'inset(27.6% 27.6% 27.6% 27.6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power3.inOut' }, 0)
        .fromTo(n, { v: 1000, s: 0 }, { v: 5000, s: SITE.students, duration: 1.6, ease: 'power3.inOut' }, 0)
    })
  }, { scope: root })
  return (
    <section className="gw" data-nav="dark" aria-labelledby="gw-h" ref={root}>
      <div className="gw__stage">
        <div className="gw__room" aria-hidden="true"><Photo photo={ABOUT.space} alt="" sizes="100vw" /><i /></div>
        <span className="gw__then" aria-hidden="true">Where it started · 1,000 sq ft</span>
        <div className="shell gw__in">
          <Tag light>The academy</Tag>
          <h2 className="t t-1" id="gw-h">Grown with <span className="hl">its students.</span></h2>
          <dl className="gw__nums">
            <div className="gw__n"><dt>Square feet today</dt><dd><b>5,000</b><small>sq ft</small></dd><dd className="gw__was">It started as <s>1,000</s></dd></div>
            <div className="gw__s"><dt>Students this season</dt><dd><b>{SITE.students}</b><small>students</small></dd><dd className="gw__was">Kids, teens and adults</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

/**
 * About · "What we stand for". Not eight tiles: eight words, each one proved by a real moment from the
 * academy's own mats. Desktop: the words run down the left in outline; the one at the middle of the screen
 * is inked left to right with its red full stop and its proof line, and the photo frame held beside it
 * opens that word's photo from the logo's diamond (no pin, the frame is sticky). Phones: each word with its
 * photo and line, the ink and the diamond driven by the scroll.
 */
export function Values() {
  const root = useRef<HTMLElement>(null)
  const [act, setAct] = useState(0)
  useGSAP(() => {
    const r = root.current!
    if (motionOK()) lines(r.querySelector('h2')!)
    r.querySelectorAll<HTMLElement>('.vl__it').forEach((it, i) => {
      ScrollTrigger.create({ trigger: it, start: 'top 58%', end: 'bottom 58%', onToggle: (self) => { if (self.isActive) setAct(i) } })
    })
    if (!motionOK()) return
    // phones: each word is inked by the scroll itself and its photo opens from the logo's diamond
    gsap.matchMedia().add('(max-width: 899px)', () => {
      r.querySelectorAll<HTMLElement>('.vl__it').forEach((it) => {
        gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 88%', end: 'top 30%', scrub: 0.5 } })
          .fromTo(it.querySelector('.vl__w'), { backgroundPosition: '100% 0%' }, { backgroundPosition: '0% 0%', ease: 'none', duration: 0.6 }, 0)
          .fromTo(it.querySelector('.vl__ph'), { clipPath: 'polygon(50% 46%, 54% 50%, 50% 54%, 46% 50%)' }, { clipPath: 'polygon(50% -60%, 160% 50%, 50% 160%, -60% 50%)', ease: 'power2.inOut', duration: 1 }, 0.15)
          .fromTo(it.querySelector('.vl__ph img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, 0.15)
          .fromTo(it.querySelector('.vl__p'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0.75)
      })
    })
  }, { scope: root })
  const items = VALUES.items
  return (
    <section className="sec vl" id="values" aria-labelledby="vl-h" ref={root}>
      <div className="shell">
        <div className="head head--row">
          <div><Tag>{VALUES.tag}</Tag><h2 className="t t-1" id="vl-h"><TitleText title={VALUES.title} /></h2></div>
          <p className="lead">{VALUES.lead}</p>
        </div>
        <div className="vl__grid">
          <ol className="vl__list" role="list">
            {items.map((v, i) => (
              <li key={v.word} className={`vl__it${i === act ? ' on' : ''}`}>
                <span className="vl__n">{pad(i + 1)}</span>
                <b className="vl__w">{v.word}<i aria-hidden="true">.</i></b>
                <i className="vl__ph"><Photo photo={v.photo} sizes="92vw" /></i>
                <p className="vl__p">{v.line}</p>
              </li>
            ))}
          </ol>
          <div className="vl__frame" aria-hidden="true">
            {items.map((v, i) => (
              <span key={v.word} className={`vl__img${i === act ? ' on' : ''}${i < act ? ' past' : ''}`} style={{ zIndex: i + 1 }}>
                <Photo photo={v.photo} alt="" sizes="(max-width: 899px) 1px, 44vw" />
              </span>
            ))}
            <span className="vl__cap"><Mark /><b>{pad(act + 1)}</b><em>/ {pad(items.length)}</em><span>{items[act].word}</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
