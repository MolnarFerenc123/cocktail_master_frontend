import { CocktailRepository } from "../../data/repositories/CocktailRepository";

export const GetIngredients = {
  execute: async () => {
    return await CocktailRepository.getAllIngredients();
  },
};
