"use client";

import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React from "react";
import { Title } from "../title";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  return (
    <Dialog open={Boolean(product)}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        <Title text={""}>{product.name}</Title>
      </DialogContent>
    </Dialog>
  );
};
