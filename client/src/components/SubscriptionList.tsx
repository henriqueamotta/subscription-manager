import React from 'react';
import { type Subscription } from '../services/api';

// Define a interface para as props do componente
interface SubscriptionListProps {
  subscriptions: Subscription[];
}

// Componente funcional que exibe a lista de assinaturas
export const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions }) => {
  return (
    <div>
      <h3>My Subscriptions</h3>
      <ul>
      {subscriptions.map((sub) => (
        <li key={sub.id}>
          <strong>{sub.name}</strong> - ${sub.price.toFixed(2)} - Renews on: {new Date(sub.renewalDate).toLocaleDateString()}
        </li>
      ))}
      </ul>
    </div>
  );
}
