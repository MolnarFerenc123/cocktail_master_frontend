import { CONFIG } from "../../core/config";
import { CocktailListDto } from "../dtos/CocktailListDto";
import { CocktailDetailDto } from "../dtos/CocktailDetailDto";

export const CocktailRemoteDataSource = {
  fetchAllCocktails: async () => {
    const response = await fetch(`${CONFIG.API_URL}/api/cocktails`);
    const json = await response.json();
    return json.map((item) => new CocktailListDto(item));
  },

  fetchCocktailDetails: async (id) => {
    const response = await fetch(`${CONFIG.API_URL}/api/cocktails/${id}`);
    if (!response.ok)
      throw new Error(
        `Network error, while fetching: ${CONFIG.API_URL}/api/cocktails/${id}`,
      );
    const json = await response.json();
    return new CocktailDetailDto(json);
  },

  searchCocktails: async ({ name, virgin, ingredients }) => {
    try {
      const queryParts = [];
      
      if (name && name.trim() !== "") {
        queryParts.push(`name=${encodeURIComponent(name.trim())}`);
      }
      
      if (virgin === "Virgin") {
        queryParts.push(`virgin=true`);
      } else if (virgin === "Alcoholic") {
        queryParts.push(`virgin=false`);
      }
      
      if (ingredients && ingredients.length > 0) {
        queryParts.push(`ingredients=${ingredients.join(",")}`);
      }
      
      const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      const response = await fetch(`${CONFIG.API_URL}/api/cocktails/search${queryString}`);
      
      if (!response.ok) throw new Error("Search failed");
      
      return await response.json();
    } catch (error) {
      console.error("Search API Error:", error);
      return [];
    }
  },

  fetchIngredients: async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/api/cocktails/ingredients`);
      if (!response.ok) throw new Error("Fetching ingredients failed");
      return await response.json();
    } catch (error) {
      console.error("Ingredients API Error:", error);
      return [];
    }
  }
};
