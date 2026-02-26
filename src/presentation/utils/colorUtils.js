export const ingredientColors = {
  "absinthe": "#84cc16",
  "aged rum": "#b45309",
  "amaretto": "#92400e",
  "amaro nonino": "#b45309",
  "angostura bitters": "#450a0a",
  "aperol": "#ea580c",
  "blended scotch whisky": "#d97706",
  "bourbon whiskey": "#b45309",
  "cachaca": "#f8fafc",
  "campari": "#dc2626",
  "chilled water": "#f0f9ff",
  "coffee liqueur": "#451a03",
  "daiquiri bitters": "#7f1d1d",
  "espresso": "#292524",
  "falernum": "#fef3c7",
  "gin": "#f8fafc",
  "ginger beer": "#fde047",
  "ginger liqueur": "#fcd34d",
  "grapefruit juice": "#fecaca",
  "honey syrup": "#fbbf24",
  "lemon juice": "#fef08a",
  "light rum": "#f8fafc",
  "lime juice": "#d9f99d",
  "maraschino liqueur": "#f8fafc",
  "mezcal": "#f8fafc",
  "orange bitter": "#fdba74",
  "orange curacao": "#f97316",
  "orange juice": "#f59e0b",
  "orgeat syrup": "#fef3c7",
  "peated single malt whisky": "#d97706",
  "pineapple rum": "#fef3c7",
  "prosecco": "#fef08a",
  "rye whiskey": "#b45309",
  "saline solution": "#f8fafc",
  "simple syrup": "#f8fafc",
  "sour cherry juice": "#9f1239",
  "sparkling water": "#f0f9ff",
  "sweet red vermouth": "#7f1d1d",
  "tequila": "#f8fafc",
  "triple sec": "#f8fafc",
  "vodka": "#f8fafc",
  "white creme de menthe": "#f8fafc",
  "wine": "#9f1239",
  "yellow chartreuse": "#eab308"
};

export const mixLiquidColors = (ingredientNames) => {
  if (!ingredientNames || ingredientNames.length === 0) return "#f59e0b";

  let r = 0;
  let g = 0;
  let b = 0;
  let validColorsCount = 0;

  ingredientNames.forEach((name) => {
    const hex = ingredientColors[name.toLowerCase()];
    if (hex) {
      const cleanHex = hex.replace("#", "");
      const cR = parseInt(cleanHex.substring(0, 2), 16);
      const cG = parseInt(cleanHex.substring(2, 4), 16);
      const cB = parseInt(cleanHex.substring(4, 6), 16);

      r += cR;
      g += cG;
      b += cB;
      validColorsCount++;
    }
  });

  if (validColorsCount === 0) return "#f59e0b";

  r = Math.round(r / validColorsCount);
  g = Math.round(g / validColorsCount);
  b = Math.round(b / validColorsCount);

  const toHex = (c) => {
    const hexStr = c.toString(16);
    return hexStr.length === 1 ? "0" + hexStr : hexStr;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const lightenHexColor = (color, percent) => {
  if (!color.startsWith('#')) return color;
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.round(r + (255 - r) * percent));
  g = Math.min(255, Math.round(g + (255 - g) * percent));
  b = Math.min(255, Math.round(b + (255 - b) * percent));

  return `rgb(${r}, ${g}, ${b})`;
};