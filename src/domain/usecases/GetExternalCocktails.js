import { CocktailRepository } from "../../data/repositories/CocktailRepository";

export const GetExternalCocktails = {
  execute: async () => {
    return await CocktailRepository.getExternalCocktails();
  }
};