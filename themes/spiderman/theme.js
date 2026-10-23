/* Tema Marvel's Spider-Man (Insomniac, 2018): azul petróleo con barras rojas, acento cian, escuadras de selección,
   panel azul del menú principal sobre un atardecer de Manhattan, tabla de módulos y un puzzle de circuito como minijuego.
   El skyline y las piezas de circuito se dibujan en código. */
(function () {
  "use strict";
  var $ = CC.$, $$ = CC.$$, el = CC.el, L = CC.L, tr = CC.tr, svg = CC.svg, root = CC.root;

  CC.addStrings({
    es: {
      cta2: "Ir al circuito", capSub: "Cada sistema agrupa un área y sus módulos. Elige uno para ver su lista.",
      brSub: "Resuelve los tres circuitos para desbloquear partes de este sitio.",
      rw: [["Terminal", "Abre la terminal de consulta."], ["Archivo", "Revela un archivo con datos curiosos."], ["Traje Iron Spider", "Cambia la interfaz a rojo y dorado."]],
      lkT: "Bloqueado", lkOpen: "Abierto", lkReq: "Requiere circuito", lkOk: "Acceso concedido",
      lk0: "Resuelve el primer circuito para usar la terminal.", lk1: "Resuelve el segundo circuito para abrir el archivo.",
      ovrText: "El tercer circuito desbloquea el traje Iron Spider.", ovrOn: "Equipar Iron Spider", ovrOff: "Volver al traje clásico", ovrLocked: "Traje bloqueado",
      lockTitle: "Circuitos resueltos",
      tHelp: "Comandos: quien, skills, proyectos, publicaciones, github, trayectoria, contacto, ir <sección>, idioma, traje, limpiar",
      tOvrLocked: "Traje bloqueado. Resuelve el tercer circuito.", tOvrOn: "Traje Iron Spider equipado.", tOvrOff: "Traje clásico equipado.", tHack: "Ya estás dentro. Prueba traje.",
      mmHead: "Menú principal", lvl: "Nivel", res: "Recursos",
      resL: ["Repos", "Seguidores", "Proyectos", "Publicaciones", "Módulos", "Hitos"],
      sysHead: "Sistemas", colNo: "N.º", colMod: "Módulo", colSt: "Estado", stOps: "Operativo", stTrain: "Entrenando", mods: "módulos",
      bonus: function (o, t) { return o + " de " + t + " operativos"; },
      hpA: function (o, t, n) { return o + " de " + t + " módulos operativos" + (n ? ", " + n + " en entrenamiento" : "") + "."; },
      ciAct: "Voltaje actual", ciTgt: "Voltaje objetivo", ciBoards: "Circuitos", ciNew: "Nuevo tablero", ciSkip: "Desbloquear todo sin jugar", ciReplay: "Repetir desde el primero",
      ciRules: "Haz clic en una pieza para girarla 90°. Lleva la corriente de la batería a la salida: cada pieza conecta con la vecina solo si las dos tienen un borne hacia ese lado. Las casillas con candado no se usan.",
      ciReady: "Gira las piezas para cerrar el circuito.", ciBoard: function (i) { return "Circuito " + (i + 1) + " de 3"; },
      ciWin: function (i, r) { return "Circuito " + (i + 1) + " cerrado: " + r + " desbloqueado."; }, ciAll: "Los tres circuitos están cerrados.",
      ciCell: function (r, c, s) { return "Fila " + r + ", columna " + c + ", " + s; },
      ciKind: { src: "batería", tgt: "salida", lock: "bloqueada", straight: "pieza recta", corner: "pieza en codo" }, ciOn: "con corriente",
      ciDir: ["norte", "este", "sur", "oeste"], ciTo: "conecta a", ciGrid: "Tablero del circuito"
    },
    en: {
      cta2: "Go to the circuit", capSub: "Each system groups one area and its modules. Pick one to see its list.",
      brSub: "Solve the three circuits to unlock parts of this site.",
      rw: [["Terminal", "Opens the query terminal."], ["Archive", "Reveals a file with fun facts."], ["Iron Spider suit", "Switches the interface to red and gold."]],
      lkT: "Locked", lkOpen: "Open", lkReq: "Circuit required", lkOk: "Access granted",
      lk0: "Solve the first circuit to use the terminal.", lk1: "Solve the second circuit to open the archive.",
      ovrText: "The third circuit unlocks the Iron Spider suit.", ovrOn: "Equip Iron Spider", ovrOff: "Back to the classic suit", ovrLocked: "Suit locked",
      lockTitle: "Circuits solved",
      tHelp: "Commands: about, skills, projects, publications, github, path, contact, go <section>, lang, suit, clear",
      tOvrLocked: "Suit locked. Solve the third circuit.", tOvrOn: "Iron Spider suit equipped.", tOvrOff: "Classic suit equipped.", tHack: "You are already in. Try suit.",
      mmHead: "Main menu", lvl: "Level", res: "Resources",
      resL: ["Repos", "Followers", "Projects", "Publications", "Modules", "Milestones"],
      sysHead: "Systems", colNo: "No.", colMod: "Module", colSt: "Status", stOps: "Operational", stTrain: "Training", mods: "modules",
      bonus: function (o, t) { return o + " of " + t + " operational"; },
      hpA: function (o, t, n) { return o + " of " + t + " modules operational" + (n ? ", " + n + " in training" : "") + "."; },
      ciAct: "Actual voltage", ciTgt: "Target voltage", ciBoards: "Circuits", ciNew: "New board", ciSkip: "Unlock everything without playing", ciReplay: "Start again from the first",
      ciRules: "Click a piece to rotate it 90°. Route the power from the battery to the output: a piece connects to its neighbor only when both have a terminal on that side. Locked cells are not used.",
      ciReady: "Rotate the pieces to close the circuit.", ciBoard: function (i) { return "Circuit " + (i + 1) + " of 3"; },
      ciWin: function (i, r) { return "Circuit " + (i + 1) + " closed: " + r + " unlocked."; }, ciAll: "All three circuits are closed.",
      ciCell: function (r, c, s) { return "Row " + r + ", column " + c + ", " + s; },
      ciKind: { src: "battery", tgt: "output", lock: "locked", straight: "straight piece", corner: "corner piece" }, ciOn: "powered",
      ciDir: ["north", "east", "south", "west"], ciTo: "connects to", ciGrid: "Circuit board"
    }
  });

  function rng(seed) { return function () { seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function rint(n) { return Math.floor(Math.random() * n); }

  /* ---------- Marcado propio ---------- */
  var HTML = {
    sky: '<canvas id="skyline" aria-hidden="true"></canvas>',
    menu: '<div class="mm"><p class="mm-h" data-i18n="mmHead"></p><nav class="mm-list" id="mmList"></nav>' +
      '<div class="mm-sep"><img src="themes/spiderman/icon.webp" alt="" width="34" height="40"></div><p class="mm-d" id="mmDesc" aria-live="polite"></p></div>',
    xp: '<span class="xp" aria-hidden="true"><i id="xpBar"></i></span>',
    res: '<div class="res"><div class="wrap res-row"><span class="res-h" data-i18n="res"></span><ul class="res-list" id="resList"></ul></div></div>',
    cap: '<div class="col"><div><p class="pan-h" data-i18n="sysHead"></p><div class="systems" id="systems" role="group"></div></div><div class="brk mpanel" id="mPanel" aria-live="polite"></div></div>',
    game: '<div class="circ"><div class="volt"><span class="vl" data-i18n="ciAct"></span><output id="ciAct">0</output><span class="vbar"><i id="ciBar"></i></span><output id="ciTgt">0</output><span class="vl" data-i18n="ciTgt"></span></div>' +
      '<div class="circ-body"><div class="board-wrap"><p class="ci-name" id="ciName"></p><div class="board" id="ciBoard" role="group"></div></div>' +
      '<div class="circ-side"><p class="pan-h" data-i18n="ciBoards"></p><ol class="boards" id="ciList"></ol><p class="rules" data-i18n="ciRules"></p><p class="bmsg" id="ciMsg" aria-live="polite"></p>' +
      '<div class="bact"><button class="btn c" id="ciNew" type="button" data-i18n="ciNew"></button><button class="linkbtn" id="ciReplay" type="button" data-i18n="ciReplay"></button><button class="linkbtn" id="ciSkip" type="button" data-i18n="ciSkip"></button></div></div></div></div>'
  };

  /* ---------- Menú principal (hero) ---------- */
  var MM = ["capacidades", "proyectos", "github", "trayectoria", "contacto", "acceso"], mmOn = 0;
  function renderMenu() {
    var box = $("#mmList"); box.textContent = ""; box.setAttribute("aria-label", tr("mmHead"));
    MM.forEach(function (id, i) {
      var m = MENU[id], name = m.l ? tr(m.l) : m.label, a = el("a", "mm-i" + (i === mmOn ? " on" : "")); a.href = "#" + id;
      a.appendChild(el("span", "mm-n", name)); if (id !== "acceso") a.appendChild(el("span", "mm-v", String(m.v())));
      a.setAttribute("aria-label", name + ", " + m.v() + " " + L(m.u));
      function on() { mmOn = i; $$(".mm-i").forEach(function (x, j) { x.classList.toggle("on", j === i); }); $("#mmDesc").textContent = id === "acceso" ? tr("ciRules").split(".")[0] + "." : L(m.d); }
      a.addEventListener("pointerenter", on); a.addEventListener("focus", on);
      box.appendChild(a);
    });
    $("#mmDesc").textContent = L(MENU[MM[mmOn]].d);
  }

  /* ---------- Barra de recursos (pie) y XP (HUD) ---------- */
  var RES = [["net", "#3FE0F0", function () { return LIVE.gh.repos; }], ["flag", "#3EDB6E", function () { return LIVE.gh.followers; }], ["log", "#E0433F", function () { return PROJ.length; }],
    ["grid", "#F29A2E", function () { return PUBS.length; }], ["chip", "#A66BF2", function () { return MOD_COUNT; }], ["mail", "#2EC4B6", function () { return PATH_PAST.length + PATH_NEXT.length; }]];
  function renderRes() {
    var ul = $("#resList"); ul.textContent = "";
    RES.forEach(function (r, i) {
      var li = el("li"), hx = el("span", "hexb"); hx.style.setProperty("--hc", r[1]); hx.appendChild(svg(r[0]));
      li.appendChild(hx); li.appendChild(el("b", null, String(r[2]()))); li.appendChild(el("span", "res-l", tr("resL")[i])); ul.appendChild(li);
    });
  }
  function syncXP() { var n = CC.UNL.filter(Boolean).length; $("#xpBar").style.width = (n / 3 * 100) + "%"; }

  /* ---------- Capacidades: colecciones + tabla ---------- */
  var slotIdx = 0;
  function renderSystems() {
    var g = $("#systems"); g.textContent = ""; g.setAttribute("aria-label", tr("sysHead"));
    SLOTS.forEach(function (s, i) {
      var b = el("button", "sys"); b.type = "button"; b.setAttribute("aria-pressed", i === slotIdx ? "true" : "false");
      b.appendChild(el("span", "sys-n", L(s.area)));
      var box = el("span", "sys-box"); box.appendChild(svg(s.icon)); box.appendChild(el("span", "sys-c", String(s.mods.length))); b.appendChild(box);
      b.setAttribute("aria-label", L(s.area) + ", " + s.mods.length + " " + tr("mods"));
      b.addEventListener("click", function () { slotIdx = i; $$(".sys").forEach(function (x, j) { x.setAttribute("aria-pressed", j === i ? "true" : "false"); }); renderPanel(true); });
      b.addEventListener("keydown", function (e) {
        var cols = getComputedStyle(g).gridTemplateColumns.split(" ").length, d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]; if (!d) return;
        var j = i + d; if (j < 0 || j >= SLOTS.length) return; e.preventDefault(); $$(".sys")[j].focus();
      });
      g.appendChild(b);
    });
    renderPanel(false);
  }
  function renderPanel(anim) {
    var s = SLOTS[slotIdx], p = $("#mPanel"); p.textContent = "";
    var tot = s.mods.length, ops = s.mods.filter(function (x) { return x.s !== "t"; }).length;
    var h = el("div", "mp-h"); h.appendChild(el("h3", null, L(s.area))); h.appendChild(el("span", "mp-c", ops + "/" + tot)); p.appendChild(h);
    p.appendChild(el("p", "mp-d", L(s.d)));
    var t = el("table", "mtab"), thead = el("thead"), hr = el("tr");
    [tr("colNo"), tr("colMod"), tr("colSt")].forEach(function (x) { hr.appendChild(el("th", null, x)); });
    thead.appendChild(hr); t.appendChild(thead);
    var tb = el("tbody");
    s.mods.forEach(function (x, i) {
      var row = el("tr", x.s === "t" ? "t" : "");
      row.appendChild(el("td", "no", String(i + 1))); row.appendChild(el("td", null, L(x.n)));
      var st = el("td", "st"); st.appendChild(el("span", "stc", x.s === "t" ? tr("stTrain") : tr("stOps"))); row.appendChild(st);
      tb.appendChild(row);
    });
    t.appendChild(tb); p.appendChild(t);
    var bn = el("div", "bonus"); bn.setAttribute("role", "img"); bn.setAttribute("aria-label", tr("hpA")(ops, tot, tot - ops));
    bn.appendChild(el("span", "bn-t", tr("bonus")(ops, tot)));
    var bar = el("span", "bn-b"), fill = el("i"); fill.style.width = (ops / tot * 100) + "%"; bar.appendChild(fill); bn.appendChild(bar);
    p.appendChild(bn);
    if (anim) CC.swapAnim(p);
  }

  /* ---------- Skyline al atardecer ---------- */
  var cv, cx, CW = 0, CH = 0;
  function skySize() {
    var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    CW = r.width; CH = r.height; cv.width = Math.max(1, Math.round(CW * d)); cv.height = Math.max(1, Math.round(CH * d)); cx.setTransform(d, 0, 0, d, 0, 0);
    drawSky();
  }
  function drawSky() {
    var iron = root.getAttribute("data-mode") === "overload", R = rng(2018), x;
    cx.clearRect(0, 0, CW, CH);
    function tower(x, w, h, col, lit) {
      var y = CH - h; cx.fillStyle = col; cx.fillRect(x, y, w, h);
      if (R() < .3 && w > 26) { cx.fillRect(x + w * .3, y - 9, 10, 7); cx.fillRect(x + w * .3 + 2, y - 2, 1.5, 3); cx.fillRect(x + w * .3 + 7, y - 2, 1.5, 3); }
      if (!lit) return;
      cx.fillStyle = iron ? "rgba(242,193,78,.75)" : "rgba(255,206,140,.7)";
      for (var wy = y + 6; wy < CH - 4; wy += 7) for (var wx = x + 4; wx < x + w - 4; wx += 6) if (R() < .14) cx.fillRect(wx, wy, 2.5, 3.5);
    }
    for (x = -20; x < CW; ) { var w = 30 + R() * 50; tower(x, w, CH * (.35 + R() * .45), iron ? "#3A2620" : "#36406A", false); x += w + 2; }
    for (x = -10; x < CW; ) {
      var w2 = 26 + R() * 60, h2 = CH * (.18 + R() * .42);
      if (Math.abs(x - CW * .64) < 40) {
        var ex = x, ew = 54, base = CH * .55; cx.fillStyle = iron ? "#1B120E" : "#0B1E2B";
        cx.fillRect(ex, CH - base, ew, base); cx.fillRect(ex + 8, CH - base - CH * .14, ew - 16, CH * .14); cx.fillRect(ex + 17, CH - base - CH * .24, ew - 34, CH * .1);
        cx.fillRect(ex + ew / 2 - 2, CH - base - CH * .38, 4, CH * .14);
        x += ew + 3; continue;
      }
      tower(x, w2, h2, iron ? "#1B120E" : "#0B1E2B", true); x += w2 + 3;
    }
  }

  /* ---------- Circuito ---------- */
  var DR = [-1, 0, 1, 0], DC = [0, 1, 0, -1], SIZES = [[4, 4], [5, 5], [5, 6]];
  var CI = { i: 0, R: 0, C: 0, t: [], src: 0, tgt: 0, len: 0, replay: false, solved: false };
  function rotMask(m, k) { var o = 0; for (var d = 0; d < 4; d++) if (m & (1 << d)) o |= 1 << ((d + k) % 4); return o; }
  function ports(t) { return t.kind === "pipe" ? rotMask(t.base, t.rot) : t.kind === "lock" ? 0 : t.mask; }
  function ciCur() { if (CI.replay) return CI.i; for (var k = 0; k < 3; k++) if (!CC.UNL[k]) return k; return -1; }
  function genBoard(k) {
    var R = SIZES[k][0], C = SIZES[k][1], minLen = R + 2 + k * 2, path, steps;
    function go(r, c, vis) {
      if (++steps > 4000) return false;
      path.push([r, c]); vis[r * C + c] = 1;
      if (r === 0 && path.length >= minLen) return true;
      var ds = [0, 1, 2, 3].sort(function () { return Math.random() - .5; });
      for (var j = 0; j < 4; j++) { var nr = r + DR[ds[j]], nc = c + DC[ds[j]]; if (nr >= 0 && nc >= 0 && nr < R && nc < C && !vis[nr * C + nc] && go(nr, nc, vis)) return true; }
      path.pop(); vis[r * C + c] = 0; return false;
    }
    do { path = []; steps = 0; } while (!go(R - 1, rint(C), {}));
    var t = []; for (var i = 0; i < R * C; i++) t.push(Math.random() < .3 ? { kind: "lock" } : { kind: "pipe", base: Math.random() < .5 ? 5 : 3, rot: rint(4) });
    function dirTo(a, b) { for (var d = 0; d < 4; d++) if (a[0] + DR[d] === b[0] && a[1] + DC[d] === b[1]) return d; }
    path.forEach(function (p, j) {
      var m = 0; if (j > 0) m |= 1 << dirTo(p, path[j - 1]); if (j < path.length - 1) m |= 1 << dirTo(p, path[j + 1]);
      var idx = p[0] * C + p[1];
      if (j === 0) t[idx] = { kind: "src", mask: m };
      else if (j === path.length - 1) t[idx] = { kind: "tgt", mask: m };
      else {
        var straight = m === 5 || m === 10, base = straight ? 5 : 3, sol = 0; while (rotMask(base, sol) !== m) sol++;
        t[idx] = { kind: "pipe", base: base, rot: (sol + 1 + (straight ? 0 : rint(3))) % 4 };
      }
    });
    CI.R = R; CI.C = C; CI.t = t; CI.len = path.length; CI.src = path[0][0] * C + path[0][1]; CI.tgt = path[path.length - 1][0] * C + path[path.length - 1][1]; CI.solved = false;
  }
  function energized() {
    var on = {}, q = [CI.src]; on[CI.src] = 1;
    while (q.length) {
      var k = q.shift(), r = Math.floor(k / CI.C), c = k % CI.C, pm = ports(CI.t[k]);
      for (var d = 0; d < 4; d++) {
        if (!(pm & (1 << d))) continue;
        var nr = r + DR[d], nc = c + DC[d]; if (nr < 0 || nc < 0 || nr >= CI.R || nc >= CI.C) continue;
        var n = nr * CI.C + nc; if (!on[n] && ports(CI.t[n]) & (1 << ((d + 2) % 4))) { on[n] = 1; q.push(n); }
      }
    }
    return on;
  }
  var END = [[50, 0], [100, 50], [50, 100], [0, 50]];
  function tileSVG(t, lit) {
    var col = lit ? "#4CE04C" : "#3FB4C4", s = "", pm = ports(t);
    for (var d = 0; d < 4; d++) if (pm & (1 << d)) s += '<line x1="50" y1="50" x2="' + END[d][0] + '" y2="' + END[d][1] + '" stroke="' + col + '" stroke-width="7"/>';
    if (t.kind === "pipe") s += '<circle cx="50" cy="50" r="10" fill="#0B1E2B" stroke="' + col + '" stroke-width="5"/>';
    if (t.kind === "src") s += '<rect x="32" y="26" width="36" height="48" rx="4" fill="#0B1E2B" stroke="#4CE04C" stroke-width="5"/><path d="M53,32 L40,52 L50,52 L46,68 L60,46 L50,46Z" fill="#4CE04C"/>';
    if (t.kind === "tgt") s += '<circle cx="50" cy="50" r="22" fill="#0B1E2B" stroke="' + (lit ? "#4CE04C" : "#F29A2E") + '" stroke-width="6"/><circle cx="50" cy="50" r="9" fill="' + (lit ? "#4CE04C" : "#F29A2E") + '"/>';
    if (t.kind === "lock") s += '<path d="M42,48 v-6 a8,8 0 0,1 16,0 v6 M38,48 h24 v16 h-24Z" fill="none" stroke="rgba(63,224,240,.25)" stroke-width="3"/>';
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + s + "</svg>";
  }
  function renderBoard() {
    var box = $("#ciBoard"), on = energized(), focusK = document.activeElement && document.activeElement.classList.contains("oct") ? +document.activeElement.dataset.k : -1, cur = ciCur();
    box.textContent = ""; box.style.setProperty("--cols", CI.C); box.setAttribute("aria-label", tr("ciGrid"));
    CI.t.forEach(function (t, k) {
      var b = el("button", "oct " + t.kind + (on[k] ? " on" : "")); b.type = "button"; b.dataset.k = k;
      b.innerHTML = tileSVG(t, on[k]);
      var pm = ports(t), dirs = []; for (var d = 0; d < 4; d++) if (pm & (1 << d)) dirs.push(tr("ciDir")[d]);
      b.setAttribute("aria-label", tr("ciCell")(Math.floor(k / CI.C) + 1, k % CI.C + 1, tr("ciKind")[t.kind === "pipe" ? (t.base === 5 ? "straight" : "corner") : t.kind] + (dirs.length ? ", " + tr("ciTo") + " " + dirs.join(", ") : "") + (on[k] ? ", " + tr("ciOn") : "")));
      b.disabled = t.kind !== "pipe" || CI.solved || cur < 0;
      b.addEventListener("click", function () { if (t.kind !== "pipe" || CI.solved) return; t.rot = (t.rot + 1) % 4; check(); });
      b.addEventListener("keydown", function (e) {
        var d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: CI.C, ArrowUp: -CI.C }[e.key]; if (!d) return;
        var j = k + d; if (j < 0 || j >= CI.t.length || (Math.abs(d) === 1 && Math.floor(j / CI.C) !== Math.floor(k / CI.C))) return;
        e.preventDefault(); box.children[j].focus();
      });
      box.appendChild(b);
    });
    if (focusK >= 0 && box.children[focusK]) box.children[focusK].focus();
    var n = Object.keys(on).length;
    $("#ciAct").textContent = n; $("#ciTgt").textContent = CI.len;
    $("#ciBar").style.width = Math.min(100, n / CI.len * 100) + "%";
    $("#ciName").textContent = cur < 0 && !CI.solved ? tr("ciAll") : tr("ciBoard")(CI.i);
    renderList();
  }
  function renderList() {
    var ul = $("#ciList"), cur = ciCur(); ul.textContent = "";
    SIZES.forEach(function (sz, k) {
      var done = CI.replay ? k < CI.i : CC.UNL[k], li = el("li", done ? "done" : (k === cur ? "cur" : ""));
      li.appendChild(el("span", "bno", String(k + 1)));
      var tx = el("span", "btx"); tx.appendChild(el("b", null, tr("rw")[k][0])); tx.appendChild(el("span", null, sz[0] + "×" + sz[1] + " · " + tr("rw")[k][1])); li.appendChild(tx);
      li.appendChild(el("span", "bst", done ? "✓" : ""));
      ul.appendChild(li);
    });
  }
  function ciMsg(t, cls) { var m = $("#ciMsg"); m.textContent = t; m.className = "bmsg" + (cls ? " " + cls : ""); }
  function check() {
    if (energized()[CI.tgt]) {
      CI.solved = true; var i = CI.i; CC.unlock(i); syncXP();
      if (CI.replay && i === 2) CI.replay = false;
      ciMsg(ciCur() < 0 && !CI.replay ? tr("ciAll") : tr("ciWin")(i, tr("rw")[i][0]), "ok");
      renderBoard();
      var nx = ciCur(); if (nx >= 0) setTimeout(function () { CI.i = CI.replay ? i + 1 : nx; genBoard(CI.i); renderBoard(); }, 1400);
      return;
    }
    renderBoard();
  }
  function ciStart(k) { CI.i = k < 0 ? 2 : k; genBoard(CI.i); renderBoard(); ciMsg(tr("ciReady")); }

  /* ---------- Registro del tema ---------- */
  CC.useTheme({
    mount: function () {
      $("#inicio").insertAdjacentHTML("afterbegin", HTML.sky);
      $("#inicio .hero-grid").insertAdjacentHTML("beforeend", HTML.menu);
      $("#lockStat").insertAdjacentHTML("beforeend", HTML.xp);
      document.querySelector("footer").insertAdjacentHTML("afterbegin", HTML.res);
      $("#capacidades .inner").insertAdjacentHTML("beforeend", HTML.cap);
      $("#acceso .sub").insertAdjacentHTML("afterend", HTML.game);
      cv = $("#skyline"); cx = cv.getContext("2d");
      new MutationObserver(syncXP).observe($("#lockN"), { childList: true });
      $("#ciNew").addEventListener("click", function () { genBoard(CI.i); renderBoard(); ciMsg(tr("ciReady")); });
      $("#ciReplay").addEventListener("click", function () { CI.replay = true; ciStart(0); });
      $("#ciSkip").addEventListener("click", function () { [0, 1, 2].forEach(CC.unlock); CI.replay = false; syncXP(); renderBoard(); ciMsg(tr("ciAll"), "ok"); });
      ciStart(ciCur());
    },
    render: function () { renderMenu(); renderRes(); renderSystems(); renderBoard(); syncXP(); },
    start: skySize,
    resize: skySize,
    redraw: drawSky
  });
})();
