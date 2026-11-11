import type { ReactNode } from 'react'

export type Title = { a: string; b: string }
/** The title device: the key part on the red band, white letters (the brand's version of Lobo's band). */
export function TitleText({ title }: { title: Title }) {
  return <>{title.a}<span className="hl">{title.b}</span></>
}
export function Tag({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`tag${light ? ' tag--l' : ''}`}>{children}</p>
}
