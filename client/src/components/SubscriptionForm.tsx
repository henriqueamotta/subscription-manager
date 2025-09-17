import React, { useState } from 'react';
import { createSubscription, type NewSubscription } from '../services/api';

interface SubscriptionFormProps {
  onSubscriptionAdded: () => void; // Callback para atualizar a lista de assinaturas após adicionar uma nova
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubscriptionAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subscriptionData: NewSubscription = {
      name,
      price: parseFloat(price),
      renewalDate: new Date(renewalDate).toISOString(),
    };

    try {
      await createSubscription(subscriptionData);
      onSubscriptionAdded(); // Chama o callback (App.tsx)para atualizar a lista
      // Limpa o formulário após a submissão
      setName('');
      setPrice('');
      setRenewalDate('');
    } catch (error) {
      console.error('Failed to create subscription', error);
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    <h3>Add new subscription</h3>
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Netflix"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g., 39.90"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="renewalDate">Renewal Date</label>
        <input
          id="renewalDate"
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
          required
        />
      </div>
      <div className="form-button-container">
        <button type="submit" className="btn-add">Add</button>
      </div>
    </div>
  </form>
);
};
