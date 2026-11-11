// Descobre o Place ID do perfil da clínica no Google (Places API New, Text Search).
// Uso:  GOOGLE_PLACES_SERVER_KEY=sua_chave npm run place-id
// Use uma chave SEM restrição de referenciador (chamada de servidor), de preferência temporária.
// A chave do site (VITE_GOOGLE_MAPS_API_KEY) costuma ser restrita a navegador e não funciona aqui.

const key = process.env.GOOGLE_PLACES_SERVER_KEY;
const consulta = process.argv[2] || "Clinica Solenime Estética, Santo André - SP";

if (!key) {
  console.error("Defina GOOGLE_PLACES_SERVER_KEY. Ex.: GOOGLE_PLACES_SERVER_KEY=xxx npm run place-id");
  process.exit(1);
}

const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
    "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
  },
  body: JSON.stringify({ textQuery: consulta, languageCode: "pt-BR", regionCode: "BR" }),
});

const json = await res.json();
if (!res.ok) {
  console.error(`Erro ${res.status}:`, json.error?.message ?? json);
  process.exit(1);
}

const lugares = json.places ?? [];
if (lugares.length === 0) {
  console.log("Nenhum resultado. Tente outra consulta: npm run place-id -- \"nome, cidade\"");
  process.exit(0);
}

for (const p of lugares.slice(0, 5)) {
  console.log(`${p.displayName?.text}  |  ${p.formattedAddress}  |  nota ${p.rating ?? "-"} (${p.userRatingCount ?? 0})`);
  console.log(`  VITE_GOOGLE_PLACE_ID=${p.id}\n`);
}
console.log("Confira o endereço (R. Caminho do Pilar, Vila Gilda) e copie a linha certa para o .env.local.");
