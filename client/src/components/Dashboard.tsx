import React, { useMemo } from 'react';
import { type Subscription } from '../services/api';

interface DashboardProps {
  subscriptions: Subscription[];
}

export const Dashboard: React.FC<DashboardProps> = ({ subscriptions }) => {
  // Utilizando 'useMemo' para otimizar o cálculo (evita que o cálculo do total seja refeito em toda renderização, executando-o apenas quando a lista de assinaturas (subscriptions) for alterada)
  const totalMonthlyCost = useMemo(() => {
    const total = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
    return total;
  }, [subscriptions]);

  return (
    <div>
      <h3>Monthly Summary</h3>
      <p>
        <span>Total Cost: </span>
        <strong>
          {/* Formata o número para a moeda americana (US$) */}
          {totalMonthlyCost.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </strong>
      </p>
    </div>
  );
};
