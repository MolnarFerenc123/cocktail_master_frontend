const API_KEY = process.env.EXPO_PUBLIC_COCKTAIL_DB_API_KEY || "1";
const BASE_URL = `https://www.thecocktaildb.com/api/json/v2/${API_KEY}`;

export const CocktailDbRemoteDataSource = {
  fetchCocktails: async () => {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=Cocktail`);
      const data = await response.json();
      return data.drinks || [];
    } catch (error) {
      return [];
    }
  },

  fetchCocktailDetails: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.drinks ? data.drinks[0] : null;
    } catch (error) {
      return null;
    }
  },
};