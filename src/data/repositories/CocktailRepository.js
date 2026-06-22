import { CocktailRemoteDataSource } from "../datasources/CocktailRemoteDataSource";
import { CocktailDbRemoteDataSource } from "../datasources/CocktailDbRemoteDataSource";
import { Cocktail } from "../../domain/entities/Cocktail";
import { Ingredient } from "../../domain/entities/Ingredient";
import { Step } from "../../domain/entities/Step";

export const CocktailRepository = {
  getAllCocktails: async () => {
    try {
      const dtos = await CocktailRemoteDataSource.fetchAllCocktails();

      return dtos.map(
        (dto) =>
          new Cocktail({
            id: dto.id,
            name: dto.name,
            isVirgin: dto.isVirgin,
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              dto.name,
            )}&background=random&size=256`,
            ingredients: [],
            steps: [],
            hasAnimation: true,
          }),
      );
    } catch (error) {
      return [];
    }
  },

  getExternalCocktails: async () => {
    try {
      const rawDrinks = await CocktailDbRemoteDataSource.fetchCocktails();

      return rawDrinks.map(
        (drink) =>
          new Cocktail({
            id: `ext_${drink.idDrink}`,
            name: drink.strDrink,
            isVirgin: false,
            imageUrl: drink.strDrinkThumb,
            ingredients: [],
            steps: [],
            hasAnimation: false,
          }),
      );
    } catch (error) {
      return [];
    }
  },

  getCocktailDetails: async (id) => {
    try {
      if (typeof id === "string" && id.startsWith("ext_")) {
        const realId = id.replace("ext_", "");
        const data =
          await CocktailDbRemoteDataSource.fetchCocktailDetails(realId);

        if (!data) return null;

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingName = data[`strIngredient${i}`];
          const ingMeasure = data[`strMeasure${i}`];

          if (ingName && ingName.trim() !== "") {
            ingredients.push(
              new Ingredient({
                name: ingName.trim(),
                amount: ingMeasure ? ingMeasure.trim() : "",
                unit: "",
              }),
            );
          }
        }
        //További transzformációk...

        const steps = [];
        if (data.strInstructions) {
          const rawSentences = data.strInstructions
            .replace(/\b\d+\.(?!\d)\s*/g, "|")
            .replace(/([a-zA-Z])\.\s+/g, "$1.|")
            .split("|");

          rawSentences.forEach((sentence) => {
            let cleanSentence = sentence.trim();

            if (cleanSentence.length > 0) {
              cleanSentence =
                cleanSentence.charAt(0).toUpperCase() + cleanSentence.slice(1);

              if (!cleanSentence.endsWith(".")) {
                cleanSentence += ".";
              }

              steps.push(
                new Step({
                  id: steps.length + 1,
                  actionId: 99,
                  number: steps.length + 1,
                  description: cleanSentence,
                  details: {},
                }),
              );
            }
          });
        }

        return new Cocktail({
          id: id,
          name: data.strDrink,
          isVirgin: data.strAlcoholic === "Non alcoholic",
          imageUrl: data.strDrinkThumb,
          ingredients: ingredients,
          steps: steps,
          hasAnimation: false,
        });
      }

      const dto = await CocktailRemoteDataSource.fetchCocktailDetails(id);
      const ingredients = [];

      dto.steps.forEach((stepDto) => {
        const d = stepDto.details;

        if (d && d.ingredient && stepDto.actionId !== 11) {
          const exists = ingredients.some((i) => i.name === d.ingredient);

          if (!exists) {
            ingredients.push(
              new Ingredient({
                name: d.ingredient,
                amount: d.amount,
                unit: d.unit,
              }),
            );
          }
        }
      });

      const steps = dto.steps.map(
        (s) =>
          new Step({
            id: s.stepId,
            actionId: s.actionId,
            number: s.stepNumber,
            description: s.description,
            details: s.details,
          }),
      );

      return new Cocktail({
        id: dto.id,
        name: dto.name,
        isVirgin: dto.isVirgin,
        imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          dto.name,
        )}&background=random&size=512`,
        ingredients: ingredients,
        steps: steps,
        hasAnimation: true,
      });
    } catch (error) {
      return null;
    }
  },

  searchCocktails: async (filters) => {
    try {
      const dtos = await CocktailRemoteDataSource.searchCocktails(filters);

      return dtos.map(
        (dto) =>
          new Cocktail({
            id: dto.id || dto.cocktail_id,
            name: dto.name,
            isVirgin: dto.isVirgin || dto.virgin,
            imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              dto.name,
            )}&background=random&size=256`,
            ingredients: [],
            steps: [],
            hasAnimation: true,
          }),
      );
    } catch (error) {
      return [];
    }
  },

  getAllIngredients: async () => {
    try {
      return await CocktailRemoteDataSource.fetchIngredients();
    } catch (error) {
      return [];
    }
  },
};
