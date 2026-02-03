export class Ingredient {
  constructor({ name, amount, unit }) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  get formatted() {
    return `${this.amount || ''} ${this.unit || ''} ${this.name}`.trim();
  }
}