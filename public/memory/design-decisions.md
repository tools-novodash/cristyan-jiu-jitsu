# Decisões de design · Cristyan (10/11/2026)

Construído com a régua e o checklist de feedback do Adryan no Lobo (memória `adryan-visual-feedback-checklist`), sem protótipo aprovado.

- **Objeto da marca: o losango do logo.** Janela da foto em toda hero (na home ela abre em retângulo cheio no scroll: a marca abrindo para a academia), padrão discreto das seções claras, marcas cinza dentro dos badges pretos, e a marca branca no círculo vermelho de todo botão de agendar.
- **Cores:** vermelho do logo (amostrado 238,30,38 = #EE1E26) para acentos; um vermelho 6% mais fundo (#E01B23) sob texto branco (botões, faixa dos títulos) para passar contraste AA (4,83:1; o vermelho exato dá 4,33). Ink #0D0D0F, papel #F4F2EE.
- **Tipo:** Saira instanciada em largura 108 (mais perto do lettering largo do logo) 700–900, 24 KB; Inter no texto. Títulos em caixa alta com a parte-chave na faixa vermelha (a versão da marca da faixa amarela do Lobo).
- **Botão:** pílula vermelha, marca branca num círculo vermelho escuro, anel pulsando; todo botão de agendar é `#book` (kit Novo Dash). Nav sem botão (está no hero e no fim de toda página); muda de cor conforme a seção (branca sobre clara, preta sobre escura).
- **Páginas:** Home, Programs, 6 páginas de programa (mesma estrutura: hero, "who it is for" com a foto no badge preto, "learn/get" no preto, horário só daquele programa, aula experimental, outros programas, fechamento), Schedule, Instructors, About, Blog (33 posts migrados com os mesmos slugs, cada um com uma foto real da academia escolhida pelo assunto, sem repetir vizinhos), `/book` (kit).
- **Seções com porquê:** graduação como objeto (faixa branca que ganha os 4 graus; números kids/adultos do formulário); a academia de 1.000 → 5.000 sq ft sobre a foto do tatame vazio; aula experimental com os 4 fatos do formulário (grátis, kimono emprestado, sem sparring, até 5 por turma).
- **Celular:** foto em faixa em cima do hero e texto embaixo (nunca sobre rostos), botão sempre na primeira tela; programas em carrossel; sem barra fixa; sem cena presa; horários em abas de dia; menu em tela cheia.
- **Ultrawide:** a coluna escala por `zoom` a partir de 1600px (script no head), todo vw/vh dividido por `--zs` (receita do Lobo).
- **SEO:** 45 páginas pré-renderizadas, cada uma com título, descrição, canonical, OG e JSON-LD (SportsActivityLocation + Person + FAQPage na home + BlogPosting nos posts + breadcrumbs); sitemap com as 45; robots libera bots de IA (no domínio confirmado); `llms.txt`.

## Medições (build de produção, 10/11)
| | |
|---|---|
| Lighthouse mobile home (3 rodadas) | Perf 98–99 · a11y 100 · BP 100 · SEO 69 só pelo noindex da prévia · LCP 2,0 s · CLS 0 · TBT 100 ms |
| Outras páginas | programa 98 · instrutores 98 · blog 91 (LCP 3,5 s: 33 fotos) · a11y 100 e BP 100 em todas |
| Responsivo (finalizador, 14 viewports 320 → 3440) | 14/14 em 8 tipos de página |
| e2e (`node scripts/e2e.mjs`) | 8/8: 26 botões abrem o formulário, turmas reais do GHL, /book, celular |

## Rodada 2 · feedback do Adryan (10/11/2026)
Referência principal: Go Rin. Estrutura das internas: Gonzales (cada página com seções próprias, nada repetido além do card de abertura e do fechamento).
- **Sem cantos arredondados no site todo** (a fonte da marca é reta): regra global `border-radius:0`; botões, nav, cards, chat, tudo quadrado.
- **Hero = card na página branca** com a foto e o texto dentro; no scroll o card abre até as bordas e a foto empurra (o "efeito zoom" logo depois do hero). Mesmo componente em todas as páginas; no celular a foto vira faixa em cima e o texto embaixo, botão na primeira tela.
- **A academia + aula experimental** logo após o hero: quem são (família, currículo), os 8 valores em marquee vazado que anda com o scroll; depois o palco escuro preso por 1 tela em que a foto da academia inteira abre pelo losango do logo e a aula grátis chega como um ingresso picotado ("Admit one · Free trial · 60 min") com os 4 fatos e o botão. No celular sem prender.
- **Programas estilo Go Rin**: cards quadrados, marca do logo surgindo no fundo do card ativo (preto). Home: trilho arrastável com setas, contador e barra. Página Programs: grade com filtro por arte (Jiu-Jitsu, Judo, Capoeira, Boxing) e o programa abre um painel com cada aula explicada (Kids → Tiny, Little, Youth, Junior; Adult → Novice, Intermediate, Advanced). Textos das aulas provisórios.
- **Professor estrutura do Lobo**: card branco, título com o nome na caixa vermelha à esquerda, fatos e botão à direita, painel preto com as marcas e ele em pé na borda.
- **Graduação saiu**; no lugar, **pais com o efeito de mensagens** do Lobo (4 perguntas, respostas vermelhas; os números da graduação entram na resposta "How will I know they are improving?").
- **Schedule**: todos os dias da semana com badge vermelho (hoje em vermelho escuro com a etiqueta "Today"); abas do celular vermelhas.
- **Espaço = walk-in do Lobo** com 8 fotos e 4 números da academia.
- **Reviews**: card ativo vermelho com losango vazado, sombra não corta mais.
- **FAQ centralizado**, pattern mantido.
- **Mapa como no Lobo** no topo do footer (todas as páginas): mapa de fundo, foto da academia à esquerda e cartão de visita à direita. Sem foto da fachada: usei o tatame [CONFIRMAR foto da fachada].
- **Instructors**: passaporte do professor (carimbos pressionados) + a equipe toda no preto (padrão Fight Sports/Gonzales). **About**: texto que acende palavra por palavra, o tatame de 1.000 sq ft que cresce até os 5.000 com o número contando, valores em ladrilhos que viram.
- **Blog removido**; `/blog` e `/blog/*` redirecionam para a home (301). Os 33 posts ficam em `reference/blog-removed`.

Medições: responsivo 14/14 em 6 tipos de página; Lighthouse mobile home 97 (3 rodadas iguais), programs 98, instructors 98, about 99; a11y 100 e BP 100 em todas; e2e 9/9 (34 botões abrem o formulário).

## Ajustes de 11/11
- Schedule saiu da home; na /schedule fica em fundo branco liso. Todas as seções claras passaram de cinza (paper) para branco.
- A seção da academia na home é preta e o hero desce em degradê até esse preto (moldura inclusa): hero, academia e aula grátis viram um bloco escuro só.
- A janela da aula grátis é o próprio logo: `public/images/logo-mask.png` (tinta do ícone recortada do logo original por `scripts/logo-mask.mjs`) + `logo-diamond.svg` (silhueta sólida). A foto aparece pelo logo exato, a silhueta enche por dentro e os dois abrem até cobrir a tela.
- **Values (About)** deixou de ser grade de ladrilhos ("template"): oito palavras em lista, cada uma provada por uma foto real e um fato da academia; a palavra no meio da tela preenche com ponto vermelho e a moldura fixa ao lado troca de foto. No celular, palavra + foto + frase.
- **Pais e Espaço não podem repetir o Lobo** (entregue em 10/11 com o mesmo visual; risco de parecer cópia). Pais virou "What parents search before the first class": campo de busca quadrado que digita a pergunta no scroll, sugestões, envio e a resposta da academia como resultado; histórico à esquerda. Espaço virou um tour de câmera na foto do tatame vazio: da porta de entrada para os assentos dos pais, o tatame, o canto dos equipamentos e a parede do logo, com pins em losango numerados e um cartão por parada; volta para a sala inteira com os números e o botão.
- **Programs reorganizado em 3 grupos** (Adryan, 11/11): Adults BJJ (Novice, Intermediate, Advanced e Women's Self-Defense), Kids BJJ (Tiny, Little, Youth, Junior) e Judo, Capoeira & Box (juntos para nenhum virar página rala). Abas que trocam no hover: no painel do "Programs" no nav e no topo de /programs. Cada grupo tem a sua página com as aulas apresentadas uma a uma (estrutura de capítulos da Gonzales), com a trilha "Your path" em losangos ao lado no lugar da régua da Gonzales. As páginas antigas de Women's, Judo, Capoeira e Box Fitness redirecionam (301) para o capítulo certo.
- **Rodada de 11/11 (tarde):** placeholder de VSL na coluna 2 do hero; ingresso com ícones desenhados, títulos à mão (Scribble Kidsy, subset em `public/fonts`) e headline maior; professor com acordeão e botão abaixo do painel; cartões do tour vermelhos e slides de arrastar no celular; nada encosta na borda (reviews e trilho de programas presos à coluna; a regra global de lista agora usa `:where` para não zerar o padding de quem define o seu); Good to Know virou a linha do dia útil + 3 cards, emendando em degradê no CTA final; instrutores só com nome e faixa, sem o Stephen; About com texto subindo por linhas, polaroid (foto `mission`) e cards novos de 5,000 / 166; /programs ganhou os 3 passos (seção vermelha, faixa preta presa, losangos).
- **Rodada de celular + FIM (11/11, noite):** hero do celular com a foto no card inteiro, texto em cima e a VSL vertical à mostra; sem "See the schedule"; trilhos com arraste e setas (`src/lib/useRail.ts`); pais em balões no celular; tour do celular só com os slides; mapa do celular em bloco próprio (e o pin vermelho, que nunca aparecia por causa do `svg{max-width:100%}`); valores com tinta da esquerda para a direita e foto abrindo pelo losango. FIM: o prerender pré-carregava o logo do nav como LCP e soltava o JS antes da foto pintar; agora pré-carrega a imagem `fetchpriority="high"` e espera a entrada de LCP de imagem (home 81 → 98).
