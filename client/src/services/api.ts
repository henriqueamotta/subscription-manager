const API_BASE_URL = 'http://localhost:3001/api'; // Base URL da API

// Define as interfaces para tipar os dados
export interface Service {
  id: number;
  name: string;
  logoUrl: string;
  brandColor: string;
}

// Define a interface Subscription para tipar os dados das assinaturas
export interface Subscription {
  id: number;
  price: number;
  renewalDate: string;
  createdAt: string;
  serviceId: number;
  service: Service; // Relação aninhada
}

// Define a interface NewSubscription para criar novas assinaturas
export type NewSubscriptionData = {
  serviceId: number;
  price: number;
  renewalDate: string;
}

// Função para buscar todas as assinaturas
export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

// Função para buscar todas as assinaturas
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`);
  if (!response.ok) {
    throw new Error('Failed to fetch subscriptions');
  }
  return response.json();
};

// Função para criar uma nova assinatura
export const createSubscription = async (subscriptionData: NewSubscriptionData): Promise<Subscription> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }
  return response.json();
};

// Função para atualizar uma assinatura existente
export const updateSubscription = async (id: number, subscriptionData: Partial<NewSubscriptionData>): Promise<Subscription> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) {
    throw new Error('Failed to update subscription');
  }
  return response.json();
};

// Função para deletar uma assinatura
export const deleteSubscription = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete subscription');
  }
};
