const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Descreve o conjunto de testes para as rotas de assinaturas
describe('Rotas de Assinaturas / Subscription Routes', () => {
  let token;
  let userId;

  // Antes de todos os testes, cria um usuário e faz login para obter um token
  beforeAll(async () => {
    // Limpa o banco de dados para garantir um ambiente de teste limpo
    await prisma.subscription.deleteMany({});
    await prisma.user.deleteMany({});

    // 1. Cria um usuário de teste
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'subscriptions.test@example.com',
        password: 'password123',
      });

    // 2. Faz login com o usuário de teste para obter o token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'subscriptions.test@example.com',
        password: 'password123',
      });

    token = response.body.token; // Armazena o token para ser usado nos testes

    // Necessário o ID do usuário para verificações no banco de dados
    const user = await prisma.user.findUnique({ where: { email: 'subscriptions.test@example.com' } });
    userId = user.id;
  });

  // Depois de todos os testes, desconecta do banco
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // --- TESTE PARA ROTAS PROTEGIDAS ---
  it('deve falhar ao buscar assinaturas sem um token / should fail to fetch subscriptions without a token', async () => {
    const response = await request(app).get('/api/subscriptions');

    expect(response.statusCode).toBe(401); // 401 Unauthorized
  });

  it('deve retornar uma lista vazia de assinaturas para um novo usuário / should return an empty list of subscriptions for a new user', async () => {
    const response = await request(app)
      .get('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`); // Envia o token no cabeçalho

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Espera que a resposta seja um array
    expect(response.body.length).toBe(0); // O array deve estar vazio
  });

});
