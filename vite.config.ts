import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Domínio usado na prévia de link (og:image) e nos dados para o Google (index.html).
// Troque quando a clínica tiver domínio próprio (ou defina VITE_SITE_URL no ambiente da Vercel).
process.env.VITE_SITE_URL ??= "https://clinica-solenime-silk.vercel.app";

export default defineConfig({
  plugins: [react()],
});
