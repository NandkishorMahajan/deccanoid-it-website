import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, TrendingUp, Clock, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';

interface CaseStudy {
  id: number;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
    icon: string;
  }[];
  tags: string[];
  gradient: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    client: 'FinTech Global',
    industry: 'Financial Services',
    title: 'AI-Powered Fraud Detection System',
    challenge: 'Processing 10M+ transactions daily with 15% false positive rate causing customer friction',
    solution: 'Implemented real-time ML-based fraud detection using TensorFlow and cloud infrastructure',
    results: [
      'Reduced false positives by 87%',
      'Detected fraud 3x faster',
      'Saved $12M annually in prevented losses',
      'Improved customer satisfaction by 45%'
    ],
    metrics: [
      { label: 'False Positives Reduced', value: '87%', icon: '📉' },
      { label: 'Annual Savings', value: '$12M', icon: '💰' },
      { label: 'Detection Speed', value: '3x', icon: '⚡' }
    ],
    tags: ['AI/ML', 'Cloud', 'Real-time Processing'],
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    client: 'RetailMax',
    industry: 'E-commerce',
    title: 'Omnichannel Platform Transformation',
    challenge: 'Legacy systems unable to handle peak traffic, resulting in 30% cart abandonment',
    solution: 'Built microservices architecture with Kubernetes, Redis caching, and CDN optimization',
    results: [
      'Zero downtime during Black Friday',
      'Page load time reduced from 4s to 0.8s',
      'Cart abandonment dropped to 8%',
      'Revenue increased by 340%'
    ],
    metrics: [
      { label: 'Uptime', value: '99.99%', icon: '✅' },
      { label: 'Revenue Growth', value: '340%', icon: '📈' },
      { label: 'Load Time', value: '0.8s', icon: '⚡' }
    ],
    tags: ['Cloud', 'DevOps', 'Scalability'],
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    client: 'HealthCare Plus',
    industry: 'Healthcare',
    title: 'HIPAA-Compliant Telemedicine Platform',
    challenge: 'Need to launch secure telehealth platform within 3 months during pandemic',
    solution: 'Developed end-to-end encrypted video platform with AWS compliance and mobile apps',
    results: [
      'Launched in 10 weeks',
      '500K+ consultations in first year',
      '100% HIPAA compliance',
      'Patient satisfaction: 4.8/5'
    ],
    metrics: [
      { label: 'Launch Time', value: '10 Weeks', icon: '🚀' },
      { label: 'Consultations', value: '500K+', icon: '👥' },
      { label: 'Compliance', value: '100%', icon: '🔒' }
    ],
    tags: ['Security', 'Mobile', 'Compliance'],
    gradient: 'from-green-600 to-teal-500'
  },
  {
    id: 4,
    client: 'Manufacturing Corp',
    industry: 'Manufacturing',
    title: 'IoT-Enabled Predictive Maintenance',
    challenge: 'Unexpected equipment failures causing $5M in annual downtime costs',
    solution: 'Deployed IoT sensors with ML predictive analytics across 50+ production lines',
    results: [
      'Predicted 94% of failures before occurrence',
      'Reduced downtime by 76%',
      'Saved $3.8M annually',
      'Increased OEE to 89%'
    ],
    metrics: [
      { label: 'Prediction Accuracy', value: '94%', icon: '🎯' },
      { label: 'Downtime Reduced', value: '76%', icon: '📉' },
      { label: 'Annual Savings', value: '$3.8M', icon: '💰' }
    ],
    tags: ['IoT', 'AI/ML', 'Industrial'],
    gradient: 'from-orange-600 to-red-500'
  }
];

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  onClick: () => void;
}

function CaseStudyCard({ study, index, onClick }: CaseStudyCardProps) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-full rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
        theme === 'light'
          ? 'bg-white border border-gray-100'
          : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
      }`}>
        {/* Gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        <div className="relative z-10">
          {/* Industry tag */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-[var(--theme-border)] text-[var(--theme-text-secondary)]'
            }`}>
              {study.industry}
            </span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>

          {/* Client */}
          <div className={`text-sm mb-2 ${
            theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
          }`}>{study.client}</div>

          {/* Title */}
          <h3 className={`text-2xl mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            {study.title}
          </h3>

          {/* Challenge snippet */}
          <p className={`mb-6 line-clamp-2 ${
            theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
          }`}>{study.challenge}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {study.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl mb-1">{metric.icon}</div>
                <div className={`text-lg bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className={`text-xs ${
                  theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
                }`}>{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag, idx) => (
              <span key={idx} className={`px-2 py-1 rounded text-xs ${
                theme === 'light'
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-[var(--theme-border)] text-[var(--theme-text-secondary)]'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className={`flex items-center gap-2 text-sm bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}
          >
            Read Full Story
            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Hover glow */}
        <motion.div
          className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${study.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}

interface CaseStudyModalProps {
  study: CaseStudy;
  onClose: () => void;
}

function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
          theme === 'light' ? 'bg-white' : 'bg-[var(--theme-bg-secondary)]'
        }`}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${study.gradient} p-8 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-sm opacity-90 mb-2">{study.industry}</div>
          <h2 className="text-3xl md:text-4xl mb-2">{study.title}</h2>
          <div className="text-lg opacity-90">{study.client}</div>
        </div>

        {/* Content */}
        <div className={`p-8 ${
          theme === 'light' ? '' : 'text-[var(--theme-text-primary)]'
        }`}>
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {study.metrics.map((metric, idx) => (
              <div key={idx} className={`text-center p-4 rounded-xl ${
                theme === 'light'
                  ? 'bg-gray-50'
                  : 'bg-[var(--theme-bg-primary)]'
              }`}>
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className={`text-2xl mb-1 bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                <div className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
                }`}>{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div className="mb-8">
            <h3 className={`text-2xl mb-3 flex items-center gap-2 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>
              <div className={`w-2 h-8 bg-gradient-to-b ${study.gradient} rounded-full`} />
              The Challenge
            </h3>
            <p className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
            }`}>{study.challenge}</p>
          </div>

          {/* Solution */}
          <div className="mb-8">
            <h3 className={`text-2xl mb-3 flex items-center gap-2 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>
              <div className={`w-2 h-8 bg-gradient-to-b ${study.gradient} rounded-full`} />
              Our Solution
            </h3>
            <p className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
            }`}>{study.solution}</p>
          </div>

          {/* Results */}
          <div className="mb-8">
            <h3 className={`text-2xl mb-4 flex items-center gap-2 ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>
              <div className={`w-2 h-8 bg-gradient-to-b ${study.gradient} rounded-full`} />
              Results & Impact
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {study.results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-start gap-3 p-4 rounded-xl ${
                    theme === 'light'
                      ? 'bg-gray-50'
                      : 'bg-[var(--theme-bg-primary)]'
                  }`}
                >
                  <CheckCircle className={`w-5 h-5 mt-0.5 text-green-500 flex-shrink-0`} />
                  <span className={theme === 'light' ? 'text-gray-700' : 'text-[var(--theme-text-primary)]'}>{result}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag, idx) => (
              <span key={idx} className={`px-4 py-2 bg-gradient-to-r ${study.gradient} text-white rounded-lg text-sm`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CaseStudies() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const industries = ['All', ...Array.from(new Set(caseStudies.map(s => s.industry)))];

  const filteredStudies = filter === 'All'
    ? caseStudies
    : caseStudies.filter(s => s.industry === filter);

  return (
    <div className={`relative py-24 overflow-hidden transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-gradient-to-b from-white to-gray-50'
        : 'bg-gradient-to-b from-[var(--theme-bg-primary)] to-[var(--theme-bg-secondary)]'
    }`}>
      <AnimatedBackgroundCanvas intensity="subtle" />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-2 rounded-full text-sm mb-4 ${
              theme === 'light'
                ? 'bg-green-100 text-green-600'
                : 'bg-green-900/40 text-green-300'
            }`}
          >
            Success Stories
          </motion.div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <span className="block">Proven Results</span>

            <span
              className="block"
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(90deg, #2563eb, #22d3ee)'
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
              Real Impact
            </span>
          </h2>

          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${
            theme === 'light' ? '' : 'text-gray-300'
          }`}>
            Discover how we've helped leading companies transform their operations
            and achieve measurable business outcomes
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setFilter(industry)}
              className={`px-6 py-2 rounded-lg transition-all ${filter === industry
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : theme === 'light'
                    ? 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    : 'bg-[var(--theme-bg-secondary)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-bg-tertiary)] border border-[var(--theme-border-primary)]'
                }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {filteredStudies.map((study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={index}
                onClick={() => setSelectedStudy(study)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Want to become our next success story?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
