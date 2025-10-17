const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// Descreve o conjunto de testes para as rotas de assinaturas
describe('Rotas de Assinaturas / Subscription Routes', () => {
  let token;
  let userId;
  let serviceId;
  let categoryId;

  // Antes de todos os testes, prepara o banco de dados
  beforeAll(async () => {
    // Limpa o banco de dados na ordem correta
    await prisma.subscription.deleteMany({});
    await prisma.service.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});

    // 1. Cria uma categoria e um serviço de teste
    const category = await prisma.category.create({ data: { name: 'Test Category' } });
    categoryId = category.id;
    const service = await prisma.service.create({
      data: {
        name: 'Test Service',
        logoUrl: '/test.svg',
        brandColor: '#ffffff',
        categoryId: categoryId,
      },
    });
    serviceId = service.id;

    // 2. Cria um usuário de teste
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({ email: 'subscriptions.test@example.com', password: 'password123' });
    userId = userResponse.body.id;

    // 3. Faz login para obter o token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'subscriptions.test@example.com', password: 'password123' });
    token = loginResponse.body.token;
  });

  // Depois de todos os testes, desconecta do banco
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // --- TESTES PARA ROTAS PROTEGIDAS ---
  it('deve falhar ao buscar assinaturas sem um token / should fail to fetch subscriptions without a token', async () => {
    const response = await request(app).get('/api/subscriptions');
    expect(response.statusCode).toBe(401);
  });

  it('deve retornar uma lista vazia de assinaturas para um novo usuário / should return an empty list of subscriptions for a new user', async () => {
    const response = await request(app)
      .get('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  // --- TESTE DE CRIAÇÃO (POST) ---
  it('deve criar uma nova assinatura para o usuário logado / should create a new subscription for the logged-in user', async () => {
    const newSubscription = {
      serviceId: serviceId.toString(),
      price: "29.99",
      renewalDate: "2025-11-10",
    };

    const response = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send(newSubscription);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.price).toBe(29.99);
    expect(response.body.serviceId).toBe(serviceId);
    expect(response.body.userId).toBe(userId);
  });

  // --- TESTE DE LEITURA (GET) APÓS CRIAÇÃO ---
  it('deve listar as assinaturas do usuário logado / should list subscriptions for the logged-in user', async () => {
    const response = await request(app)
      .get('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].service.name).toBe('Test Service');
    expect(response.body[0].price).toBe(29.99);
  });

});
