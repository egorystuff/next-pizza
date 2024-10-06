import { CheckoutItem, CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

      <div className='flex gap-10'>
        {/* left block */}
        <div className='flex flex-col gap-10 flex-1 mb-20'>
          <WhiteBlock title='1. Корзина'>
            <CheckoutItem
              id={1}
              imageUrl={""}
              details={"сыр пармезан оригинальный 120г"}
              name={"сырная пармезановая"}
              price={35}
              quantity={5}
            />
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
              <span className='h-11 text-[34px] font-extrabold'>40 BYN</span>
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
