import { useState, useEffect, useCallback, useMemo } from "react";
import { SearchCocktails } from "../../domain/usecases/SearchCocktails";
import { GetIngredients } from "../../domain/usecases/GetIngredients";

const EXCLUDED_INGREDIENTS = [
  "collins",
  "coupe",
  "margarita",
  "martini",
  "mixing",
  "old fashioned"
];

export const useSearchViewModel = () => {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [ingredientSearchText, setIngredientSearchText] = useState("");

  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await GetIngredients.execute();

      const validIngredients = data.filter(
        (ing) =>
          ing &&
          ing.name &&
          ing.name.trim() !== "" &&
          !EXCLUDED_INGREDIENTS.includes(ing.name.toLowerCase()),
      );

      const sortedIngredients = validIngredients.sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      setAvailableIngredients(sortedIngredients);
    };
    loadIngredients();
  }, []);

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SearchCocktails.execute({
        name: searchText,
        virgin: activeFilter,
        ingredients: selectedIngredients.map((i) => i.id || i.ingredient_id),
      });
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchText, activeFilter, selectedIngredients]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [performSearch]);

  const addIngredient = (ingredient) => {
    const id = ingredient.id || ingredient.ingredient_id;
    if (!selectedIngredients.find((i) => (i.id || i.ingredient_id) === id)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
    }
    setIngredientSearchText("");
  };

  const removeIngredient = (id) => {
    setSelectedIngredients((prev) =>
      prev.filter((i) => (i.id || i.ingredient_id) !== id),
    );
  };

  const suggestedIngredients = useMemo(() => {
    if (!ingredientSearchText.trim()) return [];

    const lowerSearch = ingredientSearchText.toLowerCase();
    return availableIngredients
      .filter(
        (ing) =>
          ing.name.toLowerCase().includes(lowerSearch) &&
          !selectedIngredients.find(
            (selected) =>
              (selected.id || selected.ingredient_id) ===
              (ing.id || ing.ingredient_id),
          ),
      )
      .slice(0, 5);
  }, [ingredientSearchText, availableIngredients, selectedIngredients]);

  return {
    searchText,
    setSearchText,
    activeFilter,
    setActiveFilter,
    selectedIngredients,
    addIngredient,
    removeIngredient,
    ingredientSearchText,
    setIngredientSearchText,
    suggestedIngredients,
    results,
    loading,
  };
};
