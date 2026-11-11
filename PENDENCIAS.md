# Pendências que dependem da Clínica Solenime

Nada abaixo foi publicado como fato. Cada item está marcado no código (`PENDENTE`) e só deve ser preenchido depois de confirmado.

## Bloqueiam a publicação

| # | Item | Onde no código |
|---|------|----------------|
| 1 | ~~Número oficial de WhatsApp comercial~~ (11) 95503-9318, recebido em 10/11/2026 | `src/config.ts` → `whatsappNumero` |
| 2 | ~~Endereço completo~~ Preenchido com o endereço do perfil do Google Maps (R. Caminho do Pilar, 828, Vila Gilda). Confirmado pela equipe em 10/11/2026 (link maps.app.goo.gl/cAWbFAiY1uFSUUxt7 aponta para o mesmo perfil). | `src/config.ts` → `endereco` |
| 3 | ~~Link do Google Maps~~ Recebido em 2026-11-10 | `src/config.ts` → `mapsUrl` |
| 4 | Horários de atendimento | `src/config.ts` → `horarios` |
| 5 | Valor da consulta (R$160,00 aparece no fluxo atual, mas precisa ser confirmado) | `src/config.ts` → `valorConsultaConfirmado` |
| 6 | Domínio final (sitemap, robots, prévia de link e dados para o Google) | `public/sitemap.xml`, `public/robots.txt` e `VITE_SITE_URL` em `.env` |

## Conteúdo que precisa de validação

- **Procedimentos.** Os 8 itens vieram de fontes públicas e não são um catálogo confirmado. Nenhum aparece no site até que `confirmado: true` seja definido em `src/data/procedimentos.ts`, com descrição e indicação validadas. Confirmar também categorias e preços.
- **Duração da consulta.** O texto atual fala em "duas horas". O site usa "cerca de duas horas". Confirmar.
- **Processo do Protocolo Sole.** A home e a página do protocolo descrevem três etapas (conversa, avaliação, plano). São uma forma genérica de apresentar o atendimento. Confirmar com a equipe.
- **Profissionais.** Não há nenhuma informação confirmada sobre equipe, credenciais ou especializações. A página "A clínica" não tem seção de equipe.
- **Depoimentos.** Não publicados. Só entram com autorização expressa das pacientes.
- **Avaliações do Google.** A home mostra a nota do perfil (4,9, com 600 avaliações, conferida em 2026-11-10) e um link para ler as avaliações no Google. A integração com a API do Google Places já está no código (`src/hooks/useAvaliacoesGoogle.ts`). Ela é ativada ao preencher `VITE_GOOGLE_MAPS_API_KEY` e `VITE_GOOGLE_PLACE_ID` no `.env.local` (ver `.env.example`). A API traz no máximo 5 avaliações e cobra por uso (SKU Place Details com avaliações). Sem chave, a seção continua mostrando a nota estática. O perfil também mostra o telefone (11) 2324-4743 e "Fecha 18:00". Confirmar se esse telefone deve entrar no site e quais são os horários completos.

## Afirmações do Instagram e do quiz que NÃO foram usadas

Estas frases aparecem publicamente, mas são promessas ou superlativos que precisam de comprovação ou revisão jurídica/regulatória antes de qualquer uso:

- "Fique até 10 anos mais jovem em apenas 2 horas" (headline do quiz)
- "Fazemos o seu rosto andar até 10 anos para trás" (bio do Instagram)
- "+15 mil vidas transformadas" (bio do Instagram)
- "A primeira no ABC paulista a desenvolver protocolo de rejuvenescimento" (introdução do quiz)
- Menções a celebridades nos destaques do Instagram (Nicole Bahls, Mara Maravilha)
- Foto e nome de paciente no quiz (Vanessa Santiago)

O site fala apenas em "rejuvenescimento com naturalidade" e não promete anos de diferença nem resultados garantidos.

## Imagens

Fotos recebidas em 10/11/2026 (5): retrato na recepção, sala de espera, recepção (duas versões) e atendimento.
Estão em `src/assets/fotos` (otimizadas por `node scripts/otimizar-fotos.mjs <origem> <nome>`), com textos alternativos em `src/data/fotos.ts`.
Usadas na home (hero, três etapas do Protocolo, A clínica), em Protocolo Sole e em A clínica.

Confirmar com a clínica:
- ~~Retrato do hero e foto do atendimento: autorização de uso de imagem~~ (confirmada pela clínica em 10/11/2026; guardar o documento assinado).
- Se alguma foto foi gerada ou retocada com IA, ela deve mostrar o espaço real e não pode sugerir resultado de tratamento.
- Fotos da equipe/profissional responsável (ainda não há).
- Logotipo oficial em SVG (o wordmark atual é texto provisório). O letreiro dourado das fotos pode servir de base.

## Quiz e lead

- O CTA principal leva ao quiz oficial (`harmoniza.typeform.com/to/hRM7MjcT`), preservando a jornada atual.
- Não foram respondidas as perguntas do quiz durante o levantamento, para não gerar um lead real.
- Não há formulário próprio no site. Se a clínica quiser um, precisa definir campos, destino dos dados e política de privacidade (LGPD).

## Resultados (antes e depois)

8 montagens recebidas em 10/11/2026, em `src/assets/fotos/resultado-*` (recortadas em quadrado). A seção está pronta na home,
logo depois das etapas do Protocolo, mas **desligada** (`RESULTADOS_LIBERADOS = false` em `src/data/resultados.ts`).
Para ver em desenvolvimento: `http://localhost:5173/?preview-resultados`.

Antes de ligar, confirmar com a clínica:
- Termo de autorização de uso de imagem assinado por cada uma das pacientes (rosto em antes e depois é dado de saúde na LGPD).
- Regras de publicidade do conselho da profissional que fez os procedimentos (cada conselho tem regra própria para antes e depois).
- Nome do procedimento de cada caso (campo `procedimento`), para aparecer sob a foto.
- Fotos tiradas nas mesmas condições: em vários casos o "depois" tem cabelo, maquiagem, roupa ou luz diferentes, e em ao menos um
  a pele parece suavizada por filtro. Conselhos costumam exigir as mesmas condições e proibir edição; pode ser preciso trocar casos.
- Validar o título da seção: "Mudanças sutis, a mesma mulher no espelho."
