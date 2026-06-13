"use client";

import { useEffect, useRef } from "react";

/**
 * Live NVL72 fabric.
 *
 * This is not a decorative animation — every moving thing maps to a real event
 * in a distributed training step running on a loop:
 *
 *   COMPUTE    a forward-pass wave sweeps the rack top→bottom; GPUs heat up.
 *   REDUCE     all 18 trays fire gradients down their links into the NVSwitch,
 *              timed so they CONVERGE on the spine simultaneously (the reduce).
 *   BROADCAST  the reduced result radiates back out; GPUs flash on receipt.
 *   SYNC       brief settle, then the next step.
 *
 * A telemetry HUD (util / fabric BW / power / temp + sparkline) is driven by
 * the same simulation, so the numbers spike on each all-reduce instead of
 * counting up once. On first reveal the rack does a single tenant-gold "claim"
 * wipe — one owner, whole domain — tying the art to the single-tenant pitch.
 *
 * Pure Canvas 2D, zero dependencies. Respects prefers-reduced-motion.
 */

// virtual coordinate space — drawing math is resolution-independent
const W = 520;
const H = 560;
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

// step timeline (seconds)
const T_CYCLE = 7.0;
const T_FWD_END = 2.0;
const T_REDUCE = 3.6; // pulses converge here
const T_BCAST = 4.0; // broadcast leaves here
const T_SETTLE = 5.3;
const V = 320; // pulse speed, virtual units / sec
const T_INTRO = 1.5; // tenant-claim wipe

const COL = {
  ink: "#08070a",
  raised: "#0e0d11",
  rule: "rgba(236,233,227,0.10)",
  ruleStrong: "rgba(236,233,227,0.18)",
  faint: "#625f58",
  gold: "#e3a72c",
  bright: "#f4c560",
};

type Tray = {
  i: number;
  left: boolean;
  attachX: number; // where the link meets the tray (inner edge)
  rectX: number; // left edge of tray body
  y: number;
  enterY: number; // where its link meets the switch box
  L1: number; // horizontal segment length
  L2: number; // vertical segment length
  L: number;
  dur: number; // travel time along its link
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
    return {
      i,
      left,
      attachX,
      rectX,
      y,
      enterY,
      L1,
      L2,
      L,
      dur: L / V,
      util: 0.18,
      temp: 40,
    };
  });
}

// position along a tray's link, measured `s` units from the tray toward switch
function pathPoint(t: Tray, s: number): [number, number] {
  if (s <= t.L1) {
    const k = s / t.L1;
    return [t.attachX + (SPINE - t.attachX) * k, t.y];
  }
  const k = (s - t.L1) / Math.max(t.L2, 0.0001);
  return [SPINE, t.y + (t.enterY - t.y) * k];
}

const gauss = (x: number, s: number) => Math.exp(-(x * x) / (2 * s * s));
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export default function ClusterDiagram() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkRef = useRef<HTMLCanvasElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);

  // HUD value nodes (written by sim, read by throttled DOM updater)
  const utilRef = useRef<HTMLSpanElement | null>(null);
  const fabricRef = useRef<HTMLSpanElement | null>(null);
  const powerRef = useRef<HTMLSpanElement | null>(null);
  const tempRef = useRef<HTMLSpanElement | null>(null);
  const phaseRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rootEl = rootRef.current;
    const stageEl = stageRef.current;
    if (!canvas || !rootEl || !stageEl) return;
    const root = rootEl; // non-null bindings for nested closures
    const stage = stageEl;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx = ctx2d; // non-null binding for nested closures

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trays = buildTrays();
    const flash = new Float32Array(TRAYS); // broadcast-receive flash per tray
    const spark: number[] = [];

    let scale = 1;
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      cssW = stage.clientWidth || 420;
      cssH = (cssW * H) / W;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.height = `${cssH}px`;
      scale = cssW / W;
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    // ---- interactivity: hover + parallax ----
    let hovered = -1;
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const vx = ((e.clientX - r.left) / r.width) * W;
      const vy = ((e.clientY - r.top) / r.height) * H;

      // hit-test trays (with a little padding)
      hovered = -1;
      for (const t of trays) {
        if (
          vx >= t.rectX - 4 &&
          vx <= t.rectX + TRAY_W + 4 &&
          vy >= t.y - TRAY_H / 2 - 4 &&
          vy <= t.y + TRAY_H / 2 + 4
        ) {
          hovered = t.i;
          break;
        }
      }

      // parallax from cursor position over the whole figure
      const rr = root.getBoundingClientRect();
      const nx = (e.clientX - rr.left) / rr.width - 0.5;
      const ny = (e.clientY - rr.top) / rr.height - 0.5;
      targetTiltY = nx * 7;
      targetTiltX = -ny * 5;

      // readout follows cursor
      const ro2 = readoutRef.current;
      if (ro2) {
        if (hovered >= 0) {
          const t = trays[hovered];
          ro2.style.opacity = "1";
          ro2.style.left = `${e.clientX - rr.left}px`;
          ro2.style.top = `${e.clientY - rr.top}px`;
          ro2.innerHTML = `<span style="color:${COL.bright}">tray-${String(
            hovered + 1
          ).padStart(2, "0")}</span> · 4× B200<br/>${Math.round(
            t.temp
          )}°C · ${Math.round(t.util * 100)}% util · 1.4 TB`;
        } else {
          ro2.style.opacity = "0";
        }
      }
    };
    const onLeave = () => {
      hovered = -1;
      targetTiltX = 0;
      targetTiltY = 0;
      const ro2 = readoutRef.current;
      if (ro2) ro2.style.opacity = "0";
    };
    if (!reduced) {
      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", onLeave);
    }

    // ---- drawing ----
    const setFont = (px: number) => {
      ctx.font = `${px}px "JetBrains Mono", ui-monospace, monospace`;
    };

    function drawScene(cycle: number, intro: number) {
      ctx.clearRect(0, 0, W, H);

      // ----- simulation state for this frame -----
      // global "busy" factor across the rack
      let busy: number;
      if (cycle < T_FWD_END) busy = 0.2;
      else if (cycle < T_SETTLE) busy = 0.85;
      else busy = lerp(0.85, 0.2, clamp01((cycle - T_SETTLE) / (T_CYCLE - T_SETTLE)));

      const waveY = TOP + (cycle / T_FWD_END) * (H - TOP - 30);
      const switchFlare = Math.max(
        gauss(cycle - (T_REDUCE + 0.2), 0.34),
        intro < 1 ? 0.4 : 0
      );

      // ----- spine rail -----
      ctx.strokeStyle = COL.ruleStrong;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(SPINE, TOP - 26);
      ctx.lineTo(SPINE, H - 30);
      ctx.stroke();

      // ----- links (dim base) -----
      for (const t of trays) {
        ctx.strokeStyle = "rgba(227,167,44,0.10)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.attachX, t.y);
        ctx.lineTo(SPINE, t.y);
        ctx.lineTo(SPINE, t.enterY);
        ctx.stroke();
      }

      // ----- trays + GPUs -----
      let inflight = 0;
      let utilSum = 0;
      let tempSum = 0;

      for (const t of trays) {
        // util target from forward wave + global busy + flash
        const fwd =
          cycle < T_FWD_END ? gauss(t.y - waveY, 42) : 0;
        const claimed = intro >= 1 || t.y < TOP + intro * (H - TOP - 30);
        const target =
          (claimed ? 1 : 0.25) *
          (0.18 + Math.max(fwd, busy) * 0.77 + flash[t.i] * 0.25);
        t.util += (Math.min(target, 1) - t.util) * 0.14;
        // thermal lag
        const tempTarget = 40 + t.util * 42;
        t.temp += (tempTarget - t.temp) * 0.02;
        utilSum += t.util;
        tempSum += t.temp;

        const isHover = hovered === t.i;
        const dim = hovered >= 0 && !isHover ? 0.45 : 1;
        const lift = isHover ? (t.left ? -6 : 6) : 0;

        // tray body
        ctx.globalAlpha = dim;
        ctx.fillStyle = COL.raised;
        ctx.strokeStyle = isHover ? COL.gold : COL.ruleStrong;
        ctx.lineWidth = isHover ? 1.4 : 1;
        ctx.beginPath();
        ctx.rect(t.rectX + lift, t.y - TRAY_H / 2, TRAY_W, TRAY_H);
        ctx.fill();
        ctx.stroke();

        // 4 GPUs
        for (let g = 0; g < 4; g++) {
          const gx = t.rectX + lift + 10 + g * 19;
          const heat = clamp01(t.util + flash[t.i] * 0.5);
          // idle deep-gold → hot bright, with a tiny per-GPU shimmer
          const shimmer = 0.04 * Math.sin(cycle * 5 + (t.i * 4 + g));
          const a = clamp01(0.28 + heat * 0.72 + shimmer);
          ctx.globalAlpha = dim * a;
          ctx.fillStyle = heat > 0.78 ? COL.bright : COL.gold;
          if (heat > 0.85) {
            ctx.shadowColor = COL.bright;
            ctx.shadowBlur = 6;
          }
          ctx.fillRect(gx, t.y - 4, 12, 8);
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;

        // decay flash
        flash[t.i] *= 0.9;
      }

      // ----- traffic: REDUCE (in) + BROADCAST (out) -----
      const drawPulse = (x: number, y: number, intensity: number) => {
        ctx.shadowColor = COL.bright;
        ctx.shadowBlur = 10;
        ctx.fillStyle = COL.bright;
        ctx.globalAlpha = intensity;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      };
      const drawComet = (t: Tray, s: number, intensity: number) => {
        // short trailing segment behind the head for a "data moving" read
        const steps = 5;
        for (let k = steps; k >= 0; k--) {
          const ss = Math.max(0, Math.min(t.L, s - k * 6));
          const [x, y] = pathPoint(t, ss);
          const a = intensity * (1 - k / (steps + 1));
          if (k === 0) drawPulse(x, y, a);
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

      if (intro >= 1) {
        for (const t of trays) {
          // REDUCE: converge on switch at T_REDUCE
          const startIn = T_REDUCE - t.dur;
          if (cycle >= startIn && cycle <= T_REDUCE) {
            const q = (cycle - startIn) / t.dur;
            drawComet(t, q * t.L, 0.95);
            inflight++;
          }
          // BROADCAST: leave switch at T_BCAST, arrive tray
          const arriveOut = T_BCAST + t.dur;
          if (cycle >= T_BCAST && cycle <= arriveOut) {
            const q = (cycle - T_BCAST) / t.dur;
            drawComet(t, (1 - q) * t.L, 0.9);
            inflight++;
            if (q > 0.98) flash[t.i] = 1;
          }
        }
      }

      // ----- NVSwitch -----
      if (switchFlare > 0.02) {
        ctx.save();
        ctx.shadowColor = COL.bright;
        ctx.shadowBlur = 30 * switchFlare;
        ctx.strokeStyle = COL.bright;
        ctx.globalAlpha = clamp01(0.4 + switchFlare);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(SW.x, SW.y, SW.w, SW.h);
        ctx.restore();
      }
      ctx.fillStyle = COL.ink;
      ctx.fillRect(SW.x, SW.y, SW.w, SW.h);
      ctx.strokeStyle = switchFlare > 0.1 ? COL.bright : COL.gold;
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

      // ----- annotations -----
      setFont(9);
      ctx.fillStyle = COL.faint;
      ctx.textAlign = "left";
      ctx.fillText("FIG.01 — NVL72 FABRIC", 2, 16);
      ctx.textAlign = "right";
      ctx.fillText("72 GPU · 18 TRAY · 1 DOMAIN", W - 2, H - 8);
      ctx.textAlign = "left";

      return {
        inflight,
        util: utilSum / TRAYS,
        temp: tempSum / TRAYS,
      };
    }

    // ---- HUD updater (throttled, lerped) ----
    const disp = { util: 0, fabric: 6, power: 28, temp: 40 };
    let hudTick = 0;
    const sparkCtx = sparkRef.current?.getContext("2d") ?? null;

    function updateHud(
      sim: { inflight: number; util: number; temp: number },
      cycle: number
    ) {
      const fabricTarget = 6 + (sim.inflight / 18) * 124 + Math.random() * 4;
      const powerTarget = 28 + sim.util * 90 + Math.random() * 2;
      disp.util += (sim.util * 100 - disp.util) * 0.2;
      disp.fabric += (fabricTarget - disp.fabric) * 0.25;
      disp.power += (powerTarget - disp.power) * 0.15;
      disp.temp += (sim.temp - disp.temp) * 0.1;

      spark.push(sim.util);
      if (spark.length > 64) spark.shift();

      if (hudTick++ % 4 !== 0) return;

      if (utilRef.current) utilRef.current.textContent = `${Math.round(disp.util)}%`;
      if (fabricRef.current)
        fabricRef.current.textContent = `${disp.fabric.toFixed(0)} TB/s`;
      if (powerRef.current) powerRef.current.textContent = `${disp.power.toFixed(0)} kW`;
      if (tempRef.current) tempRef.current.textContent = `${Math.round(disp.temp)}°C`;

      const phase =
        cycle < T_FWD_END
          ? "COMPUTE"
          : cycle < T_BCAST
          ? "ALL-REDUCE"
          : cycle < T_SETTLE
          ? "BROADCAST"
          : "SYNC";
      if (phaseRef.current) phaseRef.current.textContent = phase;
      const active = phase === "ALL-REDUCE" || phase === "BROADCAST";
      if (dotRef.current)
        dotRef.current.style.background = active ? COL.bright : COL.faint;

      // sparkline
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

    // ---- reduced motion: static draw ----
    if (reduced) {
      for (const t of trays) {
        t.util = 0.6;
        t.temp = 64;
      }
      drawScene(T_FWD_END / 2, 1);
      if (utilRef.current) utilRef.current.textContent = "—";
      if (fabricRef.current) fabricRef.current.textContent = "130 TB/s";
      if (powerRef.current) powerRef.current.textContent = "— kW";
      if (tempRef.current) tempRef.current.textContent = "—";
      if (phaseRef.current) phaseRef.current.textContent = "READY";
      return () => ro.disconnect();
    }

    // ---- main loop, gated on visibility ----
    let raf = 0;
    let started = 0;
    let running = false;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          loop(performance.now(), true);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(root);

    function loop(now: number, first = false) {
      if (first) started = now;
      const elapsed = (now - started) / 1000;
      const intro = clamp01(elapsed / T_INTRO);
      const cycle = elapsed < T_INTRO ? 0 : (elapsed - T_INTRO) % T_CYCLE;

      // ease parallax toward target
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;
      stage.style.transform = `perspective(1100px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const sim = drawScene(cycle, intro);
      updateHud(sim, cycle);

      if (running) raf = requestAnimationFrame((t) => loop(t));
    }

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
      {/* hover readout — follows cursor, stays flat for legibility */}
      <div
        ref={readoutRef}
        className="mono pointer-events-none absolute z-20 -translate-y-full border border-[color:var(--rule-strong)] bg-ink/95 px-2.5 py-1.5 text-[10px] leading-relaxed text-fg-dim opacity-0 transition-opacity"
        style={{ transitionDuration: "120ms" }}
      />

      {/* the tilting canvas stage */}
      <div ref={stageRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        <canvas
          ref={canvasRef}
          className="block w-full"
          role="img"
          aria-label="Live NVL72 topology: 72 GPUs running an all-reduce step against a central NVSwitch"
        />
      </div>

      {/* telemetry HUD — driven by the same simulation */}
      <div className="mt-5 border-t border-[color:var(--rule)] pt-4">
        <div className="flex items-center justify-between">
          <span className="label">Fabric telemetry</span>
          <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-fg-dim">
            <span
              ref={dotRef}
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: COL.faint }}
            />
            <span ref={phaseRef}>SYNC</span>
          </span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-px">
          <Stat label="util" valueRef={utilRef} />
          <Stat label="fabric" valueRef={fabricRef} />
          <Stat label="power" valueRef={powerRef} />
          <Stat label="temp" valueRef={tempRef} />
        </div>

        <canvas
          ref={sparkRef}
          width={520}
          height={28}
          className="mt-3 h-7 w-full opacity-70"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  valueRef,
}: {
  label: string;
  valueRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label text-[0.6rem]">{label}</span>
      <span ref={valueRef} className="mono text-sm text-gold tabular-nums">
        —
      </span>
    </div>
  );
}
