"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { PizzaImage, GroupVariants, IngredientItem } from "./index";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({ name, items, imageUrl, ingredients, onClickAddCart, className }) => {
  const { size, type, selectedIngredients, availableSizes, setSize, setType, addIngredient } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(size, type, items, ingredients, selectedIngredients);

  const handleClickAddCart = () => onClickAddCart?.();

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#FCFCFC] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetaills}</p>

        <div className='flex flex-col gap-3 mt-3'>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='bg-gray-50 p-5 mt-3 rounded-md h-[420px] overflow-auto scrollbar'>
          <div className='grid grid-cols-3 gap-3 '>
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' onClick={handleClickAddCart}>
          Добавить в корзину за {totalPrice} BYN
        </Button>
      </div>
    </div>
  );
};
