import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// import { useAccessibility } from '../hooks/useAccessibility';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';
import { 
  SkillsRadarChart, 
  TechDistributionChart, 
  ProjectMetricsChart, 
  ProjectTimelineChart 
} from '../components/charts';
import { Card } from '../components/ui/Card';

const DataAnalytics: React.FC = () => {
  const { ref: analyticsRef, inView } = useScrollAnimation(0.1, true);
  
  // Performance monitoring
  usePerformanceMonitor('DataAnalytics', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true
  });

  return (
    <section
      id="analytics"
      className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden text-white"
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl"
          animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full"
          animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Asymmetrical Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            ref={analyticsRef}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-6">
              <span className="text-cyan-400 text-sm font-medium">Interactive Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Data{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Analytics
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl">
              Interactive visualizations showcasing my technical skills, project distribution, and development journey.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-3xl border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-6xl">📊</div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <SkillsRadarChart />
            </div>
          </motion.div>

          {/* Technology Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <TechDistributionChart />
            </div>
          </motion.div>
        </div>

        {/* Full Width Charts */}
        <div className="space-y-8">
          {/* Project Timeline Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <ProjectTimelineChart />
            </div>
          </motion.div>

          {/* Project Metrics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <ProjectMetricsChart />
            </div>
          </motion.div>
        </div>

        {/* Analytics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-4">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    15+
                  </div>
                  <div className="text-sm text-gray-300">Projects Completed</div>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                    8
                  </div>
                  <div className="text-sm text-gray-300">Technologies Mastered</div>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    2+
                  </div>
                  <div className="text-sm text-gray-300">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataAnalytics;
