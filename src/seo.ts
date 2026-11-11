import { CLASSES, DAY_LONG, FAQ, PROFESSOR, PROGRAMS, SITE, TEAM, TRACKS, classesOf, fmt, type Day } from './data/site'
import type { Route } from './routes'

declare const __SITE__: string
export const ORIGIN: string = typeof __SITE__ === 'string' ? __SITE__ : 'http://localhost:4173'

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

function hours() {
  const byDay = new Map<Day, { open: number; close: number }>()
  for (const c of CLASSES) for (const d of c.days) { const cur = byDay.get(d); byDay.set(d, { open: Math.min(cur?.open ?? 1e9, c.start), close: Math.max(cur?.close ?? 0, c.end) }) }
  return [...byDay].map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${DAY_LONG[d]}`, opens: hhmm(h.open), closes: hhmm(h.close) }))
}

/** JSON-LD for a route: the academy and its head coach everywhere; the FAQ on the home page; the
 *  article on a post; breadcrumbs on inner pages. Only facts from the client (no rating markup:
 *  Google gives no stars to a business's own reviews). */
export function jsonLd(route: Route) {
  const a = SITE.address
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'SportsActivityLocation', '@id': `${ORIGIN}/#academy`, name: SITE.academy, alternateName: SITE.name, legalName: SITE.legalName,
      url: `${ORIGIN}/`, logo: `${ORIGIN}${SITE.logo.src}`, image: `${ORIGIN}/og-image.jpg`, telephone: SITE.phone.e164, email: SITE.email,
      description: 'Family martial arts academy in Hyannis, MA: Brazilian Jiu-Jitsu for kids and adults, Judo, Capoeira, Box Fitness and women\'s self-defense.',
      address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: a.country },
      areaServed: ['Hyannis, MA', 'Barnstable, MA', 'Yarmouth, MA', 'Mashpee, MA', 'Cape Cod, MA'],
      sport: ['Brazilian Jiu-Jitsu', 'Judo', 'Capoeira', 'Boxing'],
      knowsAbout: PROGRAMS.map((p) => p.name), openingHoursSpecification: hours(),
      sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.youtube],
      founder: { '@id': `${ORIGIN}/#cristyan` }, employee: [{ '@id': `${ORIGIN}/#cristyan` }, ...TEAM.map((c) => ({ '@type': 'Person', name: c.name, jobTitle: `${c.art} instructor` }))],
    },
    { '@type': 'Person', '@id': `${ORIGIN}/#cristyan`, name: 'Cristyan Martins', jobTitle: `${PROFESSOR.role}, ${PROFESSOR.rank}`, description: PROFESSOR.facts.join(', '), worksFor: { '@id': `${ORIGIN}/#academy` } },
    { '@type': 'WebSite', '@id': `${ORIGIN}/#site`, url: `${ORIGIN}/`, name: SITE.name, publisher: { '@id': `${ORIGIN}/#academy` } },
  ]
  if (route.path === '/') graph.push({ '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  if (route.article) graph.push({ '@type': 'BlogPosting', headline: route.title.split(' | ')[0], description: route.description, datePublished: route.article.date, dateModified: route.article.date, author: { '@id': `${ORIGIN}/#academy` }, publisher: { '@id': `${ORIGIN}/#academy` }, mainEntityOfPage: `${ORIGIN}${route.path}` })
  if (route.path !== '/') {
    const parts = route.path.split('/').filter(Boolean)
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ name: 'Home', path: '' }, ...parts.map((p, i) => ({ name: p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), path: '/' + parts.slice(0, i + 1).join('/') }))].map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `${ORIGIN}${b.path || '/'}` })) })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

/** llms.txt: the academy in plain text for AI search. */
export function llms() {
  const week = CLASSES.map((c) => `- ${c.name} (${c.ages}): ${c.days.map((d) => DAY_LONG[d]).join(', ')}, ${fmt(c.start)} to ${fmt(c.end)}`).join('\n')
  return `# ${SITE.academy} (${SITE.name})

> Family martial arts academy in Hyannis, Massachusetts (Cape Cod). Brazilian Jiu-Jitsu for kids (ages 4 to 15) and adults (16+), Teen & Adult Judo, Capoeira, Box Fitness and Women's Self-Defense & Fitness. Led by Professor Cristyan Martins, 4th-degree black belt and two-time world champion. Free trial class.

- Address: ${SITE.address.line}
- Phone: ${SITE.phone.display}
- Email: ${SITE.email}
- Google rating: ${SITE.google.rating} from ${SITE.google.count} reviews
- Head coach: Cristyan Martins. ${PROFESSOR.facts.join('. ')}.
- Free trial class: 60 minutes inside a regular class, kimono on loan, bring a t-shirt, no sparring, at most 5 trial students per class; a 30-minute private trial is available.
- Belt promotion: kids earn a stripe every 30 classes in 90 days; adults every 60 classes in 120 days; two graduation ceremonies a year.

## Programs
${TRACKS.map((t) => `- ${t.name} (${t.tag}): ${ORIGIN}/programs/${t.slug}. Classes: ${classesOf(t).map((c) => `${c.name} (${c.ages})`).join(', ')}`).join('\n')}

## Weekly schedule (Hyannis time; Saturday and Sunday closed)
${week}

## Instructors
${TEAM.map((c) => `- ${c.name}, ${c.art}${c.rank ? `, ${c.rank}` : ''}`).join('\n')}

## FAQ
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

`
}
