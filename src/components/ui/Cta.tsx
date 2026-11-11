import type { MouseEvent } from 'react'
import { CTA } from '../../data/site'
import { cn } from '../../lib/utils'
import { useBooking } from '../../nd'
import { Mark } from './Mark'

type Props = { label?: string; className?: string; id?: string; tone?: 'r' | 'w'; size?: 'md' | 'sm'; audience?: 'kids' | 'adults' }

/** The booking button: red pill, the mark white in a dark red circle, a ring that pulses out of it.
 *  A link to #book (the Novo Dash kit opens its form); with `audience` it opens on those classes. */
export function Cta({ label = CTA, className, id, tone = 'r', size = 'md', audience }: Props) {
  const { open } = useBooking()
  const onClick = audience ? (e: MouseEvent) => { e.preventDefault(); open({ audience }) } : undefined
  return (
    <a href="#book" id={id} className={cn('cta', tone === 'w' && 'cta--w', size === 'sm' && 'cta--sm', className)} onClick={onClick}>
      <span>{label}</span>
      <span className="cta__m" aria-hidden="true"><Mark /></span>
    </a>
  )
}

/** The quiet second action (see the schedule, call): text + arrow, no box. */
export function Ghost({ href, children, className }: { href: string; children: string; className?: string }) {
  return <a href={href} className={cn('ghost', className)}><span>{children}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
}
