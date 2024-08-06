import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

type IngredientItem = Pick<Ingredient, "id" | "name">;
interface ReturnProps {
  Ingredients: IngredientItem[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
  const [Ingredients, setIngredients] = useState<ReturnProps["Ingredients"]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedIngredients, { toggle }] = useSet(new Set<string>(values));

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

  return { Ingredients, loading, selectedIngredients, onAddId: toggle };
};
