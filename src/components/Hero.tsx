import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../theme/useTheme';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // ❗ ONLY opacity on main wrapper (no scale here)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ✅ Scale isolated to inner content (text safe)
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  /* ---------------- Canvas Background ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Adjust colors based on theme
    const blue = theme === 'light' ? 'rgba(37, 99, 235' : 'rgba(59, 130, 246';
    const cyan = theme === 'light' ? 'rgba(6, 182, 212' : 'rgba(6, 220, 255';

    const lines = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 100 + 50,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * (theme === 'light' ? 0.3 : 0.2) + 0.05,
    }));

    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (line.x < 0) line.x = canvas.width;
        if (line.x > canvas.width) line.x = 0;
        if (line.y < 0) line.y = canvas.height;
        if (line.y > canvas.height) line.y = 0;

        const gradient = ctx.createLinearGradient(
          line.x,
          line.y,
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );

        gradient.addColorStop(0, `${blue}, ${line.opacity})`);
        gradient.addColorStop(0.5, `${cyan}, ${line.opacity * 0.8})`);
        gradient.addColorStop(1, `${blue}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(
          line.x + Math.cos(line.angle) * line.length,
          line.y + Math.sin(line.angle) * line.length
        );
        ctx.stroke();

        ctx.fillStyle = `${blue}, ${line.opacity})`;
        ctx.beginPath();
        ctx.arc(line.x, line.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50'
          : 'bg-gradient-to-br from-[#0f1419] via-[#1a1f2e] to-[#0f2847]'
      }`}
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient Orbs */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
        theme === 'light'
          ? 'bg-blue-500/20'
          : 'bg-blue-500/15'
      }`} />
      <div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          theme === 'light'
            ? 'bg-cyan-500/20'
            : 'bg-cyan-500/15'
        }`}
        style={{ animationDelay: '1s' }}
      />

      {/* 🔑 Inner content wrapper (scaled safely) */}
      <motion.div
        style={{ scale: contentScale }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full"
      >
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 transition-all ${
              theme === 'light'
                ? 'bg-white/60 backdrop-blur-sm border-blue-200'
                : 'bg-[var(--theme-bg-secondary)]/60 backdrop-blur-sm border-[var(--theme-border-secondary)]'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${
              theme === 'light'
                ? 'text-blue-600'
                : 'text-blue-400'
            }`} />
            <span className={`text-sm ${
              theme === 'light'
                ? 'text-gray-700'
                : 'text-gray-300'
            }`}>
              Next-Generation IT Solutions
            </span>
          </motion.div>

          {/* ✅ Headline – NO CUT, GUARANTEED */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.15] pb-4 ${
              theme === 'light'
                ? 'text-gray-900'
                : 'text-white'
            }`}
          >
            <span className="block">Transforming</span>

            {/* ✅ GPU-safe gradient text */}
            <span
              className="block relative"
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(90deg, #2563eb, #3b82f6, #22d3ee)'
                  : 'none',
                backgroundClip: theme === 'light' ? 'text' : 'unset',
                WebkitBackgroundClip: theme === 'light' ? 'text' : 'unset',
                color: theme === 'light'
                  ? 'transparent'
                  : '#00dcff',
                WebkitTextFillColor: theme === 'light'
                  ? 'transparent'
                  : 'unset',
                paddingBottom: '0.20em'
              }}
            >
              Digital Futures
            </span>
          </motion.h1>


          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 ${
              theme === 'light'
                ? 'text-gray-600'
                : 'text-gray-300'
            }`}
          >
            Enterprise-grade technology solutions that drive innovation, optimize
            operations, and accelerate your digital transformation journey.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-xl flex items-center gap-2 hover:shadow-2xl transition-all ${
                theme === 'light'
                  ? 'hover:shadow-blue-500/40'
                  : 'hover:shadow-blue-500/20'
              }`}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() =>
                document
                  .getElementById('services')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'bg-white/60 backdrop-blur-sm text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-white'
                  : 'bg-[var(--theme-bg-secondary)]/60 backdrop-blur-sm text-gray-300 border-[var(--theme-border-secondary)] hover:border-blue-400 hover:bg-[var(--theme-bg-secondary)]'
              }`}
            >
              Explore Solutions
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`mt-16 flex flex-wrap items-center justify-center gap-8 text-sm ${
              theme === 'light'
                ? 'text-gray-600'
                : 'text-gray-400'
            }`}
          >
            <span>300+ Projects Delivered</span>
            <span>98% Client Satisfaction</span>
            <span>24/7 Global Support</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 ${
            theme === 'light'
              ? 'border-gray-400'
              : 'border-gray-500'
          }`}
        >
          <motion.div className={`w-1 h-2 rounded-full ${
            theme === 'light'
              ? 'bg-gray-400'
              : 'bg-gray-500'
          }`} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
