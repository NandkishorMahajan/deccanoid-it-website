import React from 'react';
import { motion } from 'motion/react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../theme/useTheme';

import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  MessageCircle
} from 'lucide-react';

export function Footer() {
  const { theme } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press & Media', href: '#' },
      { label: 'Partners', href: '#' }
    ],
    services: [
      { label: 'Cloud Solutions', href: '#services' },
      { label: 'Custom Development', href: '#services' },
      { label: 'Cybersecurity', href: '#services' },
      { label: 'AI & ML', href: '#services' }
    ],
    resources: [
      { label: 'Blog', href: '#blog' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Documentation', href: '#' },
      { label: 'Support', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Compliance', href: '#' }
    ]
  };

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/company/deccanoid-it-solutions-and-services',
      label: 'LinkedIn'
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: 'https://twitter.com/', // optional / later update
      label: 'Twitter'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:hello@deccanoid.com',
      label: 'Email'
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 text-green-500" />,
      href: 'https://wa.me/919584777747',
      label: 'WhatsApp'
    }

  ];


  return (
    <footer className={`relative overflow-hidden transition-colors duration-500 ${theme === 'light'
        ? 'bg-gradient-to-b from-gray-900 to-black text-white'
        : 'bg-gradient-to-b from-[var(--theme-bg-primary)] to-black text-white'
      }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Logo from public */}
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

              </div>

              <p className={`mb-6 max-w-xs ${theme === 'light' ? 'text-gray-400' : 'text-[var(--theme-text-secondary)]'
                }`}>
                Transforming businesses through innovative technology solutions.
                Your partner in digital excellence.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>

                ))}
              </div>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-[var(--theme-text-secondary)]'
              }`}>Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${theme === 'light'
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-[var(--theme-text-secondary)] hover:text-blue-400'
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-[var(--theme-text-secondary)]'
              }`}>Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${theme === 'light'
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-[var(--theme-text-secondary)] hover:text-blue-400'
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-[var(--theme-text-secondary)]'
              }`}>Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${theme === 'light'
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-[var(--theme-text-secondary)] hover:text-blue-400'
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-[var(--theme-text-secondary)]'
              }`}>Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${theme === 'light'
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-[var(--theme-text-secondary)] hover:text-blue-400'
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`py-12 border-t ${theme === 'light' ? 'border-white/10' : 'border-[var(--theme-border)]'
            }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className={`text-xl mb-2 ${theme === 'light' ? 'text-white' : 'text-white'
                }`}>Stay Updated</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-400' : 'text-[var(--theme-text-secondary)]'
                }`}>
                Subscribe to our newsletter for the latest tech insights
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 md:w-64 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${theme === 'light'
                    ? 'bg-white/5 border border-white/10 text-black'
                    : 'bg-[var(--theme-bg-primary)] border border-[var(--theme-border)] text-white'
                  }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2022 DeccaNoid IT Solutions & Services. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              hello@deccanoid.com
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 9584777747
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </footer>
  );
}
