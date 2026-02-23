import { useState, useEffect, useMemo } from "react";
import { GetCocktails } from "../../domain/usecases/GetCocktails";

export const HomeViewModel = () => {
  const [allCocktails, setAllCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const getCocktailsUseCase = new GetCocktails();

  useEffect(() => {
    loadCocktails();
  }, []);

  const loadCocktails = async () => {
    setLoading(true);
    try {
      const data = await getCocktailsUseCase.execute();
      setAllCocktails(data);
    } catch (error) {
      console.error("Failed to load cocktails:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayedCocktails = useMemo(() => {
    return allCocktails.filter((c) => {
      switch (activeFilter) {
        case "All":
          return true;
        case "Virgin":
          return c.isVirgin;
        case "Alcoholic":
          return !c.isVirgin;
        case "Vodka":
        case "Rum":
        case "Gin":
        case "Tequila":
        case "Whiskey":
          return true;
        default:
          return true;
      }
    });
  }, [allCocktails, activeFilter]);

  return {
    cocktails: displayedCocktails,
    loading,
    activeFilter,
    setActiveFilter,
    reload: loadCocktails,
  };
};
