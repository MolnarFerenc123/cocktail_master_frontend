export const mapCocktailListItem = (dto) => {
  return {
    id: dto.id,
    name: dto.name,
    isVirgin: dto.isVirgin === true || dto.isVirgin === 'true',
  };
};

export const mapCocktailDetails = (dto) => {
  const ingredients = [];
  const steps = [];

  if (dto.steps) {
    dto.steps.forEach((step) => {
      steps.push({
        id: step.stepId,
        number: step.stepNumber,
        text: step.description,
      });

      if (step.details && step.details.ingredient) {
        ingredients.push({
          name: step.details.ingredient,
          amount: step.details.amount,
          unit: step.details.unit,
        });
      }
    });
  }

  return {
    id: dto.id,
    name: dto.name,
    isVirgin: dto.isVirgin === true || dto.isVirgin === 'true',
    ingredients: ingredients,
    instructions: steps,
  };
};