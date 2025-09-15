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
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g., Netflix)"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price (e.g., 39.90)"
        required
      />
      <input
        type="date"
        value={renewalDate}
        onChange={(e) => setRenewalDate(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
