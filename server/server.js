const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o middleware CORS
const authRoutes = require('./routes/auth'); // Importa as rotas de autenticação
const subscriptionRoutes = require('./routes/subscriptions'); // Importa as rotas de assinatura
const serviceRoutes = require('./routes/services'); // Importa as rotas de serviços

const app = express(); // Cria a aplicação Express
const PORT = 3001; // Porta do servidor

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// --- ROTAS ---
app.use('/api/auth', authRoutes); // Usa as rotas de autenticação
app.use('/api/subscriptions', subscriptionRoutes); // Usa as rotas de assinatura
app.use('/api/services', serviceRoutes); // Usa as rotas de serviços

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
