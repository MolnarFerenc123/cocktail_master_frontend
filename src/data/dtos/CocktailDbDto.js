import { Cocktail } from "../../domain/entities/Cocktail";

export class CocktailDbDto {
  static toDomain(raw) {
    const cocktail = new Cocktail();
    cocktail.id = `ext_${raw.idDrink}`;
    cocktail.name = raw.strDrink;
    cocktail.imageUrl = raw.strDrinkThumb;
    return cocktail;
  }
}