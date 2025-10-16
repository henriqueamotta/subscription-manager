const API_BASE_URL = 'http://localhost:3001/api';

// Função para obter os headers com o token de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Define a interface Category para tipar os dados das categorias
export interface Category {
  id: number;
  name: string;
}

// Define as interfaces para tipos de dados
export interface Service {
  id: number;
  name: string;
  logoUrl: string;
  brandColor: string;
  categoryId: number;
  category: Category; // Relação aninhada com a categoria
}

// Define a interface Subscription para tipar os dados das assinaturas
export interface Subscription {
  id: number;
  price: number;
  renewalDate: string;
  service: Service; // Relação aninhada com o serviço
}

// Define a interface AuthData para tipar os dados de autenticação
export type AuthData = {
  email: string;
  password: string;
};

// Define a interface NewSubscription para criar novas assinaturas
export type NewSubscriptionData = {
  serviceId: string;
  price: string;
  renewalDate: string;
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

// Funções para interagir com a API de serviços e assinaturas
export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
};

// Função para buscar assinaturas
export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch(`${API_BASE_URL}/subscriptions`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error('Failed to fetch subscriptions');
  return response.json();
};

// Função para criar uma nova assinatura
export const createSubscription = async (subscriptionData: NewSubscriptionData): Promise<Subscription> => {
  // Converte os dados para os tipos esperados pela API
  const dataToSend = {
    serviceId: parseInt(subscriptionData.serviceId, 10),
    price: parseFloat(subscriptionData.price),
    renewalDate: new Date(subscriptionData.renewalDate).toISOString(),
  };

  // Validação simples dos dados antes de enviar
  const response = await fetch(`${API_BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(dataToSend),
  });
  if (!response.ok) throw new Error('Failed to create subscription');
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
