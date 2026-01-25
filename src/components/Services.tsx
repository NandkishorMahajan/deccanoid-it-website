import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Cloud,
  Code,
  Database,
  Shield,
  Smartphone,
  Bot,
  Network,
  BarChart,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const services: Service[] = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services for modern enterprises',
    features: ['AWS & Azure Migration', 'Cloud Architecture', 'DevOps Integration', 'Cost Optimization'],
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Custom Development',
    description: 'Tailored software solutions built with cutting-edge technologies',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Legacy Modernization'],
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Data Engineering',
    description: 'Transform raw data into actionable insights with our analytics platform',
    features: ['Data Pipelines', 'Big Data Solutions', 'Real-time Analytics', 'Data Warehousing'],
    gradient: 'from-green-600 to-teal-500'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets',
    features: ['Security Audits', 'Penetration Testing', 'Compliance Management', '24/7 Monitoring'],
    gradient: 'from-red-600 to-orange-500'
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'AI & Machine Learning',
    description: 'Intelligent automation and predictive analytics powered by AI',
    features: ['ML Model Development', 'Process Automation', 'Natural Language Processing', 'Computer Vision'],
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Mobile Solutions',
    description: 'Native and cross-platform mobile applications that users love',
    features: ['iOS & Android', 'React Native', 'Flutter Development', 'App Modernization'],
    gradient: 'from-pink-600 to-rose-500'
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: 'IoT Solutions',
    description: 'Connect and manage devices at scale with our IoT platform',
    features: ['Device Management', 'Edge Computing', 'IoT Analytics', 'Predictive Maintenance'],
    gradient: 'from-cyan-600 to-blue-500'
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: 'Digital Transformation',
    description: 'Strategic consulting to modernize your business operations',
    features: ['Process Optimization', 'Change Management', 'Technology Roadmap', 'Innovation Strategy'],
    gradient: 'from-yellow-600 to-orange-500'
  }
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Card */}
      <motion.div
        className={`h-full rounded-2xl p-8 shadow-lg border relative overflow-hidden transition-colors ${
          theme === 'light'
            ? 'bg-white border-gray-100'
            : 'bg-[var(--theme-bg-secondary)] border-[var(--theme-border-primary)]'
        }`}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} ${
            theme === 'light' ? 'opacity-0 group-hover:opacity-5' : 'opacity-0 group-hover:opacity-10'
          } transition-opacity duration-300`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6`}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className={`text-2xl mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
                className={`flex items-center gap-2 text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            className={`flex items-center gap-2 text-sm bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
          >
            Learn More
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl ${
            theme === 'light'
              ? 'opacity-0 group-hover:opacity-20'
              : 'opacity-0 group-hover:opacity-15'
          } transition-opacity duration-500`}
        />
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();

  return (
    <div className={`relative py-24 overflow-hidden transition-colors duration-500 ${
      theme === 'light'
        ? 'bg-gradient-to-b from-gray-50 to-white'
        : 'bg-gradient-to-b from-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)]'
    }`}>
      <AnimatedBackgroundCanvas intensity="subtle" />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${
          theme === 'light'
            ? 'bg-blue-500/5'
            : 'bg-blue-500/10'
        }`} />
        <div className={`absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl ${
          theme === 'light'
            ? 'bg-cyan-500/5'
            : 'bg-cyan-500/10'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-2 rounded-full text-sm mb-4 ${
              theme === 'light'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-blue-500/20 text-blue-300'
            }`}
          >
            Our Services
          </motion.div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.15] ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            <span className="block">Enterprise Solutions</span>

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
              Built for Scale
            </span>
          </h2>

          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Comprehensive technology services designed to accelerate your digital transformation
            and drive measurable business outcomes
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Need a custom solution tailored to your business?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-xl hover:shadow-2xl transition-all duration-300"
          >
            Discuss Your Project
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
