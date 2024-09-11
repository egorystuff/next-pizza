import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[] = [],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(size, type, items, ingredients, selectedIngredients);
  const textDetaills = `${size} см, ${mapPizzaType[type]} тесто`;

  return { totalPrice, textDetaills };
};
