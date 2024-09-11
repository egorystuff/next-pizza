import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Calculate total price of pizza
 *
 * @param {PizzaSize} size - pizza size
 * @param {PizzaType} type - pizza type
 * @param {ProductItem[]} items - list of products
 * @param {Ingredient[]} ingredients - list of ingredients
 * @param {Set<number>} selectedIngredients - set of selected ingredients id
 *
 * @returns {number} total price of pizza
 */
export const calcTotalPizzaPrice = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[] = [],
  selectedIngredients: Set<number>,
): number => {
  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price ?? 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
