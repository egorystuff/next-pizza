import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за заказ!</h1>

    <p>Ваш заказ #{orderId} успешно оплачен! 🎉 Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price} BYN x {item.quantity} шт. ={" "}
          {item.productItem.price * item.quantity} BYN
        </li>
      ))}
    </ul>
  </div>
);
