// Obtiene el refresh token de Spotify una sola vez. Uso:
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-token.mjs
// En la app de Spotify (developer.spotify.com/dashboard) agrega la Redirect URI http://127.0.0.1:8888/callback
// Guarda el token que imprime como secreto SPOTIFY_REFRESH_TOKEN en GitHub (Settings > Secrets and variables > Actions).
import { createServer } from "node:http";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) { console.error("Faltan SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET."); process.exit(1); }
const REDIRECT = "http://127.0.0.1:8888/callback", state = Math.random().toString(36).slice(2);
const auth = "https://accounts.spotify.com/authorize?" + new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: REDIRECT, state,
  scope: "user-top-read user-read-recently-played" });

const server = createServer(async (req, res) => {
  const u = new URL(req.url, REDIRECT);
  if (u.pathname !== "/callback") { res.writeHead(404).end(); return; }
  if (u.searchParams.get("state") !== state || !u.searchParams.get("code")) { res.end("Autorización cancelada o inválida."); return; }
  const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST",
    headers: { Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "authorization_code", code: u.searchParams.get("code"), redirect_uri: REDIRECT }) });
  const j = await r.json();
  res.end(j.refresh_token ? "Listo. Vuelve a la terminal." : "Error: " + JSON.stringify(j));
  console.log(j.refresh_token ? "\nSPOTIFY_REFRESH_TOKEN=" + j.refresh_token + "\n" : j);
  server.close();
});
server.listen(8888, "127.0.0.1", () => console.log("Abre esta URL e inicia sesión con tu cuenta de Spotify:\n\n" + auth + "\n"));
