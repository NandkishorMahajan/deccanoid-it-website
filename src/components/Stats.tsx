import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

function StatItem({ icon, value, suffix = '', label, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${
        theme === 'light'
          ? 'bg-white border-gray-100'
          : 'bg-[var(--theme-bg-secondary)] border-[var(--theme-border-primary)]'
      }`}>
        {/* Icon with gradient background */}
        <div className="relative inline-block mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 flex items-center justify-center text-white">
            {icon}
          </div>
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Counter */}
        <div className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
          {isInView ? count : 0}{suffix}
        </div>

        {/* Label */}
        <div className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
          {label}
        </div>

        {/* Hover effect line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 rounded-b-2xl"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function Stats() {
  const { theme } = useTheme();

  const stats = [
    {
      icon: <Users className="w-7 h-7" />,
      value: 200,
      suffix: '+',
      label: 'Enterprise Clients'
    },
    {
      icon: <Award className="w-7 h-7" />,
      value: 300,
      suffix: '+',
      label: 'Projects Delivered'
    },
    {
      icon: <Globe className="w-7 h-7" />,
      value: 10,
      suffix: '+',
      label: 'Countries Served'
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction'
    }
  ];

  return (
    <div className={`relative py-20 transition-colors duration-500 ${
      theme === 'light'
        ? 'bg-gradient-to-b from-white to-gray-50'
        : 'bg-gradient-to-b from-[var(--theme-bg-primary)] to-[var(--theme-bg-secondary)]'
    }`}>
      <AnimatedBackgroundCanvas intensity="subtle" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl ${
          theme === 'light'
            ? 'bg-blue-500/5'
            : 'bg-blue-500/10'
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl ${
          theme === 'light'
            ? 'bg-cyan-500/5'
            : 'bg-cyan-500/10'
        }`} />
      </div>
    </div>
  );
}
