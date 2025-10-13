const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Aplica o middleware de autenticação a TODAS as rotas neste arquivo
router.use(authMiddleware);

// GET busca todas as assinaturas do usuário logado
router.get('/', async (req, res) => {
  const userId = req.user.userId;
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: userId },
    include: {
      service: {
        include: {
          category: true
        }
      }
    },
  });
  res.json(subscriptions);
});

// POST cria uma nova assinatura para o usuário logado
router.post('/', async (req, res) => {
  const userId = req.user.userId;
  const { serviceId, price, renewalDate } = req.body; // price aqui é uma string

  try { // Try/catch para melhor tratamento de erro
    const newSubscription = await prisma.subscription.create({
      data: {
        price: parseFloat(price),
        renewalDate: new Date(renewalDate),
        service: { connect: { id: parseInt(serviceId) } },
        user: { connect: { id: userId } },
      },
      include: { service: { include: { category: true } } }
    });
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: "Could not create subscription." });
  }
});

// ... (PUT e DELETE também serão protegidos no futuro, serão adicionados depois. O middleware já impede o acesso não autenticado.)

module.exports = router;
