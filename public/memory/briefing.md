# Cristyan Jiu-Jitsu & Fitness · site institucional · briefing e pendências (10/11/2026)

Fonte: formulário de onboarding (05/11), briefing da call, site atual cristyanbjj.com (raspado em 10/11: textos, 33 posts do blog, 31 fotos em `reference/current-site`). A transcrição da call no Google Docs não abriu com a conta do Drive conectada; o vídeo da call está no Drive (03. Recordings), sem transcrição legível. Copy em inglês, sem travessão.

## Bloqueia publicar
- [ ] Domínio (`VITE_SITE_URL`). Sem ele o build sai `noindex`. Se for o mesmo cristyanbjj.com, as URLs antigas continuam: `/programs/*`, `/schedule`, `/instructors`, `/blog/<slug>` iguais; `/about-us` → `/about` e `/start` → `/book` por redirect 301 (vercel.json).
- [ ] Tracking: no CRM não há Pixel, GA4, Ads nem Clarity para a Cristyan (aviso da API do kit). O formulário (kit Novo Dash, GHL `zLhtDM0iiigF8rTk2XxG`, webhook `au7IJA9pawyRVa3fAEMy`) já funciona e lista as turmas reais do GHL.
- [ ] Telefone da Angela (AI Front Desk): hoje é (508) 364-7697. Trocar em `src/data/site.ts` (SITE.phone) e em `src/nd/client.ts` (academy.phone): aparece no site inteiro.
- [ ] Política de privacidade e termos: o site atual tem `/privacy-policy` e `/terms-and-conditions`; o novo ainda não.

## Confirmar com o cliente
- [ ] Preços: estão em `site.ts` (campo `tuition`) mas NÃO aparecem no site, como o briefing pediu.
- [ ] Women's Self-Defense & Fitness: sem horário próprio no formulário; a página mostra "Ask for the next class".
- [ ] Sobrenome e foto do Stephen (Judo); fotos do Henrique Martins e do Aydan Reis (hoje cartões com as iniciais).
- [ ] "Two-time world champion" e "postgraduate in Jiu-Jitsu": vieram do briefing; confirmar os títulos exatos (campeonato, ano) para a página do professor.
- [ ] Fotos novas do Drive (AI Content, 00. Raw Content: academia e kimono, 11 JPGs de 3 a 7 MB): o site usa só as do site atual; o conector do Drive não baixa arquivo binário aqui. Para usar, baixar para `reference/drive/` e rodar `npm run images`.
- [ ] Horários de quarta (No-Gi) e de sábado/domingo: o site atual lista aulas No-Gi na quarta; o formulário não. Segui o formulário (turmas que aceitam aula experimental).

## Rodada 2 (10/11/2026)
- [ ] **Blog removido** a pedido do Adryan. O cliente tinha 33 posts (25/08 a 10/11/2026): 3 notícias reais (resultados de campeonato) e 30 artigos genéricos de SEO, com cara de conteúdo automático da Academy Blast. As URLs antigas redirecionam para a home. Se o cliente quiser manter notícias de campeonato, dá para voltar com uma página só de "News".
- [ ] Textos de cada aula (Tiny, Little, Youth, Junior, Novice, Intermediate, Advanced) são provisórios: confirmar com o cliente.
- [ ] Foto da fachada para o cartão do mapa (hoje é o tatame) e foto do professor em fundo liso (o passaporte e o card usam a foto com as medalhas).
- [ ] Títulos exatos de "two-time world champion" para o carimbo do passaporte.
- [ ] Frases dos valores (About) e das paradas do tour são inferidas das fotos: confirmar com o cliente (ex.: "Coaches kneel to teach the smallest students", assentos dos pais atrás da corda, canto de equipamentos do Box Fitness).
- [ ] Foto do tatame vazio em resolução maior que 1400px deixaria o zoom do tour mais nítido.
- [ ] **Uma foto por aula** (hoje repetidas): Tiny BJJ, Little BJJ, Youth BJJ, Junior BJJ, Novice, Intermediate, Advanced, Women's Self-Defense, Judo, Capoeira, Box Fitness. Os chips e a frase "para quem é" de cada aula foram redigidos a partir dos textos: confirmar.
- [ ] Horário da aula de Women's Self-Defense (a página diz "Ask for the next class").
- [ ] **VSL da iContent** para o hero da home (hoje é um placeholder 16:9 com a foto `mission` e "Video coming soon"; marcado [CONFIRMAR VSL] em `Hero.tsx`).
- [ ] Foto nova do professor (o Adryan vai gerar com mais espaço acima da cabeça) para o card da home.
- [ ] Textos do acordeão do professor (`PROFESSOR.creds`) redigidos a partir da bio: confirmar.
- [x] Foto nova do professor (recorte, em `reference/drive/prof-cut.webp`) aplicada no card da home em 11/11.
