import { CocktailRemoteDataSource } from '../datasources/CocktailRemoteDataSource';
import { Cocktail } from '../../domain/entities/Cocktail';
import { Ingredient } from '../../domain/entities/Ingredient';
import { Step } from '../../domain/entities/Step';

export const CocktailRepository = {
  getAllCocktails: async () => {
    try {
      const dtos = await CocktailRemoteDataSource.fetchAllCocktails();
      
      return dtos.map(dto => new Cocktail({
        id: dto.id,
        name: dto.name,
        isVirgin: dto.isVirgin,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(dto.name)}&background=random&size=256`,
        ingredients: [],
        steps: [],
        hasAnimation: true
      }));
    } catch (error) {
      console.error("Repo Error (List):", error);
      return [];
    }
  },

  getCocktailDetails: async (id) => {
    try {
      const dto = await CocktailRemoteDataSource.fetchCocktailDetails(id);

      const ingredients = [];
      
      dto.steps.forEach(stepDto => {
        const d = stepDto.details;
        
        if (d && d.ingredient && stepDto.actionId !== 11) {
            
            const exists = ingredients.some(i => i.name === d.ingredient);
            
            if (!exists) {
                ingredients.push(new Ingredient({
                  name: d.ingredient,
                  amount: d.amount,
                  unit: d.unit
                }));
            }
        }
      });

      const steps = dto.steps.map(s => new Step({
        id: s.stepId,
        actionId: s.actionId,
        number: s.stepNumber,
        description: s.description,
        details: s.details
      }));

      return new Cocktail({
        id: dto.id,
        name: dto.name,
        isVirgin: dto.isVirgin,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(dto.name)}&background=random&size=512`,
        ingredients: ingredients,
        steps: steps,
        hasAnimation: true
      });

    } catch (error) {
      console.error("Repo Error (Details):", error);
      return null;
    }
  }
};