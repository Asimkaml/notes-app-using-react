import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js"; 

export const withPrisma = (req, res, next) => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  req.prisma = new PrismaClient({ adapter });
  res.on("close", () => req.prisma.$disconnect());
  next();
};