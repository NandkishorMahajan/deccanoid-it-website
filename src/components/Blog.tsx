import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise: 2026 Trends and Predictions',
    excerpt:
      'Explore how artificial intelligence is reshaping enterprise operations, from intelligent automation to predictive analytics.',
    category: 'AI & Machine Learning',
    readTime: '8 min read',
    date: 'Jan 5, 2026',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'Cloud Migration Best Practices: A Complete Guide',
    excerpt:
      'Learn proven strategies for successful cloud migration, including planning, execution, and optimization techniques.',
    category: 'Cloud Computing',
    readTime: '12 min read',
    date: 'Jan 3, 2026',
    featured: true,
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    title: 'Cybersecurity in the Age of Remote Work',
    excerpt:
      'How to protect your organization against emerging threats in distributed work environments.',
    category: 'Security',
    readTime: '6 min read',
    date: 'Dec 28, 2025',
    featured: false,
    gradient: 'from-red-600 to-orange-500'
  },
  {
    id: 4,
    title: 'Building Scalable Microservices Architecture',
    excerpt:
      'A practical guide to designing and implementing microservices that scale with your business.',
    category: 'Software Development',
    readTime: '10 min read',
    date: 'Dec 22, 2025',
    featured: false,
    gradient: 'from-green-600 to-teal-500'
  },
  {
    id: 5,
    title: 'IoT and Edge Computing: The Perfect Partnership',
    excerpt:
      'Discover how edge computing enhances IoT deployments with reduced latency and improved reliability.',
    category: 'IoT',
    readTime: '7 min read',
    date: 'Dec 18, 2025',
    featured: false,
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    id: 6,
    title: 'Data Analytics ROI: Measuring Success',
    excerpt:
      'Key metrics and frameworks for demonstrating the business value of your data analytics initiatives.',
    category: 'Data & Analytics',
    readTime: '9 min read',
    date: 'Dec 15, 2025',
    featured: false,
    gradient: 'from-yellow-600 to-orange-500'
  }
];

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

function BlogCard({ post, index, featured }: BlogCardProps) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  /* ================= FEATURED CARD ================= */
  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group h-full cursor-pointer"
      >
        <div
          className={`h-full rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl ${
            theme === 'light'
              ? 'bg-white border border-gray-100'
              : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
          }`}
        >
          {/* Gradient Header */}
          <div className={`relative h-64 bg-gradient-to-br ${post.gradient}`}>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm flex items-center gap-1 backdrop-blur-sm bg-black/40 text-white">
              <TrendingUp className="w-3 h-3" />
              Featured
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${post.gradient} text-white whitespace-nowrap`}>
                {post.category}
              </span>
              <span className={`flex items-center gap-1 whitespace-nowrap ${
                theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
              }`}>
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
            </div>

            <h3
              className={`text-2xl mb-4 leading-snug transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              {post.title}
            </h3>

            <p
              className={`mb-6 leading-relaxed ${
                theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
              }`}
            >
              {post.excerpt}
            </p>

            <div className="pt-4 flex items-center justify-between border-t ${
              theme === 'light' ? 'border-gray-100' : 'border-[var(--theme-border)]'
            }">
              <span className={`flex items-center gap-1 text-sm ${
                theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
              }`}>
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>

              <div className={`flex items-center gap-2 text-sm ${
                theme === 'light' ? 'text-blue-600' : 'text-cyan-400'
              }`}>
                Read Article
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  theme === 'light' ? 'text-blue-600' : 'text-cyan-400'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ================= REGULAR CARD ================= */
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group h-full cursor-pointer"
    >
      <div
        className={`relative h-full min-h-[340px] rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl ${
          theme === 'light'
            ? 'bg-white border border-gray-100'
            : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
        }`}
      >
        <div className="relative z-10 p-6 md:p-7">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-[var(--theme-border)] text-[var(--theme-text-secondary)]'
            }`}>
              {post.category}
            </span>
            <span className={`flex items-center gap-1 whitespace-nowrap ${
              theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
            }`}>
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>

          <h3
            className={`text-xl mb-4 leading-snug transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`mb-6 line-clamp-2 leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
            }`}
          >
            {post.excerpt}
          </p>

          <div className={`pt-4 flex items-center justify-between border-t ${
            theme === 'light' ? 'border-gray-100' : 'border-[var(--theme-border)]'
          }`}>
            <span className={`flex items-center gap-1 text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
            }`}>
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>

            <div className={`flex items-center gap-2 text-sm ${
              theme === 'light' ? 'text-blue-600' : 'text-cyan-400'
            }`}>
              Read More
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                theme === 'light' ? 'text-blue-600' : 'text-cyan-400'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= BLOG SECTION ================= */
export function Blog() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div
      className={`relative py-24 transition-colors duration-300 ${
        theme === 'light' ? 'bg-white' : 'bg-[var(--theme-bg-primary)]'
      }`}
    >
      <AnimatedBackgroundCanvas intensity="subtle" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} featured />
          ))}
        </div>

        {/* Regular */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + featuredPosts.length} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-xl border-2 bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-gray-50 transition-all"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
