import { useRef } from 'react'
import { PASSPORT, PROFESSOR, TEAM } from '../../data/site'
import { gsap, lines, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Cta } from '../ui/Cta'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag } from '../ui/Title'

/**
 * Instructors · the head coach as a passport (the Gonzales/Fight Sports model): the photo page with his
 * details and the record page with the stamps; it lands tilted, the photo develops from the bottom, the
 * stamps are pressed one by one. Beside it, the bio and the button. Phones: one column, the stamps page
 * swings open as it comes up.
 */
export function Passport() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    lines(r.querySelector('h2')!)
    const pass = r.querySelector('.pass')!, stamps = gsap.utils.toArray<HTMLElement>('.pstamp', r)
    gsap.set(stamps, { autoAlpha: 0, scale: 1.9 })
    ScrollTrigger.create({ trigger: pass, start: 'top 82%', once: true, onEnter: () => {
      const tl = gsap.timeline()
      tl.fromTo(pass, { rotateX: 24, y: 60, rotateZ: -1.5, autoAlpha: 0 }, { rotateX: 6, y: 0, rotateZ: -1.5, autoAlpha: 1, duration: 1.1, ease: 'expo.out', transformPerspective: 1800, transformOrigin: '50% 100%' }, 0)
        .fromTo(r.querySelector('.pass__photo img'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0.2)
      stamps.forEach((st, k) => tl.to(st, { autoAlpha: 0.88, scale: 1, duration: 0.2, ease: 'power4.in' }, 0.9 + k * 0.3).to(pass, { y: 3, duration: 0.07, yoyo: true, repeat: 1 }, '<+.18'))
    } })
  }, { scope: root })
  return (
    <section className="sec ow" id="head-coach" aria-labelledby="ow-h" ref={root}>
      <div className="shell ow__in">
        <div className="pass">
          <div className="pass__page">
            <p className="pass__hd"><span>{PASSPORT.hd[0]}</span><span>{PASSPORT.hd[1]}</span></p>
            <div className="pass__id">
              <div className="pass__photo"><Photo photo={PROFESSOR.photo} sizes="(max-width: 899px) 45vw, 240px" /><span className="pass__crest" aria-hidden="true"><Mark /></span></div>
              <dl>{PASSPORT.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div>
            <i className="pass__mrz" aria-hidden="true"><i>{PASSPORT.mrz[0]}</i><i>{PASSPORT.mrz[1]}</i></i>
          </div>
          <div className="pass__page pass__page--stamps">
            <p className="pass__hd"><span>{PASSPORT.hd2[0]}</span><span>{PASSPORT.hd2[1]}</span></p>
            <div className="pstamps" role="img" aria-label={`Stamps: ${PASSPORT.stamps.join(', ')}`}>
              {PASSPORT.stamps.map((s, i) => <span key={s} className={`pstamp pstamp--${i}`}><Mark /><b>{s}</b></span>)}
            </div>
          </div>
        </div>
        <div className="ow__copy">
          <Tag>The head coach</Tag>
          <h2 className="t t-1" id="ow-h">Professor <span className="hl">Cristyan Martins.</span></h2>
          {PROFESSOR.bio.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}
          <div className="ow__acts"><Cta /></div>
        </div>
      </div>
    </section>
  )
}

/** Instructors · every coach on ink (the Fight Sports /instructors pattern): two to a row, the portrait
 *  beside the name and the art with the belt only (Adryan, 11/11: no descriptions), mirrored column to column; each portrait unveils from the
 *  bottom, then the copy rises. Coaches without a photo yet carry the mark and their initials. */
export function Staff() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    lines(root.current!.querySelector('h2')!)
    root.current!.querySelectorAll<HTMLElement>('.inst').forEach((item) => {
      const tl = gsap.timeline({ paused: true })
      tl.fromTo(item.querySelector('.inst__photo > *'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' }, 0)
        .fromTo(item.querySelectorAll('.inst__body > *'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.35)
      ScrollTrigger.create({ trigger: item, start: 'top 85%', once: true, onEnter: () => tl.play() })
    })
  }, { scope: root })
  return (
    <section className="sec insts" data-nav="dark" id="team" aria-labelledby="insts-h" ref={root}>
      <div className="shell">
        <div className="head head--c"><Tag light>The team</Tag><h2 className="t t-1" id="insts-h">A family <span className="hl">on the mat.</span></h2></div>
        <ul className="insts__grid" role="list">
          {TEAM.map((c) => (
            <li className="inst" key={c.name}>
              <div className="inst__photo">{c.photo ? <Photo photo={c.photo} sizes="(max-width: 899px) 76vw, 22vw" /> : <span className="inst__mono"><Mark /><b>{c.name.split(' ').map((w) => w[0]).join('')}</b></span>}</div>
              <div className="inst__body">
                <span className="inst__role">{c.art}{c.rank ? ` · ${c.rank}` : ''}</span>
                <h3>{c.name.split(' ')[0]} <em>{c.name.split(' ').slice(1).join(' ')}</em></h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
