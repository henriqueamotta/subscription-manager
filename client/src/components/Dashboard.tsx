import React, { useMemo } from 'react';
import { type Subscription } from '../services/api';
import { SubscriptionChart } from './SubscriptionChart';
import { ChartLegend } from './ChartLegend';
import { type TooltipItem, type ChartOptions } from 'chart.js';

interface DashboardProps {
  subscriptions: Subscription[];
}

// Componente que exibe o dashboard com o resumo mensal e gráfico
export const Dashboard: React.FC<DashboardProps> = ({ subscriptions }) => {
  const totalMonthlyCost = useMemo(() => {
    return subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  }, [subscriptions]);

  // Preparando os dados para o gráfico
  const chartData = {
    labels: subscriptions.map(sub => sub.service.name),
    datasets: [
      {
        data: subscriptions.map(sub => sub.price),
        backgroundColor: subscriptions.map(sub => sub.service.brandColor),
        borderColor: '#1a1a1a',
        borderWidth: 2,
        cutout: '70%',
      },
    ],
  };

  // Callback para formatar o tooltip
  const tooltipLabelCallback = (context: TooltipItem<'doughnut'>) => {
    const label = context.label || '';
    const value = context.parsed;

    if (value === null) return label;

    const percentage = totalMonthlyCost > 0 ? ((value / totalMonthlyCost) * 100).toFixed(2) : 0;
    const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    return `${label}: ${formattedValue} (${percentage}%)`;
  };

  // Configurações do gráfico
  const chartOptions: ChartOptions<'doughnut'> & { plugins: { centerText?: { display: boolean, text: string } } } = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: tooltipLabelCallback,
        }
      },
      centerText: {
        display: true,
        text: totalMonthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      }
    },
  };

  return (
    <div>
      <h3>Monthly Summary</h3>
      {subscriptions.length > 0 ? (
        <div className="chart-container">
          <ChartLegend data={chartData} />
          <SubscriptionChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      ) : (
        <p>Add a subscription to see the chart.</p>
      )}
    </div>
  );
};
