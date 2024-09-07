"use client";

import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React from "react";
import { Title } from "../title";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
      </DialogContent>
    </Dialog>
  );
};
