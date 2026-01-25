import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../theme/useTheme';

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'blog', label: 'Insights' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? theme === 'light'
              ? 'bg-white/80 dark:bg-[var(--theme-bg-secondary)]/80 backdrop-blur-lg shadow-lg dark:shadow-xl dark:shadow-black/30'
              : 'bg-[var(--theme-bg-secondary)]/80 backdrop-blur-lg shadow-xl shadow-black/30'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              {/* Icon from public */}
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/favi.png"
                  alt="DeccaNoid Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>

              <div>
                <div className="text-xl md:text-2xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  DeccaNoid
                </div>
                <div
                  className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                >
                  IT Solutions & Services
                </div>
              </div>


            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 transition-colors ${activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : theme === 'light'
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA - Desktop */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollToSection('contact')}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 transition-colors ${theme === 'light'
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-gray-300 hover:text-blue-400'
                  }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`fixed top-[72px] right-0 bottom-0 w-full sm:w-80 shadow-2xl z-40 md:hidden transition-colors duration-300 ${theme === 'light'
                ? 'bg-white'
                : 'bg-[var(--theme-bg-secondary)] border-l border-[var(--theme-border-primary)]'
              }`}
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-6 py-4 text-left rounded-lg transition-colors ${theme === 'light'
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-300 hover:bg-[var(--theme-bg-tertiary)]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
