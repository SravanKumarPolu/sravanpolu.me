import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProjectTimelineChartProps {
  className?: string;
}

const ProjectTimelineChart: React.FC<ProjectTimelineChartProps> = ({ className = '' }) => {
  const { shouldReduceMotion } = useAccessibility();

  const data = {
    labels: [
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
      'Oct 2023',
      'Nov 2023',
      'Dec 2023',
      'Jan 2024',
      'Feb 2024',
      'Mar 2024',
      'Apr 2024',
      'May 2024',
      'Jun 2024',
      'Jul 2024',
      'Aug 2024',
      'Sep 2024',
      'Oct 2024',
      'Nov 2024',
      'Dec 2024'
    ],
    datasets: [
      {
        label: 'Projects Completed',
        data: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 12],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Technologies Learned',
        data: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8],
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
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
              return `Projects: ${context.parsed.y}`;
            } else {
              return `Technologies: ${context.parsed.y}`;
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
          maxTicksLimit: 12,
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(107, 114, 128, 0.7)',
          font: {
            size: 11,
          },
          stepSize: 1,
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
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Development Timeline
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Growth in projects completed and technologies mastered over time
        </p>
      </div>
      <div className="h-80 w-full">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default ProjectTimelineChart;
