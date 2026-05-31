"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas starfield with occasional comets streaking across.
 * Pure 2D canvas — no WebGL dependency, respects reduced-motion.
 */
export default function CometField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; z: number; r: number; tw: number };
    type Comet = { x: number; y: number; vx: number; vy: number; life: number; len: number };

    let stars: Star[] = [];
    let comets: Comet[] = [];

    const seed = (() => {
      let s = 1337;
      return () => {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        return s / 0x7fffffff;
      };
    })();

    const resize = () => {
      width = canvas.parentElement?.clientWidth ?? window.innerWidth;
      height = canvas.parentElement?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: seed() * width,
        y: seed() * height,
        z: seed(),
        r: seed() * 1.2 + 0.2,
        tw: seed() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let raf = 0;
    let lastComet = 0;

    const spawnComet = () => {
      const fromLeft = seed() > 0.5;
      const startY = seed() * height * 0.6;
      const speed = 5 + seed() * 4;
      comets.push({
        x: fromLeft ? -50 : width + 50,
        y: startY,
        vx: fromLeft ? speed : -speed,
        vy: speed * 0.45,
        life: 1,
        len: 120 + seed() * 120,
      });
    };

    const render = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      // stars
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.02 + s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 235, 210, ${0.15 + s.z * 0.5 * twinkle})`;
        ctx.fill();
      }

      // comets
      if (!reduced && frame - lastComet > 150 && comets.length < 2 && seed() > 0.5) {
        spawnComet();
        lastComet = frame;
      }

      comets = comets.filter((c) => c.life > 0 && c.x > -200 && c.x < width + 200);
      for (const c of comets) {
        c.x += c.vx;
        c.y += c.vy;
        const tailX = c.x - c.vx * (c.len / 8);
        const tailY = c.y - c.vy * (c.len / 8);
        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        grad.addColorStop(0, "rgba(245, 205, 122, 0.9)");
        grad.addColorStop(0.4, "rgba(242, 92, 138, 0.35)");
        grad.addColorStop(1, "rgba(242, 92, 138, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // head glow
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 225, 180, 0.95)";
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    if (reduced) {
      // single static paint
      render();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
