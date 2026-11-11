import { useRef, type CSSProperties } from 'react'
import { ABOUT, DAYLINE, HERO, KNOW, PROFESSOR, fmt, type Track } from '../data/site'
import { img } from '../data/img'
import { gsap, lines, rise, useGSAP } from '../lib/gsap'
import { motionOK } from '../lib/motion'
import { Growth, Story, Values } from '../components/sections/About'
import { Closing } from '../components/sections/Closing'
import { Faq } from '../components/sections/Faq'
import { Hero } from '../components/sections/Hero'
import { Invite } from '../components/sections/Invite'
import { Parents } from '../components/sections/Parents'
import { Professor } from '../components/sections/Professor'
import { ProgramTrack } from '../components/sections/Programs'
import { Steps, TrackPath, TracksSection } from '../components/sections/Tracks'
import { Reviews } from '../components/sections/Reviews'
import { Schedule } from '../components/sections/Schedule'
import { Passport, Staff } from '../components/sections/Team'
import { Tour } from '../components/sections/Tour'
import { Icon, type IconName } from '../components/ui/Icon'
import { Tag } from '../components/ui/Title'


// Each page has its own sections (Adryan, 10/11, the Gonzales structure): nothing repeats from page to page
// except the opening card and the closing call (and the reviews, on Home and About: Adryan, 11/11).

// ═════ Home ═════
export function Home() {
  return (
    <>
      <Hero home eyebrow={HERO.eyebrow} title={HERO.title} sub={HERO.sub} photo={HERO.photo} />
      <Invite />
      <ProgramTrack />
      <Professor />
      <Parents />
      <Tour />
      <Reviews />
      <Faq />
      <Closing />
    </>
  )
}

// ═════ Programs ═════
export function ProgramsPage() {
  return (
    <>
      <Hero eyebrow="Programs · Hyannis, MA" title={{ a: 'A class for ', b: 'every age.' }} crumbs={[{ label: 'Programs', href: '/programs' }]}
        sub="Kids Brazilian Jiu-Jitsu in four age groups, adults in three levels and a women's class, plus Judo, Capoeira and Box Fitness."
        photo={img('about_2', 'The whole academy, kids and adults, together on the mats')} pos="50% 60%" />
      <TracksSection />
      <Steps />
      <Closing />
    </>
  )
}

/** One track (Adults BJJ, Kids BJJ, or Judo, Capoeira & Box): the opening card, then every class as its
 *  own chapter beside the track's path, then the closing. */
export function TrackPage({ t }: { t: Track }) {
  const words = t.name.split(' ')
  return (
    <>
      <Hero eyebrow={t.tag} title={{ a: `${words.slice(0, -1).join(' ')} `, b: `${words.at(-1)}.` }}
        crumbs={[{ label: 'Programs', href: '/programs' }, { label: t.short, href: `/programs/${t.slug}` }]} sub={t.lead} photo={t.photo} audience={t.audience} />
      <TrackPath t={t} />
      <Closing />
    </>
  )
}

// ═════ Schedule ═════
/** Schedule · good to know (Adryan, 11/11: redone). A weekday as one line from 4:30 to 9:00 PM, the three
 *  blocks of classes filling in as it arrives; then the three other things to know, each with its icon.
 *  The ink runs straight into the closing photo, no hard edge. */
function Know() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    lines(r.querySelector('h2')!)
    gsap.fromTo(r.querySelectorAll('.kd__band i'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, stagger: 0.25, ease: 'expo.out', scrollTrigger: { trigger: r.querySelector('.kd'), start: 'top 78%', once: true } })
    gsap.fromTo(r.querySelectorAll('.kd__band > span'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.25, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: r.querySelector('.kd'), start: 'top 78%', once: true } })
    rise('.kn', r, { stagger: 0.1 })
  }, { scope: root })
  const span = DAYLINE.to - DAYLINE.from, pct = (m: number) => `${((m - DAYLINE.from) / span) * 100}%`
  const hours = [17, 18, 19, 20, 21].map((h) => h * 60)
  return (
    <section className="sec kn__sec" data-nav="dark" aria-labelledby="kn-h" ref={root}>
      <div className="shell">
        <div className="head head--row"><div><Tag light>Good to know</Tag><h2 className="t t-1" id="kn-h">A weekday <span className="hl">at the academy.</span></h2></div><p className="lead">{KNOW[0].d}</p></div>
        <div className="kd">
          <ol className="kd__bar" role="list">
            {DAYLINE.bands.map((b) => (
              <li key={b.t} className="kd__band" style={{ left: pct(b.from), width: `calc(${pct(b.to)} - ${pct(b.from)})` } as CSSProperties}>
                <i aria-hidden="true" />
                <span><time>{fmt(b.from)}</time><b>{b.t}</b><small>{b.d}</small></span>
              </li>
            ))}
          </ol>
          <div className="kd__ticks" aria-hidden="true">{[DAYLINE.from, ...hours].map((m) => <span key={m} style={{ left: pct(m) }}>{fmt(m).replace(':00', '')}</span>)}</div>
        </div>
        <ul className="kn__grid" role="list">
          {KNOW.slice(1).map((k) => (
            <li key={k.k} className="kn">
              <span className="kn__ic" aria-hidden="true"><Icon name={(k.icon ?? 'check') as IconName} /></span>
              <b>{k.t}</b>
              <p>{k.d}</p>
              {k.icon === 'cal' ? <span className="kn__wk" aria-hidden="true">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <i key={i} className={i > 4 ? 'off' : ''}>{d}</i>)}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SchedulePage() {
  return (
    <>
      <Hero eyebrow="Schedule · Monday to Friday" title={{ a: 'Find your ', b: 'time.' }} crumbs={[{ label: 'Schedule', href: '/schedule' }]}
        sub="Kids train first, from 4:30 PM, then teens, then adults until 9:00 PM. Every class on the board accepts a free trial."
        photo={img('kids_1', 'The kids classes lined up on the mat in front of the academy logo')} pos="50% 55%" />
      <Schedule title={{ a: 'This ', b: 'week.' }} />
      <Know />
      <Closing />
    </>
  )
}

// ═════ Instructors ═════
export function InstructorsPage() {
  return (
    <>
      <Hero eyebrow="Instructors" title={{ a: 'Led by a ', b: 'world champion.' }} crumbs={[{ label: 'Instructors', href: '/instructors' }]}
        sub="Professor Cristyan Martins, 4th-degree black belt, two-time world champion, 20 years teaching. He teaches with his family and a team of specialists."
        photo={PROFESSOR.family} pos="50% 30%" />
      <Passport />
      <Professor />
      <Staff />
      <Closing title="Train with the team." />
    </>
  )
}

// ═════ About ═════
export function AboutPage() {
  return (
    <>
      <Hero eyebrow="About the academy" title={{ a: 'Real technique. ', b: 'Real progress.' }} crumbs={[{ label: 'About', href: '/about' }]}
        sub="A family academy in Hyannis, on Cape Cod: structured classes, a clear curriculum and coaches who know every student by name."
        photo={ABOUT.space} />
      <Story />
      <Growth />
      <Values />
      <Reviews />
      <Closing />
    </>
  )
}

