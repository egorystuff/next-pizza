import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
  <div>
    <h1>Заказ #{orderId}</h1>

    <p>Сумма заказа: {totalAmount} BYN</p>
    <p>
      Для оплаты заказа перейдите <a href={paymentUrl}>по этой ссылке</a>
    </p>
  </div>
);
