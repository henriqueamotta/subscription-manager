import React, { useState, useEffect } from 'react';
import { createSubscription, getServices, type Service, type NewSubscriptionData } from '../services/api';

// Props para o componente SubscriptionForm
interface SubscriptionFormProps {
  onSubscriptionAdded: () => void;
}

// Componente para o formulário de adicionar nova assinatura
export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubscriptionAdded }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [price, setPrice] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  // Busca a lista de serviços quando o componente é montado
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
        if (servicesData.length > 0) {
          setSelectedServiceId(servicesData[0].id.toString()); // Pré-seleciona o primeiro
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  // Manipulador de submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subscriptionData: NewSubscriptionData = {
      serviceId: selectedServiceId,
      price: price,
      renewalDate: renewalDate,
    };

    try {
      await createSubscription(subscriptionData);
      onSubscriptionAdded();
      setPrice('');
      setRenewalDate('');
    } catch (error) {
      console.error('Failed to create subscription', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add new subscription</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <div className="select-wrapper">
            <select
              id="service"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              required
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="renewalDate">Renewal Date</label>
          <input
            id="renewalDate"
            type="date"
            value={renewalDate}
            onChange={(e) => setRenewalDate(e.target.value)}
            required
          />
        </div>
        <div className="form-button-container">
          <button type="submit" className="btn-add">Add</button>
        </div>
      </div>
    </form>
  );
};
