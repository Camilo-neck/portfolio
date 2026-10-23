/* Tema Ghost of Tsushima: papel de arroz, barra negra, acento rojo con bordes de pincel, emblemas tipo kamon,
   hojas al viento y un enfrentamiento (standoff) como minijuego. Emblemas y pinceladas se generan en código. */
(function () {
  "use strict";
  var $ = CC.$, $$ = CC.$$, el = CC.el, L = CC.L, tr = CC.tr, root = CC.root, reduce = CC.reduce;

  CC.addStrings({
    es: {
      cta2: "Ir al enfrentamiento", capSub: "Cada emblema es un sistema con sus módulos. Elige uno para ver qué tiene.",
      brSub: "Gana los tres enfrentamientos para desbloquear partes de este sitio.",
      rw: [["Pergamino", "Abre el pergamino de consulta."], ["Archivo", "Revela un archivo con datos curiosos."], ["Modo Kurosawa", "Blanco y negro con grano de película."]],
      tTitle: "Pergamino", lkT: "Sellado", lkOpen: "Abierto", lkReq: "Requiere un duelo", lkOk: "Sello roto",
      lk0: "Vence al primer rival para abrir el pergamino.", lk1: "Vence al segundo rival para abrir el archivo.",
      ovrText: "Vencer al tercer rival desbloquea el modo Kurosawa.", ovrOn: "Activar modo Kurosawa", ovrOff: "Volver al color", ovrLocked: "Modo Kurosawa bloqueado",
      lockTitle: "Duelos ganados",
      tHelp: "Comandos: quien, skills, proyectos, publicaciones, github, trayectoria, contacto, ir <sección>, idioma, kurosawa, limpiar",
      tOvrLocked: "El modo Kurosawa está bloqueado. Vence al tercer rival.", tOvrOn: "Modo Kurosawa.", tOvrOff: "Color restaurado.",
      tHack: "Ya estás dentro. Prueba kurosawa.", tGranted: "Pergamino abierto. Escribe ayuda.", tOnline: "Pergamino listo. Escribe ayuda.",
      catHint: "Elige un camino para abrir su sección.", wu_acceso: "rivales", wd_acceso: "Enfrentamientos samurái. Desbloquean el pergamino y más.",
      medHead: "Emblemas", medLeg: "Plata: todo operativo. Cobre: mixto. Oro: en entrenamiento.",
      hpL: "Determinación", hpA: function (o, t, n) { return o + " de " + t + " módulos operativos" + (n ? ", " + n + " en entrenamiento" : "") + "."; },
      mods: "módulos", stOps: "operativo", stTrain: "entrenando",
      duHold: "Mantén presionado", duReady: "Mantén presionado para encarar al rival.", duWait: "Espera…", duFeint: "¡Amago!", duNow: "¡Ahora!",
      duRules: "Mantén presionado el botón (o la barra espaciadora) y suelta justo cuando el rival ataque. Si sueltas durante un amago o llegas tarde, pierdes ese duelo y puedes repetirlo.",
      duEarly: "Atacaste antes de tiempo. Vuelve a intentarlo.", duLate: "Fuiste demasiado lento. Vuelve a intentarlo.",
      duWin: function (f, r) { return "Venciste al " + f + ": " + r + " desbloqueado."; }, duAll: "Venciste a los tres rivales.",
      duFoe: function (i) { return "Rival " + (i + 1) + " de 3"; }, foes: ["bandido", "ronin", "general mongol"], duFoes: "Rivales",
      duNew: "Repetir desde el primero", duSkip: "Desbloquear todo sin jugar"
    },
    en: {
      cta2: "Go to the standoff", capSub: "Each crest is a system with its modules. Pick one to see what it holds.",
      brSub: "Win the three standoffs to unlock parts of this site.",
      rw: [["Scroll", "Opens the query scroll."], ["Archive", "Reveals a file with fun facts."], ["Kurosawa mode", "Black and white with film grain."]],
      tTitle: "Scroll", lkT: "Sealed", lkOpen: "Open", lkReq: "A duel is required", lkOk: "Seal broken",
      lk0: "Defeat the first rival to open the scroll.", lk1: "Defeat the second rival to open the archive.",
      ovrText: "Defeating the third rival unlocks Kurosawa mode.", ovrOn: "Turn on Kurosawa mode", ovrOff: "Back to color", ovrLocked: "Kurosawa mode locked",
      lockTitle: "Duels won",
      tHelp: "Commands: about, skills, projects, publications, github, path, contact, go <section>, lang, kurosawa, clear",
      tOvrLocked: "Kurosawa mode is locked. Defeat the third rival.", tOvrOn: "Kurosawa mode.", tOvrOff: "Color restored.",
      tHack: "You are already in. Try kurosawa.", tGranted: "Scroll opened. Type help.", tOnline: "Scroll ready. Type help.",
      catHint: "Pick a path to open its section.", wu_acceso: "rivals", wd_acceso: "Samurai standoffs. They unlock the scroll and more.",
      medHead: "Crests", medLeg: "Silver: all operational. Copper: mixed. Gold: in training.",
      hpL: "Resolve", hpA: function (o, t, n) { return o + " of " + t + " modules operational" + (n ? ", " + n + " in training" : "") + "."; },
      mods: "modules", stOps: "operational", stTrain: "training",
      duHold: "Press and hold", duReady: "Press and hold to face the rival.", duWait: "Wait…", duFeint: "Feint!", duNow: "Now!",
      duRules: "Press and hold the button (or the space bar) and release right when the rival attacks. Release during a feint or too late and you lose that duel; you can retry it.",
      duEarly: "You struck too early. Try again.", duLate: "You were too slow. Try again.",
      duWin: function (f, r) { return "You defeated the " + f + ": " + r + " unlocked."; }, duAll: "You defeated all three rivals.",
      duFoe: function (i) { return "Rival " + (i + 1) + " of 3"; }, foes: ["bandit", "ronin", "Mongol general"], duFoes: "Rivals",
      duNew: "Start again from the first", duSkip: "Unlock everything without playing"
    }
  });

  /* ---------- Emblemas tipo kamon (lienzo -50..50) ---------- */
  function rot(n, d, c) { var s = ""; for (var i = 0; i < n; i++) s += '<path transform="rotate(' + (i * 360 / n) + (c ? " " + c : "") + ')" d="' + d + '"/>'; return s; }
  function ring(n, r, rr) { var s = ""; for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; s += '<circle cx="' + (Math.cos(a) * r).toFixed(2) + '" cy="' + (Math.sin(a) * r).toFixed(2) + '" r="' + rr + '"/>'; } return s; }
  var MON = {
    kikyo: rot(5, "M0,-7 C11,-15 17,-29 11,-43 L0,-35 L-11,-43 C-17,-29 -11,-15 0,-7Z"),
    sakura: rot(5, "M0,-9 C13,-15 19,-35 7,-44 L0,-37 L-7,-44 C-19,-35 -13,-15 0,-9Z"),
    hishi: rot(4, "M0,-6 L14,-21 L0,-36 L-14,-21Z"),
    uroko: '<path d="M0,-40 L21,-4 L-21,-4Z"/><path d="M-22,0 L-1,36 L-43,36Z"/><path d="M22,0 L43,36 L1,36Z"/>',
    maru: '<circle r="40" fill="none" stroke="currentColor" stroke-width="8"/><rect x="-29" y="-17" width="58" height="11"/><rect x="-29" y="6" width="58" height="11"/>',
    kuyo: '<circle r="13"/>' + ring(8, 32, 9),
    genji: '<circle r="39" fill="none" stroke="currentColor" stroke-width="7"/><circle r="10"/>' + rot(8, "M-2.5,-10 L2.5,-10 L2.5,-37 L-2.5,-37Z"),
    asanoha: rot(6, "M0,-4 L8,-21 L0,-44 L-8,-21Z"),
    seigaiha: '<g fill="none" stroke="currentColor" stroke-width="6">' + [-22, 22].map(function (x) { return '<path d="M' + (x - 22) + ',12 A22,22 0 0,1 ' + (x + 22) + ',12"/><path d="M' + (x - 11) + ',12 A11,11 0 0,1 ' + (x + 11) + ',12"/>'; }).join("") +
      '<path d="M-22,40 A22,22 0 0,1 22,40"/><path d="M-11,40 A11,11 0 0,1 11,40"/><path d="M-44,-16 A22,22 0 0,1 0,-16 A22,22 0 0,1 44,-16"/></g>',
    torii: '<path d="M-48,-38 Q0,-48 48,-38 L46,-29 Q0,-38 -46,-29Z"/><rect x="-38" y="-16" width="76" height="8"/><rect x="-29" y="-29" width="9" height="71"/><rect x="20" y="-29" width="9" height="71"/><rect x="-4" y="-29" width="8" height="13"/>',
    sensu: [-48, -24, 0, 24, 48].map(function (a) { return '<path transform="rotate(' + a + ' 0 28)" d="M-6,-40 L6,-40 L1.5,28 L-1.5,28Z"/>'; }).join("") + '<circle cy="28" r="6"/>',
    katana: [35, -35].map(function (a) { return '<g transform="rotate(' + a + ')"><path d="M-2.5,-46 L3,-44 L3,18 L-3,18Z"/><rect x="-10" y="18" width="20" height="5"/><rect x="-3.5" y="23" width="7" height="22"/></g>'; }).join(""),
    ginkgo: '<path d="M0,42 L-2,10 C-30,2 -44,-18 -38,-38 C-22,-30 -8,-34 -1,-24 L1,-24 C8,-34 22,-30 38,-38 C44,-18 30,2 2,10Z"/>'
  };
  function mon(name, cls) {
    var w = el("span", "mon" + (cls ? " " + cls : "")); w.setAttribute("aria-hidden", "true");
    w.innerHTML = '<svg viewBox="-50 -50 100 100" fill="currentColor">' + MON[name] + "</svg>";
    return w;
  }
  var SEC_MON = { capacidades: "kikyo", proyectos: "hishi", github: "genji", trayectoria: "torii", contacto: "sensu", acceso: "katana" };
  var SYS_MON = { ia: "asanoha", eye: "kuyo", db: "seigaiha", shield: "maru", chip: "uroko", nerve: "sakura", bone: "hishi", tool: "katana" };

  /* ---------- Pinceladas: máscaras SVG con bordes irregulares (semilla fija) ---------- */
  function rng(seed) { return function () { seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function svgURL(d) { return 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" preserveAspectRatio="none"><path d="' + d + '"/></svg>') + '")'; }
  function masks() {
    var R = rng(1192), p = [], x, y;
    /* Borde derecho rasgado (tarjeta seleccionada) */
    p = ["M0,0 L176,0"]; for (y = 0; y <= 100; y += 4) p.push("L" + (180 + R() * 20 - (R() < .25 ? 14 : 0)).toFixed(1) + "," + y); p.push("L0,100Z");
    root.style.setProperty("--torn", svgURL(p.join(" ")));
    /* Trazo de pincel horizontal (encabezados, pistas) */
    p = ["M" + (4 + R() * 6).toFixed(1) + ",14"];
    for (x = 8; x <= 192; x += 6) p.push("L" + x + "," + (6 + R() * 10 + (R() < .1 ? 6 : 0)).toFixed(1));
    for (y = 10; y <= 90; y += 10) p.push("L" + (190 + R() * 10).toFixed(1) + "," + y);
    for (x = 192; x >= 8; x -= 6) p.push("L" + x + "," + (84 + R() * 12 - (R() < .1 ? 8 : 0)).toFixed(1));
    for (y = 90; y >= 14; y -= 12) p.push("L" + (R() * 8).toFixed(1) + "," + y);
    root.style.setProperty("--brush", svgURL(p.join(" ") + "Z"));
    /* Suelo de tinta del hero: borde superior en picos de hierba */
    p = ["M0,100 L0,60"];
    for (x = 0; x <= 200; x += 1.6) p.push("L" + x.toFixed(1) + "," + (R() < .18 ? 8 + R() * 40 : 46 + R() * 22).toFixed(1));
    p.push("L200,100Z");
    root.style.setProperty("--ground", svgURL(p.join(" ")));
  }

  /* ---------- Marcado propio ---------- */
  var HTML = {
    leaves: '<canvas id="leaves" aria-hidden="true"></canvas>',
    cats: '<div class="cats"><nav class="clist" id="cats" aria-label="Secciones"></nav><p class="hint" id="catHint" aria-live="polite"></p></div>',
    cap: '<div class="medwrap"><div><div class="medals" id="medals" role="group"></div><p class="medleg" data-i18n="medLeg"></p></div><div class="paper med-detail" id="medDetail" aria-live="polite"></div></div>',
    game: '<div class="duel"><div class="stage" id="duStage"><p class="du-foe" id="duFoe"></p>' +
      '<svg class="enso" viewBox="0 0 120 120" aria-hidden="true"><defs><filter id="inkRough"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter></defs>' +
      '<circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="round" stroke-dasharray="250 40" transform="rotate(-70 60 60)" filter="url(#inkRough)"/></svg>' +
      '<p class="du-cue" id="duCue"></p></div>' +
      '<div class="du-side"><button class="btn du-btn" id="duBtn" type="button" data-i18n="duHold"></button><p class="rules" data-i18n="duRules"></p>' +
      '<p class="du-h" data-i18n="duFoes"></p><ol class="du-foes" id="duFoes"></ol><p class="bmsg" id="duMsg" aria-live="polite"></p>' +
      '<div class="bact"><button class="linkbtn" id="duNew" type="button" data-i18n="duNew"></button><button class="linkbtn" id="duSkip" type="button" data-i18n="duSkip"></button></div></div></div>',
    grain: '<div class="grain" aria-hidden="true"></div>'
  };

  /* ---------- Columna de categorías (menú del hero) ---------- */
  var CATS = ["capacidades", "proyectos", "github", "trayectoria", "contacto", "acceso"], catOn = 0;
  function renderCats() {
    var box = $("#cats"); box.textContent = ""; box.setAttribute("aria-label", tr("catHint"));
    CATS.forEach(function (id, i) {
      var m = MENU[id], name = m.l ? tr(m.l) : m.label, unit = tr("wu_" + id) || L(m.u), a = el("a", "cat" + (i === catOn ? " on" : ""));
      a.href = "#" + id;
      if (id === "acceso" && !CC.UNL.every(Boolean)) a.classList.add("new");
      a.appendChild(el("span", "c-n", name));
      a.appendChild(mon(SEC_MON[id], "c-i"));
      a.appendChild(mon(SEC_MON[id], "c-art"));
      a.appendChild(el("span", "c-v", String(m.v())));
      a.setAttribute("aria-label", name + ", " + m.v() + " " + unit);
      function on() { catOn = i; $$(".cat").forEach(function (c, j) { c.classList.toggle("on", j === i); }); $("#catHint").textContent = name + ": " + (tr("wd_" + id) || L(m.d)); }
      a.addEventListener("pointerenter", on); a.addEventListener("focus", on);
      box.appendChild(a);
    });
    $("#catHint").textContent = tr("catHint");
  }

  /* ---------- Emblemas de Capacidades ---------- */
  var slotIdx = 0;
  function metal(s) { var t = s.mods.filter(function (x) { return x.s === "t"; }).length; return !t ? "silver" : t === s.mods.length ? "gold" : "copper"; }
  function renderMedals() {
    var g = $("#medals"); g.textContent = ""; g.setAttribute("aria-label", tr("medHead"));
    SLOTS.forEach(function (s, i) {
      var b = el("button", "medal " + metal(s)); b.type = "button"; b.setAttribute("aria-pressed", i === slotIdx ? "true" : "false");
      var disc = el("span", "disc"); disc.appendChild(mon(SYS_MON[s.icon])); b.appendChild(disc);
      b.appendChild(el("span", "m-n", L(s.area)));
      b.appendChild(el("span", "m-c", s.mods.length + " " + tr("mods")));
      b.addEventListener("click", function () { slotIdx = i; $$(".medal").forEach(function (x, j) { x.setAttribute("aria-pressed", j === i ? "true" : "false"); }); renderMedDetail(true); });
      b.addEventListener("keydown", function (e) {
        var cols = getComputedStyle(g).gridTemplateColumns.split(" ").length, d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]; if (!d) return;
        var j = i + d; if (j < 0 || j >= SLOTS.length) return; e.preventDefault(); $$(".medal")[j].focus();
      });
      g.appendChild(b);
    });
    renderMedDetail(false);
  }
  function renderMedDetail(anim) {
    var s = SLOTS[slotIdx], p = $("#medDetail"); p.textContent = "";
    var tot = s.mods.length, ops = s.mods.filter(function (x) { return x.s !== "t"; }).length;
    var h = el("div", "md-h"); h.appendChild(mon(SYS_MON[s.icon], "md-i")); var ht = el("div");
    ht.appendChild(el("p", "kicker", tr("nav1"))); ht.appendChild(el("h3", null, L(s.area))); ht.appendChild(el("p", "count", ops + "/" + tot));
    h.appendChild(ht); p.appendChild(h);
    p.appendChild(el("p", "md-d", L(s.d)));
    var rs = el("div", "resolve"); rs.setAttribute("role", "img"); rs.setAttribute("aria-label", tr("hpA")(ops, tot, tot - ops));
    rs.appendChild(el("span", "r-l", tr("hpL")));
    var bar = el("span", "r-b"); s.mods.forEach(function (x) { bar.appendChild(el("i", x.s === "t" ? "t" : "")); }); rs.appendChild(bar);
    p.appendChild(rs);
    var ul = el("ul", "mods");
    s.mods.forEach(function (x) {
      var li = el("li", x.s === "t" ? "t" : ""); li.appendChild(el("span", null, L(x.n)));
      li.appendChild(el("span", "chip " + (x.s === "t" ? "y" : "m"), x.s === "t" ? tr("stTrain") : tr("stOps")));
      ul.appendChild(li);
    });
    p.appendChild(ul);
    if (anim) CC.swapAnim(p);
  }

  /* ---------- Hojas al viento: arce rojo y ginkgo dorado ---------- */
  var lv, lx, LW = 0, LH = 0, leaves = [];
  var MAPLE = new Path2D("M0,-.96 L.16,-.6 L.44,-.72 L.36,-.28 L.8,-.4 L.64,-.08 L.92,.08 L.44,.24 L.52,.52 L.08,.4 L.04,.92 L-.04,.92 L-.08,.4 L-.52,.52 L-.44,.24 L-.92,.08 L-.64,-.08 L-.8,-.4 L-.36,-.28 L-.44,-.72 L-.16,-.6Z");
  var GINKGO = new Path2D("M0,.42 L-.02,.1 C-.3,.02 -.44,-.18 -.38,-.38 C-.22,-.3 -.08,-.34 0,-.24 C.08,-.34 .22,-.3 .38,-.38 C.44,-.18 .3,.02 .02,.1Z");
  function leavesSize() {
    var d = Math.min(window.devicePixelRatio || 1, 2); LW = window.innerWidth; LH = window.innerHeight;
    lv.width = Math.round(LW * d); lv.height = Math.round(LH * d); lx.setTransform(d, 0, 0, d, 0, 0);
    var n = LW < 600 ? 8 : 16, R = rng(77); leaves = [];
    for (var i = 0; i < n; i++) leaves.push({ x: R() * LW, y: R() * LH, s: 9 + R() * 9, vy: 18 + R() * 26, r: R() * 6, vr: (R() - .5) * 1.6, g: R() < .35, ph: R() * 6 });
    drawLeaves(0);
  }
  function drawLeaves(t) {
    var kuro = root.getAttribute("data-mode") === "overload";
    lx.clearRect(0, 0, LW, LH); lx.globalAlpha = .55;
    leaves.forEach(function (f) {
      lx.save(); lx.translate(f.x, f.y); lx.rotate(f.r + Math.sin(t + f.ph) * .4); lx.scale(f.s, f.s * (.75 + .25 * Math.cos(t * 1.3 + f.ph)));
      lx.fillStyle = kuro ? (f.g ? "#9a9a9a" : "#4a4a4a") : (f.g ? "#C9A34E" : "#B3141E");
      lx.fill(f.g ? GINKGO : MAPLE);
      lx.restore();
    });
    lx.globalAlpha = 1;
  }
  function stepLeaves(dt, t) {
    var wind = 28 + 22 * Math.sin(t * .35);
    leaves.forEach(function (f) {
      f.y += f.vy * dt; f.x += (wind + Math.sin(t + f.ph) * 14) * dt; f.r += f.vr * dt;
      if (f.y > LH + 20) { f.y = -20; f.x = Math.random() * LW - 60; }
      if (f.x > LW + 20) f.x = -20;
    });
    drawLeaves(t);
  }

  /* ---------- Enfrentamiento ---------- */
  var FOES = [{ feints: 1, min: 2200, max: 3800, win: 650 }, { feints: 2, min: 2600, max: 4800, win: 480 }, { feints: 3, min: 3200, max: 5600, win: 360 }];
  var DU = { i: 0, state: "idle", timers: [], t0: 0, replay: false };
  function duCur() { if (DU.replay) return DU.i; for (var k = 0; k < 3; k++) if (!CC.UNL[k]) return k; return -1; }
  function stage(cls, cue) { var s = $("#duStage"); s.className = "stage " + cls; $("#duCue").textContent = cue; }
  function clearT() { DU.timers.forEach(clearTimeout); DU.timers = []; }
  function duMsg(t, cls) { var m = $("#duMsg"); m.textContent = t; m.className = "bmsg" + (cls ? " " + cls : ""); }
  function duHold() {
    var i = duCur(); if (DU.state !== "idle" || i < 0) return;
    var f = FOES[i], T = f.min + Math.random() * (f.max - f.min);
    DU.state = "hold"; DU.i = i; duMsg(""); stage("hold", tr("duWait"));
    for (var k = 0; k < f.feints; k++) {
      var at = 700 + Math.random() * (T - 1300);
      DU.timers.push(setTimeout(function () { if (DU.state !== "hold") return; stage("feint", tr("duFeint")); DU.timers.push(setTimeout(function () { if (DU.state === "hold") stage("hold", tr("duWait")); }, 320)); }, at));
    }
    DU.timers.push(setTimeout(function () {
      if (DU.state !== "hold") return;
      DU.state = "attack"; DU.t0 = performance.now(); stage("attack", tr("duNow"));
      DU.timers.push(setTimeout(function () { if (DU.state === "attack") duLose(tr("duLate")); }, f.win));
    }, T));
  }
  function duRelease() {
    if (DU.state === "hold") duLose(tr("duEarly"));
    else if (DU.state === "attack") { if (performance.now() - DU.t0 <= FOES[DU.i].win) duWin(); else duLose(tr("duLate")); }
  }
  function duWin() {
    clearT(); DU.state = "idle"; var i = DU.i;
    CC.unlock(i);
    if (DU.replay && ++DU.i > 2) DU.replay = false;
    stage("win", "");
    duMsg(duCur() < 0 ? tr("duAll") : tr("duWin")(tr("foes")[i], tr("rw")[i][0]), "ok");
    renderDuel(true); renderCats();
  }
  function duLose(t) { clearT(); DU.state = "idle"; stage("lose", ""); duMsg(t, "bad"); }
  function renderDuel(keepMsg) {
    var i = duCur(), ul = $("#duFoes"); ul.textContent = "";
    $("#duFoe").textContent = i < 0 ? tr("duAll") : tr("duFoe")(i) + " · " + tr("foes")[i];
    $("#duBtn").disabled = i < 0;
    FOES.forEach(function (f, k) {
      var won = DU.replay ? k < DU.i : CC.UNL[k], li = el("li", won ? "done" : (k === i ? "cur" : ""));
      li.appendChild(el("b", null, tr("foes")[k] + (won ? " ✓" : ""))); li.appendChild(el("span", null, tr("rw")[k][0] + ": " + tr("rw")[k][1]));
      ul.appendChild(li);
    });
    if (DU.state === "idle" && !keepMsg) { stage("", i < 0 ? "" : tr("duReady")); }
  }

  /* ---------- Registro del tema ---------- */
  CC.useTheme({
    mount: function () {
      masks();
      document.body.insertAdjacentHTML("afterbegin", HTML.leaves + HTML.grain);
      $("#inicio .hero-grid").insertAdjacentHTML("beforeend", HTML.cats);
      $("#capacidades .inner").insertAdjacentHTML("beforeend", HTML.cap);
      $("#acceso .sub").insertAdjacentHTML("afterend", HTML.game);
      $("#tForm label").textContent = "»";
      lv = $("#leaves"); lx = lv.getContext("2d");
      CC.anim(lv, stepLeaves);
      var btn = $("#duBtn");
      btn.addEventListener("pointerdown", function (e) { if (e.button) return; e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (x) {} duHold(); });
      btn.addEventListener("pointerup", duRelease); btn.addEventListener("pointercancel", duRelease);
      btn.addEventListener("keydown", function (e) { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); duHold(); } });
      btn.addEventListener("keyup", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); duRelease(); } });
      btn.addEventListener("blur", duRelease);
      btn.addEventListener("click", function (e) { e.preventDefault(); });
      $("#duNew").addEventListener("click", function () { clearT(); DU.state = "idle"; DU.replay = true; DU.i = 0; duMsg(""); renderDuel(); });
      $("#duSkip").addEventListener("click", function () { clearT(); DU.state = "idle"; DU.replay = false; [0, 1, 2].forEach(CC.unlock); renderDuel(true); duMsg(tr("duAll"), "ok"); renderCats(); });
    },
    render: function () { renderCats(); renderMedals(); renderDuel(); },
    start: leavesSize,
    resize: leavesSize,
    redraw: function (t) { drawLeaves(t); }
  });
})();
