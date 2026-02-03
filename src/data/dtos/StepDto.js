export class StepDto {
  constructor(data) {
    this.stepId = data.stepId;
    this.stepNumber = data.stepNumber;
    this.actionId = data.actionId;
    this.description = data.description;
    this.details = {
      ingredient: data.details?.ingredient || null,
      amount: data.details?.amount || null,
      unit: data.details?.unit || null
    };
  }
}