/* Tema Minecraft (estilo Ore UI): bloques con contorno y sombra inferior, lista de mundos, inventario con corazones,
   terreno de bloques en el hero y una mina como minijuego. Las texturas se generan en código (16 x 16, semilla fija). */
(function () {
  "use strict";
  var $ = CC.$, $$ = CC.$$, el = CC.el, L = CC.L, tr = CC.tr, root = CC.root;

  CC.addStrings({
    es: {
      cta2: "Ir a la mina", capSub: "Cada casilla es un sistema con sus módulos. Elige una para ver qué tiene.",
      brSub: "Rompe bloques para encontrar las tres vetas. Cada veta completa desbloquea algo de este sitio.",
      rw: [["Chat", "Abre el chat de comandos."], ["Archivo", "Revela un archivo con datos curiosos."], ["Nether", "Cambia el mundo al Nether."]],
      tTitle: "Chat", lkT: "Bloqueado", lkOpen: "Abierto", lkReq: "Requiere veta", lkOk: "Desbloqueado",
      lk0: "Completa la veta de diamante para usar el chat.", lk1: "Completa la veta de oro para abrir el archivo.",
      ovrText: "La veta de esmeralda abre el portal al Nether.", ovrOn: "Entrar al Nether", ovrOff: "Volver al Overworld", ovrLocked: "Nether bloqueado",
      lockTitle: "Vetas completadas",
      tHelp: "Comandos: /quien, /skills, /proyectos, /publicaciones, /github, /trayectoria, /contacto, /ir <sección>, /idioma, /nether, /limpiar",
      tOvrLocked: "El Nether está bloqueado. Completa la veta de esmeralda.", tOvrOn: "Entraste al Nether.", tOvrOff: "Volviste al Overworld.",
      tHack: "Ya estás dentro. Prueba /nether.", tUnknown: "Comando desconocido. Escribe /ayuda.",
      tGranted: "Chat desbloqueado. Escribe /ayuda.", tOnline: "Bienvenido al servidor. Escribe /ayuda.", tChips: ["/ayuda", "/quien", "/skills", "/proyectos", "/contacto"],
      wHead: "Elige un mundo", wd_acceso: "Minijuego de minería. Desbloquea el chat y más.", wu_acceso: "vetas",
      invHead: "Inventario", hpL: "Módulos", hpA: function (o, t, n) { return o + " de " + t + " módulos operativos" + (n ? ", " + n + " en entrenamiento" : "") + "."; },
      mods: "módulos", stOps: "operativo", stTrain: "entrenando", hLeg: "Corazón rojo: operativo. Dorado: en entrenamiento.",
      mnDur: "Pico", mnVeins: "Vetas", mnNew: "Nueva mina", mnSkip: "Desbloquear todo sin jugar",
      mnRules: "Cada golpe rompe un bloque y gasta durabilidad. La piedra rota dice cuántos bloques de mena tiene alrededor, diagonales incluidas. Cada veta asoma por un bloque visible; rompe sus 3 bloques para completarla.",
      mnReady: "Elige un bloque para empezar a picar.", ore: ["Diamante", "Oro", "Esmeralda"],
      mnGot: function (o, r) { return "Veta de " + o.toLowerCase() + " completa: " + r + " desbloqueado."; },
      mnWin: "Mina despejada. Las tres vetas están completas.", mnEnd: function (n) { return n ? "El pico se rompió: " + n + " de 3 vetas completas." : "El pico se rompió. Prueba con una mina nueva."; },
      mnCell: function (r, c, s) { return "Fila " + r + ", columna " + c + ", " + s; }, mnStone: "piedra", mnNear: function (n) { return n ? "piedra rota, " + n + " de mena cerca" : "piedra rota, nada cerca"; },
      mnGrid: "Mina de 7 por 7", tPrompt: "<visitante>"
    },
    en: {
      cta2: "Go mining", capSub: "Each slot is a system with its modules. Pick one to see what it holds.",
      brSub: "Break blocks to find the three veins. Each complete vein unlocks something on this site.",
      rw: [["Chat", "Opens the command chat."], ["Archive", "Reveals a file with fun facts."], ["Nether", "Switches the world to the Nether."]],
      tTitle: "Chat", lkT: "Locked", lkOpen: "Open", lkReq: "Vein required", lkOk: "Unlocked",
      lk0: "Complete the diamond vein to use the chat.", lk1: "Complete the gold vein to open the archive.",
      ovrText: "The emerald vein opens the portal to the Nether.", ovrOn: "Enter the Nether", ovrOff: "Back to the Overworld", ovrLocked: "Nether locked",
      lockTitle: "Veins completed",
      tHelp: "Commands: /about, /skills, /projects, /publications, /github, /path, /contact, /go <section>, /lang, /nether, /clear",
      tOvrLocked: "The Nether is locked. Complete the emerald vein.", tOvrOn: "You entered the Nether.", tOvrOff: "You are back in the Overworld.",
      tHack: "You are already in. Try /nether.", tUnknown: "Unknown command. Type /help.",
      tGranted: "Chat unlocked. Type /help.", tOnline: "Welcome to the server. Type /help.", tChips: ["/help", "/about", "/skills", "/projects", "/contact"],
      wHead: "Select a world", wd_acceso: "Mining minigame. Unlocks the chat and more.", wu_acceso: "veins",
      invHead: "Inventory", hpL: "Modules", hpA: function (o, t, n) { return o + " of " + t + " modules operational" + (n ? ", " + n + " in training" : "") + "."; },
      mods: "modules", stOps: "operational", stTrain: "training", hLeg: "Red heart: operational. Golden: in training.",
      mnDur: "Pickaxe", mnVeins: "Veins", mnNew: "New mine", mnSkip: "Unlock everything without playing",
      mnRules: "Each swing breaks a block and costs durability. Broken stone tells how many ore blocks surround it, diagonals included. Every vein shows one visible block; break its 3 blocks to complete it.",
      mnReady: "Pick a block to start mining.", ore: ["Diamond", "Gold", "Emerald"],
      mnGot: function (o, r) { return o + " vein complete: " + r + " unlocked."; },
      mnWin: "Mine cleared. All three veins are complete.", mnEnd: function (n) { return n ? "The pickaxe broke: " + n + " of 3 veins complete." : "The pickaxe broke. Try a new mine."; },
      mnCell: function (r, c, s) { return "Row " + r + ", column " + c + ", " + s; }, mnStone: "stone", mnNear: function (n) { return n ? "broken stone, " + n + " ore nearby" : "broken stone, nothing nearby"; },
      mnGrid: "7 by 7 mine", tPrompt: "<visitor>"
    }
  });

  /* ---------- Texturas de bloque ---------- */
  function rng(seed) { return function () { seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  var PAL = {
    stone: ["#7d7d7d", "#8a8a8a", "#6e6e6e", "#747474", "#959595"], dirt: ["#866043", "#79553a", "#96704f", "#6b4a32", "#5e3f2a"],
    grass: ["#5d9b37", "#6aaa40", "#4f8a2d", "#79b84a"], net: ["#6f2a2a", "#7e3333", "#5c2121", "#8b4646", "#642626"], nyl: ["#8b1a1a", "#a32020", "#771414", "#b53030"],
    obsidian: ["#15101f", "#21182f", "#2e2142", "#3b2a5c"], amethyst: ["#8d61c9", "#a678e0", "#6f47a8", "#c39af5"],
    bedrock: ["#565656", "#3b3b3b", "#7a7a7a", "#2a2a2a", "#4a4a4a"], cave: ["#2b2b2c", "#323233", "#262627", "#38383a"],
    plank: ["#a2824e", "#b18f58", "#9a7b49"]
  };
  var ORE = { diamond: ["#5decf5", "#a1fbe8", "#2bb3c0"], gold: ["#fcee4b", "#fff9a6", "#d9a30b"], emerald: ["#17dd62", "#7dffa8", "#0a8a3a"], iron: ["#d8af93", "#f0d2bd", "#a7765b"],
    redstone: ["#ff2020", "#ff8080", "#a40000"], lapis: ["#2a5fd1", "#5b8aff", "#173d94"], coal: ["#2b2b2b", "#454545", "#1a1a1a"], quartz: ["#ece6dc", "#ffffff", "#c9c0b2"], ngold: ["#f6c84b", "#fff0a0", "#c99015"] };
  var TEX = {}, TURL = {};
  function tex(name) {
    if (TEX[name]) return TEX[name];
    var c = document.createElement("canvas"); c.width = c.height = 16;
    var x = c.getContext("2d"), R = rng(hash(name)), i, j;
    function px(a, b, col) { x.fillStyle = col; x.fillRect(a, b, 1, 1); }
    function pick(p) { return p[Math.floor(R() * p.length)]; }
    function noise(p, y0, y1) { for (j = y0 || 0; j < (y1 || 16); j++) for (i = 0; i < 16; i++) px(i, j, pick(p)); }
    function planks() { noise(PAL.plank); for (j = 0; j < 16; j++) for (i = 0; i < 16; i++) if (j % 4 === 3 || (i === ((j >> 2) % 2 ? 4 : 12) && j % 4 !== 3)) px(i, j, "#7c5f34"); }
    var p = name.split(":");
    if (p[0] === "ore" || p[0] === "nore") {
      noise(p[0] === "ore" ? PAL.stone : PAL.net);
      var oc = ORE[p[1]];
      for (var k = 0; k < 5; k++) {
        var cx = 2 + Math.floor(R() * 12), cy = 2 + Math.floor(R() * 12);
        for (var n = 0; n < 4; n++) px(cx + Math.floor(R() * 3) - 1, cy + Math.floor(R() * 3) - 1, oc[n === 0 ? 1 : (n === 3 ? 2 : 0)]);
      }
    } else if (name === "grass" || name === "nylium") {
      noise(name === "grass" ? PAL.dirt : PAL.net);
      for (i = 0; i < 16; i++) { var d = 3 + Math.floor(R() * 3); for (j = 0; j < d; j++) px(i, j, pick(name === "grass" ? PAL.grass : PAL.nyl)); }
    } else if (name === "planks") planks();
    else if (name === "crafting") {
      planks(); x.fillStyle = "#4a3418"; x.fillRect(0, 0, 16, 2); x.fillRect(0, 14, 16, 2); x.fillRect(0, 0, 2, 16); x.fillRect(14, 0, 2, 16);
      x.fillStyle = "#c9c9c9"; x.fillRect(4, 4, 3, 3); x.fillStyle = "#8a5a2b"; x.fillRect(9, 4, 3, 7); x.fillStyle = "#9a9a9a"; x.fillRect(4, 9, 3, 3);
    } else if (name === "bricks") {
      noise(["#b7aca2", "#aaa095"]);
      for (j = 0; j < 16; j++) for (i = 0; i < 16; i++) { var off = (j >> 2) % 2 ? 4 : 0; if (j % 4 !== 3 && (i + off) % 8 !== 7) px(i, j, pick(["#965a4a", "#a8664f", "#8a5142"])); }
    } else if (name === "stonebricks") {
      noise(["#5f5f5f", "#575757"]);
      for (j = 0; j < 16; j++) for (i = 0; i < 16; i++) { var o2 = j >= 8 ? 4 : 0; if (j % 8 !== 7 && (i + o2) % 8 !== 7) px(i, j, pick(["#7a7a7a", "#858585", "#707070"])); }
    } else if (name === "bookshelf") {
      planks();
      var books = ["#6b2f2f", "#2f4d6b", "#2f6b3a", "#6b5a2f", "#4b2f6b", "#7a6a5a"];
      [[3, 7], [9, 13]].forEach(function (rw) { for (i = 1; i < 15; i += 2) { var col = pick(books); for (j = rw[0]; j < rw[1]; j++) { px(i, j, col); px(i + 1, j, j === rw[0] ? "#d8d0c0" : col); } } });
    } else noise(PAL[name] || PAL.stone);
    return (TEX[name] = c);
  }
  function texURL(name) { return TURL[name] || (TURL[name] = tex(name).toDataURL()); }
  function texImg(name, cls, size) { var im = el("img", cls); im.src = texURL(name); im.alt = ""; im.width = im.height = size; im.decoding = "async"; return im; }

  /* ---------- Corazones (9 x 8 px) ---------- */
  var HEART = [".##...##.", "#wr###rr#", "#rrrrrrr#", "#rrrrrrr#", ".#rrrrr#.", "..#rrr#..", "...#r#...", "....#...."];
  function heartSVG(gold) {
    var col = { "#": "#1e1e1f", r: gold ? "#f2c21b" : "#e0262e", w: gold ? "#fff3a8" : "#ffb3b3" }, s = "";
    HEART.forEach(function (row, y) { for (var x = 0; x < row.length; x++) if (col[row[x]]) s += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + col[row[x]] + '"/>'; });
    return '<svg viewBox="0 0 9 8" shape-rendering="crispEdges" aria-hidden="true">' + s + "</svg>";
  }
  var HEARTS = [heartSVG(false), heartSVG(true)];

  /* ---------- Marcado propio ---------- */
  var HTML = {
    terrain: '<canvas id="terrain" aria-hidden="true"></canvas>',
    worlds: '<div class="worlds"><p class="pop-h" data-i18n="wHead"></p><nav class="wlist" id="worlds" aria-label="Mundos"></nav></div>',
    cap: '<div class="inv"><div class="inv-panel"><p class="pop-h" data-i18n="invHead"></p><div class="inv-grid" id="invGrid" role="group"></div><p class="hleg" data-i18n="hLeg"></p></div>' +
      '<div class="pop inv-detail" id="invDetail" aria-live="polite"></div></div>',
    game: '<div class="mine"><div class="mine-l"><div class="dur"><span data-i18n="mnDur"></span><span class="dur-bar"><i id="mnBar"></i></span><output id="mnLeft"></output></div>' +
      '<div class="mine-grid" id="mnGrid" role="group"></div><p class="rules" data-i18n="mnRules"></p></div>' +
      '<div class="mine-r"><div class="pop"><p class="pop-h" data-i18n="mnVeins"></p><ul class="veins" id="mnVeins"></ul></div>' +
      '<p class="bmsg" id="mnMsg" aria-live="polite"></p><div class="bact"><button class="btn" id="mnNew" type="button" data-i18n="mnNew"></button><button class="linkbtn" id="mnSkip" type="button" data-i18n="mnSkip"></button></div></div></div>'
  };

  /* ---------- Mundos (menú del hero) ---------- */
  var WORLDS = [["capacidades", "grass"], ["proyectos", "bookshelf"], ["github", "ore:iron"], ["trayectoria", "stonebricks"], ["contacto", "ore:emerald"], ["acceso", "ore:diamond"]];
  function renderWorlds() {
    var box = $("#worlds"); box.textContent = "";
    box.setAttribute("aria-label", tr("wHead"));
    WORLDS.forEach(function (w) {
      var id = w[0], m = MENU[id], name = m.l ? tr(m.l) : m.label, unit = tr("wu_" + id) || L(m.u);
      var a = el("a", "world" + (id === "acceso" ? " realm" : "")); a.href = "#" + id;
      a.appendChild(texImg(w[1], "tx", 56));
      var t = el("span", "w-t");
      t.appendChild(el("span", "w-n", name));
      t.appendChild(el("span", "w-v", m.v() + " " + unit));
      t.appendChild(el("span", "w-d", tr("wd_" + id) || L(m.d)));
      a.appendChild(t); a.appendChild(el("span", "w-c"));
      box.appendChild(a);
    });
  }

  /* ---------- Inventario ---------- */
  var SLOT_TX = { ia: "amethyst", eye: "ore:lapis", db: "bookshelf", shield: "obsidian", chip: "bricks", nerve: "ore:redstone", bone: "bedrock", tool: "crafting" };
  var slotIdx = 0;
  function renderInv() {
    var g = $("#invGrid"); g.textContent = ""; g.setAttribute("aria-label", tr("invHead"));
    SLOTS.forEach(function (s, i) {
      var b = el("button", "islot"); b.type = "button"; b.setAttribute("aria-pressed", i === slotIdx ? "true" : "false");
      b.setAttribute("aria-label", L(s.area) + ", " + s.mods.length + " " + tr("mods"));
      b.appendChild(texImg(SLOT_TX[s.icon], "tx", 40));
      b.appendChild(el("span", "cnt", String(s.mods.length)));
      var tip = el("span", "tip"); tip.setAttribute("aria-hidden", "true"); tip.appendChild(el("b", null, L(s.area))); tip.appendChild(el("span", null, s.mods.length + " " + tr("mods"))); b.appendChild(tip);
      b.addEventListener("click", function () { slotIdx = i; $$(".islot").forEach(function (x, j) { x.setAttribute("aria-pressed", j === i ? "true" : "false"); }); renderInvDetail(true); });
      b.addEventListener("keydown", function (e) {
        var d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 4, ArrowUp: -4 }[e.key]; if (!d) return;
        var j = i + d; if (j < 0 || j >= SLOTS.length) return; e.preventDefault(); $$(".islot")[j].focus();
      });
      g.appendChild(b);
    });
    renderInvDetail(false);
  }
  function renderInvDetail(anim) {
    var s = SLOTS[slotIdx], p = $("#invDetail"); p.textContent = "";
    var h = el("div", "pop-t"); h.appendChild(texImg(SLOT_TX[s.icon], "tx", 32)); h.appendChild(el("h3", null, L(s.area))); p.appendChild(h);
    var body = el("div", "pop-b"); p.appendChild(body);
    body.appendChild(el("p", null, L(s.d)));
    var tot = s.mods.length, ops = s.mods.filter(function (x) { return x.s !== "t"; }).length;
    var hp = el("div", "hearts"); hp.setAttribute("role", "img"); hp.setAttribute("aria-label", tr("hpA")(ops, tot, tot - ops));
    var row = el("span", "h-row"); row.innerHTML = s.mods.map(function (x) { return HEARTS[x.s === "t" ? 1 : 0]; }).join(""); hp.appendChild(row);
    var v = el("span", "h-v", ops + "/" + tot); hp.appendChild(el("span", "h-l", tr("hpL"))); hp.appendChild(v);
    body.appendChild(hp);
    var ul = el("ul", "mods");
    s.mods.forEach(function (x) {
      var li = el("li"); li.appendChild(el("span", null, L(x.n)));
      li.appendChild(el("span", "chip " + (x.s === "t" ? "y" : ""), x.s === "t" ? tr("stTrain") : tr("stOps")));
      ul.appendChild(li);
    });
    body.appendChild(ul);
    if (anim) CC.swapAnim(p);
  }

  /* ---------- Terreno del hero: se pinta una vez en un lienzo aparte ---------- */
  var cv, cx, CW = 0, CH = 0;
  function terrainSize() {
    var r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    CW = r.width; CH = r.height; cv.width = Math.max(1, Math.round(CW * d)); cv.height = Math.max(1, Math.round(CH * d)); cx.setTransform(d, 0, 0, d, 0, 0);
    drawTerrain();
  }
  function drawTerrain() {
    var nether = root.getAttribute("data-mode") === "overload", B = CW < 600 ? 18 : 26, cols = Math.ceil(CW / B) + 1, rows = Math.ceil(CH / B), y0 = CH - rows * B;
    var R = rng(20261023), h = 3, top = nether ? "nylium" : "grass", mid = nether ? "net" : "dirt", deep = nether ? "net" : "stone";
    var ores = nether ? ["nore:ngold", "nore:quartz"] : ["ore:coal", "ore:iron", "ore:diamond", "ore:redstone", "ore:lapis", "ore:gold"];
    cx.clearRect(0, 0, CW, CH); cx.imageSmoothingEnabled = false;
    function put(name, c, r) { cx.drawImage(tex(name), c * B, y0 + r * B, B, B); }
    for (var c = 0; c < cols; c++) {
      if (R() < .35) h = Math.max(2, Math.min(5, h + (R() < .5 ? -1 : 1)));
      for (var r = h; r < rows; r++) {
        var depth = r - h;
        put(depth === 0 ? top : depth < 3 ? mid : (R() < .08 ? ores[Math.floor(R() * ores.length)] : deep), c, r);
      }
    }
  }

  /* ---------- Mina ---------- */
  var MN = { N: 7, SWINGS: 20, VEIN: 3, KEYS: ["diamond", "gold", "emerald"], g: [], left: 0, found: [0, 0, 0], over: false };
  function idx(r, c) { return r * MN.N + c; }
  function mnGen() {
    var N = MN.N, ok = false;
    while (!ok) {
      MN.g = []; for (var i = 0; i < N * N; i++) MN.g.push({ ore: -1, mined: false, shown: false });
      ok = true;
      for (var v = 0; v < 3 && ok; v++) {
        var start = -1;
        for (var t = 0; t < 50 && start < 0; t++) { var s = Math.floor(Math.random() * N * N); if (MN.g[s].ore < 0) start = s; }
        if (start < 0) { ok = false; break; }
        var cells = [start]; MN.g[start].ore = v;
        while (cells.length < MN.VEIN) {
          var cand = [];
          cells.forEach(function (k) {
            var r = Math.floor(k / N), c = k % N;
            [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) { var rr = r + d[0], cc = c + d[1]; if (rr >= 0 && cc >= 0 && rr < N && cc < N && MN.g[idx(rr, cc)].ore < 0) cand.push(idx(rr, cc)); });
          });
          if (!cand.length) { ok = false; break; }
          var nk = cand[Math.floor(Math.random() * cand.length)]; MN.g[nk].ore = v; cells.push(nk);
        }
        if (ok) MN.g[cells[Math.floor(Math.random() * cells.length)]].shown = true;
      }
    }
    MN.left = MN.SWINGS; MN.found = [0, 0, 0]; MN.over = false;
  }
  function near(k) {
    var N = MN.N, r = Math.floor(k / N), c = k % N, n = 0;
    for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
      var rr = r + dr, cc = c + dc; if ((dr || dc) && rr >= 0 && cc >= 0 && rr < N && cc < N && MN.g[idx(rr, cc)].ore >= 0) n++;
    }
    return n;
  }
  function oreTex(v) { return "ore:" + MN.KEYS[v]; }
  function renderMine() {
    var box = $("#mnGrid"), hadFocus = document.activeElement && document.activeElement.classList.contains("blk") ? +document.activeElement.dataset.k : -1;
    box.textContent = ""; box.setAttribute("aria-label", tr("mnGrid"));
    MN.g.forEach(function (cell, k) {
      var b = el("button", "blk"), r = Math.floor(k / MN.N) + 1, c = k % MN.N + 1, desc;
      b.type = "button"; b.dataset.k = k;
      if (cell.mined && cell.ore < 0) { var n = near(k); b.classList.add("air"); b.style.backgroundImage = "url(" + texURL("cave") + ")"; if (n) { b.textContent = n; b.dataset.n = Math.min(n, 4); } desc = tr("mnNear")(n); }
      else if (cell.ore >= 0 && (cell.mined || cell.shown)) { b.style.backgroundImage = "url(" + texURL(oreTex(cell.ore)) + ")"; if (cell.mined) b.classList.add("got"); desc = tr("ore")[cell.ore]; }
      else { b.style.backgroundImage = "url(" + texURL("stone") + ")"; desc = tr("mnStone"); }
      b.disabled = MN.over || cell.mined;
      b.setAttribute("aria-label", tr("mnCell")(r, c, desc));
      b.addEventListener("click", function () { mnPick(k); });
      b.addEventListener("keydown", function (e) {
        var d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: MN.N, ArrowUp: -MN.N }[e.key]; if (!d) return;
        var j = k + d; if (j < 0 || j >= MN.g.length || (Math.abs(d) === 1 && Math.floor(j / MN.N) !== Math.floor(k / MN.N))) return;
        e.preventDefault(); $("#mnGrid").children[j].focus();
      });
      box.appendChild(b);
    });
    if (hadFocus >= 0) { var nx = box.children[hadFocus]; if (nx.disabled) nx = $("#mnGrid .blk:not([disabled])"); if (nx) nx.focus(); }
    var pct = MN.left / MN.SWINGS;
    $("#mnLeft").textContent = MN.left + "/" + MN.SWINGS;
    $("#mnBar").style.width = (pct * 100) + "%";
    $("#mnBar").style.background = pct > .5 ? "#4ad94a" : pct > .25 ? "#e1b922" : "#e0262e";
    renderVeins();
  }
  function renderVeins() {
    var ul = $("#mnVeins"); ul.textContent = "";
    MN.KEYS.forEach(function (key, v) {
      var done = MN.found[v] === MN.VEIN, li = el("li", done ? "done" : (MN.over ? "fail" : ""));
      li.appendChild(texImg(oreTex(v), "tx", 32));
      var t = el("span", "v-t"); t.appendChild(el("b", null, tr("ore")[v] + " " + MN.found[v] + "/" + MN.VEIN + (CC.UNL[v] && !done ? " ✓" : "")));
      t.appendChild(el("span", null, tr("rw")[v][0] + ": " + tr("rw")[v][1])); li.appendChild(t);
      ul.appendChild(li);
    });
  }
  function mnMsg(t, cls) { var m = $("#mnMsg"); m.textContent = t; m.className = "bmsg" + (cls ? " " + cls : ""); }
  function mnPick(k) {
    var cell = MN.g[k]; if (MN.over || cell.mined) return;
    cell.mined = true; MN.left--;
    if (cell.ore >= 0) {
      MN.found[cell.ore]++;
      if (MN.found[cell.ore] === MN.VEIN) { CC.unlock(cell.ore); mnMsg(tr("mnGot")(tr("ore")[cell.ore], tr("rw")[cell.ore][0]), "ok"); }
    }
    var veins = MN.found.filter(function (f) { return f === MN.VEIN; }).length;
    if (veins === 3) { MN.over = true; mnMsg(tr("mnWin"), "ok"); }
    else if (!MN.left) { MN.over = true; MN.g.forEach(function (x) { if (x.ore >= 0) x.shown = true; }); mnMsg(tr("mnEnd")(veins), veins ? "ok" : "bad"); }
    renderMine();
  }
  function mnNew() { mnGen(); renderMine(); mnMsg(tr("mnReady")); }

  /* ---------- Registro del tema ---------- */
  CC.useTheme({
    mount: function () {
      $("#inicio").insertAdjacentHTML("afterbegin", HTML.terrain);
      $("#inicio .hero-grid").insertAdjacentHTML("beforeend", HTML.worlds);
      $("#capacidades .inner").insertAdjacentHTML("beforeend", HTML.cap);
      $("#acceso .sub").insertAdjacentHTML("afterend", HTML.game);
      cv = $("#terrain"); cx = cv.getContext("2d");
      $("#mnNew").addEventListener("click", mnNew);
      $("#mnSkip").addEventListener("click", function () { [0, 1, 2].forEach(CC.unlock); renderVeins(); mnMsg(tr("mnWin"), "ok"); });
      mnGen();
    },
    render: function () {
      $("#tForm label").textContent = tr("tPrompt");
      renderWorlds(); renderInv(); renderMine();
      if (MN.left === MN.SWINGS && !MN.over) mnMsg(tr("mnReady"));
    },
    start: terrainSize,
    resize: terrainSize,
    redraw: drawTerrain
  });
})();
