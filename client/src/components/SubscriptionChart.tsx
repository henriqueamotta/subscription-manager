import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
} from 'chart.js';
import { type Subscription } from '../services/api';

// --- INÍCIO DO PLUGIN ---
// Plugin para desenhar o texto central no gráfico de rosca
const centerTextPlugin = {
  id: 'centerText',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterDraw: (chart: any) => {
    if (chart.options.plugins?.centerText?.display) {
      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      const text = chart.options.plugins.centerText.text;

      ctx.save();
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.87)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const x = left + width / 2;
      const y = top + height / 2;
      ctx.fillText(text, x, y);
      ctx.restore();
    }
  }
};
// --- FIM DO PLUGIN ---

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin); // Registrando o plugin

// Define a interface para as props do componente
interface SubscriptionChartProps {
  subscriptions: Subscription[];
  totalCost: number;
}

// Geração de cores (sem alteração)
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

// Componente funcional que exibe o gráfico de assinaturas
export const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ subscriptions, totalCost }) => {
  const chartData = {
    labels: subscriptions.map(sub => sub.name),
    datasets: [
      {
        label: 'Cost',
        data: subscriptions.map(sub => sub.price),
        backgroundColor: subscriptions.map(() => generateRandomColor()),
        borderColor: '#1a1a1a',
        borderWidth: 2,
        cutout: '70%',
      },
    ],
  };

  // Opções do gráfico
  const chartOptions: ChartOptions<'doughnut'> & { plugins: { centerText?: { display: boolean, text: string } } } = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
            let label = context.dataset.label || '';
            if (label) { label += ': '; }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      },
      // Passando as opções para o plugin
      centerText: {
        display: true,
        text: totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      }
    },
  };

  return (
    <div style={{ position: 'relative', height: '300px', marginTop: '2rem' }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};
