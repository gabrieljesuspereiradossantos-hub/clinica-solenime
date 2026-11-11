// Converte as fotos originais da clínica (PNG grandes) para o site, em AVIF, WebP e JPEG, nas larguras 800 e 1600.
// Uso: node scripts/otimizar-fotos.mjs <origem.png> <nome> [<origem.png> <nome> ...]
//      --publico   grava em public/fotos (URL fixa, para o preload do hero no index.html) em vez de src/assets/fotos
//      --share     também gera public/share.jpg (1200x630, prévia de link no WhatsApp/Instagram) a partir da 1ª foto
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const flags = new Set(process.argv.filter((a) => a.startsWith("--")));
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (args.length === 0 || args.length % 2) {
  console.error("Uso: node scripts/otimizar-fotos.mjs [--publico] [--share] <origem> <nome> [...]");
  process.exit(1);
}

const destino = path.resolve(flags.has("--publico") ? "public/fotos" : "src/assets/fotos");
await mkdir(destino, { recursive: true });

const formatos = {
  avif: (s) => s.avif({ quality: 52, effort: 6 }),
  webp: (s) => s.webp({ quality: 76 }),
  jpg: (s) => s.jpeg({ quality: 80, progressive: true, mozjpeg: true }),
};

for (let i = 0; i < args.length; i += 2) {
  const [origem, nome] = [args[i], args[i + 1]];
  for (const largura of [800, 1600]) {
    for (const [ext, aplicar] of Object.entries(formatos)) {
      const saida = path.join(destino, `${nome}-${largura}.${ext}`);
      const info = await aplicar(sharp(origem).resize({ width: largura, withoutEnlargement: true })).toFile(saida);
      console.log(`${path.basename(saida).padEnd(30)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
    }
  }
}

if (flags.has("--share")) {
  const info = await sharp(args[0])
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.resolve("public/share.jpg"));
  console.log(`share.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}
