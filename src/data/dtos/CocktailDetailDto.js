import { StepDto } from './StepDto';

export class CocktailDetailDto {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isVirgin = data.isVirgin;
    this.steps = (data.steps || []).map(s => new StepDto(s));
  }
}