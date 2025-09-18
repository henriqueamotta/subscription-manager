const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o middleware CORS
const { PrismaClient } = require('./generated/prisma'); // Importa o Prisma Client

const prisma = new PrismaClient(); // Cria uma instância do Prisma Client
const app = express(); // Cria uma aplicação Express
const PORT = 3001; // Define a porta do servidor

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota para obter todos os serviços disponíveis (ex: Netflix, Spotify)
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany(); // Busca todos os serviços no banco de dados
    res.json(services); // Retorna os serviços como JSON
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "An error occurred while fetching services." });
  }
});

// Rota para obter todas as assinaturas, incluindo os dados do serviço relacionado
app.get('/api/subscriptions', async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        service: true, // Inclui os dados do serviço (nome, logo, cor) em cada assinatura
      },
    });
    res.json(subscriptions); // Retorna as assinaturas como JSON
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "An error occurred while fetching subscriptions." });
  }
});

// Rota para criar uma nova assinatura, agora baseada em um serviceId
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { serviceId, price, renewalDate } = req.body; // Extrai os dados do corpo da requisição (agora com serviceId)
    const newSubscription = await prisma.subscription.create({
      data: {
        price,
        renewalDate: new Date(renewalDate),
        service: {
          connect: { id: parseInt(serviceId) }, // Conecta a assinatura a um serviço existente pelo seu ID
        },
      },
      include: {
        service: true, // Inclui os dados do serviço na resposta
      },
    });
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
    const { serviceId, price, renewalDate } = req.body; // Extrai os dados do corpo da requisição
    const updatedSubscription = await prisma.subscription.update({
      where: { id: parseInt(id) }, // Encontra a assinatura pelo ID
      data: { // Novos dados para atualizar
        price,
        renewalDate: new Date(renewalDate),
        serviceId: serviceId ? parseInt(serviceId) : undefined, // Permite alterar o serviço se um novo serviceId for fornecido
      },
      include: {
        service: true, // Inclui os dados do serviço na resposta
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
      where: { id: parseInt(id) }, // Encontra e deleta a assinatura pelo ID
    });
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
