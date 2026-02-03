import { CocktailRepository } from '../../data/repositories/CocktailRepository';

export class GetCocktails {
  async execute() {
    return await CocktailRepository.getAllCocktails();
  }
}