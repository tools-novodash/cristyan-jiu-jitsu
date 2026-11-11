import { useEffect, useRef, useState } from 'react'
import { LESSONS, PROGRAMS, programHref, type Program } from '../../data/site'
import { gsap, lines, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Icon } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag, TitleText, type Title } from '../ui/Title'

const pad = (n: number) => String(n).padStart(2, '0')

/** One program card (the Go Rin card): photo on top, the body below, the logo's mark surfacing behind
 *  the body when the card is the active one (black). Square, no rounded corners. */
function Card({ p, i, active }: { p: Program; i: number; active: boolean }) {
  const lessons = LESSONS[p.slug] ?? []
  const body = (
    <>
      <i className="pc__clip" aria-hidden="true"><i className="pc__mark"><Mark /></i></i>
      <i className="pc__img"><Photo photo={p.photo} sizes="(max-width: 899px) 80vw, 380px" /><i className="pc__no" aria-hidden="true">{pad(i + 1)}</i></i>
      <span className="pc__body">
        <span className="pc__age">{p.tag}</span>
        <span className="pc__name">{p.short}</span>
        <span className="pc__txt">{p.lead.split('. ')[0].replace(/ in Hyannis, MA/, '').replace(/\.$/, '')}.</span>
        <span className="pc__foot">
          <span className="pc__times">{lessons.length > 1 ? lessons.map((l) => <i key={l.name}>{l.name.replace(' BJJ', '')}</i>) : <i>{lessons[0]?.when ?? 'Ask for times'}</i>}</span>
          <span className="pc__go" aria-hidden="true"><Icon name="arrow" /></span>
        </span>
      </span>
    </>
  )
  return <a className={`pc${active ? ' is-active' : ''}`} href={programHref(p.slug)}>{body}</a>
}

/**
 * Home · "Is there a class for me?" The six programs on a track you drag (or swipe): the card in front
 * of you turns black and the mark surfaces in it; arrows, a counter and a rail measure the walk.
 */
export function ProgramTrack({ title = { a: 'Pick your ', b: 'program.' } as Title }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [act, setAct] = useState(0)
  const [prog, setProg] = useState(0)
  useGSAP(() => {
    if (!motionOK()) return
    lines(root.current!.querySelector('h2')!)
    gsap.fromTo('.pc', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: track.current, start: 'top 80%', once: true } })
  }, { scope: root })
  useEffect(() => {
    const t = track.current!
    let to = 0
    const onScroll = () => {
      const max = t.scrollWidth - t.clientWidth; setProg(max > 0 ? t.scrollLeft / max : 0)
      clearTimeout(to); to = window.setTimeout(() => {
        const mid = t.getBoundingClientRect().left + t.clientWidth * 0.35; let best = 0, bd = 1e9
        ;[...t.children].forEach((c, i) => { const r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i } })
        setAct(best)
      }, 70)
    }
    // mouse drag
    let down = false, sx = 0, sl = 0, moved = 0
    const pd = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = t.scrollLeft; moved = 0 }
    const pm = (e: PointerEvent) => { if (!down) return; const dx = e.clientX - sx; moved += Math.abs(dx); if (moved > 6) t.classList.add('is-drag'); t.scrollLeft = sl - dx }
    const pu = () => { down = false; requestAnimationFrame(() => t.classList.remove('is-drag')) }
    t.addEventListener('scroll', onScroll, { passive: true }); t.addEventListener('pointerdown', pd); t.addEventListener('pointermove', pm)
    ;['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => t.addEventListener(ev, pu))
    return () => { t.removeEventListener('scroll', onScroll); t.removeEventListener('pointerdown', pd); t.removeEventListener('pointermove', pm) }
  }, [])
  const go = (d: number) => { const t = track.current!; t.scrollBy({ left: d * ((t.firstElementChild as HTMLElement).offsetWidth + (parseFloat(getComputedStyle(t).columnGap) || 0)), behavior: 'smooth' }) }
  return (
    <section className="sec pt" id="programs" aria-labelledby="pt-h" ref={root}>
      <div className="shell">
        <div className="head head--row">
          <div><Tag>Programs</Tag><h2 className="t t-1" id="pt-h"><TitleText title={title} /></h2></div>
          <div className="pt__side">
            <p className="lead">Kids from age 4, teens and adults. Jiu-jitsu in age groups and levels, plus Judo, Capoeira and Box Fitness under one roof.</p>
            <div className="pt__nav"><button type="button" className="sq" aria-label="Previous program" onClick={() => go(-1)}><Icon name="back" /></button><button type="button" className="sq" aria-label="Next program" onClick={() => go(1)}><Icon name="arrow" /></button></div>
          </div>
        </div>
      </div>
      <div className="shell"><div className="pt__track" ref={track}>
        {PROGRAMS.map((p, i) => <div key={p.slug} className="pt__cell" onMouseEnter={() => setAct(i)} onFocus={() => setAct(i)}><Card p={p} i={i} active={i === act} /></div>)}
      </div></div>
      <div className="shell pt__bar" aria-hidden="true"><span>{pad(Math.min(PROGRAMS.length, 1 + Math.round(prog * (PROGRAMS.length - 1))))} / {pad(PROGRAMS.length)}</span><i><b style={{ transform: `scaleX(${prog})` }} /></i><a className="ghost" href="/programs">All programs and classes</a></div>
    </section>
  )
}
