// server/test-prisma.js
const { PrismaClient } = require('@prisma/client');

console.log("Tentando criar uma instância do PrismaClient...");

try {
  const prisma = new PrismaClient();
  console.log("✅ Instância do PrismaClient criada com sucesso!");

  console.log("\nTentando conectar ao banco de dados...");
  prisma.$connect()
    .then(() => {
      console.log("✅ Conexão com o banco de dados bem-sucedida!");
      return prisma.$disconnect();
    })
    .catch((err) => {
      console.error("❌ Falha ao conectar com o banco de dados:", err);
    });

} catch (e) {
  console.error("❌ Falha crítica ao criar a instância do PrismaClient:", e.message);
}
