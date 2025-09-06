import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TechDistributionChartProps {
  className?: string;
}

const TechDistributionChart: React.FC<TechDistributionChartProps> = ({ className = '' }) => {
  const { shouldReduceMotion } = useAccessibility();

  const data = {
    labels: [
      'React.js',
      'TypeScript', 
      'Next.js',
      'Tailwind CSS',
      'JavaScript',
      'HTML/CSS',
      'Bootstrap',
      'Other'
    ],
    datasets: [
      {
        data: [3, 3, 2, 1, 2, 3, 1, 1],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // React - Blue
          'rgba(49, 196, 141, 0.8)',   // TypeScript - Green
          'rgba(139, 92, 246, 0.8)',   // Next.js - Purple
          'rgba(236, 72, 153, 0.8)',   // Tailwind - Pink
          'rgba(245, 158, 11, 0.8)',   // JavaScript - Yellow
          'rgba(239, 68, 68, 0.8)',    // HTML/CSS - Red
          'rgba(99, 102, 241, 0.8)',   // Bootstrap - Indigo
          'rgba(107, 114, 128, 0.8)',  // Other - Gray
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(49, 196, 141, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: 'rgba(107, 114, 128, 0.9)',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} projects (${percentage}%)`;
          }
        }
      },
    },
    ...(shouldReduceMotion ? {} : {
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000,
        easing: 'easeInOutQuart' as const,
      }
    }),
    interaction: {
      intersect: false,
    },
  };

  return (
    <motion.div
      className={`bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Technology Distribution
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Breakdown of projects by technology stack
        </p>
      </div>
      <div className="h-80 w-full">
        <Pie data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default TechDistributionChart;
