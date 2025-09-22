const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();
const router = express.Router();

// ROTA: POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // 1. Verifica se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // 2. Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    // 3. Criptografa a senha (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o "custo" do hash (um bom padrão)

    // 4. Salva o novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 5. Retorna uma resposta de sucesso (sem a senha)
    res.status(201).json({ id: user.id, email: user.email });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
});

// ROTA: POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Verifica se o email e a senha foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // 2. Procura o usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." }); // 401 Unauthorized
    }

    // 3. Compara a senha fornecida com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 4. Gera um token JWT
    const payload = { userId: user.id };
    // 'Assinatura' do token com a chave secreta (JWT_SECRET) e tempo de expiração
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h' // 1 hora de validade
    });

    // 5. Retorna o token para o cliente
    res.json({ token });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

module.exports = router;
