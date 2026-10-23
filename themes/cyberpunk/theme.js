/* Tema Cyberpunk: HUD rojo/cian, pantalla de atributos hexagonal, esquema de implantes, skyline de Night City y matriz de intrusión. */
(function () {
  "use strict";
  var $ = CC.$, $$ = CC.$$, el = CC.el, svg = CC.svg, L = CC.L, tr = CC.tr, reduce = CC.reduce, COL = CC.COL;

  CC.addStrings({
    es: {
      attrHint: "Elige un atributo para abrir su sección.",
      lgOps: "Operativo", lgTrain: "En entrenamiento", lgMix: "Mixto", mods: "Módulos", hpL: "Módulos operativos", hpA: function (o, t, n) { return o + " de " + t + " módulos operativos" + (n ? ", " + n + " en entrenamiento" : "") + "."; }, stOps: "operativo", stTrain: "entrenando",
      brSub: "Resuelve la matriz para desbloquear partes de este sitio. Cada secuencia completada instala una recompensa.",
      brTime: "Tiempo restante", brBuffer: "Búfer", brMatrix: "Matriz de código", brSeqs: "Secuencias para cargar",
      brRules: "Empieza en la fila resaltada. Cada elección cambia la línea activa: después de una fila eliges en su columna, después de una columna eliges en su fila. Una secuencia cuenta si sus códigos quedan seguidos en el búfer. El tiempo corre desde la primera elección.",
      brNew: "Nueva matriz", brSkip: "Desbloquear todo sin jugar", brReady: "Elige un código de la fila resaltada.",
      brWin: "Acceso total. Las tres secuencias están instaladas.", brEnd: function (n) { return n ? "Intrusión terminada: " + n + " de 3 secuencias instaladas." : "Intrusión fallida. Prueba con una matriz nueva."; },
      brTimeout: "Tiempo agotado.", brGot: function (r) { return "Instalado: " + r; }
    },
    en: {
      attrHint: "Pick an attribute to open its section.",
      lgOps: "Operational", lgTrain: "In training", lgMix: "Mixed", mods: "Modules", hpL: "Operational modules", hpA: function (o, t, n) { return o + " of " + t + " modules operational" + (n ? ", " + n + " in training" : "") + "."; }, stOps: "operational", stTrain: "training",
      brSub: "Solve the matrix to unlock parts of this site. Each completed sequence installs a reward.",
      brTime: "Time remaining", brBuffer: "Buffer", brMatrix: "Code matrix", brSeqs: "Sequences to upload",
      brRules: "Start on the highlighted row. Each pick switches the active line: after a row you pick in its column, after a column you pick in its row. A sequence counts when its codes sit next to each other in the buffer. The clock starts on your first pick.",
      brNew: "New matrix", brSkip: "Unlock everything without playing", brReady: "Pick a code from the highlighted row.",
      brWin: "Full access. All three sequences are installed.", brEnd: function (n) { return n ? "Intrusion over: " + n + " of 3 sequences installed." : "Intrusion failed. Try a new matrix."; },
      brTimeout: "Time is up.", brGot: function (r) { return "Installed: " + r; }
    }
  });

  /* Marcado propio del tema, insertado en mount */
  var HTML = {
    fx: '<div class="scan" aria-hidden="true"></div>\n<div class="rail r" aria-hidden="true">1001\n0010\n1101\n0001\n1111\n\n0011\n1101\n0111\n0001\n1000</div>\n<div class="rail l" aria-hidden="true">0110\n1010\n0001\n1100\n\n1011\n0100\n1110</div>',
    city: '<canvas id="city" aria-hidden="true"></canvas>',
    attr: '<div class="attr">\n<nav class="hexes" id="hexes" aria-label="Atributos"></nav>\n<p class="attr-info" id="attrInfo" aria-live="polite"></p>\n</div>',
    cap: '<div class="schem" id="schem">\n<canvas id="schemCv" aria-hidden="true"></canvas>\n<div class="scol l" id="slotsL"></div>\n<div class="fig" id="fig"><img src="themes/cyberpunk/cyberware.jpg" alt="" width="1125" height="1398" decoding="async" loading="lazy"></div>\n<div class="scol r" id="slotsR"></div>\n</div>\n' +
      '<div class="legend">\n<span><i style="--c: var(--cyan)"></i><span data-i18n="lgOps"></span></span>\n<span><i style="--c: var(--yellow)"></i><span data-i18n="lgTrain"></span></span>\n<span><i style="--c: linear-gradient(var(--cyan) 50%, var(--yellow) 50%)"></i><span data-i18n="lgMix"></span></span>\n</div>\n' +
      '<div class="brk sdetail" id="sDetail" aria-live="polite"></div>',
    game: '<div class="bframe">\n<div class="btop">\n<div>\n<div class="time-l"><span data-i18n="brTime"></span><output id="brTime">40.00</output></div>\n<div class="tbar"><i id="brBar"></i></div>\n</div>\n<div>\n<div class="buf-l" data-i18n="brBuffer"></div>\n<div class="buffer" id="brBuf"></div>\n</div>\n</div>\n' +
      '<div class="bgrid">\n<div>\n<div class="mbox">\n<div class="mhead" data-i18n="brMatrix"></div>\n<div class="matrix" id="brMatrix" role="grid"></div>\n</div>\n<p class="rules" data-i18n="brRules"></p>\n</div>\n<div class="mbox">\n<div class="shead" data-i18n="brSeqs"></div>\n<ul class="seqs" id="brSeqs"></ul>\n</div>\n</div>\n' +
      '<p class="bmsg" id="brMsg" aria-live="polite"></p>\n<div class="bact">\n<button class="btn" id="brReset" type="button" data-i18n="brNew"></button>\n<button class="linkbtn" id="brSkip" type="button" data-i18n="brSkip"></button>\n</div>\n</div>'
  };

  /* ---------- Decodificación y glitch ---------- */
  var GL = "▐░▒▓#@$%&*+=<>/|01";
  function decode(node, text, ms) {
    if (node._cancel) node._cancel();
    if (reduce) { node.textContent = text; return; }
    var t0 = performance.now(), id = setInterval(frame, 40), dead = setTimeout(finish, ms + 150);
    function finish() { clearInterval(id); clearTimeout(dead); node.textContent = text; node._cancel = null; }
    node._cancel = finish;
    function frame() {
      var p = (performance.now() - t0) / ms; if (p >= 1) { finish(); return; }
      var s = "", k = Math.floor(p * text.length);
      for (var i = 0; i < text.length; i++) { var ch = text.charAt(i); s += (i < k || ch === " " || ch === "\n") ? ch : GL.charAt(Math.floor(Math.random() * GL.length)); }
      node.textContent = s;
    }
  }
  var heroName = $("#heroName");
  function pulse() { if (reduce) return; heroName.classList.add("on"); setTimeout(function () { heroName.classList.remove("on"); }, 460); }

  /* ---------- Pantalla de atributos ---------- */
  /* Orden y posición de las placas de la referencia: pos = centro en % del lienzo 920 x 1010, code = código de la sección, dn = placa invertida.
     Si cambias pos, ajusta las pistas en hexTraces. */
  var HEX = [
    { id: "capacidades", pos: [50, 11.14], code: "SYS/01" },
    { id: "proyectos", pos: [19.13, 26], code: "LOG/02" },
    { id: "github", pos: [80.87, 26], code: "NET/04" },
    { id: "trayectoria", pos: [19.13, 74], code: "LOG/06", dn: true },
    { id: "contacto", pos: [80.87, 74], code: "COM/07", dn: true },
    { id: "acceso", pos: [50, 88.86], code: "ICE/05", relic: true }
  ];
  /* Pistas: haces de líneas paralelas desde la barra de conexión de cada placa hasta debajo del rombo */
  function hexTraces() {
    var out = "", i, x, d;
    function pl(cls, pts) { out += '<polyline class="hx-tr ' + cls + '" points="' + pts.map(function (p) { return p.join(","); }).join(" ") + '"/>'; }
    for (i = 0; i < 7; i++) {
      x = 430 + i * 10; pl("t-capacidades", [[x, 236], [x, 360]]); pl("t-acceso", [[x, 774], [x, 650]]);
      x = 196 + i * 12; d = (400 - x) / 2 + 18;
      pl("t-proyectos", [[x, 387], [x, 400], [x + d, 400 + d]]); pl("t-github", [[920 - x, 387], [920 - x, 400], [920 - x - d, 400 + d]]);
      pl("t-trayectoria", [[x, 623], [x, 610], [x + d, 610 - d]]); pl("t-contacto", [[920 - x, 623], [920 - x, 610], [920 - x - d, 610 - d]]);
    }
    [["capacidades", 424, 225, 72], ["acceso", 424, 774, 72], ["proyectos", 190, 375, 84], ["github", 646, 375, 84], ["trayectoria", 190, 623, 84], ["contacto", 646, 623, 84]].forEach(function (c) {
      out += '<rect class="hx-cn t-' + c[0] + '" x="' + c[1] + '" y="' + c[2] + '" width="' + c[3] + '" height="12"/>';
    });
    return out;
  }
  function renderHex() {
    var box = $("#hexes"), es = CC.lang() === "es"; box.removeAttribute("data-hot");
    box.innerHTML = '<svg class="hx-svg" viewBox="0 0 920 1010" aria-hidden="true">' + hexTraces() +
      '<polygon class="hx-dm" points="456,320 456,690 271,505"/><polygon class="hx-dm r" points="464,320 649,505 464,690"/>' +
      '<text x="562" y="405" transform="rotate(45 562 405)" text-anchor="middle" style="font:11px var(--f-mono);letter-spacing:.12em;fill:var(--red-dim)">' + (es ? "SISTEMAS_Y_COMPUTACION" : "SYSTEMS_AND_COMPUTING") + '</text>' +
      '<polygon class="hx-bd" points="402,368 518,368 532,386 502,420 418,420 388,386"/>' +
      '<text x="460" y="406" text-anchor="middle" style="font:600 34px var(--f-hud);fill:var(--cyan)">CC</text>' +
      '<polygon class="hx-bd" points="388,624 418,590 502,590 532,624 518,642 402,642"/>' +
      '<text x="460" y="623" text-anchor="middle" style="font:600 19px var(--f-hud);letter-spacing:.06em;fill:#A9B6E0">' + (es ? "INGENIERO" : "ENGINEER") + '</text></svg>';
    HEX.forEach(function (h) {
      var m = MENU[h.id], name = m.l ? tr(m.l) : m.label, a = el("a", "hex" + (h.dn ? " dn" : "") + (h.relic ? " relic" : ""));
      a.href = "#" + h.id; a.style.left = h.pos[0] + "%"; a.style.top = h.pos[1] + "%";
      var b = el("span", "hx-b"), i = el("span", "hx-i");
      i.appendChild(el("span", "hx-c", h.code));
      i.appendChild(el("span", "hx-l", name));
      var v = el("span", "hx-v"); v.appendChild(svg(m.icon)); if (!h.relic) v.appendChild(document.createTextNode(String(m.v())));
      i.appendChild(v);
      a.appendChild(b); a.appendChild(i);
      a.setAttribute("aria-label", name + ", " + m.v() + " " + L(m.u));
      function info() { box.setAttribute("data-hot", h.id); var p = $("#attrInfo"); p.textContent = ""; p.appendChild(el("b", null, name + " / " + m.v() + " " + L(m.u))); p.appendChild(document.createTextNode(L(m.d))); }
      function off() { box.removeAttribute("data-hot"); }
      a.addEventListener("pointerenter", info); a.addEventListener("focus", info);
      a.addEventListener("pointerleave", off); a.addEventListener("blur", off);
      box.appendChild(a);
    });
    $("#attrInfo").textContent = tr("attrHint");
  }

  /* ---------- Implantes ---------- */
  var MOD_MAX = Math.max.apply(null, SLOTS.map(function (s) { return s.mods.length; }));
  var slotIdx = 0;
  function slotState(s) {
    var o = 0, t = 0; s.mods.forEach(function (x) { if (x.s === "t") t++; else o++; });
    return t && o ? "linear-gradient(var(--cyan) 50%, var(--yellow) 50%)" : (t ? "var(--yellow)" : "var(--cyan)");
  }
  function renderSlots() {
    var L1 = $("#slotsL"), R1 = $("#slotsR"); L1.textContent = ""; R1.textContent = "";
    SLOTS.forEach(function (s, i) {
      var b = el("button", "slot"); b.type = "button"; b.setAttribute("aria-pressed", i === slotIdx ? "true" : "false");
      var tile = el("span", "tile brk"); tile.style.setProperty("--st", slotState(s)); tile.appendChild(svg(s.icon));
      var tx = el("span", "slot-t");
      tx.appendChild(el("span", "slot-n", L(s.sys)));
      tx.appendChild(el("span", "slot-a", L(s.area)));
      var mm = el("span", "slot-m", tr("mods")); mm.appendChild(el("b", null, String(s.mods.length))); tx.appendChild(mm);
      b.appendChild(tile); b.appendChild(tx);
      b.addEventListener("click", function () { slotIdx = i; $$(".slot").forEach(function (x, j) { x.setAttribute("aria-pressed", j === i ? "true" : "false"); }); renderSlotDetail(true); drawSchem(CC.now()); });
      s.el = b;
      (s.side === "L" ? L1 : R1).appendChild(b);
    });
    renderSlotDetail(false);
  }
  function renderSlotDetail(anim) {
    var s = SLOTS[slotIdx], p = $("#sDetail"); p.textContent = "";
    p.appendChild(el("p", "sys", L(s.sys)));
    p.appendChild(el("h3", null, L(s.area)));
    p.appendChild(el("p", null, L(s.d)));
    var tot = s.mods.length, ops = s.mods.filter(function (x) { return x.s !== "t"; }).length;
    var hp = el("div", "hp"); hp.setAttribute("role", "img"); hp.setAttribute("aria-label", tr("hpA")(ops, tot, tot - ops)); hp.style.setProperty("--n", MOD_MAX);
    var box = el("span", "hp-box"); box.appendChild(svg(s.icon)); hp.appendChild(box);
    var hm = el("div", "hp-m"); hm.appendChild(el("span", "hp-l", tr("hpL")));
    var ru = el("div", "hp-r"); ru.style.setProperty("--i", tot); ru.appendChild(el("i")); ru.appendChild(el("b", null, String(tot))); hm.appendChild(ru);
    var bar = el("div", "hp-b"), bo = el("i", "o"), bt = el("i", "t"); bo.style.setProperty("--w", ops); bt.style.setProperty("--w", tot - ops); bar.appendChild(bo); bar.appendChild(bt); hm.appendChild(bar);
    hp.appendChild(hm);
    var v = el("span", "hp-v", String(ops)); v.appendChild(el("sup", null, String(tot))); hp.appendChild(v);
    p.appendChild(hp);
    var ul = el("ul", "mods");
    s.mods.forEach(function (x) {
      var li = el("li"); li.style.setProperty("--c", x.s === "t" ? "var(--yellow)" : "var(--cyan)");
      li.appendChild(el("span", null, L(x.n)));
      li.appendChild(el("span", "chip " + (x.s === "t" ? "y" : ""), x.s === "t" ? tr("stTrain") : tr("stOps")));
      ul.appendChild(li);
    });
    p.appendChild(ul);
    if (anim) CC.swapAnim(p);
  }

  var sc, sx, SW = 0, SH = 0;
  function schemSize() {
    var r = $("#schem").getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    SW = r.width; SH = r.height; sc.width = Math.max(1, Math.round(SW * d)); sc.height = Math.max(1, Math.round(SH * d)); sx.setTransform(d, 0, 0, d, 0, 0);
  }
  function rel(r, b) { return { l: r.left - b.left, t: r.top - b.top, r: r.right - b.left, b: r.bottom - b.top, w: r.width, h: r.height }; }
  function drawSchem(t) {
    var base = $("#schem").getBoundingClientRect(), f = rel($("#fig").getBoundingClientRect(), base);
    sx.clearRect(0, 0, SW, SH);
    var H = f.h * .94, cx = f.l + f.w / 2, top = f.t + f.h * .03;
    if (H * .5 > f.w) H = f.w * 2;
    function P(x, y) { return [cx + x * H, top + y * H]; }
    var c = sx;
    /* anillos */
    var ch = P(0, .3);
    c.strokeStyle = COL.red; c.lineWidth = 1;
    c.globalAlpha = .22; c.beginPath(); c.arc(ch[0], ch[1], .26 * H, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = .35; c.setLineDash([4, 10]); c.lineDashOffset = -t * 20; c.beginPath(); c.arc(ch[0], ch[1], .2 * H, 0, Math.PI * 2); c.stroke(); c.setLineDash([]);
    c.globalAlpha = .15; c.beginPath(); c.arc(ch[0], ch[1], .32 * H, 0, Math.PI * 2); c.stroke();
    c.globalAlpha = 1;
    /* barrido */
    var sy = top + ((t * .18) % 1) * H;
    var sg = c.createLinearGradient(0, sy - 18, 0, sy); sg.addColorStop(0, "rgba(0,0,0,0)"); sg.addColorStop(1, COL.cyan);
    c.globalAlpha = .25; c.fillStyle = sg; c.fillRect(cx - .3 * H, sy - 18, .6 * H, 18); c.globalAlpha = .8; c.fillRect(cx - .3 * H, sy, .6 * H, 1); c.globalAlpha = 1;
    /* anillo de pies */
    var ft = P(0, .955); c.strokeStyle = COL.yellow; c.globalAlpha = .55; c.setLineDash([10, 6]); c.lineDashOffset = t * 30;
    c.beginPath(); c.ellipse(ft[0], ft[1], .17 * H, .026 * H, 0, 0, Math.PI * 2); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
    /* conectores */
    SLOTS.forEach(function (s, i) {
      if (!s.el) return;
      var r = rel(s.el.querySelector(".tile").getBoundingClientRect(), base), tp = P(s.pt[0], s.pt[1]), act = i === slotIdx;
      var beside = r.b > f.t && r.t < f.b, st;
      if (beside && r.r <= f.l + 2) st = [r.r, r.t + r.h / 2];
      else if (beside && r.l >= f.r - 2) st = [r.l, r.t + r.h / 2];
      if (st) {
        var dir = st[0] < cx ? 1 : -1, ex = st[0] + dir * 26;
        c.strokeStyle = act ? COL.cyan : COL.red; c.globalAlpha = act ? .95 : .38; c.lineWidth = act ? 1.6 : 1;
        c.beginPath(); c.moveTo(st[0], st[1]); c.lineTo(ex, st[1]); c.lineTo(tp[0], tp[1]); c.stroke();
        c.fillStyle = c.strokeStyle; c.fillRect(st[0] - (dir > 0 ? 0 : 4), st[1] - 2, 4, 4);
      }
      c.globalAlpha = 1;
      c.save(); c.translate(tp[0], tp[1]); c.rotate(Math.PI / 4);
      c.fillStyle = act ? COL.cyan : COL.red; c.fillRect(-3.5, -3.5, 7, 7); c.restore();
      if (act) {
        var pr = 8 + ((t * 1.2) % 1) * 14; c.strokeStyle = COL.cyan; c.globalAlpha = 1 - ((t * 1.2) % 1);
        c.beginPath(); c.arc(tp[0], tp[1], pr, 0, Math.PI * 2); c.stroke(); c.globalAlpha = 1;
      }
    });
  }

  /* ---------- Ciudad: la imagen es fondo del canvas, que solo pinta lluvia y brillo ---------- */
  var cv, cc, CW = 0, CH = 0, rain = [];
  function citySize() {
    var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    CW = r.width; CH = r.height; cv.width = Math.max(1, Math.round(CW * d)); cv.height = Math.max(1, Math.round(CH * d)); cc.setTransform(d, 0, 0, d, 0, 0);
    rain = []; for (var i = 0; i < 60; i++) rain.push({ x: Math.random() * CW, y: Math.random() * CH, l: 8 + Math.random() * 14, s: 380 + Math.random() * 300 });
    drawCity(0);
  }
  function drawCity(t) {
    cc.clearRect(0, 0, CW, CH);
    var g = cc.createLinearGradient(0, 0, 0, CH); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, COL.red); cc.globalAlpha = .16; cc.fillStyle = g; cc.fillRect(0, 0, CW, CH); cc.globalAlpha = 1;
    if (t) { cc.strokeStyle = COL.cyan; cc.globalAlpha = .18; cc.lineWidth = 1; cc.beginPath(); rain.forEach(function (d) { cc.moveTo(d.x, d.y); cc.lineTo(d.x - 3, d.y + d.l); }); cc.stroke(); cc.globalAlpha = 1; }
  }

  /* ---------- Matriz de intrusión ---------- */
  var UNL = CC.UNL;
  var BR = { N: 5, BUF: 7, TIME: 40, codes: ["A3", "0F", "7E", "C4", "5B"], m: [], used: {}, buf: [], mode: { t: "row", i: 0 }, seqs: [], st: [], started: false, over: false, t0: 0, raf: 0, pv: null };
  function rint(n) { return Math.floor(Math.random() * n); }
  function brGen() {
    var N = BR.N, path;
    for (var tries = 0; tries < 400; tries++) {
      path = []; var used = {}, r = 0, c = rint(N), ok = true, mode = "col";
      path.push([r, c]); used[r + "," + c] = 1;
      for (var k = 1; k < BR.BUF; k++) {
        var cand = [];
        for (var q = 0; q < N; q++) { var rr = mode === "col" ? q : r, cc2 = mode === "col" ? c : q; if (!used[rr + "," + cc2]) cand.push([rr, cc2]); }
        if (!cand.length) { ok = false; break; }
        var pick = cand[rint(cand.length)]; r = pick[0]; c = pick[1]; used[r + "," + c] = 1; path.push(pick); mode = mode === "col" ? "row" : "col";
      }
      if (ok) break;
    }
    BR.m = []; for (var i = 0; i < N; i++) { var row = []; for (var j = 0; j < N; j++) row.push(BR.codes[rint(BR.codes.length)]); BR.m.push(row); }
    var pc = path.map(function () { return BR.codes[rint(BR.codes.length)]; });
    path.forEach(function (p, i) { BR.m[p[0]][p[1]] = pc[i]; });
    var a = pc.slice(0, 2), b = pc.slice(2, 5), cS = pc.slice(4, 7);
    if (a.join() === b.slice(0, 2).join() || b.join() === cS.join()) { brGen(); return; }
    BR.seqs = [a, b, cS]; BR.st = ["", "", ""]; BR.used = {}; BR.buf = []; BR.mode = { t: "row", i: 0 }; BR.started = false; BR.over = false; BR.pv = null;
    cancelAnimationFrame(BR.raf); setTime(BR.TIME);
  }
  function setTime(s) { $("#brTime").textContent = Math.max(0, s).toFixed(2); $("#brBar").style.transform = "scaleX(" + Math.max(0, s / BR.TIME) + ")"; }
  function inLine(r, c, line) { return line && (line.t === "row" ? r === line.i : c === line.i); }
  function cellEnabled(r, c) { return !BR.over && !BR.used[r + "," + c] && inLine(r, c, BR.mode); }
  function renderMatrix() {
    var box = $("#brMatrix"), es = CC.lang() === "es"; box.textContent = "";
    for (var r = 0; r < BR.N; r++) for (var c = 0; c < BR.N; c++) (function (r, c) {
      var b = el("button", "cell", BR.m[r][c]); b.type = "button"; b.setAttribute("role", "gridcell");
      var used = BR.used[r + "," + c], act = !BR.over && inLine(r, c, BR.mode);
      if (used) b.classList.add("used"); if (act && !used) b.classList.add("act"); if (!used && inLine(r, c, BR.pv)) b.classList.add("pv");
      b.disabled = !cellEnabled(r, c);
      b.setAttribute("aria-label", (es ? "Fila " : "Row ") + (r + 1) + (es ? ", columna " : ", column ") + (c + 1) + ", " + (used ? (es ? "usado" : "used") : BR.m[r][c]));
      b.dataset.r = r; b.dataset.c = c;
      function prev() { if (!cellEnabled(r, c)) return; BR.pv = BR.mode.t === "row" ? { t: "col", i: c } : { t: "row", i: r }; paintPreview(); }
      b.addEventListener("pointerenter", prev); b.addEventListener("focus", prev);
      b.addEventListener("pointerleave", function () { BR.pv = null; paintPreview(); });
      b.addEventListener("click", function () { brPick(r, c); });
      box.appendChild(b);
    })(r, c);
  }
  function paintPreview() {
    $$("#brMatrix .cell").forEach(function (b) { var r = +b.dataset.r, c = +b.dataset.c; b.classList.toggle("pv", !BR.used[r + "," + c] && inLine(r, c, BR.pv)); });
  }
  function renderBuffer() {
    var box = $("#brBuf"); box.textContent = "";
    for (var i = 0; i < BR.BUF; i++) { var s = el("span", i < BR.buf.length ? "f" : "", BR.buf[i] || ""); box.appendChild(s); }
  }
  function matchedPrefix(seq) {
    for (var k = Math.min(seq.length, BR.buf.length); k > 0; k--) {
      var ok = true; for (var j = 0; j < k; j++) if (BR.buf[BR.buf.length - k + j] !== seq[j]) { ok = false; break; }
      if (ok) return k;
    }
    return 0;
  }
  function renderSeqs() {
    var ul = $("#brSeqs"); ul.textContent = "";
    BR.seqs.forEach(function (s, i) {
      var li = el("li", "seq" + (BR.st[i] ? " " + BR.st[i] : "")), cd = el("span", "codes"), k = BR.st[i] ? 0 : matchedPrefix(s);
      s.forEach(function (x, j) { cd.appendChild(el("span", j < k ? "hit" : "", x)); });
      var rw = el("span", "rew"); rw.appendChild(el("b", null, tr("rw")[i][0] + (UNL[i] && !BR.st[i] ? " ✓" : ""))); rw.appendChild(el("span", null, tr("rw")[i][1]));
      li.appendChild(cd); li.appendChild(rw); ul.appendChild(li);
    });
  }
  function brMsg(t, cls) { var m = $("#brMsg"); m.textContent = t; m.className = "bmsg" + (cls ? " " + cls : ""); }
  function brTick() {
    if (BR.over) return;
    var left = BR.TIME - (performance.now() - BR.t0) / 1000; setTime(left);
    if (left <= 0) { brEnd(true); return; }
    BR.raf = requestAnimationFrame(brTick);
  }
  function brPick(r, c) {
    if (!cellEnabled(r, c)) return;
    if (!BR.started) { BR.started = true; BR.t0 = performance.now(); BR.raf = requestAnimationFrame(brTick); }
    BR.used[r + "," + c] = 1; BR.buf.push(BR.m[r][c]);
    BR.mode = BR.mode.t === "row" ? { t: "col", i: c } : { t: "row", i: r }; BR.pv = null;
    var s = " " + BR.buf.join(" ") + " ", got = [];
    BR.seqs.forEach(function (q, i) { if (!BR.st[i] && s.indexOf(" " + q.join(" ") + " ") >= 0) { BR.st[i] = "done"; CC.unlock(i); got.push(tr("rw")[i][0]); } });
    if (got.length) brMsg(tr("brGot")(got.join(", ")), "ok");
    var avail = false; for (var q = 0; q < BR.N; q++) { var rr = BR.mode.t === "row" ? BR.mode.i : q, cc2 = BR.mode.t === "row" ? q : BR.mode.i; if (!BR.used[rr + "," + cc2]) avail = true; }
    var allDone = BR.st.every(function (x) { return x === "done"; });
    if (allDone || BR.buf.length >= BR.BUF || !avail) brEnd(false);
    var hadFocus = document.activeElement && document.activeElement.classList.contains("cell");
    renderMatrix(); renderBuffer(); renderSeqs();
    var nxt = $$("#brMatrix .cell.act:not([disabled])")[0]; if (nxt && hadFocus) nxt.focus();
  }
  function brEnd(timeout) {
    BR.over = true; cancelAnimationFrame(BR.raf);
    BR.st = BR.st.map(function (x) { return x || "fail"; });
    var n = BR.st.filter(function (x) { return x === "done"; }).length;
    if (n === 3) brMsg(tr("brWin"), "ok"); else brMsg((timeout ? tr("brTimeout") + " " : "") + tr("brEnd")(n), n ? "ok" : "bad");
    renderMatrix(); renderSeqs();
  }
  function brNew() { brGen(); renderMatrix(); renderBuffer(); renderSeqs(); brMsg(tr("brReady")); }

  /* ---------- Registro del tema ---------- */
  CC.useTheme({
    mount: function () {
      document.body.insertAdjacentHTML("afterbegin", HTML.fx);
      $("#inicio").insertAdjacentHTML("afterbegin", HTML.city);
      $("#inicio .hero-grid").insertAdjacentHTML("beforeend", HTML.attr);
      $("#capacidades .inner").insertAdjacentHTML("beforeend", HTML.cap);
      $("#acceso .sub").insertAdjacentHTML("afterend", HTML.game);
      $("#acceso").classList.add("breach");
      cv = $("#city"); cc = cv.getContext("2d"); sc = $("#schemCv"); sx = sc.getContext("2d");
      heroName.addEventListener("pointerenter", pulse);
      if (!reduce) setInterval(pulse, 6500);
      $("#brReset").addEventListener("click", brNew);
      $("#brSkip").addEventListener("click", function () { [0, 1, 2].forEach(CC.unlock); renderSeqs(); brMsg(tr("brWin"), "ok"); });
      CC.anim(cv, function (dt, t) { rain.forEach(function (d) { d.y += d.s * dt; d.x -= 60 * dt; if (d.y > CH) { d.y = -d.l; d.x = Math.random() * (CW + 80); } }); drawCity(t); });
      CC.anim($("#schem"), drawSchem);
      if (window.ResizeObserver) new ResizeObserver(function () { schemSize(); drawSchem(CC.now()); }).observe($("#schem"));
      brGen();
    },
    render: function () {
      renderHex(); renderSlots(); renderMatrix(); renderBuffer(); renderSeqs();
      if (!BR.started) brMsg(tr("brReady"));
      requestAnimationFrame(function () { schemSize(); drawSchem(CC.now()); });
    },
    start: function () { citySize(); schemSize(); drawSchem(0); },
    resize: function () { citySize(); schemSize(); drawSchem(CC.now()); },
    redraw: function (t) { pulse(); drawSchem(t); drawCity(t); },
    reveal: decode
  });
})();
