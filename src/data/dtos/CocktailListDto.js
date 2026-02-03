export class CocktailListDto {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isVirgin = data.isVirgin;
  }
}