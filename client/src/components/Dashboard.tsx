import React, { useMemo, useState } from 'react';
import { type Subscription } from '../services/api';
import { SubscriptionChart } from './SubscriptionChart';
import { ChartLegend } from './ChartLegend';
import { type TooltipItem, type ChartOptions } from 'chart.js';

type ViewMode = 'service' | 'category';

interface DashboardProps {
  subscriptions: Subscription[];
}

// Função auxiliar para gerar cores consistentes para as categorias
const generateCategoryColor = (categoryName: string) => {
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  const color = "00000".substring(0, 6 - c.length) + c;
  return `#${color}`;
};

// Componente que exibe o dashboard com o resumo mensal e gráfico
export const Dashboard: React.FC<DashboardProps> = ({ subscriptions }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('service');

  // Preparando os dados para o gráfico
  const { chartData, totalCost } = useMemo(() => {
    const total = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

    let data;

    if (viewMode === 'service') {
      // LÓGICA DE AGRUPAMENTO POR SERVIÇO
      data = {
        labels: subscriptions.map(sub => sub.service.name),
        datasets: [{
          data: subscriptions.map(sub => sub.price),
          backgroundColor: subscriptions.map(sub => sub.service.brandColor),
          borderColor: '#1a1a1a', borderWidth: 2, cutout: '70%',
        }],
      };
    } else {
      // LÓGICA DE AGRUPAMENTO POR CATEGORIA
      const costsByCategory = subscriptions.reduce((acc, sub) => {
        const categoryName = sub.service.category.name;
        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += sub.price;
        return acc;
      }, {} as Record<string, number>);

      data = {
        labels: Object.keys(costsByCategory),
        datasets: [{
          data: Object.values(costsByCategory),
          backgroundColor: Object.keys(costsByCategory).map(name => generateCategoryColor(name)),
          borderColor: '#1a1a1a', borderWidth: 2, cutout: '70%',
        }],
      };
    }

    return { chartData: data, totalCost: total };
  }, [subscriptions, viewMode]);

  // Callback para formatar o tooltip
  const tooltipLabelCallback = (context: TooltipItem<'doughnut'>) => {
    const label = context.label || '';
    const value = context.parsed;
    if (value === null) return label;
    const percentage = totalCost > 0 ? ((value / totalCost) * 100).toFixed(2) : 0;
    const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    return `${label}: ${formattedValue} (${percentage}%)`;
  };

  // Configurações do gráfico
  const chartOptions: ChartOptions<'doughnut'> & { plugins: { centerText?: { display: boolean, text: string } } } = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: tooltipLabelCallback } },
      centerText: {
        display: true,
        text: totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      }
    },
  };

  return (
    <div>
      <h3>Monthly Summary</h3>
      <div className="view-toggle">
        <button className={viewMode === 'service' ? 'active' : ''} onClick={() => setViewMode('service')}>By Service</button>
        <button className={viewMode === 'category' ? 'active' : ''} onClick={() => setViewMode('category')}>By Category</button>
      </div>
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
