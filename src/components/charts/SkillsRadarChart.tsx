import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsRadarChartProps {
  className?: string;
}

const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ className = '' }) => {
  const { shouldReduceMotion } = useAccessibility();

  const data = {
    labels: [
      'React.js',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'JavaScript',
      'HTML/CSS',
      'Node.js',
      'Git/GitHub'
    ],
    datasets: [
      {
        label: 'Proficiency Level',
        data: [85, 80, 75, 90, 85, 95, 70, 85],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.r}% proficiency`;
          }
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: 'rgba(107, 114, 128, 0.7)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(107, 114, 128, 0.2)',
        },
        pointLabels: {
          color: 'rgba(107, 114, 128, 0.9)',
          font: {
            size: 13,
            weight: 'normal' as const,
          },
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
    },
  };

  return (
    <motion.div
      className={`bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          Technical Skills Proficiency
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Interactive radar chart showing proficiency levels across different technologies
        </p>
      </div>
      <div className="h-80 w-full">
        <Radar data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default SkillsRadarChart;
