import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { token, logout } = useAuth();

  const handleLogout = () => {
     logout();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Subscription Manager
      </Link>
      <div className="navbar-links">
        {token ? (
          // Se o usuário estiver logado
          <>
            <Link to="/dashboard">My Dashboard</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
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
