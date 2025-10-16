const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Descreve o conjunto de testes para as rotas de autenticação / Authentication Routes
describe('Rotas de Autenticação / Authentication Routes', () => {

  // Antes de todos os testes neste arquivo, limpa as tabelas na ordem correta
  beforeAll(async () => {
    await prisma.subscription.deleteMany({});
    await prisma.user.deleteMany({});
  });

  // Depois de todos os testes, desconecta do banco de dados
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // --- TESTES DE REGISTRO ---
  describe('POST /api/auth/register', () => {

    it('deve registrar um novo usuário com sucesso / should register a new user successfully', async () => {
      const newUser = {
        email: 'testuser@example.com',
        password: 'password123',
      };

      // Faz a requisição para a API
      const response = await request(app)
        .post('/api/auth/register')
        .send(newUser);

      // 1. Verifica a resposta da API
      expect(response.statusCode).toBe(201); // 201 Created
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body).not.toHaveProperty('password'); // Garante que a senha não é retornada

      // 2. Verifica se o usuário foi realmente salvo no banco de dados
      const userInDb = await prisma.user.findUnique({
        where: { email: newUser.email },
      });
      expect(userInDb).not.toBeNull();
      expect(userInDb.email).toBe(newUser.email);

      // 3. Garante que a senha salva no banco foi criptografada
      expect(userInDb.password).not.toBe(newUser.password);
    });

    // --- TESTE DE DUPLICAÇÃO DE EMAIL ---
    it('deve falhar ao registrar um usuário com um email que já existe / should fail to register a user with an existing email', async () => {
      // Primeiro, garantimos que um usuário com este email já foi criado no teste anterior.
      // Agora, tentamos registrar novamente com o mesmo email.
      const duplicateUser = {
        email: 'testuser@example.com',
        password: 'anotherpassword',
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(duplicateUser);

      // Verifica se a API respondeu com o erro correto
      expect(response.statusCode).toBe(400); // 400 Bad Request
      expect(response.body.error).toBe("User with this email already exists.");
    });
    // --- FIM DO TESTE DE DUPLICAÇÃO DE EMAIL ---
  });

});
