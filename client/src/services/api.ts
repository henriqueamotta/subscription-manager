const API_BASE_URL = 'http://localhost:3001/api'; // Base URL da API

// Função para obter os headers de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

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

// Função para buscar todos os serviços
export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

// Função para buscar todas as assinaturas
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch subscriptions');
  }
  return response.json();
};

// Função para criar uma nova assinatura
export const createSubscription = async (subscriptionData: NewSubscriptionData): Promise<Subscription> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: getAuthHeaders(),
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

// Define a interface AuthData para tipar os dados de autenticação
export type AuthData = {
  email: string;
  password: string;
};

// Função para registrar um novo usuário
export const registerUser = async (data: AuthData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Tenta extrair a mensagem de erro do backend
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to register');
  }
  return response.json();
};

// Função para logar um usuário
export const loginUser = async (data: AuthData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to login');
  }
  return response.json(); // Retorna { token: "..." }
};
