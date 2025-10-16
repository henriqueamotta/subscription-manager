const request = require('supertest'); // Importa o Supertest para fazer requisições HTTP
const app = require('../app'); // Importa a aplicação Express

// 'describe' agrupa um conjunto de testes relacionados
describe('Testes da Aplicação Geral / General Application Tests', () => {

  // 'it' ou 'test' define um caso de teste individual
  it('Deve retornar 404 para uma rota inexistente / Should return 404 for a non-existent route', async () => {
    // Supertest faz a requisição para o 'app'
    const response = await request(app)
      .get('/a-route-that-does-not-exist'); // Faz um GET para uma rota aleatória

    // 'expect' é a asserção do Jest. Verificação do resultado.
    expect(response.statusCode).toBe(404); // Espera-se que o status da resposta seja 404
  });
});
