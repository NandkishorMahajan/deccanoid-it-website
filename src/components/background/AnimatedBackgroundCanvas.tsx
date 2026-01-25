import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../theme/useTheme';

type Intensity = 'subtle' | 'default';

export interface AnimatedBackgroundCanvasProps {
  /**
   * Visual intensity preset.
   * - subtle: low-contrast, ideal for non-hero sections
   * - default: slightly stronger
   */
  intensity?: Intensity;
  /**
   * Extra className appended to the canvas element.
   * Keep this component layout-safe by using only visual utilities.
   */
  className?: string;
  /**
   * Optional explicit line count (overrides intensity defaults).
   */
  lineCount?: number;
}

type Line = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
};

export function AnimatedBackgroundCanvas({
  intensity = 'subtle',
  className = '',
  lineCount,
}: AnimatedBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const getCounts = () => {
      if (typeof lineCount === 'number' && Number.isFinite(lineCount)) {
        return Math.max(8, Math.floor(lineCount));
      }
      return intensity === 'subtle' ? 18 : 26;
    };

    const blueBase =
      theme === 'light' ? 'rgba(37, 99, 235' : 'rgba(59, 130, 246';
    const cyanBase =
      theme === 'light' ? 'rgba(6, 182, 212' : 'rgba(6, 220, 255';

    const opacityRange =
      intensity === 'subtle'
        ? theme === 'light'
          ? [0.04, 0.18]
          : [0.03, 0.14]
        : theme === 'light'
          ? [0.05, 0.26]
          : [0.04, 0.20];

    const lineWidth = intensity === 'subtle' ? 1.75 : 2;
    const nodeRadius = intensity === 'subtle' ? 2.5 : 3;

    let width = 0;
    let height = 0;
    let raf = 0;
    let resizeObserver: ResizeObserver | null = null;
    let lines: Line[] = [];

    const randomOpacity = () =>
      Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0];

    const initLines = () => {
      const count = getCounts();
      lines = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * (intensity === 'subtle' ? 0.35 : 0.5) + 0.2,
        angle: Math.random() * Math.PI * 2,
        opacity: randomOpacity(),
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Draw using CSS pixel coordinates for stability.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLines();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x < 0) line.x = width;
        if (line.x > width) line.x = 0;
        if (line.y < 0) line.y = height;
        if (line.y > height) line.y = 0;

        const gradient = ctx.createLinearGradient(
          line.x,
          line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );

        gradient.addColorStop(0, `${blueBase}, ${line.opacity})`);
        gradient.addColorStop(0.5, `${cyanBase}, ${line.opacity * 0.8})`);
        gradient.addColorStop(1, `${blueBase}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.stroke();

        ctx.fillStyle = `${blueBase}, ${line.opacity})`;
        ctx.beginPath();
        ctx.arc(line.x, line.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    resize();

    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(parent);

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [theme, intensity, lineCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={[
        'absolute inset-0 w-full h-full pointer-events-none',
        // Keep it visually subtle by default.
        intensity === 'subtle' ? 'opacity-75' : 'opacity-90',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

