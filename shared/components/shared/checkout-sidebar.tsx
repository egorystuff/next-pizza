import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

const VAT = 0.25;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount }) => {
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итого:</span>
        {loading ? (
          <Skeleton className='h-11 w-48 text-[34px] ' />
        ) : (
          <span className='h-11 text-[34px] font-extrabold'>{totalAmount + DELIVERY_PRICE} BYN</span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Package size={20} className='mr-2 text-gray-300' />
            Стоимость товаров
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-16' /> : `${totalAmount * 0.75}`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Percent size={20} className='mr-2 text-gray-300' />
            НДС
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-16' /> : `${totalAmount * VAT}`}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Truck size={20} className='mr-2 text-gray-300' />
            Доставка
          </div>
        }
        value={loading ? <Skeleton className='h-6 w-10' /> : `${DELIVERY_PRICE}`}
      />

      <Button loading={loading} type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
        Перейти к оплате
        <ArrowRight size={20} className='mr-2' />
      </Button>
    </WhiteBlock>
  );
};
