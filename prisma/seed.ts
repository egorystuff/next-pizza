import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "John Doe",
        email: "a@b.com",
        password: hashSync("123456", 10),
        verified: new Date(),
        role: "USER",
      },

      {
        fullName: "Jane Smith",
        email: "jane@example.com",
        password: hashSync("654321", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });
}

async function down() {}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}
