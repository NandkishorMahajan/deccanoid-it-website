import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Target, Lightbulb, Heart, Rocket, Users, Award } from 'lucide-react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Innovation First',
      description: 'We embrace cutting-edge technologies and creative problem-solving',
      color: 'from-yellow-600 to-orange-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Client Success',
      description: 'Your goals drive everything we do, from discovery to delivery',
      color: 'from-red-600 to-pink-500'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We deliver nothing less than world-class quality in every project',
      color: 'from-blue-600 to-cyan-500'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Agility',
      description: 'Fast iteration and adaptive strategies keep you ahead of the curve',
      color: 'from-purple-600 to-indigo-500'
    }
  ];

  const timeline = [
    { year: '2015', event: 'Founded DeccaNoid', description: 'Started with a vision to transform IT services' },
    { year: '2017', event: 'Expanded Globally', description: 'Opened offices in 5 countries' },
    { year: '2019', event: 'AI Innovation Lab', description: 'Launched dedicated AI and ML research division' },
    { year: '2021', event: 'Cloud Excellence', description: 'Achieved AWS and Azure Premier Partner status' },
    { year: '2023', event: 'Industry Recognition', description: 'Named Top 10 IT Service Provider by TechReview' },
    { year: '2025', event: 'Future Ready', description: 'Leading digital transformation across industries' }
  ];

  return (
    <div className="relative py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <motion.div 
        style={{ y }}
        className="absolute right-0 top-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute left-0 bottom-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm mb-4"
          >
            About Us
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="block">Building Tomorrow's</span>
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Technology Today
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another IT company. We're your innovation partner, 
            committed to delivering transformative solutions that drive real business value.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl mb-6">
              A Decade of Digital Excellence
            </h3>
            <p className="text-gray-600 mb-4">
              Founded in 2015, DeccaNoid has grown from a small team of passionate technologists 
              into a global IT powerhouse serving Fortune 500 companies and innovative startups alike.
            </p>
            <p className="text-gray-600 mb-4">
              Our journey has been defined by one constant: an unwavering commitment to pushing 
              the boundaries of what's possible with technology. We don't just follow trends—we create them.
            </p>
            <p className="text-gray-600">
              Today, with offices across 25+ countries and a team of 500+ experts, we continue to 
              lead the industry in cloud solutions, AI innovation, and digital transformation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Users className="w-20 h-20 mx-auto mb-6" />
                  <div className="text-6xl mb-2">500+</div>
                  <div className="text-2xl opacity-90">Expert Team Members</div>
                  <div className="text-lg opacity-75 mt-4">Across 25+ Countries</div>
                </div>
              </div>
              {/* Animated grid overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${value.color} text-white mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                <h4 className="text-xl mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
                
                {/* Hover gradient line */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.color} rounded-b-2xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl text-center mb-12">Our Journey</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-cyan-500 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm mb-2">
                      {item.year}
                    </div>
                    <h4 className="text-xl mb-2">{item.event}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  
                  {/* Center node */}
                  <div className="relative">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 relative z-10"
                      whileHover={{ scale: 1.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 blur-md"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 border border-blue-100">
            <Award className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h3 className="text-2xl md:text-3xl mb-4">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Join hundreds of companies that trust DeccaNoid to power their digital future
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              Partner With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
