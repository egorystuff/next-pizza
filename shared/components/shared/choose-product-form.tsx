import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  className?: string;
  onSubmit?: VoidFunction;
}

//Form for choose PRODUCT

export const ChooseProductForm: React.FC<Props> = ({ name, imageUrl, price, loading, onSubmit, className }) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className='flex items-center justify-center flex-1 relative w-full'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
        />
      </div>

      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' loading={loading} onClick={onSubmit}>
          Добавить в корзину за {price} BYN
        </Button>
      </div>
    </div>
  );
};
