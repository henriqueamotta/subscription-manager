import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // Se não houver token, redireciona para a página inicial
    return <Navigate to="/" />;
  }

  // Se houver um token, renderiza o conteúdo da rota filha (o dashboard)
  return <Outlet />;
};
