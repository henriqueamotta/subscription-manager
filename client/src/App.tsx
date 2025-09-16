import { useState, useEffect } from 'react';
import { deleteSubscription, getSubscriptions, updateSubscription, type Subscription } from './services/api';
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

  // Função para deletar uma assinatura e atualizar a lista
  const handleDelete = async (id: number) => {
    try {
      await deleteSubscription(id);
      // Remove a assinatura da lista na tela para uma resposta visual imediata
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  // Função para atualizar uma assinatura
  const handleUpdate = async (id: number) => {
    const currentSub = subscriptions.find(sub => sub.id === id);
    if (!currentSub) return;

    // Simples prompt para editar o nome da assinatura
    // Em uma aplicação real, usaríamos um modal ou um formulário dedicado
    const newName = prompt("Enter new name:", currentSub.name);
    if (newName && newName !== currentSub.name) {
      try {
        const updatedData = { ...currentSub, name: newName };
        await updateSubscription(id, updatedData);
        fetchSubscriptions();
      } catch (error) {
        console.error("Error updating subscription:", error);
      }
    }
  };

  // Renderiza o formulário e a lista de assinaturas
  return (
    <>
      <h1>Subscription Manager</h1>
      <div className="card">
        <SubscriptionForm onSubscriptionAdded={fetchSubscriptions} />
      </div>
      <div className="card">
        <SubscriptionList
          subscriptions={subscriptions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default App;
