import { CONFIG } from '../core/config';
import { mapCocktailListItem, mapCocktailDetails } from './mappers';

export const CocktailApi = {
  getAllCocktails: async () => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/api/cocktails`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      return Array.isArray(data) ? data.map(mapCocktailListItem) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getCocktailDetails: async (id) => {
    try {
      const response = await fetch(`${CONFIG.API_URL}/api/cocktails/${id}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      return mapCocktailDetails(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};