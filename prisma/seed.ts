// import { PrismaClient } from "@prisma/client";
import { ERole, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash("admin123", 10);
  const passKasir = await bcrypt.hash("kasir123", 10);
  await prisma.user.create({
    data: {
      fullname: "User Admin",
      username: "admin",
      email: "admin@gmail.com",
      password: pass,
      phone: "081122223333",
      address: "My Location",
      role: ERole.ADMIN,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "favicon.ico",
    },
  });
  await prisma.user.create({
    data: {
      fullname: "User Kasir",
      username: "kasir",
      email: "kasir@gmail.com",
      password: pass,
      phone: "082222222222",
      address: "My Location",
      role: ERole.KASIR,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: "favicon.ico",
    },
  });
  console.log("Seeding succeesfully...");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
