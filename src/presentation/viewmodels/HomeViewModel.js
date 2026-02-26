import { useState, useEffect, useMemo } from "react";
import { GetCocktails } from "../../domain/usecases/GetCocktails";
import { GetExternalCocktails } from "../../domain/usecases/GetExternalCocktails";

export const HomeViewModel = () => {
  const [allCocktails, setAllCocktails] = useState([]);
  const [allExternalCocktails, setAllExternalCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const getCocktailsUseCase = new GetCocktails();

  useEffect(() => {
    loadCocktails();
  }, []);

  const loadCocktails = async () => {
    setLoading(true);
    try {
      const [internal, external] = await Promise.all([
        getCocktailsUseCase.execute(),
        GetExternalCocktails.execute(),
      ]);
      setAllCocktails(internal);
      setAllExternalCocktails(external);
    } catch (error) {
      console.error("Failed to load cocktails:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterList = (list) => {
    return list.filter((c) => {
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
  };

  const displayedCocktails = useMemo(() => filterList(allCocktails), [allCocktails, activeFilter]);
  const displayedExternalCocktails = useMemo(() => filterList(allExternalCocktails), [allExternalCocktails, activeFilter]);

  return {
    cocktails: displayedCocktails,
    externalCocktails: displayedExternalCocktails,
    loading,
    activeFilter,
    setActiveFilter,
    reload: loadCocktails,
  };
};