const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o middleware CORS
const { PrismaClient } = require('./generated/prisma'); // Importa o Prisma Client

const prisma = new PrismaClient(); // Cria uma instância do Prisma Client
const app = express(); // Cria uma aplicação Express
const PORT = 3001; // Define a porta do servidor

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota para obter todas as assinaturas
app.get('/api/subscriptions', async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany(); // Busca todas as assinaturas no banco de dados
    res.json(subscriptions); // Retorna as assinaturas como JSON
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "An error occurred while fetching subscriptions." });
  }
});

// Rota para criar uma nova assinatura
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { name, price, renewalDate } = req.body; // Extrai os dados do corpo da requisição
    const newSubscription = await prisma.subscription.create({
      data: {
        name,
        price,
        renewalDate: new Date(renewalDate),
      },
    }); // Cria uma nova assinatura no banco de dados
    res.status(201).json(newSubscription); // Retorna a nova assinatura como JSON
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "An error occurred while creating the subscription." });
  }
});

// Rota para atualizar uma assinatura existente
app.put('/api/subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID da assinatura dos parâmetros da rota
    const { name, price, renewalDate } = req.body; // Extrai os dados do corpo da requisição
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(id) }, // Encontra a assinatura pelo ID
      data: { // Novos dados para atualizar
        name,
        price,
        renewalDate: new Date(renewalDate),
      },
    });
    res.json(updatedSubscription); // Retorna a assinatura atualizada como JSON
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ error: "An error occurred while updating the subscription." });
  }
});

// Rota para deletar uma assinatura
app.delete('/api/subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID da assinatura dos parâmetros da rota
    await prisma.subscription.delete({
      where: { id: parseInt(id) }, // Encontra a assinatura pelo ID
    }); // Deleta a assinatura do banco de dados
    res.status(204).end(); // Retorna status 204 (No Content)
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ error: "An error occurred while deleting the subscription." });
  }
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
