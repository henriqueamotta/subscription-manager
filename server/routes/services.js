const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        name: 'asc', // 'asc' para ordem ascendente (A-Z)
      },
    });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Could not fetch services." });
  }
});

module.exports = router;
