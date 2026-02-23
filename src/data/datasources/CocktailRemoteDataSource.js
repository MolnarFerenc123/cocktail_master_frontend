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
};
