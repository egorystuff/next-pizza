import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constants";
import { Prisma, PrismaClient } from "@prisma/client";

// _________________________________________________________________________________________

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

// _________________________________________________________________________________________

// Function to seed the User table with initial data.
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

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl: "/pizza1.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl: "/pizza2.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/pizza3.png",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      { productId: pizza1.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 20 },
      { productId: pizza1.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 30 },
      { productId: pizza1.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 20 },
      { productId: pizza1.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 40 },

      { productId: pizza2.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 20 },
      { productId: pizza2.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 30 },
      { productId: pizza2.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 30 },
      { productId: pizza2.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 40 },

      { productId: pizza3.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 20 },
      { productId: pizza3.id, pizzaType: 1, price: randomDecimalNumber(10, 50), size: 30 },
      { productId: pizza3.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 30 },
      { productId: pizza3.id, pizzaType: 2, price: randomDecimalNumber(10, 50), size: 40 },

      { productId: 1, price: randomDecimalNumber(0, 90) },
      { productId: 2, price: randomDecimalNumber(0, 90) },
      { productId: 3, price: randomDecimalNumber(0, 90) },
      { productId: 4, price: randomDecimalNumber(0, 90) },
      { productId: 5, price: randomDecimalNumber(0, 90) },
      { productId: 6, price: randomDecimalNumber(0, 90) },
      { productId: 7, price: randomDecimalNumber(0, 90) },
      { productId: 8, price: randomDecimalNumber(0, 90) },
      { productId: 9, price: randomDecimalNumber(0, 90) },
      { productId: 10, price: randomDecimalNumber(0, 90) },
      { productId: 11, price: randomDecimalNumber(0, 90) },
      { productId: 12, price: randomDecimalNumber(0, 90) },
      { productId: 13, price: randomDecimalNumber(0, 90) },
      { productId: 14, price: randomDecimalNumber(0, 90) },
      { productId: 15, price: randomDecimalNumber(0, 90) },
      { productId: 16, price: randomDecimalNumber(0, 90) },
      { productId: 17, price: randomDecimalNumber(0, 90) },
    ],
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "token" },
      { userId: 2, totalAmount: 0, token: "token2" },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

/**
 * Clears the User table in the database.
 *
 * This function executes a raw SQL query to truncate the "User" table,
 * which removes all rows from the table and resets the auto-incrementing
 * ID counter to its initial value. The "CASCADE" option is used to
 * automatically delete any associated rows in other tables.
 *
 */
async function down() {
  // Execute the raw SQL query to truncate  tables
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async (e) => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
