const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORS
const authRoutes = require('./routes/auth'); // Importa as rotas de autenticação
const subscriptionRoutes = require('./routes/subscriptions'); // Importa as rotas de assinaturas
const serviceRoutes = require('./routes/services'); // Importa as rotas de serviços
const { PrismaClient } = require('./generated/prisma'); // Importa o Prisma Client

const prisma = new PrismaClient(); // Instancia o Prisma Client
const app = express(); // Cria a aplicação Express

// --- MIDDLEWARES ---
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// --- ROTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/services', serviceRoutes);

app.get('/api/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// Rota padrão para lidar com rotas não encontradas
module.exports = app;
