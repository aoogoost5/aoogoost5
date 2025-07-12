import React, { useState } from 'react';
import { Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export function WuxingPieChart({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#4CAF50', // 木
          '#F44336', // 火
          '#795548', // 土
          '#9E9E9E', // 金
          '#2196F3'  // 水
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '五行分布',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export function WuxingRadarChart({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: '五行强度',
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: Math.max(...Object.values(data)) + 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
}

export default function WuxingCharts({ data }) {
  const [chartType, setChartType] = useState('pie');

  const elementCounts = {
    '木': data.filter(element => element === '木').length,
    '火': data.filter(element => element === '火').length,
    '土': data.filter(element => element === '土').length,
    '金': data.filter(element => element === '金').length,
    '水': data.filter(element => element === '水').length,
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setChartType('pie')}
          className={`px-4 py-2 rounded ${
            chartType === 'pie'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          饼图
        </button>
        <button
          onClick={() => setChartType('radar')}
          className={`px-4 py-2 rounded ${
            chartType === 'radar'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          雷达图
        </button>
      </div>
      <div className="w-full max-w-md mx-auto">
        {chartType === 'pie' ? (
          <WuxingPieChart data={elementCounts} />
        ) : (
          <WuxingRadarChart data={elementCounts} />
        )}
      </div>
    </div>
  );
} 