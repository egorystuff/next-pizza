"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import {
  CheckoutAdressForm,
  CheckoutCart,
  CheckoutFormSchema,
  CheckoutFormValues,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components/shared";
import toast from "react-hot-toast";

//------------------------------------------------------------------------------------------------------------------------

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Заказ оформлен. Переход к оплате...", { icon: "✅" });

      if (url !== undefined) {
        window.location.href = url;
      } else {
        toast.error("Что-то пошло не так", { icon: "❌" });
      }
    } catch (error) {
      toast.error("Что-то пошло не так", { icon: "❌" });
      setSubmitting(false);
      console.error(error);
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-10'>
      <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            {/* left block */}
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm className={loading ? "opacity-50 pointer-events-none" : ""} />

              <CheckoutAdressForm className={loading ? "opacity-50 pointer-events-none" : ""} />
            </div>

            {/* right block */}

            <div className='w-[450px]'>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
