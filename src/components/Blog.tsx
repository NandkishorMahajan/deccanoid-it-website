import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';

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
    excerpt: 'Explore how artificial intelligence is reshaping enterprise operations, from intelligent automation to predictive analytics.',
    category: 'AI & Machine Learning',
    readTime: '8 min read',
    date: 'Jan 5, 2026',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    title: 'Cloud Migration Best Practices: A Complete Guide',
    excerpt: 'Learn proven strategies for successful cloud migration, including planning, execution, and optimization techniques.',
    category: 'Cloud Computing',
    readTime: '12 min read',
    date: 'Jan 3, 2026',
    featured: true,
    gradient: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    title: 'Cybersecurity in the Age of Remote Work',
    excerpt: 'How to protect your organization against emerging threats in distributed work environments.',
    category: 'Security',
    readTime: '6 min read',
    date: 'Dec 28, 2025',
    featured: false,
    gradient: 'from-red-600 to-orange-500'
  },
  {
    id: 4,
    title: 'Building Scalable Microservices Architecture',
    excerpt: 'A practical guide to designing and implementing microservices that scale with your business.',
    category: 'Software Development',
    readTime: '10 min read',
    date: 'Dec 22, 2025',
    featured: false,
    gradient: 'from-green-600 to-teal-500'
  },
  {
    id: 5,
    title: 'IoT and Edge Computing: The Perfect Partnership',
    excerpt: 'Discover how edge computing enhances IoT deployments with reduced latency and improved reliability.',
    category: 'IoT',
    readTime: '7 min read',
    date: 'Dec 18, 2025',
    featured: false,
    gradient: 'from-indigo-600 to-blue-500'
  },
  {
    id: 6,
    title: 'Data Analytics ROI: Measuring Success',
    excerpt: 'Key metrics and frameworks for demonstrating the business value of your data analytics initiatives.',
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group cursor-pointer h-full"
      >
        <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
          {/* Featured Image Area with Gradient */}
          <div className={`relative h-64 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 rounded-full border-2 border-white/30"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute w-24 h-24 rounded-full border-2 border-white/20"
              />
            </div>

            {/* Featured Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-sm flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Featured
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <span className={`px-3 py-1 bg-gradient-to-r ${post.gradient} text-white rounded-full text-xs`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
            </div>

            <h3 className="text-2xl mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
              {post.title}
            </h3>

            <p className="text-gray-600 mb-4">{post.excerpt}</p>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>

              <motion.div
                className={`flex items-center gap-2 text-sm bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent`}
              >
                Read Article
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer h-full"
    >
      <div className="h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Gradient hover effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </div>

          <h3 className="text-xl mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>

            <motion.div
              className="flex items-center gap-2 text-sm text-blue-600"
            >
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* Hover glow */}
        <motion.div
          className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${post.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="relative py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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
            className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm mb-4"
          >
            Insights & Expertise
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="block">Latest from</span>
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Our Tech Blog
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with industry insights, best practices, and thought leadership 
            from our team of technology experts
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} featured />
          ))}
        </div>

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regularPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + featuredPosts.length} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-gray-50 transition-all duration-300"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
