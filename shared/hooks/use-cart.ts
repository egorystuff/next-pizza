import React from "react";
import { useCartStore } from "../store/cart";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const CartState = useCartStore((state) => state);

  React.useEffect(() => {
    CartState.fetchCartItems();
  }, []);

  return CartState;
};