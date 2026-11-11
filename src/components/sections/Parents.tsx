import { useRef, useState } from 'react'
import { PARENTS } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { motionOK } from '../../lib/motion'
import { Cta } from '../ui/Cta'
import { Icon } from '../ui/Icon'
import { Mark } from '../ui/Mark'
import { Rich } from '../ui/Rich'
import { Tag, TitleText } from '../ui/Title'

const X = PARENTS.exchanges
const N = X.length
const pad = (n: number) => String(n).padStart(2, '0')
const clamp = (v: number) => Math.max(0, Math.min(1, v))

/**
 * "Is it right for my child?" (Adryan, 11/11: the same idea as before, the questions parents really have,
 * in a form of its own). What parents search before the first class: a square search field types each
 * worry letter by letter as you scroll, the suggestions drop down, it is sent, and the academy's answer
 * lands as the result; the search history on the left ticks off as you go. Desktop: a sticky stage about
 * four screens tall, every frame derived from the scroll. Phones and reduced motion (Adryan, 11/11): the
 * same questions as message bubbles, the parent's on the right, the academy's red answer on the left.
 */
export function Parents() {
  const root = useRef<HTMLElement>(null)
  const [k, setK] = useState(0)
  useGSAP(() => {
    if (!motionOK()) return
    const r = root.current!
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const typed = r.querySelector<HTMLElement>('.ps__typed')!, field = r.querySelector<HTMLElement>('.ps__field')!
      const drop = r.querySelector<HTMLElement>('.ps__drop')!, sugg = [...r.querySelectorAll<HTMLElement>('.ps__drop li span')]
      const cards = [...r.querySelectorAll<HTMLElement>('.ps__res')]
      const end = r.querySelector<HTMLElement>('.ps__end')!
      let lastK = -1, lastChars = -1
      const paint = (p: number) => {
        const t = p * N, i = Math.min(N - 1, Math.floor(t)), u = t - i
        if (i !== lastK) { lastK = i; setK(i); X[i].s.forEach((s, j) => { if (sugg[j]) sugg[j].textContent = s }) }
        const q = X[i].q, n = Math.round(clamp(u / 0.32) * q.length)
        if (n !== lastChars) { lastChars = n; typed.textContent = q.slice(0, n) }
        field.classList.toggle('is-sent', u >= 0.38 && u < 0.9)
        drop.classList.toggle('on', u > 0.1 && u < 0.38)
        cards.forEach((c, j) => {
          let o = 0, y = 40
          if (j === i) {
            const a = clamp((u - 0.4) / 0.12), b = i < N - 1 ? clamp((u - 0.88) / 0.12) : 0
            o = a * (1 - b); y = 40 * (1 - a) - 40 * b
          }
          c.style.opacity = String(o); c.style.transform = `translate3d(0,${y}px,0)`; c.style.visibility = o > 0.01 ? 'visible' : 'hidden'
        })
        const e = clamp((t - (N - 0.45)) / 0.2)
        end.style.opacity = String(e); end.style.transform = `translate3d(0,${20 * (1 - e)}px,0)`
      }
      const proxy = { p: 0 }
      paint(0)
      gsap.to(proxy, { p: 1, ease: 'none', onUpdate: () => paint(proxy.p), scrollTrigger: { trigger: r, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true } })
      r.classList.add('is-live')
      return () => r.classList.remove('is-live')
    })
    mm.add('(max-width: 899px)', () => {
      r.querySelectorAll<HTMLElement>('.ps__item').forEach((e) => {
        const st = { trigger: e, start: 'top 84%', once: true }
        gsap.fromTo(e.querySelector('.ps__q'), { x: 30, scale: 0.92, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.6)', transformOrigin: '100% 100%', scrollTrigger: st })
        gsap.fromTo(e.querySelector('.ps__a'), { x: -30, scale: 0.92, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.6, delay: 0.45, ease: 'back.out(1.6)', transformOrigin: '0% 100%', scrollTrigger: st })
      })
    })
  }, { scope: root })

  const head = (id: string) => (
    <div className="ps__top">
      <div><Tag>{PARENTS.tag}</Tag><h2 className="t t-1" id={id}><TitleText title={PARENTS.title} /></h2></div>
      <p className="lead">{PARENTS.lead}</p>
    </div>
  )
  const from = (
    <span className="ps__from"><span className="ps__av" aria-hidden="true"><Mark /></span><span><b>{PARENTS.from}</b><i>{PARENTS.place} · answered by the academy</i></span></span>
  )

  return (
    <section className="ps" id="parents" aria-labelledby="ps-h" ref={root}>
      <div className="ps__stage">
        <div className="shell ps__in">
          {head('ps-h')}
          <div className="ps__grid">
            <div className="ps__hist">
              <p className="ps__hl"><Icon name="clock" />Searched before the first class <b>{pad(k + 1)} / {pad(N)}</b></p>
              <ol role="list">
                {X.map((x, i) => <li key={x.q} className={i === k ? 'on' : i < k ? 'done' : ''}><span className="ps__ck" aria-hidden="true">{i < k ? <Icon name="check" /> : pad(i + 1)}</span>{x.q}</li>)}
              </ol>
            </div>
            <div className="ps__main">
              <div className="ps__field" aria-hidden="true">
                <Icon name="search" />
                <span className="ps__text"><span className="ps__typed">{X[0].q}</span><i className="ps__caret" /></span>
                <span className="ps__go"><Icon name="arrow" /></span>
                <ul className="ps__drop" role="list">{X[0].s.map((s) => <li key={s}><Icon name="search" /><span>{s}</span></li>)}</ul>
              </div>
              <div className="ps__results">
                {X.map((x, i) => (
                  <article key={x.q} className="ps__res" aria-label={x.q}>
                    {from}
                    <p className="ps__ans"><Rich text={x.a} /></p>
                    <span className="ps__no" aria-hidden="true">{pad(i + 1)}</span>
                  </article>
                ))}
              </div>
              <div className="ps__end"><Cta audience="kids" label="Book your child's free class" /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="shell ps__flat">
        {head('ps-h2')}
        <ol className="ps__list" role="list">
          {X.map((x) => (
            <li key={x.q} className="ps__item">
              <p className="ps__q"><span>{x.q}</span><small>Parent · {PARENTS.place}</small></p>
              <div className="ps__a"><span className="ps__av" aria-hidden="true"><Mark /></span><div className="ps__ab"><b className="ps__who">{PARENTS.from}</b><p className="ps__ans"><Rich text={x.a} /></p></div></div>
            </li>
          ))}
        </ol>
        <div className="ps__fend"><Cta audience="kids" label="Book your child's free class" /></div>
      </div>
    </section>
  )
}
