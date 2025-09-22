const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// Aplica o middleware de autenticação a TODAS as rotas neste arquivo
router.use(authMiddleware);

// GET agora só busca assinaturas do usuário logado
router.get('/', async (req, res) => {
  const userId = req.user.userId;
  const subscriptions = await prisma.subscription.findMany({
    where: { userId: userId },
    include: { service: true },
  });
  res.json(subscriptions);
});

// POST agora cria uma assinatura para o usuário logado
router.post('/', async (req, res) => {
  const userId = req.user.userId;
  const { serviceId, price, renewalDate } = req.body;
  const newSubscription = await prisma.subscription.create({
    data: {
      price,
      renewalDate: new Date(renewalDate),
      service: { connect: { id: parseInt(serviceId) } },
      user: { connect: { id: userId } }, // Conecta ao usuário logado
    },
    include: { service: true },
  });
  res.status(201).json(newSubscription);
});

// ... (PUT e DELETE também serão protegidos no futuro, serão adicionados depois. O middleware já impede o acesso não autenticado.)

module.exports = router;
