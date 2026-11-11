# Conceito v2: home da Clínica Solenime

Figma: https://www.figma.com/design/6oLmd26fv0kp6YgMapWwGd (página "Conceito v2"; a v1 continua na "Page 1").

Base: skills `design-taste-frontend` (taste-skill), `impeccable` e `emil-design-eng`.
Tipo de site: **serviço** (clínica). Para esse tipo, o conteúdo é conduzido por fotos, tipografia e cores chapadas. Não usar efeitos, gradientes, shaders nem loops.

## Estrutura (desktop 1440, cada seção com uma ou duas telas de 900px)

| Seção | Altura | Ideia | Visual |
|---|---|---|---|
| Header | 88 | Logo, navegação e CTA "Responder o quiz" | — |
| Hero | 812 (soma 900 com o header) | Ocupa sozinho a primeira tela: H1 da marca, serviço, público e lugar | Retrato editorial 560×(altura total) |
| Abordagem | 900 | **Momento tipográfico** (word-highlight) | Só tipografia, fundo areia100 |
| Protocolo Sole | 1800 | **Capítulos com lateral fixa**: 3 etapas | Uma foto por etapa |
| A clínica | 900 | O ambiente (observado: claro, com madeira e tons neutros) | Foto grande + foto de detalhe |
| Fechamento | 900 | "Comece pelo quiz." em tipo grande sobre cacau800 | — |
| Rodapé | auto | Marca, navegação, Instagram e aviso legal | — |

Mobile 390: tudo em uma coluna, botões com largura total e **barra fixa de ação** ("Responder o quiz"), que aparece depois que o hero sai da tela.

## Tokens

- Novo: `champagne700` **#80633E**, usado nas etiquetas e nos numerais. Tem contraste de cerca de 5,3:1 sobre areia50 e 4,9:1 sobre areia100.
- `champagne500` (#B39568) fica só como detalhe decorativo. Como texto, tem 2,7:1 e não passa no AA.
- Botões: raio de 4px, seta, altura de pelo menos 48px. Variantes: Primary (cacau800), Inverse, Outline inverse e Text link.

## Motion (para implementar no código)

Curvas: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` e `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Não usar `ease-in`. Animar só `transform`, `opacity` e `clip-path`.

| Elemento | Comportamento | Tempo |
|---|---|---|
| Entrada do hero (uma vez, no load) | Etiqueta, H1 linha a linha, texto e ações sobem 16px com fade, em cascata de 60ms | 700ms ease-out |
| Foto do hero | Revelação por `clip-path: inset(100% 0 0 0)` até `inset(0)` | 900ms ease-in-out, 150ms de atraso |
| Botões | Hover: o fundo muda de tom e a seta anda 3px. Press: `scale(0.97)` | 160ms / 120ms |
| Links da navegação | Sublinhado desenhado com `scaleX` de 0 a 1 a partir da esquerda | 200ms ease-out |
| Fotos com link | Zoom de 1.02 dentro da moldura, sem mexer no layout | 600ms ease-out |
| **Momento 1: word-highlight** (Abordagem) | As palavras vão de 22% a 100% de opacidade conforme a seção passa pela tela. Fica só dentro dessa seção | ligado ao scroll |
| **Momento 2: capítulos** (Protocolo) | A lateral fica fixa (`position: sticky`) enquanto as 3 etapas passam. O número da etapa ativa fica em cacau800 | ligado ao scroll |
| Barra fixa mobile | Entra de baixo (`translateY(100%)` até 0) quando o hero sai da tela | 240ms ease-out |

Regras:
- **Remover o `Reveal` (fade-in) de todas as seções.** Os skills tratam fade-in seção a seção como anti-padrão; o movimento fica só na entrada do hero e nos dois momentos.
- Hover só com `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion`: tudo visível e parado, com no máximo fades de opacidade. O texto do word-highlight aparece 100% opaco.

## UX

- A ação principal é uma só ("Responder o quiz") e aparece no máximo duas vezes por tela.
- Alvos de toque de pelo menos 44px no mobile (links do rodapé com espaçamento de 18px).
- Nenhuma legenda embaixo de foto. Os nomes das fotos pendentes ficam só nas camadas do Figma.
- A primeira tela diz o serviço (rejuvenescimento facial), o público (mulheres de 40 a 60), o lugar (Santo André/SP) e a ação.

## Ajustes pendentes no Figma (o limite de chamadas do plano Starter acabou)

1. **Word-highlight não aparece:** o trecho "com calma, escuta e um plano pensado para você." deveria estar em grafite a 22% de opacidade nos dois quadros. A opacidade foi perdida ao vincular a cor à variável.
2. **Hero mobile:** mover "Foto · retrato editorial" para baixo dos botões, dentro do grupo "Ação". Hoje o botão principal fica abaixo da primeira tela (844px).
3. Criar no Figma o quadro de especificação de motion com o conteúdo acima.

## Fotos que a clínica precisa enviar (com autorização de uso)

Retrato editorial para o hero, conversa inicial, avaliação, plano, ambiente da clínica e detalhe do espaço. Até lá, os quadros ficam em tom areia, sem legenda. Não usar banco de imagens nem IA apresentados como fotos da clínica (regra do `PENDENCIAS.md`).

## Decisões de texto para validar

- Etiqueta do hero: "Rejuvenescimento facial · Santo André/SP".
- Destaque "Protocolo Sole: método próprio da clínica", com base no destaque "Método Sole" do Instagram.
- "Um ambiente claro, de madeira e tons neutros", conforme o ambiente observado no Instagram.
- "Cinco perguntas rápidas", conforme o quiz atual.
