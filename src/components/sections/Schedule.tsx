import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { CLASSES, DAYS, DAY_LONG, classesOn, fmt, type Day, type Klass } from '../../data/site'
import { lines, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { useBooking } from '../../nd'
import { Cta } from '../ui/Cta'
import { Tag, TitleText, type Title } from '../ui/Title'

type Filter = 'all' | 'kids' | 'adults' | 'other'
const FILTERS: { k: Filter; label: string }[] = [{ k: 'all', label: 'All classes' }, { k: 'kids', label: 'Kids & teens BJJ' }, { k: 'adults', label: 'Adult BJJ' }, { k: 'other', label: 'Judo · Capoeira · Box' }]
const SLOTS = [...new Set(CLASSES.map((c) => c.start))].sort((a, b) => a - b)
const WEEK: Day[] = DAYS.filter((d) => d !== 'Sat')

/**
 * "When can I train?" The week as a board (desktop) or day tabs (phones). Every class is a button:
 * it opens the booking form on that class's audience. Today is marked after mount, in Hyannis time.
 * `only` limits the board to one program (the program pages).
 */
export function Schedule({ only, title = { a: 'Weekly ', b: 'schedule.' }, tag = 'Schedule' }: { only?: string; title?: Title; tag?: string }) {
  const root = useRef<HTMLElement>(null)
  const { open } = useBooking()
  const [filter, setFilter] = useState<Filter>('all')
  const [today, setToday] = useState<Day | null>(null)
  const [day, setDay] = useState<Day>('Mon')
  useEffect(() => {
    try {
      const d = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'America/New_York' }).format(new Date()) as Day
      if (WEEK.includes(d)) { setToday(d); setDay(d) }
    } catch { /* no time zones: no Today tag */ }
  }, [])
  useGSAP(() => { if (motionOK()) lines(root.current!.querySelector('h2')!) }, { scope: root })

  const mine = (c: Klass) => !only || c.program === only
  const shown = (c: Klass) => mine(c) && (filter === 'all' || c.kind === filter)
  const book = (c: Klass) => open({ audience: c.kind === 'kids' ? 'kids' : 'adults' })
  const slots = SLOTS.filter((s) => CLASSES.some((c) => c.start === s && mine(c)))
  const days = WEEK.filter((d) => classesOn(d).some(mine))
  const onKey = (e: KeyboardEvent) => {
    const i = days.indexOf(day)
    if (e.key === 'ArrowRight') setDay(days[(i + 1) % days.length])
    if (e.key === 'ArrowLeft') setDay(days[(i + days.length - 1) % days.length])
  }
  const list = classesOn(day).filter(shown)

  return (
    <section className="sec sc" id="schedule" aria-labelledby="sc-h" ref={root}>
      <div className="shell">
        <div className="head">
          <div><Tag>{tag}</Tag><h2 className="t t-1" id="sc-h"><TitleText title={title} /></h2></div>
          <div className="sc__side">
            <p className="lead">Monday to Friday, Hyannis time. Tap any class to book your free trial in it.</p>
            {!only ? <div className="sc__filters" role="group" aria-label="Filter classes">{FILTERS.map((f) => <button key={f.k} type="button" aria-pressed={filter === f.k} onClick={() => setFilter(f.k)}>{f.label}</button>)}</div> : null}
          </div>
        </div>
        <div className="board" role="region" aria-label="Weekly class schedule">
          <table>
            <thead><tr><th scope="col">Time</th>{WEEK.map((d) => <th key={d} scope="col" className={d === today ? 'today' : undefined}>{DAY_LONG[d]}{d === today ? <small>Today</small> : null}</th>)}</tr></thead>
            <tbody>
              {slots.map((s) => (
                <tr key={s}>
                  <th scope="row">{fmt(s)}</th>
                  {WEEK.map((d) => (
                    <td key={d} className={d === today ? 'today' : undefined}>
                      {classesOn(d).filter((c) => c.start === s && mine(c)).map((c) => (
                        <button key={c.name} type="button" className={`cls cls--${c.kind}${shown(c) ? '' : ' dim'}`} tabIndex={shown(c) ? undefined : -1} aria-hidden={shown(c) ? undefined : true} onClick={() => book(c)}>
                          <b>{c.name}</b><small>{c.ages} · until {fmt(c.end)}</small>
                        </button>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="days">
          <div className="days__tabs" role="tablist" aria-label="Day" onKeyDown={onKey}>
            {days.map((d) => <button key={d} type="button" role="tab" aria-selected={day === d} tabIndex={day === d ? 0 : -1} onClick={() => setDay(d)}>{d}{d === today ? <i aria-label="today" /> : null}</button>)}
          </div>
          <div role="tabpanel" aria-label={DAY_LONG[day]}>
            <ul className="days__list" role="list">
              {list.map((c) => (
                <li key={c.name + c.start}><button type="button" className={`cls--${c.kind}`} onClick={() => book(c)}><time>{fmt(c.start)}</time><span><b>{c.name}</b><small>{c.ages} · until {fmt(c.end)}</small></span><em>Book</em></button></li>
              ))}
              {!list.length ? <li className="days__none">No class on {DAY_LONG[day]}.</li> : null}
            </ul>
          </div>
        </div>
        <div className="sc__foot"><p>Saturday and Sunday: closed. A 30-minute private trial is available.</p><Cta size="sm" /></div>
      </div>
    </section>
  )
}
