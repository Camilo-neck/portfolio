// Genera live.js con datos reales de GitHub y Spotify. Lo corre .github/workflows/live.yml cada día; también a mano: node scripts/live.mjs
// GitHub: API REST pública (GITHUB_TOKEN opcional, solo sube el límite de peticiones).
// Spotify: necesita SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET y SPOTIFY_REFRESH_TOKEN (ver scripts/spotify-token.mjs). Sin ellas conserva lo anterior.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const USER = "Camilo-neck", OUT = new URL("../live.js", import.meta.url);
const env = process.env;
// Colores de lenguaje de GitHub (linguist) para los que aparecen en el perfil; los demás caen en gris
const LANG = { TypeScript: "#3178C6", JavaScript: "#F1E05A", Python: "#3572A5", HTML: "#E34C26", CSS: "#563D7C", Rust: "#DEA584", Dart: "#00B4AB",
  Java: "#B07219", "Jupyter Notebook": "#DA5B0B", Go: "#00ADD8", C: "#555555", "C++": "#F34B7D", "C#": "#178600", Shell: "#89E051", Kotlin: "#A97BFF", Svelte: "#FF3E00", Vue: "#41B883", Markdown: "#8F8F8F" };

async function get(url, opt = {}) {
  const r = await fetch(url, opt);
  if (!r.ok) throw new Error(url + " -> " + r.status + " " + (await r.text()).slice(0, 200));
  return opt.text ? r.text() : r.json();
}

async function github() {
  const h = { headers: { "User-Agent": USER, Accept: "application/vnd.github+json", ...(env.GITHUB_TOKEN ? { Authorization: "Bearer " + env.GITHUB_TOKEN } : {}) } };
  const u = await get("https://api.github.com/users/" + USER, h);
  const repos = await get("https://api.github.com/users/" + USER + "/repos?per_page=100&type=owner", h);
  const top = repos.filter(r => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || Date.parse(b.pushed_at) - Date.parse(a.pushed_at)).slice(0, 6)
    .map(r => ({ n: r.name, d: r.description || "", l: r.language || "Markdown", c: LANG[r.language || "Markdown"] || "#8F8F8F", s: r.stargazers_count }));
  return { repos: u.public_repos, followers: u.followers, following: u.following, bio: u.bio || "", org: (u.company || "").replace(/^@/, ""), loc: u.location || "", top };
}

async function spotify() {
  const basic = Buffer.from(env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET).toString("base64");
  const tok = await get("https://accounts.spotify.com/api/token", { method: "POST", headers: { Authorization: "Basic " + basic, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: env.SPOTIFY_REFRESH_TOKEN }) });
  const h = { headers: { Authorization: "Bearer " + tok.access_token } };
  const img = list => { const s = (list || []).slice().sort((a, b) => a.width - b.width); return (s.find(i => i.width >= 160) || s[s.length - 1] || {}).url || ""; };
  const track = t => ({ n: t.name, a: t.artists.map(x => x.name).join(", "), al: t.album.name, img: img(t.album.images), u: t.external_urls.spotify });
  const tt = await get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5", h);
  const ta = await get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5", h);
  const rp = await get("https://api.spotify.com/v1/me/player/recently-played?limit=1", h);
  const last = rp.items[0];
  return { tracks: tt.items.map(track), artists: ta.items.map(a => ({ n: a.name, img: img(a.images), u: a.external_urls.spotify })),
    last: last ? { ...track(last.track), at: last.played_at } : null };
}

const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8").replace(/^[\s\S]*?var LIVE = /, "").replace(/;\s*$/, "")) : {};
const live = { at: new Date().toISOString(), gh: await github(), sp: prev.sp || null };
// Si Spotify falla (token vencido, cambios de la API) se conserva lo anterior y GitHub igual se actualiza
if (env.SPOTIFY_REFRESH_TOKEN) { try { live.sp = await spotify(); } catch (e) { console.log("::warning::Spotify: " + e.message); } }
else console.log("Sin credenciales de Spotify: se conserva lo anterior.");
writeFileSync(OUT, "/* Generado por scripts/live.mjs (GitHub Actions, cada día). No editar a mano. */\nvar LIVE = " + JSON.stringify(live, null, 1) + ";\n");
console.log("live.js:", live.gh.repos, "repos,", live.gh.followers, "seguidores,", live.sp ? live.sp.tracks.length + " canciones" : "sin Spotify");
