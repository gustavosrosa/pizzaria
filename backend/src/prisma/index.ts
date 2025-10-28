import { PrismaClient } from "@prisma/client";

// Acessar o model do banco de dados
const prismaClient = new PrismaClient();

export default prismaClient;