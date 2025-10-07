import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
import './index.css';

// Configuração das Rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Rota Raiz Pública
      {
        path: '/',
        element: <LandingPage />,
      },
      // Rotas de Autenticação Públicas
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      // Rotas Protegidas
      {
        path: '/dashboard', // Define a rota pai como /dashboard
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard', // Rota filha para o dashboard
            element: <DashboardPage />,
          },
        ]
      },
    ],
  },
]);

// Renderização da Aplicação com Provedor de Autenticação e Roteador
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
