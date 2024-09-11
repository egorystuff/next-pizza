import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  setSize: (value: PizzaSize) => void;
  setType: (value: PizzaType) => void;
  addIngredient: (id: number) => void;
}

/**
 * Hook to manage pizza options
 *
 * @param {ProductItem[]} items - list of products
 * @returns {ReturnProps} object with pizza options
 */
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20); // initial pizza size
  const [type, setType] = React.useState<PizzaType>(1); // initial pizza type
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([])); // set of selected ingredients id

  const availableSizes = getAvailablePizzaSizes(type, items); // get available pizza sizes for given pizza type

  // update pizza size when available sizes change
  React.useEffect(() => {
    const isAvailableSize = availableSizes.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availableSizes.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [availableSizes, size, type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  };
};
