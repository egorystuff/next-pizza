import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

/**
 * Returns list of available pizza sizes for given pizza type
 * @param {PizzaType} type - pizza type
 * @param {ProductItem[]} items - list of products
 * @returns {Array<{name: string, value: number, disabled: boolean}>} list of available pizza sizes
 */
export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    // name of the pizza size
    name: item.name,
    // value of the pizza size
    value: item.value,
    // is pizza size disabled for given type
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
