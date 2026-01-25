import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300"
      style={{
        background:
          theme === 'light'
            ? 'linear-gradient(135deg, #f0f4f8 0%, #e5eef7 100%)'
            : 'linear-gradient(135deg, #1a1f2e 0%, #252d3d 100%)',
        border: `1px solid ${theme === 'light' ? '#d4d4d4' : '#2d3748'}`,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          theme === 'light'
            ? '0 8px 16px rgba(37, 99, 235, 0.15)'
            : '0 8px 16px rgba(59, 130, 246, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Sun
              size={20}
              className="text-amber-500"
              strokeWidth={2.5}
            />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Moon
              size={20}
              className="text-blue-300"
              strokeWidth={2.5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background pulse on interaction */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            theme === 'light'
              ? 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #06dcff 100%)',
        }}
      />
    </motion.button>
  );
}
