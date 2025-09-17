import React, { useMemo } from 'react';
import { type Subscription } from '../services/api';
import { SubscriptionChart } from './SubscriptionChart';

interface DashboardProps {
  subscriptions: Subscription[];
}

export const Dashboard: React.FC<DashboardProps> = ({ subscriptions }) => {
  const totalMonthlyCost = useMemo(() => {
    return subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  }, [subscriptions]);

  return (
    <div>
      <h3>Monthly Summary</h3>
      {/* O texto do custo total foi movido para dentro do gráfico,
          mas podemos mantê-lo aqui também se quisermos. Por enquanto, vamos focar no gráfico. */}

      {subscriptions.length > 0 ? (
        // Passamos o total calculado como uma prop para o gráfico
        <SubscriptionChart subscriptions={subscriptions} totalCost={totalMonthlyCost} />
      ) : (
        <p>Add a subscription to see the chart.</p>
      )}
    </div>
  );
};
