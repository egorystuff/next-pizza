import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type IngredientItem = Pick<Ingredient, "id" | "name">;

export interface ReturnProps {
  Ingredients: IngredientItem[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<ReturnProps["Ingredients"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients.map((ingredient) => ({ id: ingredient.id, name: ingredient.name })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
