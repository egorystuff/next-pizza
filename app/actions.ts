"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues, PayOrderTemplate } from "@/shared/components/shared";
import { sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

/**
 * Create new order with user data and cart items
 *
 * @param data - form data from checkout page
 * @returns url for redirect to payment system or undefined if something went wrong
 */
export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies();

    const cartToken = cookiesStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    // find user cart by token
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // create order with user data
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // clear user cart and cart items
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // delete all cart items
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // return url for redirect to payment system

    await sendEmail(
      data.email,
      `NextPizza / Заказ No${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: `https://resend.com/docs/send-with-nextjs`,
      }),
    );

    // return `/payment?orderId=${order.id}`;
    // re_Cazc3DUA_JGrS2sDLASs1n7N8eXkEovRK
  } catch (error) {
    console.error("[createOrder] Server error:", error);
  }
}
