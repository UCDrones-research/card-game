// ─── State ─────────────────────────────────────────────────────────────────
let state = {
  chars: 14,
  objTypes: [
    { name: "Permit", count: 3 },
    { name: "Drone", count: 3 },
    { name: "Airspace", count: 3 },
    { name: "Equip", count: 3 },
    { name: "Payload", count: 3 },
    { name: "Crew", count: 3 }
  ],
  actTypes: [
    { name: "Change", count: 2 },
    { name: "Interfere", count: 2 },
    { name: "Ground", count: 2 },
    { name: "Cross", count: 2 },
    { name: "Train", count: 10 }
  ],
  turns: 16
};

// ─── Math ───────────────────────────────────────────────────────────────────
function logComb(n, r) {
  if (r > n || r < 0) return -Infinity;
  if (r === 0 || r === n) return 0;
  r = Math.min(r, n - r);
  let v = 0;
  for (let i = 0; i < r; i++) v += Math.log(n - i) - Math.log(i + 1);
  return v;
}

function hyperPMF(N, K, n, x) {
  const lp = logComb(K, x) + logComb(N - K, n - x) - logComb(N, n);
  return lp === -Infinity ? 0 : Math.exp(lp);
}

// P(X = x) drawing n from N with K successes
function hyperDist(N, K, n) {
  const dist = [];
  const maxX = Math.min(K, n);
  for (let x = 0; x <= maxX; x++) dist.push({ x, p: hyperPMF(N, K, n, x) });
  return dist;
}

function pAtLeast1(N, K, n) {
  return 1 - hyperPMF(N, K, n, 0);
}

function expectedVal(N, K, n) {
  return (n * K) / N;
}

// ─── Totals ──────────────────────────────────────────────────────────────────
function totalObj() {
  return state.objTypes.reduce((s, t) => s + t.count, 0);
}
function totalAct() {
  return state.actTypes.reduce((s, t) => s + t.count, 0);
}
function totalDeck() {
  return state.chars + totalObj() + totalAct();
}

// ─── Render sidebar ──────────────────────────────────────────────────────────
function renderTypeList(listId, types, key) {
  const el = document.getElementById(listId);
  el.innerHTML = "";
  types.forEach((t, i) => {
    const color = key === "obj" ? "var(--obj-color)" : "var(--act-color)";
    const row = document.createElement("div");
    row.className = "type-item";
    row.innerHTML = `
      <span class="color-pip" style="background:${color};flex-shrink:0"></span>
      <input class="type-name-input" value="${t.name}" placeholder="Type name"
        oninput="state.${key}Types[${i}].name=this.value; update()"/>
      <div class="num-input" style="flex-shrink:0">
        <button onclick="adjType('${key}',${i},-1)">−</button>
        <input type="number" value="${t.count}" min="0" max="30"
          oninput="state.${key}Types[${i}].count=Math.max(0,parseInt(this.value)||0); update()"
          style="width:28px"/>
        <button onclick="adjType('${key}',${i},1)">+</button>
      </div>
      <button class="type-del" onclick="delType('${key}',${i})">×</button>
    `;
    el.appendChild(row);
  });
}

function addType(key) {
  const names = {
    obj: ["obj1", "obj2", "obj3", "obj4", "obj5"],
    act: ["act1", "act2", "act3", "act4", "act5"]
  };
  const arr = state[key + "Types"];
  const name = names[key][arr.length % names[key].length] || "New type";
  arr.push({ name, count: 2 });
  renderTypeList(key + "Types", arr, key);
  update();
}

function delType(key, i) {
  state[key + "Types"].splice(i, 1);
  renderTypeList(key + "Types", state[key + "Types"], key);
  update();
}

function adjType(key, i, delta) {
  state[key + "Types"][i].count = Math.max(
    0,
    state[key + "Types"][i].count + delta
  );
  renderTypeList(key + "Types", state[key + "Types"], key);
  update();
}

function adj(field, delta) {
  state[field] = Math.max(1, (state[field] || 0) + delta);
  document.getElementById(field).value = state[field];
  update();
}

// ─── Prob card builder ───────────────────────────────────────────────────────
function pct(p) {
  return (p * 100).toFixed(1) + "%";
}
function fmtExp(v) {
  return v.toFixed(2);
}

function makeProbCard(name, typeLabel, color, dist, N, K, n, inTarget) {
  const p1 = pAtLeast1(N, K, n);
  const exp = expectedVal(N, K, n);
  const card = document.createElement("div");
  card.className = "prob-card";

  // breakdown: P(exactly x)
  let breakdownHTML = "";
  const maxShow = Math.min(dist.length - 1, 5);
  for (let i = 0; i <= maxShow; i++) {
    const label =
      i === maxShow && dist.length - 1 > maxShow ? `${i}+` : `exactly ${i}`;
    breakdownHTML += `<div class="prob-breakdown-row"><span>${label}</span><span>${pct(
      dist[i]?.p || 0
    )}</span></div>`;
  }

  card.innerHTML = `
    <div class="prob-card-header">
      <span class="color-pip" style="background:${color}"></span>
      <div>
        <div class="prob-card-type">${typeLabel}</div>
        <div class="prob-card-name">${name}</div>
      </div>
    </div>
    <div class="prob-main" style="color:${color}">${pct(p1)}</div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:8px;">chance of drawing ≥ 1</div>
    <div class="prob-bar-wrap"><div class="prob-bar-fill" style="width:${
      p1 * 100
    }%;background:${color}"></div></div>
    <div class="prob-values">
      <span>${K} in deck</span>
      <span>~${fmtExp(exp)} expected</span>
    </div>
    <div class="prob-breakdown">${breakdownHTML}</div>
  `;
  return card;
}

// ─── Distribution bar chart ──────────────────────────────────────────────────
function makeDistChart(name, color, dist, targetMin, targetMax) {
  const maxP = Math.max(...dist.map((d) => d.p), 0.001);

  let bars = dist
    .map((d) => {
      const inRange = d.x >= targetMin && d.x <= targetMax;
      const h = Math.round((d.p / maxP) * 130);
      const tip = `${d.x} cards: ${pct(d.p)}`;
      return `<div class="bar-col">
      <div class="bar-fill ${inRange ? "bar-in-range" : ""}"
        style="height:${h}px;background:${inRange ? color : "var(--surface3)"}"
        data-tip="${tip}"></div>
      <div class="bar-label">${d.x}</div>
    </div>`;
    })
    .join("");

  const targetP = dist
    .filter((d) => d.x >= targetMin && d.x <= targetMax)
    .reduce((s, d) => s + d.p, 0);
  const expVal = dist.reduce((s, d) => s + d.x * d.p, 0);

  return `
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;">
      <div style="font-family:var(--font-display);font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px;">
        <span class="color-pip" style="background:${color}"></span>${name}
      </div>
      <div style="font-size:11px;color:var(--muted);">
        P(${targetMin}–${targetMax}) = <span style="color:${color};font-weight:500">${pct(
    targetP
  )}</span>
        &nbsp;·&nbsp; expected <span style="color:var(--text)">${expVal.toFixed(
          1
        )}</span>
      </div>
    </div>
    <div class="bar-chart-inner">${bars}</div>
    <div class="chart-legend">
      <span><span class="legend-box" style="background:${color};opacity:0.4;outline:1px solid ${color};outline-offset:1px"></span>in target range</span>
      <span><span class="legend-box" style="background:var(--surface3)"></span>out of range</span>
    </div>
  `;
}

// ─── Hand visualizer ─────────────────────────────────────────────────────────
function renderHandVis() {
  const el = document.getElementById("handVis");
  const icons = { char: "⚔", obj: "🛡", act: "✦" };
  el.innerHTML = `
    <div class="card-slot char-slot">
      <div class="card-type-badge" style="color:var(--char-color)">character</div>
      <div class="card-icon">⚔</div>
      <div class="card-name">chosen by player</div>
    </div>
    ${[1, 2, 3, 4]
      .map(
        (i) => `
      <div class="card-slot">
        <div class="card-type-badge" style="color:var(--muted)">random draw</div>
        <div class="card-icon" style="font-size:16px;color:var(--dim)">?</div>
        <div class="card-name" style="color:var(--muted)">slot ${i}</div>
      </div>
    `
      )
      .join("")}
  `;
}

// ─── Main update ─────────────────────────────────────────────────────────────
function update() {
  // sync inputs
  state.chars = parseInt(document.getElementById("chars").value) || 1;
  state.turns = parseInt(document.getElementById("turnsSlider").value) || 16;

  const N_full = totalDeck();
  const objTotal = totalObj();
  const actTotal = totalAct();

  // deck status bar
  const dt = document.getElementById("deckTotal");
  dt.innerHTML = `${N_full} <span class="of50">/ 50</span>`;
  dt.className =
    "deck-total" + (N_full > 50 ? " over" : N_full === 50 ? " exact" : "");
  document.getElementById("barChar").style.width =
    (state.chars / N_full) * 100 + "%";
  document.getElementById("barObj").style.width =
    (objTotal / N_full) * 100 + "%";
  document.getElementById("barAct").style.width =
    (actTotal / N_full) * 100 + "%";
  document.getElementById("countChar").textContent = state.chars;
  document.getElementById("countObj").textContent = objTotal;
  document.getElementById("countAct").textContent = actTotal;

  document.getElementById(
    "mainSub"
  ).textContent = `${N_full} cards total · ${state.chars} characters · ${objTotal} objects (${state.objTypes.length} types) · ${actTotal} actions (${state.actTypes.length} types)`;

  const warn = document.getElementById("warnBanner");
  warn.className = "warn-banner" + (N_full !== 50 ? " show" : "");

  // ── Starting hand ──
  // Player picks 1 char. Remaining deck: N_full - 1 cards, state.chars - 1 chars, all obj/act unchanged.
  const N_rem = N_full - 1;
  const K_char_rem = state.chars - 1; // chars left after picking 1
  const n_start = 4; // 4 random draws

  const startGrid = document.getElementById("startingGrid");
  startGrid.innerHTML = "";

  // Characters remaining
  {
    const dist = hyperDist(N_rem, K_char_rem, n_start);
    startGrid.appendChild(
      makeProbCard(
        "Characters (more)",
        "character",
        "var(--char-color)",
        dist,
        N_rem,
        K_char_rem,
        n_start
      )
    );
  }
  // Object types
  state.objTypes.forEach((t) => {
    if (t.count === 0) return;
    const dist = hyperDist(N_rem, t.count, n_start);
    startGrid.appendChild(
      makeProbCard(
        t.name,
        "object",
        "var(--obj-color)",
        dist,
        N_rem,
        t.count,
        n_start
      )
    );
  });
  // Action types
  state.actTypes.forEach((t) => {
    if (t.count === 0) return;
    const dist = hyperDist(N_rem, t.count, n_start);
    startGrid.appendChild(
      makeProbCard(
        t.name,
        "action",
        "var(--act-color)",
        dist,
        N_rem,
        t.count,
        n_start
      )
    );
  });

  // ── After N turns ──
  // Total cards seen = 1 (chosen char) + 4 (start) + turns (1/turn) = 5 + turns
  // Random draws from N_rem = 4 + turns
  const n_turns = 4 + state.turns;
  const n_draw_rand = Math.min(n_turns, N_rem);

  const turnsWrap = document.getElementById("turnsGridWrap");
  turnsWrap.innerHTML = "";

  // Characters
  {
    const dist = hyperDist(N_rem, K_char_rem, n_draw_rand);
    const fullDist = dist.map((d) => ({ x: d.x + 1, p: d.p })); // +1 for chosen char
    const wrap = document.createElement("div");
    wrap.className = "dist-section";
    const cw = document.createElement("div");
    cw.className = "chart-wrap";
    cw.innerHTML = makeDistChart(
      "Characters",
      "var(--char-color)",
      fullDist,
      5,
      10
    );
    const t = document.createElement("div");
    t.className = "section-title";
    t.style.marginBottom = "8px";
    t.textContent = "Characters";
    const d = document.createElement("div");
    d.className = "section-desc";
    d.textContent = `Includes the 1 chosen character + random draws. Target: 5–10 total.`;
    wrap.appendChild(t);
    wrap.appendChild(d);
    wrap.appendChild(cw);
    turnsWrap.appendChild(wrap);
  }

  // Objects grouped
  if (state.objTypes.some((t) => t.count > 0)) {
    const t = document.createElement("div");
    t.className = "section-title";
    t.style.cssText = "margin-bottom:4px;margin-top:24px";
    t.textContent = "Object types";
    turnsWrap.appendChild(t);
    const grid = document.createElement("div");
    grid.className = "prob-grid";
    state.objTypes.forEach((type) => {
      if (type.count === 0) return;
      const dist = hyperDist(N_rem, type.count, n_draw_rand);
      grid.appendChild(
        makeProbCard(
          type.name,
          "object",
          "var(--obj-color)",
          dist,
          N_rem,
          type.count,
          n_draw_rand,
          false
        )
      );
    });
    turnsWrap.appendChild(grid);
  }

  // Actions grouped
  if (state.actTypes.some((t) => t.count > 0)) {
    const t = document.createElement("div");
    t.className = "section-title";
    t.style.cssText = "margin-bottom:4px;margin-top:24px";
    t.textContent = "Action types";
    turnsWrap.appendChild(t);
    const grid = document.createElement("div");
    grid.className = "prob-grid";
    state.actTypes.forEach((type) => {
      if (type.count === 0) return;
      const dist = hyperDist(N_rem, type.count, n_draw_rand);
      grid.appendChild(
        makeProbCard(
          type.name,
          "action",
          "var(--act-color)",
          dist,
          N_rem,
          type.count,
          n_draw_rand,
          false
        )
      );
    });
    turnsWrap.appendChild(grid);
  }

  // ── Summary table ──
  const tbody = document.getElementById("summaryBody");
  tbody.innerHTML = "";

  const rows = [
    {
      name: "Characters (total)",
      color: "var(--char-color)",
      K_s: K_char_rem,
      K_t: K_char_rem,
      offset: 1
    },
    ...state.objTypes
      .filter((t) => t.count > 0)
      .map((t) => ({
        name: t.name,
        color: "var(--obj-color)",
        K_s: t.count,
        K_t: t.count,
        offset: 0
      })),
    ...state.actTypes
      .filter((t) => t.count > 0)
      .map((t) => ({
        name: t.name,
        color: "var(--act-color)",
        K_s: t.count,
        K_t: t.count,
        offset: 0
      }))
  ];

  rows.forEach((r) => {
    const p1s = pAtLeast1(N_rem, r.K_s, n_start);
    const exs = expectedVal(N_rem, r.K_s, n_start) + r.offset;
    const p1t = pAtLeast1(N_rem, r.K_t, n_draw_rand);
    const ext = expectedVal(N_rem, r.K_t, n_draw_rand) + r.offset;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span style="display:flex;align-items:center;gap:8px;">
        <span class="color-pip" style="background:${r.color}"></span>${r.name}
      </span></td>
      <td>${r.K_s + (r.offset > 0 ? " + 1 chosen" : "")}</td>
      <td><span style="color:${r.color};font-weight:500">${pct(p1s)}</span></td>
      <td>${exs.toFixed(2)}</td>
      <td><span style="color:${r.color};font-weight:500">${pct(p1t)}</span></td>
      <td>${ext.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  renderHandVis();
  renderTypeList("objTypes", state.objTypes, "obj");
  renderTypeList("actTypes", state.actTypes, "act");
}

function switchTab(name) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  event.target.classList.add("active");
}

// Init
update();