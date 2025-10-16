const app = require('./app'); // Importa a aplicação Express configurada

const PORT = process.env.PORT || 3001;

// Apenas inicia o servidor. A configuração está toda em app.js
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
