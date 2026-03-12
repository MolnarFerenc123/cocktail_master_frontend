import { CocktailRepository } from "../../data/repositories/CocktailRepository";

export const SearchCocktails = {
  execute: async (filters) => {
    return await CocktailRepository.searchCocktails(filters);
  },
};
