import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { useTheme } from '../theme/useTheme';
import { AnimatedBackgroundCanvas } from './background/AnimatedBackgroundCanvas';
import { blogPosts, type BlogPost, type BlogContentBlock } from './blogData';

const BLOGS_PER_PAGE = 4;

/* ================= BLOG CARD ================= */
function BlogCard({
  post,
  index,
  onOpen,
}: {
  post: BlogPost;
  index: number;
  onOpen: (post: BlogPost) => void;
}) {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const isLight = theme === 'light';

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(post);
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer h-full"
    >
      <div
        className={`h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${
          isLight
            ? 'bg-white border border-gray-100'
            : 'bg-[var(--theme-bg-secondary)] border border-[var(--theme-border)]'
        }`}
      >
        {/* ================= IMAGE BLOCK (FIXED) ================= */}
        <div className="relative h-56 w-full flex items-center justify-center overflow-hidden">
          {/* background for uniform look */}
          <div
            className={`absolute inset-0 ${
              isLight
                ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                : 'bg-gradient-to-br from-gray-800 to-gray-900'
            }`}
          />

          {/* image (no crop) */}
          <img
            src={post.featuredImage}
            alt={post.title}
            className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/blog-placeholder.svg';
            }}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-6 flex flex-col h-full">
          <div
            className={`flex items-center gap-4 text-xs mb-3 ${
              isLight ? 'text-gray-500' : 'text-[var(--theme-text-secondary)]'
            }`}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h3
            className={`text-xl mb-4 leading-snug transition-all group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`text-sm leading-relaxed line-clamp-3 mb-6 ${
              isLight ? 'text-gray-600' : 'text-[var(--theme-text-secondary)]'
            }`}
          >
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-dashed">
            <span className="text-sm opacity-70">Read Article</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= BLOG MODAL ================= */
function BlogModal({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 30 }}
        className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${
          isLight ? 'bg-white' : 'bg-[var(--theme-bg-secondary)]'
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl">{post.title}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full object-contain bg-black/5"
        />

        <div className="p-6 space-y-5">
          {post.content.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'ul')
              return (
                <ul key={i} className="list-disc ml-6">
                  {block.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================= BLOG SECTION ================= */
export function Blog() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [page, setPage] = useState(1);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const totalPages = Math.ceil(blogPosts.length / BLOGS_PER_PAGE);
  const visibleBlogs = blogPosts.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  return (
    <div className={`relative py-24 ${isLight ? 'bg-white' : 'bg-[var(--theme-bg-primary)]'}`}>
      <AnimatedBackgroundCanvas intensity="subtle" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {visibleBlogs.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                onOpen={setActivePost}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-3 border rounded-xl disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm opacity-70">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-3 border rounded-xl disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activePost && (
          <BlogModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
