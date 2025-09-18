import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js';

// --- INÍCIO DO PLUGIN ---
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

// Registrando os elementos do ChartJS
ChartJS.register(ArcElement, Tooltip, centerTextPlugin);

// Definindo os tipos para as props do componente
interface ChartDataSet {
  data: number[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
  cutout: string;
}

// Props para o componente SubscriptionChart
interface SubscriptionChartProps {
  chartData: {
    labels: string[];
    datasets: ChartDataSet[];
  };
  chartOptions: ChartOptions<'doughnut'>;
}

// Componente que exibe o gráfico de assinaturas
export const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ chartData, chartOptions }) => {
  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};
