export interface Recipe {
  id: number;
  name: string;
  quantity: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  recipeId: number;
}

export interface Storage {
  recipes: Recipe[];
  ingredients: Ingredient[];
}

export interface ItemQuantity {
  name: string;
  quantity: number;
}