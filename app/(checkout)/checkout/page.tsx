"use client";

import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";
import { CheckoutItem, CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

      <div className='flex gap-10'>
        {/* left block */}
        <div className='flex flex-col gap-10 flex-1 mb-20'>
          <WhiteBlock title='1. Корзина'>
            <div className='flex flex-col gap-5'>
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                  )}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type: "plus" | "minus") => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={async () => {
                    await removeCartItem(item.id);
                    toast.error(`${item.name} удален из корзины`);
                  }}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title='2. Персональные данные'>
            <div className='grid grid-cols-2 gap-5'>
              <Input name='firstName' className='text-base' placeholder='Имя' />
              <Input name='lastName' className='text-base' placeholder='Фамилия' />
              <Input name='email' className='text-base' placeholder='E-Mail' />
              <Input name='phone' className='text-base' placeholder='Телефон' />
            </div>
          </WhiteBlock>

          <WhiteBlock title='3. Адрес доставки'>
            <div className='flex flex-col gap-5'>
              <Input name='firstName' className='text-base' placeholder='Адрес' />

              <Textarea name='comment' className='text-base' placeholder='Комментарий к заказу' rows={5} />
            </div>
          </WhiteBlock>
        </div>

        {/* right block */}

        <div className='w-[450px]'>
          <WhiteBlock className='p-6 sticky top-4'>
            <div className='flex flex-col gap-1'>
              <span className='text-xl'>Итого:</span>
              <span className='h-11 text-[34px] font-extrabold'>{totalAmount} BYN</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Package size={20} className='mr-2 text-gray-300' />
                  Стоимость товаров
                </div>
              }
              value='35 BYN'
            />
            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Percent size={20} className='mr-2 text-gray-300' />
                  НДС
                </div>
              }
              value='2 BYN'
            />
            <CheckoutItemDetails
              title={
                <div className='flex items-center'>
                  <Truck size={20} className='mr-2 text-gray-300' />
                  Доставка
                </div>
              }
              value='5 BYN'
            />

            <Button type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
              Перейти к оплате
              <ArrowRight size={20} className='mr-2' />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}
