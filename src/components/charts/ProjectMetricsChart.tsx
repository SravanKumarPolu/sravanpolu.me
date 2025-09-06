import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectMetricsChartProps {
  className?: string;
}

const ProjectMetricsChart: React.FC<ProjectMetricsChartProps> = ({ className = '' }) => {
  const { shouldReduceMotion } = useAccessibility();

  const data = {
    labels: [
      'ChronoBloom',
      'Boostlly',
      'GYM App',
      'Quizlet Clone',
      'Timer App',
      'Dropbox Demo',
      'VanLife',
      'Nike Clone',
      'Stripe Demo',
      '3D Cube',
      'Solar System',
      'Card Demo',
      'Buy Me',
      'Netflix Clone',
      'OTP Project'
    ],
    datasets: [
      {
        label: 'Complexity Score',
        data: [85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Lines of Code (est.)',
        data: [2500, 2200, 1800, 1600, 1200, 1000, 800, 600, 500, 400, 300, 200, 150, 100, 50],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(107, 114, 128, 0.9)',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
          usePointStyle: true,
          padding: 20,
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
            if (context.datasetIndex === 0) {
              return `Complexity: ${context.parsed.y}/100`;
            } else {
              return `Lines of Code: ~${context.parsed.y}`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(107, 114, 128, 0.7)',
          font: {
            size: 10,
          },
          maxRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(107, 114, 128, 0.7)',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
    },
    ...(shouldReduceMotion ? {} : {
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart' as const,
      }
    }),
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <motion.div
      className={`bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Project Metrics & Complexity
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Comparison of project complexity and estimated code volume
        </p>
      </div>
      <div className="h-96 w-full">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default ProjectMetricsChart;
