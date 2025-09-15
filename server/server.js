const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o middleware CORS
const app = express(); // Cria uma aplicação Express
const PORT = 3001; // Define a porta do servidor

app.use(cors()); // Habilita CORS para todas as rotas

// Rota de teste para verificar se o servidor está funcionando
app.get('/api', (req, res) => {
  res.json({ message: "Hello! The Express server is running!" });
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
