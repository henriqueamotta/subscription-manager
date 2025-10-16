import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { createSubscription, getServices, type Service, type NewSubscriptionData } from '../services/api';

// A biblioteca react-select espera um formato específico para as opções
interface SelectOption {
  value: number;
  label: string;
}

// Props para o componente SubscriptionForm
interface SubscriptionFormProps {
  onSubscriptionAdded: () => void;
}

// Componente para o formulário de adicionar nova assinatura
export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubscriptionAdded }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const [price, setPrice] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  // Busca a lista de serviços quando o componente é montado
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error("Failed to fetch services for form", error);
      }
    };
    fetchServices();
  }, []);

  // Formata os serviços para o formato que o react-select precisa
  const serviceOptions: SelectOption[] = services.map(service => ({
    value: service.id,
    label: service.name,
  }));

  // Manipulador de submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return; // Garante que uma opção foi selecionada

    const subscriptionData: NewSubscriptionData = {
      serviceId: selectedOption.value.toString(),
      price: price,
      renewalDate: renewalDate,
    };

    try {
      await createSubscription(subscriptionData);
      onSubscriptionAdded();
      setSelectedOption(null); // Limpa o campo de seleção
      setPrice('');
      setRenewalDate('');
    } catch (error) {
      console.error('Failed to create subscription', error);
    }
  };

  // Estilos customizados para combinar com nosso tema escuro
  const customStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#333',
      borderColor: 'transparent',
      color: 'white',
      height: '38px',
      minHeight: '38px',
      // Adiciona um alinhamento para o ícone de seta
      boxShadow: 'none',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueContainer: (provided: any) => ({
      ...provided,
      height: '38px',
      padding: '0 8px' // Remove o padding vertical que causava o desalinhamento
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: (provided: any) => ({
      ...provided,
      margin: '0px',
      color: 'white',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '38px',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#333',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#535bf2' : state.isFocused ? '#444' : '#333',
      color: 'white',
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add new subscription</h3>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="service">Service</label>
          {/* 5. Substituindo o <select> pelo componente <Select> */}
          <Select
            id="service"
            options={serviceOptions}
            value={selectedOption}
            onChange={(option) => setSelectedOption(option as SelectOption)}
            styles={customStyles}
            placeholder="Type or select a service..."
            isClearable
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="renewalDate">Renewal Date</label>
          <input id="renewalDate" type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} required />
        </div>
        <div className="form-button-container">
          <button type="submit" className="btn-add">Add</button>
        </div>
      </div>
    </form>
  );
};
