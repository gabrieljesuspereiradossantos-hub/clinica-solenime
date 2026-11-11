// Gera ou edita imagens com o Nano Banana (modelo de imagem do Gemini, API do Google AI Studio).
//
// Uso:
//   npm run imagem -- "descrição da imagem"
//   npm run imagem -- "deixe o fundo em tom areia" --ref caminho/foto.png      (edita / usa como referência; pode repetir --ref)
//   npm run imagem -- "..." --nome textura-areia --modelo gemini-3-pro-image-preview
//
// Chave: variável de ambiente GEMINI_API_KEY ou linha GEMINI_API_KEY=... em .env.local (fora do git).
// Saída: pasta gerado/ (fora do site). Só leve para src/assets depois de revisar.
//
// REGRA DO PROJETO: imagem gerada por IA nunca pode ser apresentada como foto da clínica, da equipe,
// de pacientes ou de resultado de tratamento (propaganda enganosa e regras dos conselhos). Use para
// texturas, fundos, ilustrações, mockups e estudos de composição.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const MODELO_PADRAO = "gemini-2.5-flash-image"; // "Nano Banana"; o Pro é gemini-3-pro-image-preview

async function lerChave() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  try {
    const env = await readFile(path.resolve(".env.local"), "utf8");
    const linha = env.split(/\r?\n/).find((l) => l.startsWith("GEMINI_API_KEY="));
    if (linha) return linha.slice("GEMINI_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  } catch {
    /* sem .env.local */
  }
  return "";
}

function lerArgs(argv) {
  const out = { prompt: [], refs: [], nome: "", modelo: MODELO_PADRAO };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--ref") out.refs.push(argv[++i]);
    else if (a === "--nome") out.nome = argv[++i];
    else if (a === "--modelo") out.modelo = argv[++i];
    else out.prompt.push(a);
  }
  return { ...out, prompt: out.prompt.join(" ").trim() };
}

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

const args = lerArgs(process.argv.slice(2));
if (!args.prompt) {
  console.error('Uso: npm run imagem -- "descrição" [--ref arquivo] [--nome saida] [--modelo id]');
  process.exit(1);
}
const chave = await lerChave();
if (!chave) {
  console.error("Falta a chave: defina GEMINI_API_KEY no ambiente ou em .env.local (veja .env.example).");
  process.exit(1);
}

const parts = [{ text: args.prompt }];
for (const ref of args.refs) {
  const mime = MIME[path.extname(ref).toLowerCase()];
  if (!mime) throw new Error(`Formato não suportado em --ref: ${ref}`);
  parts.push({ inlineData: { mimeType: mime, data: (await readFile(ref)).toString("base64") } });
}

const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${args.modelo}:generateContent`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-goog-api-key": chave },
  body: JSON.stringify({ contents: [{ parts }], generationConfig: { responseModalities: ["TEXT", "IMAGE"] } }),
});
const json = await resp.json().catch(() => ({}));
if (!resp.ok) {
  console.error(`Erro ${resp.status}: ${json.error?.message ?? resp.statusText}`);
  process.exit(1);
}

const saidas = json.candidates?.[0]?.content?.parts ?? [];
await mkdir(path.resolve("gerado"), { recursive: true });
const base = args.nome || `imagem-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}`;
let n = 0;
for (const p of saidas) {
  if (p.text) console.log(p.text.trim());
  if (p.inlineData?.data) {
    const ext = p.inlineData.mimeType === "image/jpeg" ? "jpg" : "png";
    const arquivo = path.resolve("gerado", `${base}${n ? `-${n + 1}` : ""}.${ext}`);
    await writeFile(arquivo, Buffer.from(p.inlineData.data, "base64"));
    console.log(`Imagem salva: ${path.relative(process.cwd(), arquivo)}`);
    n++;
  }
}
if (n === 0) {
  console.error(`Nenhuma imagem na resposta${json.promptFeedback?.blockReason ? ` (bloqueada: ${json.promptFeedback.blockReason})` : ""}.`);
  process.exit(1);
}
