import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpa o token do contexto e do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Subscription Manager
      </Link>
      <div className="navbar-links">
        {token ? (
          // Se o usuário estiver logado
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        ) : (
          // Se o usuário não estiver logado
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};
