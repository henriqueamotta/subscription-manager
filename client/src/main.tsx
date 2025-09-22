import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute.tsx';
import './index.css';

// Definindo as rotas da aplicação
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Rotas públicas que não precisam de login
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      // Rotas que estão protegidas
      {
        path: '/',
        element: <ProtectedRoute />, // O "segurança" fica aqui
        children: [
          {
            path: '/', // A rota raiz é o dashboard, protegido.
            element: <DashboardPage />,
          },
          // Se houver outras páginas protegidas (ex: /perfil), elas irão aqui
        ]
      },
    ],
  },
]);

// Envolvendo a aplicação com o AuthProvider para fornecer o contexto de autenticação
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
