const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Aplica o middleware de autenticação a TODAS as rotas neste arquivo
router.use(authMiddleware);

// GET - Busca assinaturas do usuário logado
router.get('/', async (req, res) => {
  const userId = req.user.userId;
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: userId },
    include: { service: { include: { category: true } } },
  });
  res.json(subscriptions);
});

// POST - Cria uma assinatura para o usuário logado
router.post('/', async (req, res) => {
  const userId = req.user.userId;
  const { serviceId, price, renewalDate } = req.body;
  const newSubscription = await prisma.subscription.create({
    data: {
      price: parseFloat(price),
      renewalDate: new Date(renewalDate),
      service: { connect: { id: parseInt(serviceId) } },
      user: { connect: { id: userId } },
    },
    include: { service: { include: { category: true } } },
  });
  res.status(201).json(newSubscription);
});

// --- ROTA DE DELETE ---
router.delete('/:id', async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    // Primeiro, verifica se a assinatura a ser deletada pertence ao usuário logado
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subscription || subscription.userId !== userId) {
      // Se não encontrar ou não pertencer ao usuário, retorna 404 para não vazar informação
      return res.status(404).json({ error: "Subscription not found." });
    }

    // Se pertencer, deleta
    await prisma.subscription.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // Retorna sucesso
  } catch (error) {
    res.status(500).json({ error: "Could not delete subscription." });
  }
});

// --- ROTA DE UPDATE ---
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    // ... lógica de atualização ...
    res.json({ message: `Subscription ${id} updated with price ${price}`});
});

module.exports = router;
