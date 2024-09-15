import { cn } from "@/shared/lib/utils";
import React from "react";

import * as CartItem from "./cart-item-details";

interface Props extends CartItemProps {
  id: number;
  ingredients?: ICartItem["ingredients"];
  pizzaSize?: number | null;
  type?: number | null;
}

export const CartDrawerItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  ingredients,
  pizzaSize,
  type,
  quantity,
  className,
}) => {
  const { updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (type: "plus" | "minus") => {
    updateItemQuantity(id, type === "plus" ? quantity + 1 : quantity - 1);
  };

  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <CartItem.Image src={imageUrl} />

      <div className='flex-1'>
        <CartItemInfo name={name} ingredients={ingredients} pizzaSize={pizzaSize} type={type} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              onClick={() => removeCartItem(id)}
              className='text-gray-400 cursor-pointer hover:text-gray-600'
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
