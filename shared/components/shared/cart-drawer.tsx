"use client";

import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight, ChartNetworkIcon } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Title } from "./title";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const [totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
  ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <div className={cn("flex flex-col h-full", !totalAmount && "justify-center", className)}>
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                В корзине{" "}
                <span className='font-bold'>
                  {items.length} {items.length === 1 ? "товар" : "товара"}
                </span>
              </SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className='flex flex-col items-center justify-center w-72 mx-auto'>
              <Image src='/empty-box.png' alt='empty-cart' width={200} height={200} />
              <Title size='sm' text='Корзина пуста' className='text-center font-bold my-2' />
              <p className='text-center text-neutral-500 mb-5'>
                Добавьте хотябы один товар в корзину для оформления заказа
              </p>

              <SheetClose>
                <Button className='text-base font-bold'>
                  <ArrowLeft size={20} className='mr-1' /> Назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-5 overflow-auto flex-1'>
                {items.map((item) => (
                  <div key={item.id} className='mb-2'>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={
                        item.pizzaSize && item.pizzaType
                          ? getCartItemDetails(
                              item.ingredients,
                              item.pizzaType as PizzaType,
                              item.pizzaSize as PizzaSize,
                            )
                          : ""
                      }
                      name={item.name}
                      price={item.price}
                      disabled={item.disabled}
                      quantity={item.quantity}
                      onClickCountButton={(type: "plus" | "minus") => onClickCountButton(item.id, item.quantity, type)}
                      onClickRemove={async () => {
                        await removeCartItem(item.id);
                        toast.error(`${item.name} удален из корзины`);
                      }}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className='-mx-6 bg-white p-8'>
                <div className='w-full'>
                  <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                      Итого
                      <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                    </span>

                    <span className='font-bold text-lg'>{totalAmount} BYN</span>
                  </div>

                  <Link href='/cart'>
                    <Button type='submit' className='w-full h-12 text-base'>
                      Оформить заказ
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
