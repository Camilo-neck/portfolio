/* Base común a todos los temas: idioma, secciones de contenido, terminal, recompensas, navegación y bucle de animación.
   El tema activo se registra con CC.useTheme({ mount, render, start, resize, redraw, reveal }). */
var CC = (function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lang = "es", theme = null;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  var sl = store("lang"); if (sl === "en" || sl === "es") lang = sl;
  function L(o) { return (o && typeof o === "object") ? o[lang] : o; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function tr(k) { return T[lang][k]; }
  function addStrings(s) { Object.assign(T.es, s.es); Object.assign(T.en, s.en); }

  var ICON = {
    ia: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM7 10h10M7 14h10M12 5v14",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
    chip: "M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
    nerve: "M3 12h4l2-6 4 12 2-6h6",
    bone: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10",
    tool: "M14 6a4 4 0 0 0-5 5l-5 5 4 4 5-5a4 4 0 0 0 5-5l-3 1-2-2z",
    log: "M5 3h14v18H5zM9 8h6M9 12h6M9 16h4",
    net: "M12 2l10 10-10 10L2 12z",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    flag: "M4 20V4M4 6h12l-3 4 3 4H4",
    mail: "M3 5h18v14H3zM3 6l9 7 9-7"
  };
  function svg(name) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", ICON[name]); p.setAttribute("fill", "none"); p.setAttribute("stroke", "currentColor"); p.setAttribute("stroke-width", "2"); p.setAttribute("stroke-linejoin", "round"); p.setAttribute("stroke-linecap", "round");
    s.appendChild(p); return s;
  }

  /* Colores del tema activo leídos de las variables CSS, para los canvas */
  var COL = {};
  function readColors() {
    var cs = getComputedStyle(root);
    ["red", "red-dim", "cyan", "yellow", "green", "bg"].forEach(function (k) { COL[k] = cs.getPropertyValue("--" + k).trim(); });
  }

  /* ---------- Estático ---------- */
  function applyStatic() {
    root.setAttribute("lang", lang);
    $$("[data-i18n]").forEach(function (n) { var v = T[lang][n.getAttribute("data-i18n")]; if (typeof v === "string") n.textContent = v; });
    $("#copy").textContent = "© " + new Date().getFullYear() + " " + NAME;
    $("#langBtn").textContent = lang === "es" ? "EN" : "ES";
    $("#langBtn").setAttribute("aria-label", tr("langAria"));
    $("#lockStat").title = tr("lockTitle");
  }

  /* ---------- Selector de tema: guarda la elección y recarga; la página vuelve a la sección donde estaba ---------- */
  function renderThemes() {
    var ul = $("#thList"), now = THEMES.filter(function (t) { return t.id === THEME; })[0];
    $("#thIcon").src = "themes/" + THEME + "/icon.webp";
    $("#thBtn").setAttribute("aria-label", tr("thAria") + ": " + now.name); $("#thBtn").title = tr("thTitle");
    ul.textContent = "";
    THEMES.forEach(function (t) {
      var li = el("li"), b = el("button", "thopt"), im = el("img"), tx = el("span");
      b.type = "button"; b.disabled = !!t.soon; b.setAttribute("aria-pressed", t.id === THEME ? "true" : "false");
      im.src = "themes/" + t.id + "/icon.webp"; im.alt = ""; im.width = 32; im.height = 32;
      tx.appendChild(el("b", null, t.name)); if (t.soon) tx.appendChild(el("small", null, tr("thSoon")));
      b.appendChild(im); b.appendChild(tx);
      b.addEventListener("click", function () { setTheme(t.id); });
      li.appendChild(b); ul.appendChild(li);
    });
  }
  $("#thMenu").addEventListener("beforetoggle", function (e) {
    if (e.newState !== "open") return;
    hideHint();
    var r = $("#thBtn").getBoundingClientRect();
    this.style.top = Math.round(r.bottom + 8) + "px"; this.style.right = Math.max(16, Math.round(root.clientWidth - r.right)) + "px";
  });
  function setTheme(id) {
    $("#thMenu").hidePopover();
    if (id === THEME) return;
    store("theme", id); store("themeHint", "1");
    try { sessionStorage.setItem("sec", cur); } catch (e) {}
    root.style.setProperty("--th-icon", 'url("themes/' + id + '/icon.webp")'); root.classList.add("th-out");
    setTimeout(function () { location.reload(); }, reduce ? 0 : 300);
  }
  /* Tarjetas de "Mis juegos favoritos": cada una con la paleta de su juego, sin importar el tema activo */
  function renderGames() {
    var box = $("#games"); box.textContent = "";
    THEMES.forEach(function (t) {
      var g = GAMES[t.id], here = t.id === THEME, b = el("button", "game"); if (!g || t.soon) return;
      b.type = "button"; b.dataset.g = t.id; b.setAttribute("aria-pressed", here ? "true" : "false");
      var top = el("span", "g-top"), im = el("img"); im.src = "themes/" + t.id + "/icon.webp"; im.alt = ""; im.width = im.height = 52; top.appendChild(im);
      var sw = el("span", "g-sw"); g.sw.forEach(function (c) { var i = el("i"); i.style.setProperty("--c", c); sw.appendChild(i); }); top.appendChild(sw);
      b.appendChild(top);
      b.appendChild(el("b", "g-n", t.name));
      b.appendChild(el("span", "g-d", L(g.d)));
      var mg = el("span", "g-m"); mg.appendChild(el("small", null, tr("gmGame"))); mg.appendChild(document.createTextNode(L(g.g))); b.appendChild(mg);
      b.appendChild(el("span", "g-cta", here ? tr("gmNow") : tr("gmGo") + " →"));
      b.addEventListener("click", function () { if (!here) setTheme(t.id); });
      box.appendChild(b);
    });
  }

  /* Aviso de la primera visita junto al botón de tema; desaparece para siempre al cerrarlo o al usarlo */
  var hint = null;
  function placeHint() {
    if (!hint) return;
    var r = $("#thBtn").getBoundingClientRect(), right = Math.max(16, Math.round(root.clientWidth - r.right - 8));
    hint.style.top = Math.round(r.bottom + 12) + "px"; hint.style.right = right + "px";
    hint.style.setProperty("--ax", Math.round(root.clientWidth - right - r.left - r.width / 2 - 7) + "px");
  }
  function hideHint() { if (!hint) return; store("themeHint", "1"); hint.remove(); hint = null; $("#thBtn").classList.remove("pulse"); }
  function showHint() {
    if (store("themeHint") || hint) return;
    hint = el("div", "th-hint"); hint.setAttribute("role", "status");
    hint.appendChild(el("b", null, tr("hintT")));
    var p = el("p"); p.appendChild(document.createTextNode(tr("hintD") + " ")); var a = el("a", null, tr("hintGo")); a.href = "#juegos"; a.addEventListener("click", hideHint); p.appendChild(a); p.appendChild(document.createTextNode(".")); hint.appendChild(p);
    var x = el("button", "x", "×"); x.type = "button"; x.setAttribute("aria-label", tr("hintX")); x.addEventListener("click", hideHint); hint.appendChild(x);
    document.body.appendChild(hint); $("#thBtn").classList.add("pulse"); placeHint();
  }
  window.addEventListener("resize", placeHint);

  function restoreSection() {
    var sec; try { sec = sessionStorage.getItem("sec"); sessionStorage.removeItem("sec"); } catch (e) {}
    var n = sec && document.getElementById(sec); if (!n) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    n.scrollIntoView({ behavior: "instant" });
    return n;
  }
  /* Quita la cortina del cambio de tema cuando las fuentes ya cargaron (o a los 800 ms), tras volver a la sección */
  function themeIn(n) {
    if (!root.classList.contains("th-in")) return;
    var done = false, go = function () {
      if (done) return; done = true;
      if (n) n.scrollIntoView({ behavior: "instant" });
      root.classList.add("th-go"); setTimeout(function () { root.classList.remove("th-in", "th-go"); }, 450);
    };
    if (document.fonts) document.fonts.ready.then(go); setTimeout(go, 800);
  }

  /* ---------- Proyectos ---------- */
  var jFilter = "all", jIdx = 0;
  function renderJFilters() {
    var box = $("#jFilters"); box.textContent = "";
    [["all", tr("fAll")]].concat(Object.keys(TYPES).map(function (k) { return [k, L(TYPES[k])]; })).forEach(function (f) {
      var b = el("button", "fbtn", f[1]); b.type = "button"; b.setAttribute("aria-pressed", jFilter === f[0] ? "true" : "false");
      b.addEventListener("click", function () {
        jFilter = f[0]; renderJFilters();
        var vis = PROJ.map(function (p, i) { return (jFilter === "all" || p.t === jFilter) ? i : -1; }).filter(function (i) { return i >= 0; });
        if (vis.indexOf(jIdx) < 0 && vis.length) jIdx = vis[0];
        renderJList(); renderJDetail(true);
      });
      box.appendChild(b);
    });
  }
  function renderJList() {
    var list = $("#jList"); list.textContent = "";
    PROJ.forEach(function (p, i) {
      var b = el("button", "jbtn"); b.type = "button"; b.id = "pj" + i; b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === jIdx ? "true" : "false"); b.setAttribute("aria-controls", "jDetail"); b.tabIndex = i === jIdx ? 0 : -1;
      b.hidden = !(jFilter === "all" || p.t === jFilter);
      b.appendChild(el("span", "jn", L(p.n))); b.appendChild(el("span", "jt", L(TYPES[p.t]) + ", " + L(p.st)));
      b.addEventListener("click", function () { selectJ(i, false); });
      b.addEventListener("keydown", function (e) {
        var vis = $$(".jbtn").filter(function (x) { return !x.hidden; }).map(function (x) { return +x.id.slice(2); }), k = vis.indexOf(i), j = -1;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") j = vis[(k + 1) % vis.length];
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = vis[(k - 1 + vis.length) % vis.length];
        if (j >= 0 && j !== undefined) { e.preventDefault(); selectJ(j, true); }
      });
      list.appendChild(b);
    });
  }
  function selectJ(i, focus) {
    jIdx = i;
    $$(".jbtn").forEach(function (b, j) { b.setAttribute("aria-selected", j === i ? "true" : "false"); b.tabIndex = j === i ? 0 : -1; });
    if (focus) $("#pj" + i).focus();
    renderJDetail(true);
  }
  function swapAnim(n) { if (!reduce) { n.classList.remove("swap"); void n.offsetWidth; n.classList.add("swap"); } }
  function renderJDetail(anim) {
    var p = PROJ[jIdx], d = $("#jDetail"); d.textContent = ""; d.setAttribute("aria-labelledby", "pj" + jIdx);
    var ch = el("div", "chips"); ch.appendChild(el("span", "chip", L(TYPES[p.t]))); ch.appendChild(el("span", "chip y", L(p.st))); d.appendChild(ch);
    d.appendChild(el("h3", null, L(p.n)));
    d.appendChild(el("p", "sum", L(p.sum)));
    var pts = L(p.pts);
    if (pts.length) { var ul = el("ul"); pts.forEach(function (x) { ul.appendChild(el("li", null, x)); }); d.appendChild(ul); }
    if (p.stack.length) { var st = el("div", "stack"); p.stack.forEach(function (x) { st.appendChild(el("span", null, L(x))); }); d.appendChild(st); }
    if (p.links) { var lk = el("div", "links"); p.links.forEach(function (x) { var a = el("a", "btn c", x[0]); a.href = x[1]; a.target = "_blank"; a.rel = "noopener"; lk.appendChild(a); }); d.appendChild(lk); }
    if (anim) swapAnim(d);
  }

  /* ---------- Publicaciones ---------- */
  function renderPubs() {
    var box = $("#pubs"); box.textContent = "";
    PUBS.forEach(function (p) {
      var a = el("article", "brk pub"), main = el("div"), side = el("div", "pub-side");
      var meta = el("div", "pub-meta"); meta.appendChild(el("span", "chip", L(p.kind))); meta.appendChild(el("span", "chip y", L(p.date))); meta.appendChild(el("span", "chip m", p.venue)); main.appendChild(meta);
      var h = el("h3", null, p.title); if (p.subtitle) h.appendChild(el("span", null, p.subtitle)); main.appendChild(h);
      var au = el("p", "authors", p.about ? (lang === "es" ? "Sobre el trabajo de " : "About the work of ") : null);
      p.authors.forEach(function (n, i) { if (i) au.appendChild(document.createTextNode(", ")); if (/^Camilo/.test(n)) au.appendChild(el("b", null, n)); else au.appendChild(document.createTextNode(n)); });
      main.appendChild(au);
      main.appendChild(el("p", "abs", L(p.abs)));
      if (p.pts) { var ul = el("ul"); L(p.pts).forEach(function (x) { ul.appendChild(el("li", null, x)); }); main.appendChild(ul); }
      if (p.links.length) { var lk = el("div", "links"); p.links.forEach(function (x) { var l = el("a", "btn c", L(x[0])); l.href = x[1]; l.target = "_blank"; l.rel = "noopener"; lk.appendChild(l); }); main.appendChild(lk); }
      side.appendChild(el("h4", null, tr("pubFigs")));
      var fg = el("div", "figs"); p.figs.forEach(function (f) { var d = el("div"); d.appendChild(el("b", null, f[0])); d.appendChild(el("span", null, L(f[1]))); fg.appendChild(d); }); side.appendChild(fg);
      if (p.esc) {
        var es = el("div", "esc"), bar = el("div", "esc-bar"), fill = el("i"); fill.style.width = (p.esc[0] / p.esc[1] * 100).toFixed(1) + "%"; bar.appendChild(fill);
        bar.setAttribute("role", "img"); bar.setAttribute("aria-label", tr("pubEsc")(p.esc[0], p.esc[1]));
        es.appendChild(bar); es.appendChild(el("span", null, tr("pubEsc")(p.esc[0], p.esc[1]))); side.appendChild(es);
      }
      if (p.note) side.appendChild(el("p", "note", L(p.note)));
      a.appendChild(main); a.appendChild(side); box.appendChild(a);
    });
  }

  /* ---------- GitHub (cifras de live.js) ---------- */
  function fdate(iso, time) {
    var o = time ? { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" } : { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", o).format(new Date(iso));
  }
  function renderRepos() {
    $$("[data-gh]").forEach(function (n) { n.textContent = LIVE.gh[n.getAttribute("data-gh")]; });
    $("#ghSub").textContent = tr("ghSub")(fdate(LIVE.at));
    var ul = $("#repos"); ul.textContent = "";
    REPOS.forEach(function (r) {
      var li = el("li"), a = el("a"); a.href = "https://github.com/Camilo-neck/" + r.n; a.target = "_blank"; a.rel = "noopener";
      a.appendChild(el("span", "rn", r.n));
      a.appendChild(el("span", "rs", "★ " + r.s));
      var d = el("span", "rd"), lg = el("span"), dot = el("i"); dot.style.setProperty("--lc", r.c); lg.appendChild(dot); lg.appendChild(document.createTextNode(r.l));
      d.appendChild(lg); if (r.d) d.appendChild(el("span", null, L(r.d))); a.appendChild(d);
      a.setAttribute("aria-label", r.n + ", " + r.l + ", " + r.s + " " + tr("stars"));
      li.appendChild(a); ul.appendChild(li);
    });
  }

  /* ---------- Banda sonora (Spotify, de live.js). Sin datos la sección queda oculta ---------- */
  function cover(src) { var im = el("img", "cov"); im.src = src; im.alt = ""; im.loading = "lazy"; im.decoding = "async"; im.width = im.height = 64; return im; }
  function renderMusic() {
    var sp = LIVE.sp; if (!sp) return;
    $("#muSub").textContent = tr("muSub")(fdate(LIVE.at));
    var ol = $("#muTracks"); ol.textContent = "";
    sp.tracks.forEach(function (t, i) {
      var li = el("li"), a = el("a", "trk"); a.href = t.u; a.target = "_blank"; a.rel = "noopener";
      a.appendChild(el("span", "tn", String(i + 1).padStart(2, "0"))); if (t.img) a.appendChild(cover(t.img));
      var ti = el("span", "ti"); ti.appendChild(el("b", null, t.n)); ti.appendChild(el("span", null, t.a)); a.appendChild(ti);
      var eq = el("span", "eq"); eq.setAttribute("aria-hidden", "true"); for (var k = 0; k < 4; k++) eq.appendChild(el("i")); a.appendChild(eq);
      a.setAttribute("aria-label", (i + 1) + ". " + t.n + ", " + t.a + " (" + tr("muOpen") + ")");
      li.appendChild(a); ol.appendChild(li);
    });
    var now = $("#muNow"); now.textContent = ""; now.hidden = !sp.last;
    if (sp.last) {
      var l = sp.last, h = el("a", "np"); h.href = l.u; h.target = "_blank"; h.rel = "noopener";
      h.appendChild(el("small", null, tr("muLast"))); if (l.img) h.appendChild(cover(l.img));
      var nt = el("span", "ti"); nt.appendChild(el("b", null, l.n)); nt.appendChild(el("span", null, l.a));
      var tm = el("time", null, fdate(l.at, true)); tm.dateTime = l.at; nt.appendChild(tm); h.appendChild(nt);
      now.appendChild(h);
    }
    var ul = $("#muArtists"); ul.textContent = "";
    sp.artists.forEach(function (r) {
      var li = el("li"), a = el("a"); a.href = r.u; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", r.n + " (" + tr("muOpen") + ")");
      if (r.img) a.appendChild(cover(r.img)); a.appendChild(el("span", null, r.n)); li.appendChild(a); ul.appendChild(li);
    });
  }
  var snCv = $("#snake"), snx = snCv.getContext("2d"), SN = { cols: 0, rows: 7, cell: 0, grid: [], body: [], dir: [1, 0], acc: 0 };
  function snakeSize() {
    var r = snCv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    snCv.width = Math.max(1, Math.round(r.width * d)); snCv.height = Math.max(1, Math.round(r.height * d)); snx.setTransform(d, 0, 0, d, 0, 0);
    SN.cell = r.height / SN.rows; SN.cols = Math.max(8, Math.floor(r.width / SN.cell)); SN.w = r.width; SN.h = r.height;
    SN.grid = []; for (var i = 0; i < SN.cols * SN.rows; i++) SN.grid.push(Math.random() < .55 ? 1 + Math.floor(Math.random() * 4) : 0);
    SN.body = [[3, 3], [2, 3], [1, 3], [0, 3]]; SN.dir = [1, 0];
    drawSnake();
  }
  function snakeStep() {
    var h = SN.body[0], best = null, bd = 1e9, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    var target = -1; for (var i = 0; i < SN.grid.length; i++) if (SN.grid[i]) { var tx = i % SN.cols, ty = Math.floor(i / SN.cols), dd = Math.abs(tx - h[0]) + Math.abs(ty - h[1]); if (dd < bd) { bd = dd; target = i; } }
    if (target < 0) { for (var k = 0; k < SN.grid.length; k++) SN.grid[k] = Math.random() < .55 ? 1 + Math.floor(Math.random() * 4) : 0; return; }
    var gx = target % SN.cols, gy = Math.floor(target / SN.cols), bestD = 1e9;
    dirs.forEach(function (d) {
      if (d[0] === -SN.dir[0] && d[1] === -SN.dir[1]) return;
      var nx = h[0] + d[0], ny = h[1] + d[1];
      if (nx < 0 || ny < 0 || nx >= SN.cols || ny >= SN.rows) return;
      if (SN.body.some(function (b) { return b[0] === nx && b[1] === ny; })) return;
      var dd = Math.abs(gx - nx) + Math.abs(gy - ny); if (dd < bestD) { bestD = dd; best = d; }
    });
    if (!best) { SN.body = [[0, 0], [0, 0], [0, 0], [0, 0]]; SN.dir = [1, 0]; return; }
    SN.dir = best; var nh = [h[0] + best[0], h[1] + best[1]]; SN.body.unshift(nh);
    var idx = nh[1] * SN.cols + nh[0]; if (SN.grid[idx]) { SN.grid[idx] = 0; if (SN.body.length > 9) SN.body.pop(); } else SN.body.pop();
  }
  function drawSnake() {
    var c = snx, s = SN.cell, pad = 2; c.clearRect(0, 0, SN.w, SN.h);
    for (var i = 0; i < SN.grid.length; i++) {
      var x = (i % SN.cols) * s, y = Math.floor(i / SN.cols) * s, v = SN.grid[i];
      c.fillStyle = v ? COL.cyan : COL["red-dim"]; c.globalAlpha = v ? .2 + v * .18 : .25; c.fillRect(x + pad, y + pad, s - pad * 2, s - pad * 2);
    }
    c.globalAlpha = 1; c.fillStyle = COL.yellow;
    SN.body.forEach(function (b, i) { c.globalAlpha = 1 - i * .07; c.fillRect(b[0] * s + 1, b[1] * s + 1, s - 2, s - 2); });
    c.globalAlpha = 1;
  }

  /* ---------- Trayectoria ---------- */
  function renderPath() {
    [["#pathPast", PATH_PAST, ""], ["#pathNext", PATH_NEXT, "n"]].forEach(function (pr) {
      var ul = $(pr[0]); ul.textContent = "";
      pr[1].forEach(function (x) { var li = el("li", pr[2]); li.appendChild(el("strong", null, L(x.t))); li.appendChild(el("span", null, L(x.d))); ul.appendChild(li); });
    });
  }

  /* ---------- Recompensas: el minijuego del tema llama a unlock(i) ---------- */
  var UNL = [false, false, false];
  try { var su = JSON.parse(localStorage.getItem("unlocks") || "null"); if (su && su.length === 3) UNL = su.map(Boolean); } catch (e) {}
  var overload = store("overload") === "1" && UNL[2];
  function unlock(i) {
    if (UNL[i]) { applyUnlocks(); return; }
    UNL[i] = true; try { localStorage.setItem("unlocks", JSON.stringify(UNL)); } catch (e) {}
    var lk = $("#lock" + i);
    if (lk && !reduce) { lk.classList.add("open"); setTimeout(function () { lk.classList.remove("open"); applyUnlocks(); }, 1300); }
    applyUnlocks();
    if (i === 0) out(tr("tGranted"), "sys");
  }
  function applyUnlocks() {
    [0, 1].forEach(function (i) { var lk = $("#lock" + i); lk.hidden = UNL[i] && !lk.classList.contains("open"); });
    $("#tIn").disabled = !UNL[0];
    $$("#qchips button").forEach(function (b) { b.disabled = !UNL[0]; });
    var ob = $("#ovrBtn"); ob.disabled = !UNL[2]; ob.textContent = !UNL[2] ? tr("ovrLocked") : (overload ? tr("ovrOff") : tr("ovrOn"));
    $("#lockN").textContent = UNL.filter(Boolean).length + "/3";
  }
  function toggleOverload() { overload = !overload; store("overload", overload ? "1" : "0"); applyMode(); }
  $("#ovrBtn").addEventListener("click", function () { if (UNL[2]) toggleOverload(); });
  function applyMode() {
    if (overload) root.setAttribute("data-mode", "overload"); else root.removeAttribute("data-mode");
    readColors(); applyUnlocks(); if (theme.redraw) theme.redraw(lastT); drawSnake();
  }

  /* ---------- Terminal ---------- */
  var tOut = $("#tOut"), tIn = $("#tIn"), hist = [], hIdx = 0;
  function out(txt, cls, href) {
    var p = el("p", "t-line" + (cls ? " " + cls : ""));
    if (href) { p.appendChild(document.createTextNode(txt + " ")); var a = el("a", null, href); a.href = href; a.target = "_blank"; a.rel = "noopener"; p.appendChild(a); }
    else p.textContent = txt;
    tOut.appendChild(p); tOut.scrollTop = tOut.scrollHeight;
  }
  var ALIAS = { ayuda: "help", help: "help", "?": "help", quien: "about", "quién": "about", about: "about", whoami: "about", skills: "skills", capacidades: "skills", proyectos: "projects", projects: "projects", github: "github", publicaciones: "pubs", publications: "pubs", papers: "pubs", trayectoria: "path", path: "path", contacto: "contact", contact: "contact", idioma: "lang", lang: "lang", sobrecarga: "ovr", overload: "ovr", nether: "ovr", kurosawa: "ovr", traje: "ovr", suit: "ovr", limpiar: "clear", clear: "clear", sudo: "sudo", hack: "hack", ir: "go", go: "go" };
  function run(raw) {
    var c = raw.trim(); if (!c || !UNL[0]) return;
    out("> " + c, "cmd");
    var parts = c.replace(/^\//, "").toLowerCase().split(/\s+/), k = ALIAS[parts[0]], es = lang === "es";
    if (k === "help") out(tr("tHelp"));
    else if (k === "about") { out(NAME + ". " + tr("role") + "."); out(tr("lede")); }
    else if (k === "skills") SLOTS.forEach(function (s) { out("[" + L(s.sys) + "] " + L(s.area) + ": " + s.mods.map(function (x) { return L(x.n) + (x.s === "t" ? "*" : ""); }).join(", ")); });
    else if (k === "projects") PROJ.forEach(function (p) { out("- " + L(p.n) + " (" + L(TYPES[p.t]) + ", " + L(p.st) + ")"); });
    else if (k === "pubs") PUBS.forEach(function (p) { out("- " + p.title + ": " + p.subtitle + " (" + p.venue + ", " + L(p.date) + ")", "", p.links[0][1]); });
    else if (k === "github") { out("@Camilo-neck: " + LIVE.gh.repos + " repos, " + LIVE.gh.followers + " " + (es ? "seguidores" : "followers") + "."); out(es ? "Perfil:" : "Profile:", "", LINKS.github); }
    else if (k === "path") PATH_PAST.concat(PATH_NEXT).forEach(function (x) { out("- " + L(x.t) + ". " + L(x.d)); });
    else if (k === "contact") { out("LinkedIn:", "", LINKS.linkedin); out("GitHub:", "", LINKS.github); }
    else if (k === "go") {
      var map = { capacidades: "capacidades", skills: "capacidades", proyectos: "proyectos", projects: "proyectos", publicaciones: "publicaciones", publications: "publicaciones", github: "github", trayectoria: "trayectoria", path: "trayectoria", contacto: "contacto", contact: "contacto", juegos: "juegos", games: "juegos", musica: "musica", music: "musica", inicio: "inicio", home: "inicio" }, tgt = map[parts[1]];
      if (tgt && !document.getElementById(tgt).hidden) { out(es ? "Saltando a " + parts[1] + "..." : "Jumping to " + parts[1] + "...", "sys"); document.getElementById(tgt).scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
      else out(es ? "Uso: ir capacidades | proyectos | github | trayectoria | contacto" : "Usage: go skills | projects | github | path | contact");
    }
    else if (k === "lang") { toggleLang(); out(es ? "Language: English." : "Idioma: español.", "sys"); }
    else if (k === "ovr") { if (UNL[2]) { toggleOverload(); out(tr(overload ? "tOvrOn" : "tOvrOff"), "sys"); } else out(tr("tOvrLocked")); }
    else if (k === "clear") tOut.textContent = "";
    else if (k === "sudo") out(es ? "Permiso denegado: aquí todos somos visitantes." : "Permission denied: everyone here is a visitor.");
    else if (k === "hack") out(tr("tHack"), "sys");
    else out(tr("tUnknown"));
    if (k === "skills") out(es ? "* en entrenamiento" : "* in training");
  }
  $("#tForm").addEventListener("submit", function (e) { e.preventDefault(); var v = tIn.value; if (v.trim()) { hist.push(v); hIdx = hist.length; } run(v); tIn.value = ""; });
  tIn.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); tIn.value = hist[hIdx]; }
    else if (e.key === "ArrowDown" && hist.length) { e.preventDefault(); hIdx = Math.min(hist.length, hIdx + 1); tIn.value = hist[hIdx] || ""; }
  });
  function renderChips() {
    var box = $("#qchips"); box.textContent = "";
    tr("tChips").forEach(function (c) {
      var b = el("button", "fbtn", c); b.type = "button"; b.disabled = !UNL[0]; b.addEventListener("click", function () { run(c); }); box.appendChild(b);
    });
  }
  function renderArchive() {
    var ul = $("#archive"); ul.textContent = "";
    ARCHIVE.forEach(function (a) { var li = el("li"); li.appendChild(el("b", null, a[0])); li.appendChild(el("span", null, L(a[1]))); ul.appendChild(li); });
  }

  /* ---------- Idioma ---------- */
  function reveal(node, text, ms) { if (theme.reveal) theme.reveal(node, text, ms); else node.textContent = text; }
  function renderAll() {
    applyStatic(); renderThemes(); renderGames(); renderJFilters(); renderJList(); renderJDetail(false); renderPubs(); renderRepos(); renderMusic(); renderPath(); renderChips(); renderArchive();
    theme.render(); applyUnlocks();
    reveal($("#tagline"), tr("tagline"), 900);
  }
  function toggleLang() { lang = lang === "es" ? "en" : "es"; store("lang", lang); renderAll(); }
  $("#langBtn").addEventListener("click", toggleLang);

  /* ---------- Navegación ---------- */
  // Banda sonora oculta por ahora (decisión de Camilo); para mostrarla: SHOW_MUSIC = true. Igual necesita LIVE.sp
  var SHOW_MUSIC = false;
  $("#musica").hidden = !SHOW_MUSIC || !LIVE.sp;
  var tabs = $$("#tabs .tab"), order = ["inicio", "capacidades", "proyectos", "publicaciones", "github", "acceso", "trayectoria", "juegos", "musica", "contacto"].filter(function (id) { return !document.getElementById(id).hidden; }), cur = "inicio";
  var inBand = {};
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) { inBand[e.target.id] = e.isIntersecting; });
    var on = order.filter(function (id) { return inBand[id]; }); if (!on.length) return;
    cur = on[on.length - 1];
    tabs.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + cur ? "true" : "false"); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main .band").forEach(function (s) { spy.observe(s); });
  document.addEventListener("keydown", function (e) {
    var tg = e.target; if (tg && (tg.tagName === "INPUT" || tg.tagName === "TEXTAREA") || e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key.toLowerCase(), i = order.indexOf(cur);
    if (k === "q" || k === "e") { var j = Math.max(0, Math.min(order.length - 1, i + (k === "e" ? 1 : -1))); document.getElementById(order[j]).scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
  });
  function tickClock() { var d = new Date(); $("#clock").textContent = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  setInterval(tickClock, 5000); tickClock();

  /* ---------- Bucle: cada animación corre solo mientras su elemento está a la vista ---------- */
  var anims = [], raf = 0, prev = 0, lastT = 0;
  function anim(node, step) {
    var a = { vis: false, step: step }; anims.push(a);
    new IntersectionObserver(function (es) { a.vis = es[0].isIntersecting; kick(); }).observe(node);
  }
  function loop(now) {
    raf = 0; if (document.hidden) return;
    var dt = Math.min(.05, (now - prev) / 1000 || .016), any = false; prev = now; lastT = now / 1000;
    anims.forEach(function (a) { if (a.vis) { a.step(dt, lastT); any = true; } });
    if (any) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!reduce && !raf && !document.hidden && anims.some(function (a) { return a.vis; })) { prev = performance.now(); raf = requestAnimationFrame(loop); } }
  document.addEventListener("visibilitychange", kick);
  var snAcc = 0;
  anim(snCv, function (dt) { snAcc += dt; if (snAcc > .12) { snAcc = 0; snakeStep(); drawSnake(); } });
  window.addEventListener("resize", function () { if (theme.resize) theme.resize(); snakeSize(); });

  /* ---------- Arranque: lo dispara el tema al registrarse ---------- */
  function useTheme(th) {
    theme = th;
    if (overload) root.setAttribute("data-mode", "overload");
    readColors();
    th.mount();
    renderAll();
    if (th.start) th.start();
    snakeSize();
    reveal($("#heroName"), "Camilo Andrés\nCuello Romero", 1100);
    out(tr("tOnline"), "sys");
    themeIn(restoreSection());
    setTimeout(showHint, 1200);
    kick();
  }

  return {
    $: $, $$: $$, el: el, svg: svg, L: L, tr: tr, store: store, addStrings: addStrings, root: root, reduce: reduce, COL: COL,
    lang: function () { return lang; }, now: function () { return lastT; }, swapAnim: swapAnim,
    UNL: UNL, unlock: unlock, anim: anim, useTheme: useTheme
  };
})();
