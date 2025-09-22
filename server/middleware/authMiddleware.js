const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // 1. Pega o token do cabeçalho da requisição
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  // 2. Se não houver token, recusa o acesso
  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  // 3. Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden (token inválido ou expirado)
    }

    // 4. Se o token for válido, anexa os dados do usuário na requisição
    req.user = user; // 'user' aqui é o nosso payload { userId: ... }

    // 5. Permite que a requisição continue para a rota final
    next();
  });
}

module.exports = authMiddleware;
