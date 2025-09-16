import React from 'react';
import { type Subscription } from '../services/api';

// Define a interface para as props do componente
interface SubscriptionListProps {
  subscriptions: Subscription[]; // Lista de assinaturas a serem exibidas
  onDelete: (id: number) => void; // Callback para deletar uma assinatura
  onUpdate: (id: number) => void; // Callback para atualizar uma assinatura
}

// Componente funcional que exibe a lista de assinaturas
export const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onDelete, onUpdate }) => {
  return (
    <div>
      <h3>My Subscriptions</h3>
      <ul>
      {subscriptions.map((sub) => {
        // Mapear e exibir cada assinatura
        return (
          <li key={sub.id}>
            <strong>{sub.name}</strong> - ${sub.price.toFixed(2)} - Renews on: {new Date(sub.renewalDate).toLocaleDateString()}
            <button onClick={() => onUpdate(sub.id)}>Edit</button> {/* Botão para editar a assinatura */}
            <button onClick={() => onDelete(sub.id)}>Delete</button> {/* Botão para deletar a assinatura */}
          </li>
        );
      })}
      </ul>
    </div>
  );
}
