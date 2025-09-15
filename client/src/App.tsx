import { useState, useEffect } from 'react';
import { getSubscriptions, type Subscription } from './services/api';
import { SubscriptionForm } from './components/SubscriptionForm';
import { SubscriptionList } from './components/SubscriptionList';
import './App.css';

// Componente principal da aplicação
function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Função para buscar as assinaturas e atualizar o estado
  const fetchSubscriptions = async () => {
    try {
      const subs = await getSubscriptions();
      setSubscriptions(subs);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  // useEffect para buscar os dados iniciais quando o componente montar
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Renderiza o formulário e a lista de assinaturas
  return (
    <>
      <h1>Subscription Manager</h1>
      <div className="card">
        <SubscriptionForm onSubscriptionAdded={fetchSubscriptions} />
      </div>
      <div className="card">
        <SubscriptionList subscriptions={subscriptions} />
      </div>
    </>
  );
}

export default App;
