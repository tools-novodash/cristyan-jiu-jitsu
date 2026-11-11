import { useRef, useState, type CSSProperties } from 'react'
import { DAYS, STEPS, TRACKS, classesOf, fmt, slotOf, type ClassCard, type Track } from '../../data/site'
import { gsap, lines, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { useRail } from '../../lib/useRail'
import { Cta } from '../ui/Cta'
import { Icon } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { Photo } from '../ui/Photo'
import { Tag, TitleText } from '../ui/Title'

const pad = (n: number) => String(n).padStart(2, '0')

/** The arrows and the count under a swipeable rail (phones; the desktop grid has no rail). */
export function RailNav({ go, at, count, label, light }: { go: (d: number) => void; at: number; count: number; label: string; light?: boolean }) {
  return (
    <div className={`rnav${light ? ' rnav--l' : ''}`}>
      <span className="rnav__n" aria-hidden="true">{pad(Math.min(count, at + 1))} / {pad(count)}</span>
      <span className="rnav__b">
        <button type="button" className="sq" aria-label={`Previous ${label}`} onClick={() => go(-1)}><Icon name="back" /></button>
        <button type="button" className="sq" aria-label={`Next ${label}`} onClick={() => go(1)}><Icon name="arrow" /></button>
      </span>
    </div>
  )
}
const href = (c: ClassCard) => `/programs/${c.track}#${c.id}`

/**
 * The three tracks as tabs that switch on hover (Adryan, 11/11), also on focus and tap: Adults BJJ (with
 * the women's class), Kids BJJ, and Judo, Capoeira & Box. Each tab shows its classes, every one linking
 * straight to its chapter on the track page. `menu` is the compact panel under "Programs" in the nav;
 * `page` is the big version at the top of /programs.
 */
export function TrackTabs({ variant = 'page' }: { variant?: 'page' | 'menu' }) {
  const [on, setOn] = useState(0)
  const [ca, setCa] = useState(0)
  const rail = useRail<HTMLUListElement>(on)
  const pick = (i: number) => { if (i !== on) { setOn(i); setCa(0) } }
  const t = TRACKS[on], list = classesOf(t)
  const id = `tt-${variant}`
  return (
    <div className={`tt tt--${variant}`}>
      <div className="tt__tabs" role="tablist" aria-label="Programs">
        {TRACKS.map((x, i) => (
          <button key={x.slug} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={i === on} aria-controls={`${id}-panel`} className="tt__tab"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') pick(i) }} onFocus={() => pick(i)} onClick={() => pick(i)}>
            <span className="tt__no">{pad(i + 1)}</span>
            <b>{x.short}</b>
            <small>{classesOf(x).length} classes</small>
          </button>
        ))}
      </div>
      {variant === 'menu' ? (
        <div className="tt__panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${on}`} key={t.slug}>
          <a className="tt__intro" href={`/programs/${t.slug}`} data-nav="dark">
            <Photo photo={t.photo} sizes="300px" alt="" />
            <span className="tt__ibody"><span className="tt__tag">{t.tag}</span><b>{t.name}</b><span className="tt__all">See every class <Icon name="arrow" /></span></span>
          </a>
          <ul className="tt__list" role="list">
            {list.map((c, i) => (
              <li key={c.id} style={{ '--i': i } as CSSProperties}>
                <a href={href(c)}>
                  <span className="tt__th"><Photo photo={c.photo} sizes="120px" alt="" /></span>
                  <span className="tt__cb"><b>{c.name}</b><small>{c.ages}</small></span>
                  <span className="tt__when">{c.when}</span>
                  <Icon name="arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="tt__panel tt__panel--cards" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${on}`} key={t.slug}>
          <div className="tt__phead">
            <div><span className="tt__tag">{t.tag}</span><h3 className="t t-2">{t.name}</h3></div>
            <p>{t.lead}</p>
            <a className="ghost" href={`/programs/${t.slug}`}><span>See every class</span><Icon name="arrow" /></a>
          </div>
          <ul className="tt__cards" role="list" ref={rail.ref} style={{ '--n': list.length } as CSSProperties}>
            {list.map((c, i) => (
              <li key={c.id} style={{ '--i': i } as CSSProperties}>
                <a className={`pc${i === ca ? ' is-active' : ''}`} href={href(c)} onPointerEnter={(e) => { if (e.pointerType === 'mouse') setCa(i) }} onFocus={() => setCa(i)}>
                  <i className="pc__clip" aria-hidden="true"><i className="pc__mark"><Mark /></i></i>
                  <i className="pc__img"><Photo photo={c.photo} sizes="(max-width: 899px) 78vw, 300px" /><i className="pc__no" aria-hidden="true">{pad(i + 1)}</i></i>
                  <span className="pc__body">
                    <span className="pc__age">{c.ages}</span>
                    <span className="pc__name">{c.name}</span>
                    <span className="pc__txt">{c.fit}</span>
                    <span className="pc__foot">
                      <span className="pc__times">{c.when.split(', ').map((w) => <i key={w}>{w}</i>)}</span>
                      <span className="pc__go" aria-hidden="true"><Icon name="arrow" /></span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <RailNav go={rail.go} at={rail.at} count={list.length} label="class" />
        </div>
      )}
    </div>
  )
}

/** /programs · the tabs as the page's first section. */
export function TracksSection() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => { if (motionOK()) lines(root.current!.querySelector('h2')!) }, { scope: root })
  return (
    <section className="sec tts" id="tracks" aria-labelledby="tts-h" ref={root}>
      <div className="shell">
        <div className="head head--row">
          <div><Tag>Three tracks · {TRACKS.reduce((n, t) => n + classesOf(t).length, 0)} classes</Tag><h2 className="t t-1" id="tts-h">Choose your <span className="hl">track.</span></h2></div>
          <p className="lead">Point at a track to see its classes, then open the one that fits. Every class has a free first class.</p>
        </div>
        <TrackTabs />
      </div>
    </section>
  )
}

function Week({ c }: { c: ClassCard }) {
  const slots = slotOf(c)
  if (!slots.length) return <p className="cp__ask"><Icon name="clock" />{c.when}</p>
  return (
    <ol className="cp__week" role="list" aria-label={`${c.name} times: ${c.when}`}>
      {DAYS.filter((d) => d !== 'Sat').map((d) => {
        const s = slots.find((k) => k.days.includes(d))
        return <li key={d} className={s ? 'on' : ''} aria-hidden="true"><b>{d}</b><span>{s ? fmt(s.start).replace(' PM', '') : '·'}</span></li>
      })}
    </ol>
  )
}

/**
 * A track page, class by class (the Gonzales chapter structure). Beside the chapters, the track's path:
 * its classes on a vertical line of diamonds, the line filling as you read and the class you are on
 * lit in red. Each chapter: the photo with its number, the class, who it fits, what you do, the chips, the
 * week it runs and the button that books that audience. Phones: the chapters stacked, no side path.
 */
export function TrackPath({ t }: { t: Track }) {
  const root = useRef<HTMLElement>(null)
  const list = classesOf(t)
  const [act, setAct] = useState(0)
  useGSAP(() => {
    const r = root.current!
    r.querySelectorAll<HTMLElement>('.cp').forEach((el, i) => ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => { if (s.isActive) setAct(i) } }))
    if (!motionOK()) return
    gsap.fromTo(r.querySelector('.tp__fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: r.querySelector('.tp__chaps'), start: 'top 55%', end: 'bottom 55%', scrub: true } })
    r.querySelectorAll<HTMLElement>('.cp').forEach((el) => {
      gsap.fromTo(el.querySelector('.cp__ph img'), { clipPath: 'inset(100% 0 0 0)', scale: 1.15 }, { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
      gsap.fromTo(el.querySelectorAll('.cp__body > *'), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 72%', once: true } })
    })
  }, { scope: root })
  const others = TRACKS.filter((x) => x.slug !== t.slug)
  return (
    <section className="sec tp" id="classes" aria-label={`${t.name}, class by class`} ref={root}>
      <div className="shell tp__grid">
        <aside className="tp__side" aria-hidden="true">
          <p className="tp__sl">Your path</p>
          <ol className="tp__path">
            <i className="tp__line"><i className="tp__fill" /></i>
            {list.map((c, i) => (
              <li key={c.id} className={i === act ? 'on' : i < act ? 'done' : ''}><a href={`#${c.id}`} tabIndex={-1}><i /><span><b>{c.name}</b><small>{c.ages}</small></span></a></li>
            ))}
          </ol>
        </aside>
        <div className="tp__chaps">
          {list.map((c, i) => (
            <article key={c.id} className={`cp${i % 2 ? ' cp--r' : ''}`} id={c.id} aria-labelledby={`${c.id}-h`}>
              <div className="cp__ph">
                <Photo photo={c.photo} sizes="(max-width: 899px) 92vw, 480px" />
                <span className="cp__no" aria-hidden="true">{pad(i + 1)}</span>
              </div>
              <div className="cp__body">
                <p className="cp__k"><Mark />Class {pad(i + 1)} of {pad(list.length)} · {c.ages}</p>
                <h2 className="t t-2" id={`${c.id}-h`}>{c.name}</h2>
                <p className="cp__fit">{c.fit}</p>
                <p className="cp__txt">{c.text}</p>
                <ul className="cp__chips" role="list">{c.chips.map((x) => <li key={x}>{x}</li>)}</ul>
                <Week c={c} />
                <div className="cp__acts"><Cta audience={c.audience} /><a className="ghost" href="/schedule"><span>Full schedule</span><Icon name="arrow" /></a></div>
              </div>
            </article>
          ))}
          <nav className="tp__more" aria-label="Other tracks">
            {others.map((o) => (
              <a key={o.slug} href={`/programs/${o.slug}`} data-nav="dark">
                <Photo photo={o.photo} sizes="(max-width: 899px) 92vw, 40vw" alt="" />
                <span><small>Next track</small><b>{o.name}</b><Icon name="arrow" /></span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}

/**
 * /programs · how to start in three steps (Adryan, 11/11: as an admission ticket, the simple band read as
 * too plain). A red section and, held across the screen, a black band carrying the ticket: three coupons
 * torn along dashed lines, the handwritten title of each, and the stub. As you scroll the line fills, each
 * coupon lights up and the one you passed gets its "Done" stamp. Desktop: the stage is sticky for two screens. Phones: the three steps stacked.
 */
export function Steps() {
  const root = useRef<HTMLElement>(null)
  const [at, setAt] = useState(0)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    gsap.matchMedia().add('(min-width: 900px)', () => {
      let last = -1
      gsap.fromTo(r.querySelector('.s3__fill'), { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: r, start: 'top top', end: 'bottom bottom', scrub: 0.5, onUpdate: (st) => { const i = Math.min(3, Math.floor(st.progress * 3.6)); if (i !== last) { last = i; setAt(i) } } },
      })
      r.classList.add('is-live')
      return () => { r.classList.remove('is-live'); setAt(0) }
    })
  }, { scope: root })
  return (
    <section className="s3" data-nav="dark" aria-labelledby="s3-h" ref={root}>
      <div className="s3__stage">
        <div className="shell s3__in">
          <div className="s3__head"><Tag light>{STEPS.tag}</Tag><h2 className="t t-1" id="s3-h"><TitleText title={STEPS.title} /></h2></div>
          <div className="s3__band">
            <div className="s3tk">
              <div className="s3tk__main">
                <p className="s3tk__hd"><span>Admit one</span><span>Free trial · three steps</span></p>
                <ol className="s3__list" role="list">
                  <i className="s3__line" aria-hidden="true"><i className="s3__fill" /></i>
                  {STEPS.items.map((s, i) => (
                    <li key={s.t} className={i < at ? 'on done' : i === at ? 'on' : ''}>
                      <span className="s3__dot" aria-hidden="true"><b>{i + 1}</b></span>
                      <b className="s3__t hand">{s.t}</b>
                      <p>{s.d}</p>
                      <span className="s3__stamp hand" aria-hidden="true">Done</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="tk__stub s3tk__stub" aria-hidden="true"><Mark /><span>Cristyan Jiu-Jitsu</span><span>No. 002</span></div>
            </div>
          </div>
          <div className="s3__acts"><Cta /></div>
        </div>
      </div>
    </section>
  )
}
