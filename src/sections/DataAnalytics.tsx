import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAccessibility } from '../hooks/useAccessibility';
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
      className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-900 dark:text-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={analyticsRef}
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-gpu"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Analytics</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Interactive visualizations showcasing my technical skills, project distribution, and development journey
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <SkillsRadarChart />
          </motion.div>

          {/* Technology Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <TechDistributionChart />
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
            <ProjectTimelineChart />
          </motion.div>

          {/* Project Metrics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ProjectMetricsChart />
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
          <Card 
            variant="glass" 
            size="lg" 
            className="backdrop-blur-xl bg-white/80 dark:bg-neutral-800/80"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                Key Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    15+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Projects Completed
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                    8
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Technologies Mastered
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                    2+
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Years of Experience
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DataAnalytics;
