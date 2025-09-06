import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHaptic } from '../hooks/useHaptic';
import { useAccessibility } from '../hooks/useAccessibility';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  icon: string;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend', icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: '🔷', color: 'from-blue-500 to-blue-600' },
  { name: 'Next.js', level: 88, category: 'frontend', icon: '▲', color: 'from-gray-700 to-gray-900' },
  { name: 'Three.js', level: 85, category: 'frontend', icon: '🎮', color: 'from-purple-400 to-pink-400' },
  { name: 'Tailwind CSS', level: 92, category: 'frontend', icon: '🎨', color: 'from-cyan-400 to-blue-500' },
  { name: 'Framer Motion', level: 87, category: 'frontend', icon: '✨', color: 'from-pink-400 to-purple-500' },
  
  // Backend
  { name: 'Node.js', level: 90, category: 'backend', icon: '🟢', color: 'from-green-400 to-green-600' },
  { name: 'Express.js', level: 88, category: 'backend', icon: '🚀', color: 'from-gray-600 to-gray-800' },
  { name: 'MongoDB', level: 85, category: 'backend', icon: '🍃', color: 'from-green-500 to-green-700' },
  { name: 'PostgreSQL', level: 82, category: 'backend', icon: '🐘', color: 'from-blue-600 to-blue-800' },
  { name: 'GraphQL', level: 80, category: 'backend', icon: '🔺', color: 'from-pink-500 to-purple-600' },
  { name: 'REST APIs', level: 93, category: 'backend', icon: '🔗', color: 'from-orange-400 to-red-500' },
  
  // Tools
  { name: 'Git', level: 90, category: 'tools', icon: '📚', color: 'from-orange-500 to-red-600' },
  { name: 'Docker', level: 75, category: 'tools', icon: '🐳', color: 'from-blue-400 to-blue-600' },
  { name: 'AWS', level: 70, category: 'tools', icon: '☁️', color: 'from-orange-400 to-yellow-500' },
  { name: 'Vercel', level: 85, category: 'tools', icon: '▲', color: 'from-gray-600 to-gray-800' },
  { name: 'Figma', level: 80, category: 'tools', icon: '🎨', color: 'from-purple-400 to-pink-500' },
  { name: 'VS Code', level: 95, category: 'tools', icon: '💻', color: 'from-blue-500 to-blue-700' },
  
  // Design
  { name: 'UI/UX Design', level: 85, category: 'design', icon: '🎯', color: 'from-purple-400 to-pink-400' },
  { name: '3D Design', level: 80, category: 'design', icon: '🎮', color: 'from-cyan-400 to-blue-500' },
  { name: 'Animation', level: 88, category: 'design', icon: '✨', color: 'from-pink-400 to-purple-500' },
  { name: 'Prototyping', level: 82, category: 'design', icon: '🔧', color: 'from-orange-400 to-red-500' }
];

const categories = [
  { key: 'frontend', label: 'Frontend', icon: '💻' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'tools', label: 'Tools', icon: '🛠️' },
  { key: 'design', label: 'Design', icon: '🎨' }
];

const SkillsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Skill['category']>('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { triggerHaptic } = useHaptic();
  const { shouldReduceMotion } = useAccessibility();

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  const handleCategoryChange = (category: Skill['category']) => {
    setActiveCategory(category);
    triggerHaptic('light');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across different domains.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              variants={itemVariants}
              onClick={() => handleCategoryChange(category.key as Skill['category'])}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeCategory === category.key
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <span className="text-xl">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.1
                }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                    </div>
                    <span className="text-sm text-gray-300">{skill.level}%</span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: shouldReduceMotion ? 0 : 1.5,
                          delay: shouldReduceMotion ? 0 : index * 0.1 + 0.5
                        }}
                      />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 0.1 : 0
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Technologies', value: skills.length },
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Happy Clients', value: '25+' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
