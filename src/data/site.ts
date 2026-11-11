// ─────────────────────────────────────────────────────────────────────────────
// Every word and fact of the site. Sources: the onboarding form (05/11/2026), the onboarding call
// brief and the current site (cristyanbjj.com, pulled 10/11/2026). Nothing invented; open points
// carry [CONFIRMAR]. No em dashes in visitor copy.
// ─────────────────────────────────────────────────────────────────────────────
import { img } from './img'

export const SITE = {
  name: 'Cristyan Jiu-Jitsu & Fitness',
  academy: 'Cristyan Brazilian Jiu-Jitsu Academy',
  legalName: 'Cristyan Brazilian Jiu-Jitsu Academy LLC',
  // [CONFIRMAR] Angela (AI Front Desk) will get her own GHL number: swap it here, it shows everywhere
  phone: { display: '(508) 364-7697', tel: 'tel:+15083647697', e164: '+15083647697' },
  email: 'cristyanbjj@cristyanbjj.com',
  address: { street: '1513 Iyannough Rd', city: 'Hyannis', state: 'MA', zip: '02601', country: 'US', line: '1513 Iyannough Rd, Hyannis, MA 02601' },
  maps: {
    directions: 'https://www.google.com/maps/dir/?api=1&destination=1513+Iyannough+Rd+Hyannis+MA+02601',
    embed: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s1513+Iyannough+Rd+Hyannis+MA+02601!6i15',
  },
  social: {
    instagram: 'https://www.instagram.com/cristyanbjj',
    facebook: 'https://www.facebook.com/share/17GDcAgek8/',
    youtube: 'https://www.youtube.com/channel/UClwQiANk5-BV0qWP6aGKBeQ',
  },
  google: { rating: '5.0', count: 131, url: 'https://www.google.com/search?q=Cristyan+Brazilian+Jiu-Jitsu+Academy+Hyannis' },
  logo: img('logo', 'Cristyan Jiu-Jitsu & Fitness'),
  logoWhite: img('logo_footer', 'Cristyan Jiu-Jitsu & Fitness'),
  students: 166,
  values: ['Respect', 'Discipline', 'Community', 'Honor', 'Humble', 'Passion', 'Progress', 'Inclusion'],
}

export const CTA = 'Book a free trial class'

export const NAV = [
  { label: 'Programs', href: '/programs' },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Instructors', href: '/instructors' },
  { label: 'About', href: '/about' },
]

// ── programs ──
export type Group = { name: string; ages: string }
export type Program = {
  slug: string; name: string; short: string; tag: string; ages: string; audience: 'kids' | 'adults'
  lead: string; who: string[]; learn: { intro: string; items: string[]; outro?: string }
  gets: { title: string; intro: string; items: string[]; outro?: string }
  groups?: Group[]; classes: string[]; photo: ReturnType<typeof img>; photo2: ReturnType<typeof img>
  // monthly tuition from the form; NOT shown until the client confirms [CONFIRMAR preços no site]
  tuition?: string
}

export const PROGRAMS: Program[] = [
  {
    slug: 'kids-brazilian-jiu-jitsu', name: 'Kids Brazilian Jiu-Jitsu', short: 'Kids BJJ', tag: 'Ages 4 to 15', ages: '4–15', audience: 'kids',
    lead: 'Kids Brazilian Jiu-Jitsu classes in Hyannis, MA that build confidence, discipline and real self-defense skills, taught with Professor Cristyan\'s own methodology for children.',
    who: [
      'Our kids program helps children develop confidence, discipline and real self-defense skills in a safe and supportive environment.',
      'Our instructors specialize in teaching Brazilian Jiu-Jitsu to children of all experience levels, from complete beginners to young competitors. Every class focuses on strong fundamentals while helping kids stay active, focused and motivated.',
      'Parents across Hyannis, Barnstable, Yarmouth and Cape Cod trust Cristyan BJJ to help their children grow on and off the mats.',
    ],
    learn: { intro: 'Kids learn foundational BJJ: stance, balance, movement, takedowns, positional control, escapes, submissions, partner drills and conditioning. Each class builds on the last.', items: ['Technical precision and leverage', 'Timing and coordination', 'Safe skill application', 'Discipline and focus', 'Physical awareness'] },
    gets: { title: 'Why parents in Hyannis choose jiu-jitsu', intro: 'Jiu-jitsu teaches children to control a situation without relying on strength or size. Our kids program helps children:', items: ['Build confidence', 'Improve focus and discipline', 'Develop coordination and athleticism', 'Learn real self-defense skills', 'Build friendships and teamwork', 'Reduce screen time and stay active'] },
    groups: [{ name: 'Tiny BJJ', ages: '4–6' }, { name: 'Little BJJ', ages: '6–8' }, { name: 'Youth BJJ', ages: '9–11' }, { name: 'Junior BJJ', ages: '12–15' }],
    classes: ['Tiny BJJ', 'Little BJJ', 'Youth BJJ', 'Junior BJJ'],
    photo: img('kids', 'The kids team of Cristyan Jiu-Jitsu in front of the academy logo'),
    photo2: img('kids_2', 'An instructor teaching two kids a technique on the mat'),
    tuition: 'Tiny $199 · Little $219 · Youth and Junior $229 /mo',
  },
  {
    slug: 'adult-brazilian-jiu-jitsu', name: 'Adult Brazilian Jiu-Jitsu', short: 'Adult BJJ', tag: 'Ages 16+', ages: '16+', audience: 'adults',
    lead: 'Beginner-friendly adult jiu-jitsu in Hyannis, MA: technique, fitness and self-defense, in three levels so you always train at the right pace.',
    who: [
      'Adults learn the essential fundamentals of BJJ: stance, balance, movement, takedowns, positional control, submissions, escapes, partner drills and conditioning, each class building on the last.',
      'Training emphasizes leverage, timing, body mechanics and safe technique, so students of every experience level train effectively and keep improving.',
    ],
    learn: { intro: 'Our adult classes develop well-rounded grappling through structured training:', items: ['Takedowns and standing control', 'Guard passing and positional dominance', 'Escapes and defensive techniques', 'Submissions and transitions', 'Live grappling (rolling)', 'Conditioning and endurance'], outro: 'Each class combines drilling, technique instruction and controlled live training.' },
    gets: { title: 'Physical and mental benefits', intro: 'Adults across Hyannis and Cape Cod choose jiu-jitsu because training helps them:', items: ['Improve strength and endurance', 'Reduce stress and boost mental clarity', 'Build confidence and discipline', 'Learn practical self-defense', 'Join a supportive training community'] },
    groups: [{ name: 'Novice', ages: '16+' }, { name: 'Intermediate', ages: '16+' }, { name: 'Advanced', ages: '16+' }],
    classes: ['Adult Novice BJJ', 'Adult Intermediate BJJ', 'Adult Advanced BJJ'],
    photo: img('adult', 'Adult students of Cristyan Jiu-Jitsu in gis in front of the academy logo'),
    photo2: img('adult_2', 'Adult team seated on the mat in front of the Cristyan logo'),
    tuition: 'Novice $199 · Intermediate and Advanced $249 /mo',
  },
  {
    slug: 'womens-self-defense-and-fitness', name: "Women's Self-Defense & Fitness", short: "Women's Self-Defense", tag: 'Women, all levels', ages: '16+', audience: 'adults',
    lead: "Women's self-defense in Hyannis, MA: practical jiu-jitsu techniques and high-energy fitness in a welcoming, beginner-friendly class.",
    who: [
      'This program blends practical Brazilian Jiu-Jitsu techniques with fitness training, an empowering environment where women learn to protect themselves while getting in great shape.',
      "Whether you're new to martial arts or looking for a motivating way to stay active, the class is welcoming, supportive and beginner-friendly.",
    ],
    learn: { intro: 'Effective techniques to control a situation and get away safely:', items: ['Escaping common grabs and holds', 'Ground defense and leverage', 'Distance management and awareness', 'Balance, movement and positioning', 'Real-world self-defense strategies'], outro: 'Jiu-jitsu relies on technique, leverage and strategy rather than strength or size.' },
    gets: { title: 'A full-body workout', intro: 'Beyond self-defense, every session helps you:', items: ['Burn calories and improve endurance', 'Build strength and muscle tone', 'Increase mobility and flexibility', 'Improve coordination and balance', 'Reduce stress and boost energy'] },
    // [CONFIRMAR] the form lists no separate time for this class
    classes: [],
    photo: img('women_2', 'A woman practicing a jiu-jitsu escape on the mat'),
    photo2: img('women_1', 'A self-defense drill against a standing grab'),
  },
  {
    slug: 'box-fitness', name: 'Box Fitness', short: 'Box Fitness', tag: 'All levels', ages: 'Adults', audience: 'adults',
    lead: 'Box Fitness in Hyannis, MA: real boxing technique and a high-energy workout that burns calories, builds strength and clears your head.',
    who: [
      'Box Fitness combines real boxing technique with high-energy workouts designed to get you in great shape: cardio, calories, strength, and the fundamentals of boxing.',
      'No previous boxing experience is required. The instructor guides you step by step so you learn safely while getting a challenging workout.',
    ],
    learn: { intro: 'Foundational boxing while you build coordination and precision:', items: ['Stance and movement', 'Jab, cross, hook and uppercut', 'Footwork and balance', 'Pad work and combinations', 'Timing, rhythm and conditioning'] },
    gets: { title: 'High-energy workouts', intro: 'Boxing is one of the most effective workouts for overall conditioning. Classes help you:', items: ['Burn calories and support weight loss', 'Improve cardiovascular endurance', 'Build lean muscle and strength', 'Increase agility and coordination', 'Release stress and boost energy'] },
    classes: ['Box Fitness'],
    photo: img('boxing', 'The Box Fitness class posing with gloves in front of the heavy bags'),
    photo2: img('box_1', 'Box Fitness students in their stance'),
    tuition: '$149 /mo',
  },
  {
    slug: 'capoeira', name: 'Capoeira', short: 'Capoeira', tag: 'All ages', ages: 'All ages', audience: 'adults',
    lead: 'Capoeira in Hyannis, MA: the Brazilian martial art of movement, music and culture, for strength, agility and coordination.',
    who: [
      'Capoeira blends fluid movement, kicks, acrobatics, rhythm and strategy. It develops strength, flexibility, coordination and balance while you express yourself through movement.',
      'A fun way to stay active, explore Brazilian culture or build new athletic skills, for beginners and experienced students alike.',
    ],
    learn: { intro: 'The core movements and traditions of the art:', items: ['The ginga, the foundational movement', 'Dynamic kicks', 'Defensive movements and escapes', 'Rhythm, timing and flow', 'Partner play in the roda'] },
    gets: { title: 'Challenge body and mind', intro: 'A full-body workout that sharpens the mind as well. Classes help you:', items: ['Improve balance and flexibility', 'Develop agility and coordination', 'Build functional strength', 'Increase endurance', 'Improve body awareness'] },
    classes: ['Capoeira'],
    photo: img('capoeira_1', 'A Capoeira class with Instructor Jhenifer'),
    photo2: img('capoeira', 'Capoeira students in the training room'),
    tuition: '$125 /mo',
  },
  {
    slug: 'judo', name: 'Teen & Adult Judo', short: 'Judo', tag: 'Ages 12+', ages: '12+', audience: 'adults',
    lead: 'Teen and adult Judo in Hyannis, MA: throws, takedowns and grappling with a Judo black belt, for self-defense, fitness and competition.',
    who: [
      'Judo is a traditional Japanese martial art built on leverage, technique, balance and timing more than strength. It improves fitness, coordination and body awareness while building discipline and focus.',
      'Whether you want effective self-defense, better athletic performance, competition or simply to stay active, the class welcomes beginners and experienced judoka.',
    ],
    learn: { intro: 'The fundamentals that make Judo one of the most effective martial arts:', items: ['Breakfalls and safety (ukemi)', 'Fundamental throws and takedowns', 'Balance, timing and leverage', 'Grip fighting and stand-up control', 'Pins, ground control and submissions', 'Practical self-defense'] },
    gets: { title: 'Fitness and mental discipline', intro: 'A full-body workout that trains the mind too. Classes help you:', items: ['Build functional strength and power', 'Improve balance and body control', 'Increase agility', 'Develop endurance', 'Sharpen focus and resilience'] },
    classes: ['Judo'],
    photo: img('judo_2', 'A Judo throw in a dark training hall'),
    photo2: img('judo_1', 'Two judoka in white and blue gis mid-throw'),
    tuition: '$149 /mo',
  },
]

// ── schedule (classes that accept a trial; onboarding form 05/11; durations from the current site) ──
export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
export type Klass = { name: string; ages: string; days: Day[]; start: number; end: number; program: string; kind: 'kids' | 'adults' | 'other' }
const t = (h: number, m = 0) => h * 60 + m
export const CLASSES: Klass[] = [
  { name: 'Tiny BJJ', ages: '4–6 yrs', days: ['Tue', 'Thu'], start: t(16, 30), end: t(17, 15), program: 'kids-brazilian-jiu-jitsu', kind: 'kids' },
  { name: 'Little BJJ', ages: '6–8 yrs', days: ['Mon', 'Wed', 'Fri'], start: t(16, 30), end: t(17, 15), program: 'kids-brazilian-jiu-jitsu', kind: 'kids' },
  { name: 'Youth BJJ', ages: '9–11 yrs', days: ['Mon', 'Wed', 'Fri'], start: t(17, 30), end: t(18, 30), program: 'kids-brazilian-jiu-jitsu', kind: 'kids' },
  { name: 'Junior BJJ', ages: '12–15 yrs', days: ['Tue', 'Thu'], start: t(17, 30), end: t(18, 30), program: 'kids-brazilian-jiu-jitsu', kind: 'kids' },
  { name: 'Junior BJJ', ages: '12–15 yrs', days: ['Fri'], start: t(18, 45), end: t(19, 45), program: 'kids-brazilian-jiu-jitsu', kind: 'kids' },
  { name: 'Box Fitness', ages: 'Adults', days: ['Mon', 'Wed', 'Fri'], start: t(17, 30), end: t(18, 30), program: 'box-fitness', kind: 'other' },
  { name: 'Capoeira', ages: 'All ages', days: ['Tue', 'Thu'], start: t(17, 30), end: t(18, 30), program: 'capoeira', kind: 'other' },
  { name: 'Adult Novice BJJ', ages: '16+', days: ['Tue', 'Thu'], start: t(18, 45), end: t(19, 45), program: 'adult-brazilian-jiu-jitsu', kind: 'adults' },
  { name: 'Adult Intermediate BJJ', ages: '16+', days: ['Mon', 'Fri'], start: t(18, 45), end: t(19, 45), program: 'adult-brazilian-jiu-jitsu', kind: 'adults' },
  { name: 'Judo', ages: '12+ yrs', days: ['Tue', 'Thu'], start: t(18, 45), end: t(19, 45), program: 'judo', kind: 'other' },
  { name: 'Adult Advanced BJJ', ages: '16+', days: ['Tue', 'Wed', 'Thu'], start: t(20), end: t(21), program: 'adult-brazilian-jiu-jitsu', kind: 'adults' },
]
export const DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const DAY_LONG: Record<Day, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }
export const fmt = (m: number) => { const h = Math.floor(m / 60), mm = m % 60, h12 = ((h + 11) % 12) + 1; return `${h12}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}` }
export const classesOn = (d: Day) => CLASSES.filter((c) => c.days.includes(d)).sort((a, b) => a.start - b.start)

// ── the free trial class (onboarding form) ──
export const TRIAL = {
  title: { a: 'Your first class is ', b: 'on us.' },
  lead: 'Free, 60 minutes, inside a regular class. You train with the group from the first day, at your pace.',
  points: [
    { icon: 'clock', t: '60 minutes', d: 'A full regular class with the group, no cost and no commitment.' },
    { icon: 'gi', t: 'We lend the kimono', d: 'Come in a t-shirt to wear under it. We also hand you a bottle of water.' },
    { icon: 'nospar', t: 'No sparring', d: 'Your trial class is technique and drills. Live rolling comes later, when you are ready.' },
    { icon: 'group', t: 'Small groups', d: 'At most five trial students per class, so the coach has time for you.' },
  ],
  privateOption: 'Prefer one on one? Ask for a 30-minute private trial class.',
}


// ── the professor and the team ──
export const PROFESSOR = {
  name: 'Cristyan Martins',
  role: 'Head coach and owner',
  rank: '4th-degree black belt',
  title: { a: 'Meet Professor ', b: 'Cristyan Martins' },
  facts: ['4th-degree black belt', 'Two-time world champion', '20 years teaching', 'Degree in Physical Education', 'Postgraduate in Jiu-Jitsu', 'His own methodology for kids'], // JSON-LD + llms.txt
  // the home card shows these as an accordion (Adryan, 11/11): open one if you want the detail
  creds: [
    { q: '4th-degree black belt', a: 'Four degrees on the black belt and two world titles, earned over more than 20 years on the mat.' },
    { q: '20 years teaching', a: 'He founded Evolution Jiu-Jitsu Martial Arts School in 2012 and, the same year, started a program built for children.' },
    { q: 'Physical Education degree, postgraduate in Jiu-Jitsu', a: 'Every class is planned like a lesson, with a clear curriculum, so kids and adults improve with purpose.' },
    { q: 'His own methodology for kids', a: 'Structured classes for confidence, coordination and discipline, with a stripe every 30 classes in 90 days.' },
  ],
  bio: [
    'Professor Cristyan Devanir Martins founded Evolution Jiu-Jitsu Martial Arts School in 2012, and the same year started a program built for children: structured classes for confidence, coordination and discipline.',
    'Today he leads Cristyan Brazilian Jiu-Jitsu Academy in Hyannis, a family business serving families across Cape Cod and Barnstable County. His mission is simple: develop confident, disciplined and capable people through authentic Brazilian Jiu-Jitsu.',
    'Whether he is teaching a first class or preparing athletes for competition, he is on the mat building a strong community, on and off it.',
  ],
  photo: img('prof_2', 'Professor Cristyan Martins in front of his medals and championship belts'),
  cutout: img('prof_cut', 'Professor Cristyan Martins in his gi and black belt, arms crossed'), // the home card (Adryan, 11/11)
  family: img('prof_1', 'Professor Cristyan with his family in their gis'),
}

export type Coach = { name: string; art: string; rank?: string; notes: string[]; photo?: ReturnType<typeof img> }
export const TEAM: Coach[] = [
  { name: 'Velize Martins', art: 'Brazilian Jiu-Jitsu', rank: 'Purple belt', notes: ['Vice champion, Brazilian Nationals'], photo: img('velize', 'Instructor Velize Martins') },
  { name: 'Gabriel Martins', art: 'Brazilian Jiu-Jitsu', rank: 'Purple belt', notes: ['NAGA champion', 'Grappling Industries champion', '2x vice champion, CBJJF Brazilian Nationals', '3rd, IBJJF New York International Open'], photo: img('gabriel', 'Instructor Gabriel Martins') },
  { name: 'Henrique Martins', art: 'Brazilian Jiu-Jitsu', rank: 'Blue belt', notes: [] }, // [CONFIRMAR foto]
  { name: 'Aydan Reis', art: 'Brazilian Jiu-Jitsu', rank: 'Blue belt', notes: [] }, // [CONFIRMAR foto]
  { name: 'Jhenifer Doxsey', art: 'Capoeira', notes: ['Training Capoeira since 1992, with Team ABADA Capoeira, later A Capoeira'], photo: img('jen', 'Capoeira instructor Jhenifer Doxsey') },
  { name: 'Buster Donalson', art: 'Box Fitness', notes: ['Teaching boxing fitness for over a decade', 'Certified in 2014 by Grandmaster Keith Rosary'], photo: img('buster', 'Box Fitness instructor Buster Donalson') },
]

// ── Google reviews (current site, verbatim; first name + initial) ──
export const REVIEWS = [
  { text: 'Cristyan Brazilian Jiu-Jitsu has been a fantastic experience for my 6-year-old daughter and 4-year-old son, offering structured, professional instruction that builds respect, confidence, and jiu-jitsu skills in a clean, welcoming, and fun environment. Highly recommend!', name: 'Shamus K.', meta: 'Parent' },
  { text: "If you're looking to build confident kids, Cristyan BJJ Academy is exceptional. Coach and team know exactly how to mentor, discipline and have fun at the same time. I highly recommend trying out a class.", name: 'Daniel E.', meta: 'Parent' },
  { text: "Cristyan BJJ is the best place to get yourself or kids started. Its a very clean place and very family oriented. You couldn't ask for a better instructor/leader than Cristyan, he does an awesome job. You won't regret coming here!", name: 'Steven K.', meta: 'Google review' },
  { text: 'Cristyan is an exceptional coach. The place fosters a wonderful family atmosphere that promotes discipline and respect. I highly recommended it for individuals of all ages from beginners to advance. Also the facilities are great.', name: 'Daniel A.', meta: 'Google review' },
  { text: 'Great, clean, and welcoming place! The teacher is dedicated, professional, and truly cares about their students. Highly recommended!', name: 'Alexandru B.', meta: 'Google review' },
  { text: 'Our daughter has just started her classes but we can tell already, with the positive energy, that we are in a good place.', name: 'Scott S.', meta: 'Parent' },
]

// ── FAQ (current site questions, answered from the form) ──
export const FAQ = [
  { q: 'Do I need experience?', a: 'No. Most students start with zero experience. Every program has a beginner path, and adults start in the Novice class.' },
  { q: 'How do I get started?', a: 'Book a free trial class online or call (508) 364-7697. The trial is 60 minutes inside a regular class; we lend you a kimono, you bring a t-shirt.' },
  { q: 'Is there sparring in the trial class?', a: 'No. The trial class is technique and drills. Live training comes later, when you and your coach agree you are ready.' },
  { q: 'What programs do you offer?', a: 'Kids BJJ in four age groups (4 to 15), Adult BJJ in three levels, Women\'s Self-Defense & Fitness, Box Fitness, Capoeira and Teen & Adult Judo.' },
  { q: 'When are classes?', a: 'Monday to Friday, from 4:30 PM to 9:00 PM. Kids train first, then teens, then adults. See the full schedule for every class.' },
  { q: 'How does belt promotion work?', a: 'Kids earn a stripe every 30 classes in 90 days and usually change belts once a year. Adults earn a stripe every 60 classes in 120 days. We hold two graduation ceremonies a year.' },
  { q: 'Where are you located?', a: '1513 Iyannough Rd, Hyannis, MA 02601, on Cape Cod, with students from Hyannis, Barnstable, Yarmouth and Mashpee.' },
]

// ── the academy (onboarding form + client's text) ──
export const ABOUT = {
  title: { a: 'Built with ', b: 'purpose.' },
  story: [
    'Cristyan Brazilian Jiu-Jitsu Academy is a dedicated training facility in Hyannis committed to real martial arts training. Our programs are built around real technique, disciplined coaching and structured progression, so you improve with purpose, not guesswork.',
    'Every class follows a clear curriculum that reinforces the foundations while gradually introducing new techniques in a measurable, supportive way. Students are guided step by step through a process that builds technical precision, physical conditioning and mental discipline over time.',
  ],
  family: 'A family business. Professor Cristyan teaches alongside his family, and the academy grew with its students: from a 1,000 sq ft room to a 5,000 sq ft academy.',
  growth: [{ n: '1,000', u: 'sq ft', d: 'where it started' }, { n: '5,000', u: 'sq ft', d: 'the academy today' }, { n: '166', u: 'students', d: 'training this season' }],
  space: img('about_hero', 'The empty 5,000 sq ft training floor with grey mats and the Cristyan logo on the wall'),
  team: img('about_2', 'The whole academy, kids and adults, together on the mats'),
  mission: img('mission', 'Professor Cristyan smiling with the adult team behind him'),
}

export const HERO = {
  eyebrow: 'Hyannis, MA · Cape Cod',
  title: { a: 'Train with purpose, ', b: 'not guesswork.' },
  sub: 'Brazilian Jiu-Jitsu for kids and adults, Judo, Capoeira and Box Fitness, led by Professor Cristyan Martins, 4th-degree black belt and two-time world champion.',
  photo: img('hero', 'Students and families of Cristyan Jiu-Jitsu together on the mats of the academy'),
  // the sales video (iContent) goes in the hero's second column [CONFIRMAR VSL]
  vsl: { label: 'Video: a minute inside Cristyan Jiu-Jitsu', title: 'A minute inside the academy', note: 'Video coming soon', poster: img('mission', 'Professor Cristyan smiling on the mat with the team behind him') },
}

// ═════════════ round 2 (Adryan's feedback, 10/11/2026) ═════════════

// ── the art each program belongs to (the Programs page filter) ──

// ── each class inside a program, explained [CONFIRMAR textos provisórios: idades, dias e níveis vêm do formulário] ──
export type Lesson = { name: string; ages: string; when: string; text: string }
export const LESSONS: Record<string, Lesson[]> = {
  'kids-brazilian-jiu-jitsu': [
    { name: 'Tiny BJJ', ages: 'Ages 4–6', when: 'Tue · Thu, 4:30 PM', text: 'The first steps on the mat: balance, movement and listening, taught through games built for the little ones.' },
    { name: 'Little BJJ', ages: 'Ages 6–8', when: 'Mon · Wed · Fri, 4:30 PM', text: "Fundamentals with structure: stance, escapes and control, with Professor Cristyan's methodology for kids." },
    { name: 'Youth BJJ', ages: 'Ages 9–11', when: 'Mon · Wed · Fri, 5:30 PM', text: 'Technique, partner drills and controlled live training, with stripes earned class after class.' },
    { name: 'Junior BJJ', ages: 'Ages 12–15', when: 'Tue · Thu 5:30 PM, Fri 6:45 PM', text: 'Teen training: real grappling, conditioning and, for those who want it, the competition team.' },
  ],
  'adult-brazilian-jiu-jitsu': [
    { name: 'Novice', ages: '16+', when: 'Tue · Thu, 6:45 PM', text: 'Where every adult starts: the fundamentals, step by step, no experience needed.' },
    { name: 'Intermediate', ages: '16+', when: 'Mon · Fri, 6:45 PM', text: 'Once the basics are in place: positional training and more live rolling.' },
    { name: 'Advanced', ages: '16+', when: 'Tue · Wed · Thu, 8:00 PM', text: 'For experienced students: advanced technique, gi and no-gi, and harder rounds.' },
  ],
  'womens-self-defense-and-fitness': [
    { name: "Women's Self-Defense & Fitness", ages: 'Women, all levels', when: 'Ask for the next class', text: 'Escapes from grabs and holds, ground defense and a full-body workout, in a welcoming class.' },
  ],
  'box-fitness': [{ name: 'Box Fitness', ages: 'Adults, all levels', when: 'Mon · Wed · Fri, 5:30 PM', text: 'Pad work, combinations and conditioning circuits with Instructor Buster. No boxing experience needed.' }],
  capoeira: [{ name: 'Capoeira', ages: 'All ages', when: 'Tue · Thu, 5:30 PM', text: 'The ginga, kicks, rhythm and the roda, with Instructor Jhenifer, training since 1992.' }],
  judo: [{ name: 'Teen & Adult Judo', ages: 'Ages 12+', when: 'Tue · Thu, 6:45 PM', text: 'Breakfalls, throws, grips and pins with a Judo black belt, for self-defense, fitness or competition.' }],
}

// ── the academy, short (home, right after the hero), with the free trial ──
export const ACADEMY = {
  tag: 'The academy',
  title: { a: 'A family academy, ', b: 'built on structure.' },
  lead: 'Professor Cristyan teaches alongside his family. Every class follows a clear curriculum, so kids and adults improve with purpose, not guesswork.',
}

// ── talking to parents (the chat effect) ──
export const PARENTS = {
  tag: 'For parents',
  title: { a: 'What parents search ', b: 'before the first class.' },
  lead: 'Most kids on our mat started shy, restless or with zero experience. These are the questions parents type at night, answered by the academy.',
  you: 'You · Seen',
  from: 'Cristyan BJJ',
  place: 'Hyannis, MA',
  exchanges: [
    { s: ['shy kid martial arts', 'shy kid first jiu-jitsu class'], q: 'My kid is shy. Will they fit in?', a: "**At most five trial students per class**, coaches who specialize in kids, and Professor Cristyan's own methodology for children." },
    { s: ['will jiu-jitsu make my kid fight', 'jiu-jitsu kids behavior'], q: 'Will jiu-jitsu make my child aggressive?', a: 'The opposite. Kids learn to **control a situation without strength or size**, and the mat runs on respect, discipline and humility.' },
    { s: ['jiu-jitsu for 4 year olds', 'is bjj safe for kids'], q: 'Is it safe for a 4 year old?', a: 'Tiny BJJ is built for ages 4 to 6: **games, balance and listening**. The trial class has no sparring, only technique and drills.' },
    { s: ['bjj kids belt system', 'how long to get a stripe bjj'], q: 'How will I know they are improving?', a: '**A stripe every 30 classes in 90 days**, four stripes to a new belt, and two graduation ceremonies a year.' },
  ],
}

// ── the space: a tour of the empty academy in one photo, from the front door (Adryan, 11/11: not Lobo's
// walk-in). x / y are the spot on about_hero in %, z the camera zoom there. ──
export const TOUR = {
  tag: 'The space',
  title: { a: 'Look around ', b: 'before you walk in.' },
  lead: 'This is the academy on a quiet afternoon. Start at the front door.',
  photo: img('about_hero', 'The empty training floor: grey mats, the Cristyan logo on the wall, parents seats behind the rope'),
  stops: [
    { x: 95, y: 30, z: 2.1, title: 'The front door', text: '1513 Iyannough Rd, Hyannis. Walk in, say hi, and the coach takes it from there.' },
    { x: 91, y: 42, z: 1.9, title: "Parents' seats", text: 'Right beside the mat, behind the rope. Parents watch the whole class.' },
    { x: 52, y: 60, z: 1.45, title: 'The mat', text: 'A 5,000 sq ft academy. It started as a 1,000 sq ft room.', photo: img('kids_1', 'Kids lined up on the mat before class') },
    { x: 39, y: 30, z: 2.05, title: 'The gear corner', text: 'Bags, pads and plyo boxes for Box Fitness and conditioning.', photo: img('boxing', 'The Box Fitness class with gloves in front of the heavy bags') },
    { x: 26, y: 40, z: 1.9, title: 'The logo wall', text: 'Where every team photo is taken, from Tiny BJJ to the adult team.', photo: img('adult_2', 'The adult team seated in front of the Cristyan logo') },
  ],
  facts: [['166', 'students this season'], ['6', 'programs under one roof'], ['5', 'trial students per class at most']] as [string, string][],
}

// ── the head coach as a passport (instructors page) ──
export const PASSPORT = {
  hd: ['Cristyan Jiu-Jitsu', 'Head coach'],
  hd2: ['Record', 'Titles and rank'],
  rows: [['Name', 'Cristyan Martins'], ['Rank', '4th-degree black belt'], ['Teaching', '20 years'], ['Education', 'Physical Education, postgraduate in Jiu-Jitsu'], ['Academy', 'Hyannis, MA']] as [string, string][],
  // [CONFIRMAR] which world titles (event, year) for a sharper stamp
  stamps: ['World champion ×2', '4th degree', 'Since 2012', 'Kids method'],
  mrz: ['P<USACRISTYAN<<MARTINS<<<<<<<<<<<<<<<<<<<<<', '4THDEGREE<BLACKBELT<<HYANNIS<MA<<<<<<<<<<<<'],
}

// ── the schedule page: four things to know ──
// Schedule · a weekday at the academy, as one line from 4:30 to 9:00 PM (Adryan, 11/11: Good to know redone)
export const DAYLINE = {
  from: t(16, 30), to: t(21),
  bands: [
    { t: 'Kids', d: 'Tiny and Little BJJ', from: t(16, 30), to: t(17, 15) },
    { t: 'Kids, teens, fitness', d: 'Youth and Junior BJJ, Capoeira, Box Fitness', from: t(17, 30), to: t(18, 30) },
    { t: 'Adults and Judo', d: 'Novice, Intermediate and Advanced BJJ, Judo', from: t(18, 45), to: t(21) },
  ],
}
export const KNOW = [
  { k: '01', t: 'Kids first, adults later', d: 'Kids from 4:30 PM, teens from 5:30 PM, adults from 6:45 PM until 9:00 PM.' },
  { k: '02', icon: 'cal', t: 'Monday to Friday', d: 'Saturday and Sunday the academy is closed.' },
  { k: '03', icon: 'check', t: 'Every class takes a trial', d: 'Pick any class on the board and book your free trial in it.' },
  { k: '04', icon: 'group', t: 'Private lessons', d: 'By appointment, and a 30-minute private trial if you prefer one on one.' },
]

/** About · the eight values, each proved by a real photo and a fact of the academy (Adryan, 11/11: the
 *  grid of squares read as a template). Lines marked [CONFIRMAR] in the briefing. */
export const VALUES = {
  tag: 'What we stand for',
  title: { a: 'Eight words. ', b: 'Here is the proof.' },
  lead: 'Any gym can paint values on a wall. These are the moments behind ours, from our own mats.',
  items: [
    { word: 'Respect', line: 'Coaches kneel to teach the smallest students, eye to eye.', photo: img('kids_2', 'A coach kneeling on the mat to teach two young students') },
    { word: 'Discipline', line: 'Lined up and ready before the first drill. Structure first, then the fun.', photo: img('kids_1', 'Kids lined up on the mat before class') },
    { word: 'Community', line: '166 students, kids and adults, on one mat in Hyannis.', photo: img('hero', 'The whole academy together on the mats') },
    { word: 'Honor', line: 'Wearing the academy name at the Boston Fall Open 2026.', photo: img('boston_fall_open_2026_team', 'The competition team at the Boston Fall Open 2026') },
    { word: 'Humble', line: 'Two world titles on the wall. On the mat, he is simply Professor.', photo: img('prof_2', 'Professor Cristyan in front of his medals and title belts') },
    { word: 'Passion', line: 'Jiu-jitsu, Judo, Capoeira and boxing. One roof, four arts.', photo: img('judo_2', 'A judo throw in mid-air') },
    { word: 'Progress', line: 'Every stripe has a number behind it, so parents know where their kid stands.', photo: img('boston_fall_open_2026_kids', 'Kids from the academy with their medals') },
    { word: 'Inclusion', line: "From age 4 to adults, with a women's self-defense class of its own.", photo: img('women_2', 'A woman practicing a jiu-jitsu escape') },
  ],
}

// ── the programs as three tracks, presented class by class (Adryan, 11/11: Gonzales structure; Women's goes
// in Adults; Judo, Capoeira and Box together so none is a thin page). Photos repeat until the client sends
// one per class [CONFIRMAR fotos por aula]; chips and "fit" lines are drafted from the class texts. ──
export type Track = { slug: string; name: string; short: string; tag: string; audience: 'kids' | 'adults'; lead: string; photo: ReturnType<typeof img>; programs: string[] }
export const TRACKS: Track[] = [
  { slug: 'adult-brazilian-jiu-jitsu', name: 'Adult Brazilian Jiu-Jitsu', short: 'Adults BJJ', tag: 'Ages 16+ · three levels and a women\'s class', audience: 'adults',
    lead: 'Adult Brazilian Jiu-Jitsu in Hyannis, MA in three levels, from your first day to advanced rounds, plus a self-defense and fitness class for women.',
    photo: img('adult', 'Adult students of Cristyan Jiu-Jitsu in gis in front of the academy logo'), programs: ['adult-brazilian-jiu-jitsu', 'womens-self-defense-and-fitness'] },
  { slug: 'kids-brazilian-jiu-jitsu', name: 'Kids Brazilian Jiu-Jitsu', short: 'Kids BJJ', tag: 'Ages 4 to 15 · four age groups', audience: 'kids',
    lead: "Kids Brazilian Jiu-Jitsu in Hyannis, MA in four age groups, from Tiny BJJ at age 4 to Junior BJJ at 15, taught with Professor Cristyan's own methodology for children.",
    photo: img('kids', 'The kids team of Cristyan Jiu-Jitsu in front of the academy logo'), programs: ['kids-brazilian-jiu-jitsu'] },
  { slug: 'judo-capoeira-box-fitness', name: 'Judo, Capoeira & Box Fitness', short: 'Judo, Capoeira & Box', tag: 'Teens and adults · three more arts', audience: 'adults',
    lead: 'Three more ways to train under one roof in Hyannis, MA: Teen and Adult Judo, Capoeira for all ages and Box Fitness, each with its own instructor.',
    photo: img('judo_2', 'A judo throw in mid-air'), programs: ['judo', 'capoeira', 'box-fitness'] },
]
export type ClassCard = Lesson & { id: string; program: string; track: string; audience: 'kids' | 'adults'; photo: ReturnType<typeof img>; chips: string[]; fit: string; slot?: string }
const CLASS_X: Record<string, { photo: ReturnType<typeof img>; chips: string[]; fit: string; slot?: string }> = {
  'Tiny BJJ': { photo: img('kids_2', 'A coach kneeling to teach two young students'), chips: ['Games', 'Balance', 'Listening'], fit: 'For 4 to 6 year olds on their first mat.', slot: 'Tiny BJJ' },
  'Little BJJ': { photo: img('kids_1', 'Kids lined up on the mat before class'), chips: ['Stance', 'Escapes', 'Control'], fit: 'For 6 to 8 year olds ready for real fundamentals.', slot: 'Little BJJ' },
  'Youth BJJ': { photo: img('kids', 'The kids team in front of the academy logo'), chips: ['Technique', 'Partner drills', 'Stripes'], fit: 'For 9 to 11 year olds who want to see progress.', slot: 'Youth BJJ' },
  'Junior BJJ': { photo: img('boston_fall_open_2026_kids', 'Kids from the academy with their medals'), chips: ['Live grappling', 'Conditioning', 'Competition team'], fit: 'For 12 to 15 year olds, beginners or competitors.', slot: 'Junior BJJ' },
  Novice: { photo: img('adult_1', 'A smiling adult student on the mat after class'), chips: ['Fundamentals', 'No experience', 'Step by step'], fit: 'Where every adult starts, at any age or fitness level.', slot: 'Adult Novice BJJ' },
  Intermediate: { photo: img('adult_2', 'The adult team seated on the mat in front of the logo'), chips: ['Positional training', 'Live rolling', 'Gi'], fit: 'For students with the basics in place.', slot: 'Adult Intermediate BJJ' },
  Advanced: { photo: img('adult', 'Adult students in gis in front of the academy logo'), chips: ['Advanced technique', 'Gi and no-gi', 'Hard rounds'], fit: 'For experienced students and competitors.', slot: 'Adult Advanced BJJ' },
  "Women's Self-Defense & Fitness": { photo: img('women_2', 'A woman practicing a jiu-jitsu escape on the mat'), chips: ['Escapes', 'Ground defense', 'Full-body workout'], fit: 'For women 16+, all levels, in a welcoming class.' },
  'Teen & Adult Judo': { photo: img('judo_1', 'A judo throw on the mat'), chips: ['Breakfalls', 'Throws', 'Grips and pins'], fit: 'For ages 12+, for self-defense, fitness or competition.', slot: 'Judo' },
  Capoeira: { photo: img('capoeira_1', 'A Capoeira class with Instructor Jhenifer'), chips: ['Ginga', 'Rhythm', 'The roda'], fit: 'For all ages, beginners and experienced alike.', slot: 'Capoeira' },
  'Box Fitness': { photo: img('boxing', 'The Box Fitness class with gloves in front of the heavy bags'), chips: ['Pad work', 'Combinations', 'Conditioning'], fit: 'For adults of every level. No boxing experience needed.', slot: 'Box Fitness' },
}
const slugify = (s: string) => s.toLowerCase().replace(/&/g, '').replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const classesOf = (t: Track): ClassCard[] => t.programs.flatMap((ps) => (LESSONS[ps] ?? []).map((l) => {
  const p = PROGRAMS.find((x) => x.slug === ps)!
  return { ...l, ...CLASS_X[l.name], id: slugify(l.name), program: ps, track: t.slug, audience: p.audience }
}))
export const trackOf = (programSlug: string) => TRACKS.find((t) => t.programs.includes(programSlug))!
/** Where a program now lives: its track page, at its first class when it is not the track's main program. */
export const programHref = (programSlug: string) => {
  const t = trackOf(programSlug), first = classesOf(t).find((c) => c.program === programSlug)
  return t.programs[0] === programSlug ? `/programs/${t.slug}` : `/programs/${t.slug}#${first?.id ?? ''}`
}
export const slotOf = (c: ClassCard) => CLASSES.filter((k) => k.name === c.slot)

// /programs · how to start, in three steps (Adryan, 11/11: the page was short; the band that holds the
// page is the Gonzales / Fight Sports idea, here in the logo's diamonds)
export const STEPS = {
  tag: 'How to start',
  title: { a: 'Three steps ', b: 'to the mat.' },
  items: [
    { t: 'Pick your class', d: 'Choose the track, then the class that fits your age and level. Not sure? We help you choose.' },
    { t: 'Book the free trial', d: 'Leave your name and number. We confirm the day and the time with you.' },
    { t: 'Show up and train', d: 'Come in a t-shirt. We lend the kimono, hand you water and the coach takes it from there.' },
  ],
}
