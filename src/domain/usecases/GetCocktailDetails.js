import { CocktailRepository } from '../../data/repositories/CocktailRepository';

export class GetCocktailDetails {
  async execute(id) {
    return await CocktailRepository.getCocktailDetails(id);
  }
}