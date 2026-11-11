/** The brand mark, drawn: the diamond, its inner diamond and the circle of the logo (the full logo
 *  stays the PNG). Used in the buttons, as the photo window's frame and as the pattern of the badges. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 1.5 46.5 24 24 46.5 1.5 24Z" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M24 8 40 24 24 40 8 24Z" fill="currentColor" />
      <circle cx="24" cy="24" r="9.5" fill="none" stroke="var(--mark-cut)" strokeWidth="3.2" />
    </svg>
  )
}
