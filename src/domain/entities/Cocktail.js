export class Cocktail {
  constructor({ id, name, isVirgin, imageUrl, ingredients = [], steps = [] }) {
    this.id = id;
    this.name = name;
    this.isVirgin = isVirgin;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
  }

  get categoryLabel() {
    return this.isVirgin ? 'Alcohol-Free' : 'Alcoholic';
  }

  get sortedSteps() {
    return [...this.steps].sort((a, b) => a.number - b.number);
  }

  get hasDetails() {
    return this.steps.length > 0 || this.ingredients.length > 0;
  }
}