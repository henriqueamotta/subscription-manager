import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LandingPage.css';

export const LandingPage = () => {
  const { token } = useAuth();

  // Redireciona para o dashboard se o usuário já estiver autenticado
  return (
    <div className="landing-container">
      {/* Seção Hero */}
      <header className="hero">
        <h1>Take Control of Your Subscriptions.</h1>
        <p>Centralize your recurring expenses, visualize your costs in an interactive dashboard, and never miss a renewal date again.</p>
        <div className="cta-buttons">
          {/* Mostra botões diferentes se o usuário já estiver logado */}
          {token ? (
            <Link to="/dashboard" className="btn-cta primary">Access my Dashboard</Link>
          ) : (
            <>
              <Link to="/register" className="btn-cta primary">Create Account for Free</Link>
              <Link to="/login" className="btn-cta secondary">Already Have an Account?</Link>
            </>
          )}
        </div>
        <img src="/dashboard-mockup.png" alt="Dashboard do Subscription Manager" className="hero-image" />
      </header>

      {/* Seção de Benefícios */}
      <section className="features">
        <div className="feature-item">
          <svg /* Ícone de Lista */ width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <h3>Centralized Control</h3>
          <p>See all your subscriptions in one place, with clear information about prices and renewal dates.</p>
        </div>
        <div className="feature-item">
          <svg /* Ícone de Gráfico */ width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
          <h3>Visualize Your Spending</h3>
          <p>Understand where your money is going with an interactive chart that shows the distribution of your costs.</p>
        </div>
        <div className="feature-item">
          <svg /* Ícone de Dinheiro */ width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          <h3>Save Money</h3>
          <p>Identify subscriptions you no longer use and avoid unexpected charges with a clear view of your financial commitments.</p>
        </div>
        <div className="feature-item">
          <svg /* Ícone de Escudo */ width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <h3>Safe and Private</h3>
          <p>Your data is protected with modern authentication. Manage your finances with the peace of mind that your information is secure.</p>
        </div>
      </section>

      {/* Seção Final de CTA */}
      <section className="final-cta">
        <h2>{token ? 'Continue where you left off' : 'Ready to organize your finances?'}</h2>
        {token ? (
          <Link to="/dashboard" className="btn-cta primary">Access My Dashboard</Link>
        ) : (
          <Link to="/register" className="btn-cta primary">Get Started</Link>
        )}
      </section>
    </div>
  );
};
