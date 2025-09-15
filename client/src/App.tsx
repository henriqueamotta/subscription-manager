import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 'useState' para armazenar a mensagem que vem do backend
  const [message, setMessage] = useState('');

  // 'useEffect' para executar a busca de dados quando o componente carregar
  useEffect(() => {
    // A URL completa da API no backend
    fetch('http://localhost:3001/api')
      .then(response => response.json())
      .then(data => {
        // Atualiza o estado com a mensagem recebida
        setMessage(data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
        setMessage("Failed to connect to the server.");
      });
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <>
      <h1>Subscription Manager</h1>
      <div className="card">
        {/* Exibe a mensagem do estado. Começará vazia e será preenchida após a chamada da API */}
        <p>{message || "Loading message from server..."}</p>
      </div>
    </>
  );
}

export default App;
