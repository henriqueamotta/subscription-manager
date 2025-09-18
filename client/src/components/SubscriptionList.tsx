import React from 'react';
import { type Subscription } from '../services/api';

// Define a interface para as props do componente
interface SubscriptionListProps {
  subscriptions: Subscription[]; // Lista de assinaturas a serem exibidas
  onDelete: (id: number) => void; // Callback para deletar uma assinatura
  onEdit: (subscription: Subscription) => void; // Callback para editar uma assinatura
}

// Componente para listar as assinaturas
export const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions, onDelete, onEdit }) => {
  return (
    <div>
      <h3>My Subscriptions</h3>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id} className="subscription-item">
            <span className="subscription-name">
              <img
                src={sub.service.logoUrl}
                alt={`${sub.service.name} logo`}
                className="subscription-logo"
              />
              {sub.service.name}
            </span>
            <span className="subscription-date">
              Renews on: {new Date(sub.renewalDate).toLocaleDateString()}
            </span>
            <div className="btn-group">
              <button onClick={() => onEdit(sub)} className="btn-edit">Edit</button>
              <button onClick={() => onDelete(sub.id)} className="btn-delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
