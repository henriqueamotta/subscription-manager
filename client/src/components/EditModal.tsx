import React, { useState, useEffect } from 'react';
import { type Subscription } from '../services/api';

interface EditModalProps {
  subscription: Subscription; // Assinatura a ser editada
  onClose: () => void; // Função para fechar o modal
  onSave: (updatedSub: Subscription) => void; // Função para salvar as alterações
}

export const EditModal: React.FC<EditModalProps> = ({ subscription, onClose, onSave }) => {
  // Estado interno para controlar os dados do formulário
  const [formData, setFormData] = useState(subscription);

  // Efeito para atualizar o formulário se a prop subscription mudar
  useEffect(() => {
    setFormData(subscription);
  }, [subscription]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepara os dados para salvar (convertendo o preço para número)
    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price.toString()),
    };
    onSave(dataToSave);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Subscription</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label>Renewal Date:</label>
          <input
            type="date"
            name="renewalDate"
            value={new Date(formData.renewalDate).toISOString().split('T')[0]}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
