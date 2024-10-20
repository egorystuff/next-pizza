import React from "react";
import toast from "react-hot-toast";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props {
  items: CartStateItem[];
  loading?: boolean;
  onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
  removeCartItem: (id: number) => void;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, loading, onClickCountButton, removeCartItem }) => {
  const [localLoading, setLocalLoading] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(false);

  React.useEffect(() => {
    setFirstRender(true);
  }, []);

  React.useEffect(() => {
    if (firstRender) {
      setLocalLoading(false);
    } else {
      setLocalLoading(true);
    }
  }, [loading]);

  return (
    <WhiteBlock className={className} title='1. Корзина'>
      <div className='flex flex-col gap-4'>
        {localLoading && [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

        {!localLoading &&
          items.length > 0 &&
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
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
  );
};
