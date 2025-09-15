const API_BASE_URL = 'http://localhost:3001/api'; // Base URL da API

// Define a interface Subscription para tipar os dados das assinaturas
export interface Subscription {
  id: number;
  name: string;
  price: number;
  renewalDate: string;
  createdAt: string;
}

// Define a interface NewSubscription para tipar os dados ao criar uma nova assinatura
export type NewSubscription = Omit<Subscription, 'id' | 'createdAt'>;

// Função para buscar todas as assinaturas
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`);
  if (!response.ok) {
    throw new Error('Failed to fetch subscriptions');
  }
  return response.json();
};

// Função para criar uma nova assinatura
export const createSubscription = async (subscription: NewSubscription): Promise<Subscription> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }
  return response.json();
};
