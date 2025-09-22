import { useState, type ReactNode } from 'react';
import { AuthContext } from '../hooks/useAuth';

// O componente que "dá vida" ao contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Função para fazer login (salva o token)
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // O valor que será disponibilizado para os componentes que consumirem o contexto
  const value = { token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
