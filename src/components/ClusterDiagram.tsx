"use client";

import { useEffect, useRef } from "react";

/**
 * Multi-scale GPU visualization — a "Powers of Ten" for silicon.
 *
 * A single distributed training step runs on ONE global clock:
 *
 *   COMPUTE     forward pass  ·  ALL-REDUCE  gradients converge
 *   BROADCAST   result fans out  ·  SYNC     settle, next step
 *
 * The camera auto-cycles through four altitudes of the real hardware, and each
 * level visualizes its slice of that same step — so the whole thing reads as
 * one coherent machine seen at four depths, not four separate animations:
 *
 *   L-1 DATACENTER   a hall of racks; your one rack lit gold, neighbors dark
 *   L0  FABRIC       NVL72: 18 trays all-reducing against the NVSwitch
 *   L1  PACKAGE      one Blackwell GPU: die + 8 HBM stacks feeding it
 *   L2  DIE          the SM grid; a matmul tile sweeps the tensor cores
 *
 * Transitions are shared-element morphs: the focus sub-rect of one level scales
 * up to become the full frame of the next, so the eye is "pushed into" the
 * element it was looking at. The telemetry HUD reframes its labels + values per
 * level, while the phase indicator stays continuous across all of them.
 *
 * Pure Canvas 2D, zero dependencies. Respects prefers-reduced-motion.
 */

// shared virtual frame — all levels draw into this, so morphs line up
const W = 520;
const H = 560;

// ---- training-step clock (shared across every level) ----
const T_CYCLE = 7.0;
const T_FWD_END = 2.0;
const T_REDUCE = 3.6;
const T_BCAST = 4.0;
const T_SETTLE = 5.3;

const COL = {
  ink: "#08070a",
  raised: "#0e0d11",
  rule: "rgba(236,233,227,0.10)",
  ruleStrong: "rgba(236,233,227,0.18)",
  faint: "#625f58",
  dim: "#9b978d",
  gold: "#e3a72c",
  bright: "#f4c560",
};

const gauss = (x: number, s: number) => Math.exp(-(x * x) / (2 * s * s));
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

type Rect = { x: number; y: number; w: number; h: number };

type Phase = "COMPUTE" | "ALL-REDUCE" | "BROADCAST" | "SYNC";
type Step = {
  cycle: number;
  phase: Phase;
  busy: number; // 0..1 global activity
  flare: number; // 0..1 reduce flare at the hub
  active: boolean; // is the fabric moving data right now
};

function stepState(cycle: number): Step {
  let busy: number;
  if (cycle < T_FWD_END) busy = 0.25;
  else if (cycle < T_SETTLE) busy = 0.9;
  else busy = lerp(0.9, 0.25, clamp01((cycle - T_SETTLE) / (T_CYCLE - T_SETTLE)));

  const phase: Phase =
    cycle < T_FWD_END
      ? "COMPUTE"
      : cycle < T_BCAST
      ? "ALL-REDUCE"
      : cycle < T_SETTLE
      ? "BROADCAST"
      : "SYNC";

  const flare = gauss(cycle - (T_REDUCE + 0.2), 0.34);
  return {
    cycle,
    phase,
    busy,
    flare,
    active: phase === "ALL-REDUCE" || phase === "BROADCAST",
  };
}

// ---- HUD spec returned by each level renderer ----
type Sim = {
  title: string; // HUD section title + aria
  metrics: [string, string][]; // [label, value] × 4
  spark: number; // 0..1 headline metric for the sparkline
};

// =====================================================================
// FABRIC (L0) — the original NVL72 view, ported
// =====================================================================
const SPINE = W / 2;
const TOP = 56;
const PER_COL = 9;
const TRAYS = PER_COL * 2;
const ROW_GAP = (H - TOP - 40) / (PER_COL - 1);
const COL_OFFSET = 150;
const TRAY_W = 92;
const TRAY_H = 18;
const SW = { x: SPINE - 30, y: H / 2 - 34, w: 60, h: 68 };
const SWITCH_TOP = SW.y;
const SWITCH_BOTTOM = SW.y + SW.h;
const PULSE_V = 320;

type Tray = {
  i: number;
  left: boolean;
  attachX: number;
  rectX: number;
  y: number;
  enterY: number;
  L1: number;
  L2: number;
  L: number;
  dur: number;
  util: number;
  temp: number;
};

function buildTrays(): Tray[] {
  return Array.from({ length: TRAYS }, (_, i) => {
    const left = i < PER_COL;
    const y = TOP + (i % PER_COL) * ROW_GAP;
    const attachX = left ? SPINE - COL_OFFSET : SPINE + COL_OFFSET;
    const rectX = left ? attachX - TRAY_W : attachX;
    const enterY = y < H / 2 ? SWITCH_TOP : SWITCH_BOTTOM;
    const L1 = COL_OFFSET;
    const L2 = Math.abs(y - enterY);
    const L = L1 + L2;
    return { i, left, attachX, rectX, y, enterY, L1, L2, L, dur: L / PULSE_V, util: 0.18, temp: 40 };
  });
}

function trayPathPoint(t: Tray, s: number): [number, number] {
  if (s <= t.L1) {
    const k = s / t.L1;
    return [t.attachX + (SPINE - t.attachX) * k, t.y];
  }
  const k = (s - t.L1) / Math.max(t.L2, 0.0001);
  return [SPINE, t.y + (t.enterY - t.y) * k];
}

// the GPU on this tray we drill into (center-left tray, first GPU)
const FOCUS_TRAY = 3; // 0-indexed within left column → near vertical center
function fabricFocusRect(trays: Tray[]): Rect {
  const t = trays[FOCUS_TRAY];
  // first GPU cell of that tray
  return { x: t.rectX + 10, y: t.y - 4, w: 12, h: 8 };
}

// =====================================================================
// Component
// =====================================================================
export default function ClusterDiagram() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkRef = useRef<HTMLCanvasElement | null>(null);

  const titleRef = useRef<HTMLSpanElement | null>(null);
  const phaseRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const lab0 = useRef<HTMLSpanElement | null>(null);
  const lab1 = useRef<HTMLSpanElement | null>(null);
  const lab2 = useRef<HTMLSpanElement | null>(null);
  const lab3 = useRef<HTMLSpanElement | null>(null);
  const val0 = useRef<HTMLSpanElement | null>(null);
  const val1 = useRef<HTMLSpanElement | null>(null);
  const val2 = useRef<HTMLSpanElement | null>(null);
  const val3 = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rootEl = rootRef.current;
    const stageEl = stageRef.current;
    if (!canvas || !rootEl || !stageEl) return;
    const root = rootEl;
    const stage = stageEl;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    // `ctx` is reassignable so transitions can redirect the renderers to an
    // offscreen buffer (the renderers set globalAlpha internally, so the only way
    // to truly fade a whole level is to render it opaque then blit it faded).
    let ctx = ctx2d;
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- shared state ----
    const trays = buildTrays();
    const flash = new Float32Array(TRAYS);
    const spark: number[] = [];
    // per-SM occupancy for the die level
    const SM_COLS = 16;
    const SM_ROWS = 9;
    const SMS = SM_COLS * SM_ROWS;
    const smHeat = new Float32Array(SMS);
    // HBM stack activity for the package level
    const hbm = new Float32Array(8);

    let scale = 1;
    let cssW = 0;
    // resizing the canvas backing store clears it; in the static (reduced-motion)
    // path nothing repaints afterward, so let resize trigger a redraw.
    let onResized: (() => void) | null = null;

    let dpr = 1;
    const resize = () => {
      cssW = stage.clientWidth || 420;
      const cssH = (cssW * H) / W;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const cv of [canvas, off]) {
        cv.width = Math.round(cssW * dpr);
        cv.height = Math.round(cssH * dpr);
      }
      canvas.style.height = `${cssH}px`;
      scale = cssW / W;
      ctx2d.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      octx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      onResized?.();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    // ---- parallax tilt ----
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    const onMove = (e: MouseEvent) => {
      const rr = root.getBoundingClientRect();
      const nx = (e.clientX - rr.left) / rr.width - 0.5;
      const ny = (e.clientY - rr.top) / rr.height - 0.5;
      targetTiltY = nx * 6;
      targetTiltX = -ny * 4;
    };
    const onLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };
    if (!reduced) {
      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", onLeave);
    }

    const setFont = (px: number, weight = "") => {
      ctx.font = `${weight}${px}px "JetBrains Mono", ui-monospace, monospace`;
    };

    // ---- small shared drawing helpers ----
    const glowDot = (x: number, y: number, r: number, a: number, color = COL.bright) => {
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = color;
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    // =================================================================
    // LEVEL RENDERERS  — each draws into the full W×H frame, returns Sim
    // =================================================================

    // ---- L-1 DATACENTER — the Abu Dhabi hall: 64× GB300 NVL72 racks ----
    const DC_COLS = 8;
    const DC_ROWS = 8;
    const DC_OWNED = 27; // index of the lit, owned rack
    const dcRackRect = (idx: number): Rect => {
      const gx = 70;
      const gy = 70;
      const cw = (W - gx * 2) / DC_COLS;
      const ch = (H - gy * 2) / DC_ROWS;
      const c = idx % DC_COLS;
      const r = Math.floor(idx / DC_COLS);
      const pad = 8;
      return { x: gx + c * cw + pad, y: gy + r * ch + pad, w: cw - pad * 2, h: ch - pad * 2 };
    };

    function drawDatacenter(step: Step): Sim {
      // floor grid
      ctx.strokeStyle = COL.rule;
      ctx.lineWidth = 1;
      for (let gx = 40; gx < W - 30; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 40);
        ctx.lineTo(gx, H - 40);
        ctx.stroke();
      }

      for (let i = 0; i < DC_COLS * DC_ROWS; i++) {
        const r = dcRackRect(i);
        const owned = i === DC_OWNED;
        const pulse = owned ? 0.5 + 0.5 * step.busy : 0;
        ctx.fillStyle = COL.raised;
        ctx.globalAlpha = owned ? 1 : 0.5;
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.strokeStyle = owned ? COL.gold : COL.ruleStrong;
        ctx.lineWidth = owned ? 1.4 : 1;
        ctx.strokeRect(r.x, r.y, r.w, r.h);

        // rack unit slits
        const units = 5;
        for (let u = 0; u < units; u++) {
          const uy = r.y + 6 + u * ((r.h - 12) / (units - 1));
          if (owned) {
            const a = clamp01(0.3 + pulse * 0.7 + 0.2 * Math.sin(step.cycle * 4 + u));
            ctx.globalAlpha = a;
            ctx.fillStyle = pulse > 0.6 ? COL.bright : COL.gold;
          } else {
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = COL.faint;
          }
          ctx.fillRect(r.x + 5, uy, r.w - 10, 2.5);
        }
        ctx.globalAlpha = 1;

        if (owned) {
          // halo
          ctx.save();
          ctx.shadowColor = COL.gold;
          ctx.shadowBlur = 18 * (0.4 + pulse);
          ctx.strokeStyle = COL.gold;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(r.x, r.y, r.w, r.h);
          ctx.restore();
          // label
          setFont(7);
          ctx.fillStyle = COL.bright;
          ctx.textAlign = "center";
          ctx.fillText("YOUR RACK", r.x + r.w / 2, r.y - 4);
        }
      }
      ctx.textAlign = "left";

      annotate("FIG.00 — FACILITY", "64 RACK · GB300 NVL72");
      return {
        title: "Hall · datacenter",
        metrics: [
          ["racks", "64"],
          ["draw", `${(7.8 + step.busy * 0.9).toFixed(1)} MW`],
          ["pue", "1.12"],
          ["region", "abu dhabi"],
        ],
        spark: step.busy * 0.4,
      };
    }

    // ---- L0 FABRIC ----
    function drawFabric(step: Step): Sim {
      const { cycle } = step;
      const waveY = TOP + (cycle / T_FWD_END) * (H - TOP - 30);

      // spine
      ctx.strokeStyle = COL.ruleStrong;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(SPINE, TOP - 26);
      ctx.lineTo(SPINE, H - 30);
      ctx.stroke();

      // links
      for (const t of trays) {
        ctx.strokeStyle = "rgba(227,167,44,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.attachX, t.y);
        ctx.lineTo(SPINE, t.y);
        ctx.lineTo(SPINE, t.enterY);
        ctx.stroke();
      }

      let inflight = 0;
      let utilSum = 0;
      let tempSum = 0;

      for (const t of trays) {
        const fwd = cycle < T_FWD_END ? gauss(t.y - waveY, 42) : 0;
        const target = 0.18 + Math.max(fwd, step.busy) * 0.77 + flash[t.i] * 0.25;
        t.util += (Math.min(target, 1) - t.util) * 0.14;
        const tempTarget = 40 + t.util * 42;
        t.temp += (tempTarget - t.temp) * 0.02;
        utilSum += t.util;
        tempSum += t.temp;

        ctx.fillStyle = COL.raised;
        ctx.strokeStyle = COL.ruleStrong;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(t.rectX, t.y - TRAY_H / 2, TRAY_W, TRAY_H);
        ctx.fill();
        ctx.stroke();

        for (let g = 0; g < 4; g++) {
          const gx = t.rectX + 10 + g * 19;
          const heat = clamp01(t.util + flash[t.i] * 0.5);
          const shimmer = 0.04 * Math.sin(cycle * 5 + (t.i * 4 + g));
          const a = clamp01(0.28 + heat * 0.72 + shimmer);
          ctx.globalAlpha = a;
          ctx.fillStyle = heat > 0.78 ? COL.bright : COL.gold;
          if (heat > 0.85) {
            ctx.shadowColor = COL.bright;
            ctx.shadowBlur = 6;
          }
          ctx.fillRect(gx, t.y - 4, 12, 8);
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
        flash[t.i] *= 0.9;
      }

      const drawComet = (t: Tray, s: number, intensity: number) => {
        const steps = 5;
        for (let k = steps; k >= 0; k--) {
          const ss = Math.max(0, Math.min(t.L, s - k * 6));
          const [x, y] = trayPathPoint(t, ss);
          const a = intensity * (1 - k / (steps + 1));
          if (k === 0) glowDot(x, y, 2.4, a);
          else {
            ctx.fillStyle = COL.gold;
            ctx.globalAlpha = a * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, 1.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      };

      for (const t of trays) {
        const startIn = T_REDUCE - t.dur;
        if (cycle >= startIn && cycle <= T_REDUCE) {
          drawComet(t, ((cycle - startIn) / t.dur) * t.L, 0.95);
          inflight++;
        }
        const arriveOut = T_BCAST + t.dur;
        if (cycle >= T_BCAST && cycle <= arriveOut) {
          const q = (cycle - T_BCAST) / t.dur;
          drawComet(t, (1 - q) * t.L, 0.9);
          inflight++;
          if (q > 0.98) flash[t.i] = 1;
        }
      }

      // NVSwitch
      if (step.flare > 0.02) {
        ctx.save();
        ctx.shadowColor = COL.bright;
        ctx.shadowBlur = 30 * step.flare;
        ctx.strokeStyle = COL.bright;
        ctx.globalAlpha = clamp01(0.4 + step.flare);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(SW.x, SW.y, SW.w, SW.h);
        ctx.restore();
      }
      ctx.fillStyle = COL.ink;
      ctx.fillRect(SW.x, SW.y, SW.w, SW.h);
      ctx.strokeStyle = step.flare > 0.1 ? COL.bright : COL.gold;
      ctx.lineWidth = 1.25;
      ctx.strokeRect(SW.x, SW.y, SW.w, SW.h);
      setFont(9);
      ctx.textAlign = "center";
      ctx.fillStyle = COL.bright;
      ctx.fillText("NV", SPINE, H / 2 - 6);
      ctx.fillText("SWITCH", SPINE, H / 2 + 8);
      setFont(7);
      ctx.fillStyle = COL.faint;
      ctx.fillText("130 TB/s", SPINE, H / 2 + 24);
      ctx.textAlign = "left";

      annotate("FIG.01 — NVL72 FABRIC", "72 GPU · 18 TRAY · 1 DOMAIN");

      const util = utilSum / TRAYS;
      const fabric = 6 + (inflight / 18) * 124;
      return {
        title: "NVL72 · fabric",
        metrics: [
          ["util", `${Math.round(util * 100)}%`],
          ["fabric", `${fabric.toFixed(0)} TB/s`],
          ["power", `${(34 + util * 100).toFixed(0)} kW`],
          ["temp", `${Math.round(tempSum / TRAYS)}°C`],
        ],
        spark: util,
      };
    }

    // ---- L1 PACKAGE — one Blackwell GPU: die + 8 HBM stacks ----
    const PKG = { x: 110, y: 120, w: 300, h: 320 };
    const DIE = { x: PKG.x + 70, y: PKG.y + 60, w: 160, h: 200 };
    function drawPackage(step: Step): Sim {
      // substrate
      ctx.fillStyle = COL.raised;
      ctx.strokeStyle = COL.ruleStrong;
      ctx.lineWidth = 1;
      ctx.fillRect(PKG.x, PKG.y, PKG.w, PKG.h);
      ctx.strokeRect(PKG.x, PKG.y, PKG.w, PKG.h);

      // HBM stacks: 4 left, 4 right of the die — mirrored about the die centre so
      // both columns sit the same distance from the die AND from the package edge.
      const stackH = 38;
      const gap = 8;
      const sw = 52;
      const edgeGap = 14; // package edge → outer stack edge (both sides)
      const colY = DIE.y + (DIE.h - (stackH * 4 + gap * 3)) / 2;
      for (let s = 0; s < 8; s++) {
        const left = s < 4;
        const row = s % 4;
        const sx = left ? PKG.x + edgeGap : PKG.x + PKG.w - edgeGap - sw;
        const sy = colY + row * (stackH + gap);

        // memory traffic: HBM feeds the die during compute, drains on reduce
        const want = step.phase === "COMPUTE" ? 0.85 : step.busy * 0.6;
        hbm[s] += (want * (0.6 + 0.4 * Math.sin(step.cycle * 6 + s)) - hbm[s]) * 0.1;
        const act = clamp01(hbm[s]);

        ctx.fillStyle = COL.ink;
        ctx.fillRect(sx, sy, sw, stackH);
        ctx.strokeStyle = COL.ruleStrong;
        ctx.strokeRect(sx, sy, sw, stackH);
        // stacked dram layers
        for (let l = 0; l < 4; l++) {
          ctx.globalAlpha = clamp01(0.3 + act * 0.7);
          ctx.fillStyle = act > 0.7 ? COL.bright : COL.gold;
          ctx.fillRect(sx + 4, sy + 4 + l * 8, sw - 8, 5);
        }
        ctx.globalAlpha = 1;

        // bus from stack → die edge
        const busY = sy + stackH / 2;
        const dieEdge = left ? DIE.x : DIE.x + DIE.w;
        const stackEdge = left ? sx + sw : sx;
        ctx.strokeStyle = "rgba(227,167,44,0.18)";
        ctx.beginPath();
        ctx.moveTo(stackEdge, busY);
        ctx.lineTo(dieEdge, busY);
        ctx.stroke();
        // moving byte
        const dir = step.phase === "COMPUTE" ? 1 : -1; // into die vs out
        const tt = (step.cycle * 0.9 + s * 0.13) % 1;
        const q = dir > 0 ? tt : 1 - tt;
        const bx = lerp(stackEdge, dieEdge, q);
        glowDot(bx, busY, 1.6, act * 0.9);
      }

      // the die (dual reticle)
      ctx.fillStyle = "#100d08";
      ctx.fillRect(DIE.x, DIE.y, DIE.w, DIE.h);
      ctx.strokeStyle = COL.gold;
      ctx.lineWidth = 1.4;
      ctx.strokeRect(DIE.x, DIE.y, DIE.w, DIE.h);
      // reticle seam
      ctx.strokeStyle = COL.ruleStrong;
      ctx.beginPath();
      ctx.moveTo(DIE.x + DIE.w / 2, DIE.y);
      ctx.lineTo(DIE.x + DIE.w / 2, DIE.y + DIE.h);
      ctx.stroke();
      // die compute shimmer — grid centred within the die in both axes
      const dieHeat = step.phase === "COMPUTE" ? 0.9 : step.busy * 0.5;
      const cell = 16;
      const cstep = 23; // cell + gap
      const gcols = 6;
      const grows = 8;
      const gx0 = DIE.x + (DIE.w - ((gcols - 1) * cstep + cell)) / 2;
      const gy0 = DIE.y + (DIE.h - ((grows - 1) * cstep + cell)) / 2;
      for (let r = 0; r < grows; r++) {
        for (let c = 0; c < gcols; c++) {
          const a = clamp01(0.15 + dieHeat * (0.4 + 0.5 * Math.sin(step.cycle * 5 + r + c)));
          ctx.globalAlpha = a;
          ctx.fillStyle = a > 0.6 ? COL.bright : COL.gold;
          ctx.fillRect(gx0 + c * cstep, gy0 + r * cstep, cell, cell);
        }
      }
      ctx.globalAlpha = 1;
      setFont(8);
      ctx.fillStyle = COL.bright;
      ctx.textAlign = "center";
      ctx.fillText("B300 DIE", DIE.x + DIE.w / 2, DIE.y + DIE.h + 16);
      ctx.fillStyle = COL.faint;
      setFont(7);
      ctx.fillText("8× HBM3e · 288 GB", DIE.x + DIE.w / 2, PKG.y + PKG.h - 10);
      ctx.textAlign = "left";

      annotate("FIG.02 — BLACKWELL ULTRA PACKAGE", "1 GPU · 8 STACK · 288 GB");

      const bw = step.phase === "COMPUTE" ? 7.4 + step.busy * 0.6 : 2 + step.busy * 3;
      return {
        title: "B300 · package",
        metrics: [
          ["hbm bw", `${bw.toFixed(1)} TB/s`],
          ["vram", `${(205 + step.busy * 65).toFixed(0)} GB`],
          ["clock", `${(1.86 + step.busy * 0.12).toFixed(2)} GHz`],
          ["temp", `${Math.round(58 + step.busy * 18)}°C`],
        ],
        spark: clamp01(bw / 8),
      };
    }

    // ---- L2 DIE — SM grid, matmul tile sweeps the tensor cores ----
    const GRID = { x: 70, y: 80, w: W - 140, h: H - 200 };
    function drawDie(step: Step): Sim {
      const cw = GRID.w / SM_COLS;
      const ch = GRID.h / SM_ROWS;

      // Systolic matmul wavefronts sweep the grid CONTINUOUSLY — at this zoom the
      // tensor cores never idle. The diagonal `span` is 0..(SM_COLS+SM_ROWS); we
      // run an integer number of passes per training cycle so the wrap at cycle end
      // is seamless, and measure distance toroidally so a front re-enters from the
      // opposite corner without a pop. The training phase only modulates how hot
      // the wave burns (it breathes with the step), it never stops the motion.
      const span = SM_COLS + SM_ROWS;
      const PASSES = 3; // integer ⇒ seamless loop across the 7s cycle
      const sweep = ((step.cycle / T_CYCLE) * span * PASSES) % span;
      const intensity = 0.55 + 0.45 * step.busy;

      let activeCount = 0;
      for (let r = 0; r < SM_ROWS; r++) {
        for (let c = 0; c < SM_COLS; c++) {
          const i = r * SM_COLS + c;
          // toroidal distance to the wavefront so the wrap is seamless
          const dc = c + r - sweep;
          const d = Math.min(Math.abs(dc), Math.abs(dc + span), Math.abs(dc - span));
          const target = gauss(d, 2.0) * intensity;
          smHeat[i] += (target - smHeat[i]) * 0.2;
          const a = clamp01(0.12 + smHeat[i]);
          if (smHeat[i] > 0.4) activeCount++;

          const x = GRID.x + c * cw;
          const y = GRID.y + r * ch;
          ctx.fillStyle = COL.raised;
          ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
          ctx.globalAlpha = a;
          ctx.fillStyle = smHeat[i] > 0.6 ? COL.bright : COL.gold;
          if (smHeat[i] > 0.7) {
            ctx.shadowColor = COL.bright;
            ctx.shadowBlur = 5;
          }
          ctx.fillRect(x + 2, y + 2, cw - 4, ch - 4);
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          // tensor-core texture: tiny inner cross on hot SMs
          if (smHeat[i] > 0.5) {
            ctx.strokeStyle = COL.ink;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(x + cw / 2, y + 3);
            ctx.lineTo(x + cw / 2, y + ch - 3);
            ctx.moveTo(x + 3, y + ch / 2);
            ctx.lineTo(x + cw - 3, y + ch / 2);
            ctx.stroke();
          }
        }
      }

      // grid frame
      ctx.strokeStyle = COL.gold;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(GRID.x, GRID.y, GRID.w, GRID.h);

      annotate("FIG.03 — GB-DIE · SM ARRAY", `${SMS} SM · TENSOR CORE`);

      const occ = activeCount / SMS;
      return {
        title: "GB-die · compute",
        metrics: [
          ["tflops", `${(900 + occ * 1300).toFixed(0)}`],
          ["sm active", `${Math.round(occ * 100)}%`],
          ["occupancy", `${Math.round(40 + occ * 55)}%`],
          ["clock", `${(1.9 + occ * 0.1).toFixed(2)} GHz`],
        ],
        spark: occ,
      };
    }

    // shared corner annotations
    function annotate(tl: string, br: string) {
      setFont(9);
      ctx.fillStyle = COL.faint;
      ctx.textAlign = "left";
      ctx.fillText(tl, 2, 16);
      ctx.textAlign = "right";
      ctx.fillText(br, W - 2, H - 8);
      ctx.textAlign = "left";
    }

    // =================================================================
    // CAMERA — ordered scenes, pendulum loop, shared-element morphs
    // =================================================================
    type LevelId = "dc" | "fabric" | "package" | "die";
    const render: Record<LevelId, (s: Step) => Sim> = {
      dc: drawDatacenter,
      fabric: drawFabric,
      package: drawPackage,
      die: drawDie,
    };
    // The shared element between two adjacent levels is a pair of rectangles that
    // must coincide on screen throughout the morph:
    //   focusOf(parent)  — the element on the PARENT you dive into
    //   contentOf(child) — the bounding box of the CHILD's real structure
    // We lock contentOf(child) ONTO focusOf(parent) (not the child's full frame),
    // so the parent's focus border literally becomes the child's structural border:
    // rack edge → fabric span, GPU cell → package substrate, die outline → SM grid.

    // bounding box of the fabric's drawn structure (tray columns + spine span)
    const fabricContentRect = (): Rect => {
      const left = trays[0]; // left column, top tray
      const x0 = left.rectX; // left edge of left trays
      const x1 = SPINE + COL_OFFSET + TRAY_W; // right edge of right trays
      const y0 = TOP - 26; // spine top
      const y1 = H - 30; // spine bottom
      return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
    };

    const focusOf = (parent: LevelId): Rect => {
      if (parent === "dc") return dcRackRect(DC_OWNED);
      if (parent === "fabric") return fabricFocusRect(trays);
      if (parent === "package") return DIE;
      return { x: 0, y: 0, w: W, h: H };
    };

    // the rectangle bounding each level's meaningful content (what should align
    // with the parent's focus rect), rather than the raw W×H frame
    const contentOf = (child: LevelId): Rect => {
      if (child === "fabric") return fabricContentRect();
      if (child === "package") return PKG;
      if (child === "die") return GRID;
      return { x: 0, y: 0, w: W, h: H };
    };

    // Expand `r` (about its center) to a target aspect ratio.
    const fitAspect = (r: Rect, target: number): Rect => {
      let { w, h } = r;
      if (w / h > target) h = w / target;
      else w = h * target;
      return { x: r.x + r.w / 2 - w / 2, y: r.y + r.h / 2 - h / 2, w, h };
    };

    // pendulum: out→in→out, dwelling at each
    const order: LevelId[] = ["dc", "fabric", "package", "die", "package", "fabric"];
    const DWELL = 4.4;
    const TRANS = 1.6;
    const SEG = DWELL + TRANS;
    const LOOP = order.length * SEG;
    const depth: Record<LevelId, number> = { dc: 0, fabric: 1, package: 2, die: 3 };

    // Draw a level so world point `aw` lands at screen point `as`, scaled by `s`.
    // The level renderers set globalAlpha internally (and reset to 1), so a simple
    // outer globalAlpha can't fade a whole level. When alpha < 1 we therefore
    // render the level OPAQUE into an offscreen buffer, then blit that buffer onto
    // the main canvas at the requested alpha — a true per-layer fade. Both layers
    // of a transition share the same anchor+scale, so they stay spatially locked.
    const drawAnchored = (
      id: LevelId,
      step: Step,
      aw: { x: number; y: number },
      as: { x: number; y: number },
      s: number,
      alpha: number
    ): Sim => {
      if (alpha >= 0.999) {
        ctx.save();
        ctx.translate(as.x, as.y);
        ctx.scale(s, s);
        ctx.translate(-aw.x, -aw.y);
        const sim = render[id](step);
        ctx.restore();
        return sim;
      }
      // render opaque to the offscreen buffer with the same transform…
      octx.save();
      octx.clearRect(0, 0, W, H);
      octx.translate(as.x, as.y);
      octx.scale(s, s);
      octx.translate(-aw.x, -aw.y);
      const prev = ctx;
      ctx = octx; // redirect the renderer
      const sim = render[id](step);
      ctx = prev;
      octx.restore();
      // …then blit it faded, ignoring the active world transform (blit in px space)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = alpha;
      ctx.drawImage(off, 0, 0);
      ctx.restore();
      return sim;
    };

    // =================================================================
    // loop
    // =================================================================
    let raf = 0;
    let started = 0;
    let running = false;

    // throttled HUD writer
    const disp: number[] = [0, 0, 0, 0];
    let hudTick = 0;
    const sparkCtx = sparkRef.current?.getContext("2d") ?? null;

    const setText = (el: HTMLSpanElement | null, v: string) => {
      if (el && el.textContent !== v) el.textContent = v;
    };

    function writeHud(sim: Sim, step: Step, fade: number) {
      spark.push(sim.spark);
      if (spark.length > 64) spark.shift();
      if (hudTick++ % 3 !== 0) return;

      setText(titleRef.current, sim.title);
      const labs = [lab0, lab1, lab2, lab3];
      const vals = [val0, val1, val2, val3];
      sim.metrics.forEach(([label, value], i) => {
        setText(labs[i].current, label);
        setText(vals[i].current, value);
      });

      setText(phaseRef.current, step.phase);
      if (dotRef.current) dotRef.current.style.background = step.active ? COL.bright : COL.faint;

      // fade HUD text slightly during transitions for a "retune" feel
      const o = `${(0.55 + 0.45 * fade).toFixed(2)}`;
      vals.forEach((v) => v.current && (v.current.style.opacity = o));

      if (sparkCtx && sparkRef.current) {
        const sc = sparkRef.current;
        const w = sc.width;
        const hh = sc.height;
        sparkCtx.clearRect(0, 0, w, hh);
        sparkCtx.strokeStyle = COL.gold;
        sparkCtx.lineWidth = 1;
        sparkCtx.beginPath();
        spark.forEach((v, i) => {
          const x = (i / 63) * w;
          const y = hh - v * (hh - 2) - 1;
          i === 0 ? sparkCtx.moveTo(x, y) : sparkCtx.lineTo(x, y);
        });
        sparkCtx.stroke();
      }
    }

    function frame(now: number, first = false) {
      if (first) started = now;
      const elapsed = (now - started) / 1000;
      const step = stepState(elapsed % T_CYCLE);

      // ease parallax
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;
      stage.style.transform = `perspective(1100px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      ctx.clearRect(0, 0, W, H);

      // where are we in the camera loop?
      const tcam = elapsed % LOOP;
      const segIdx = Math.floor(tcam / SEG);
      const segT = tcam - segIdx * SEG;
      const cur = order[segIdx];
      const next = order[(segIdx + 1) % order.length];

      let activeSim: Sim;
      let fade = 1; // 1 = settled (full HUD), dips toward 0 mid-transition

      if (segT < DWELL || cur === next) {
        // ---- dwell: one level, native, crisp ----
        activeSim = render[cur](step);
      } else {
        // ---- transition: dive between adjacent levels ----
        // A naive "zoom the parent until its focus fills the frame" needs ~40×
        // and shatters the parent into giant slabs. Instead we DECOUPLE:
        //   • the parent only drifts gently (≤1.5×) toward the focus, then fades —
        //     so it always stays a recognizable whole, never oversized debris;
        //   • a lock-frame travels from the focus element out to the child's full
        //     content box;
        //   • the child GROWS inside that frame, from focus-sized up to native.
        // The dive is sold by the expanding frame + emerging child, not by
        // nuking the parent. The frame is the through-line the eye tracks.
        const p = easeCubic(clamp01((segT - DWELL) / TRANS));
        const deeper = depth[next] > depth[cur];

        const parentId = deeper ? cur : next;
        const childId = deeper ? next : cur;
        const zp = deeper ? p : 1 - p; // 0 = at parent, 1 = at child

        const childBox = contentOf(childId);
        const focus = fitAspect(focusOf(parentId), childBox.w / childBox.h);
        const Fc = { x: focus.x + focus.w / 2, y: focus.y + focus.h / 2 };
        const Cc = { x: childBox.x + childBox.w / 2, y: childBox.y + childBox.h / 2 };

        // The lock-frame: interpolates on screen from the parent's focus rect →
        // the child's content box AT ITS NATIVE POSITION, so the transition's end
        // state is pixel-identical to the dwell render (no hand-off jump). This
        // single rectangle is the shared edge both levels are pinned to.
        const lf = {
          x: lerp(focus.x, childBox.x, zp),
          y: lerp(focus.y, childBox.y, zp),
          w: lerp(focus.w, childBox.w, zp),
          h: lerp(focus.h, childBox.h, zp),
        };
        const lfC = { x: lf.x + lf.w / 2, y: lf.y + lf.h / 2 };

        // Hand-off, not a blend: the parent leaves early, a short aperture beat
        // where the gold lock-frame carries the eye, then the child rises in with
        // a gentle overlap. Wider ramps than a hard cut, but still never two fully
        // opaque diagrams at once.
        const sp = lerp(1, 1.45, zp);
        const aParent = { x: lerp(Fc.x, lfC.x, zp), y: lerp(Fc.y, lfC.y, zp) };
        const parentA = 1 - clamp01(zp / 0.3); // gone by ~0.3
        const sc = lf.w / childBox.w;
        const childA = clamp01((zp - 0.22) / 0.4); // starts ~0.22, in by ~0.62

        const parentSim = drawAnchored(parentId, step, Fc, aParent, sp, parentA);

        // Porthole vignette sized to the FULL frame diagonal so the parent's
        // periphery is darkened to the page colour everywhere outside the focus
        // region — we look THROUGH the aperture only. Ramped in near zp=0 (so it
        // never snaps against the dwell frame) and held a touch past the parent
        // so the aperture beat stays clean before the child fills it.
        const vig = clamp01(zp / 0.12) * clamp01((0.45 - zp) / 0.28);
        if (vig > 0.01) {
          const inner = Math.min(lf.w, lf.h) * 0.5;
          const outer = Math.hypot(W, H) * 0.6;
          const g = ctx.createRadialGradient(lfC.x, lfC.y, inner, lfC.x, lfC.y, outer);
          g.addColorStop(0, "rgba(8,7,10,0)");
          g.addColorStop(1, `rgba(8,7,10,${vig.toFixed(3)})`);
          ctx.save();
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
          ctx.restore();
        }

        const childSim = drawAnchored(childId, step, Cc, lfC, sc, childA);

        // The through-line frame — brightest mid-flight, gone at the settled ends.
        const frameVis = clamp01(1 - Math.abs(zp - 0.5) * 2.2);
        if (frameVis > 0.01) {
          ctx.save();
          ctx.globalAlpha = frameVis * 0.9;
          ctx.strokeStyle = COL.gold;
          ctx.shadowColor = COL.gold;
          ctx.shadowBlur = 10 * frameVis;
          ctx.lineWidth = 1.25;
          ctx.strokeRect(lf.x, lf.y, lf.w, lf.h);
          ctx.restore();
        }

        activeSim = zp < 0.5 ? parentSim : childSim;
        fade = Math.abs(zp - 0.5) * 2;
      }

      writeHud(activeSim, step, fade);

      if (running) raf = requestAnimationFrame((t) => frame(t));
    }

    // ---- reduced motion: one static fabric frame, no camera, dashed HUD ----
    if (reduced) {
      const step = stepState(T_FWD_END / 2);
      for (const t of trays) {
        t.util = 0.6;
        t.temp = 64;
      }
      const paintStatic = () => {
        ctx.clearRect(0, 0, W, H);
        drawFabric(step);
      };
      onResized = paintStatic; // repaint if the canvas is later resized/cleared
      paintStatic();
      setText(titleRef.current, "NVL72 · fabric");
      const labs = [lab0, lab1, lab2, lab3];
      const vals = [val0, val1, val2, val3];
      ["util", "fabric", "power", "temp"].forEach((l, i) => setText(labs[i].current, l));
      vals.forEach((v) => setText(v.current, "—"));
      setText(phaseRef.current, "READY");
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          frame(performance.now(), true);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative select-none">
      <div ref={stageRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        <canvas
          ref={canvasRef}
          className="block w-full"
          role="img"
          aria-label="Multi-scale NVIDIA GPU visualization auto-zooming from datacenter to tensor cores during a live training step"
        />
      </div>

      <div className="mt-5 border-t border-[color:var(--rule)] pt-4">
        <div className="flex items-center justify-between">
          <span ref={titleRef} className="label">
            Fabric telemetry
          </span>
          <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-fg-dim">
            <span ref={dotRef} className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: COL.faint }} />
            <span ref={phaseRef}>SYNC</span>
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-px">
          <Stat labelRef={lab0} valueRef={val0} />
          <Stat labelRef={lab1} valueRef={val1} />
          <Stat labelRef={lab2} valueRef={val2} />
          <Stat labelRef={lab3} valueRef={val3} />
        </div>

        <canvas ref={sparkRef} width={520} height={28} className="mt-3 h-7 w-full opacity-70" aria-hidden="true" />
      </div>
    </div>
  );
}

function Stat({
  labelRef,
  valueRef,
}: {
  labelRef: React.RefObject<HTMLSpanElement | null>;
  valueRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span ref={labelRef} className="label text-[0.6rem]">
        —
      </span>
      <span ref={valueRef} className="mono text-sm text-gold tabular-nums transition-opacity">
        —
      </span>
    </div>
  );
}
