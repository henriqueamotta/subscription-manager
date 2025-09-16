import { useState, useEffect } from 'react';
import { getSubscriptions, deleteSubscription, updateSubscription, type Subscription } from './services/api';
import { SubscriptionForm } from './components/SubscriptionForm';
import { SubscriptionList } from './components/SubscriptionList';
import { EditModal } from './components/EditModal';
import './App.css';

// Componente principal da aplicação
function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]); // Estado para armazenar a lista de assinaturas
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null); // Estado para controlar a assinatura sendo editada

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
  const handleSaveEdit = async (updatedSub: Subscription) => {
    try {
      await updateSubscription(updatedSub.id, updatedSub);
      setEditingSubscription(null); // Fecha o modal de edição
      fetchSubscriptions(); // Recarrega a lista de assinaturas
    } catch (error) {
      console.error("Error updating subscription:", error);
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
          onEdit={setEditingSubscription}
        />
      </div>

      {/* Renderiza o modal de edição se houver uma assinatura sendo editada */}
      {editingSubscription && (
        <EditModal
          subscription={editingSubscription}
          onClose={() => setEditingSubscription(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}

export default App;
