import { Component, OnInit } from '@angular/core';
import { MultiSet } from 'mnemonist';
import { Ingredient, ItemQuantity, Recipe, Storage } from './model';

let recipeId = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  recipes: RecipeRow[] = [];
  requests: RequestRow[] = [];

  constructor() { }

  ngOnInit() {
    const data: Storage = JSON.parse(localStorage.getItem('data') || 'null') || {
      recipes: [],
      ingredients: [],
    };

    let lastRecipeId = 0;
    for (const recipe of data.recipes) {
      const recipeRow = new RecipeRow(recipe);
      for (const ingredient of data.ingredients.filter(e => e.recipeId === recipe.id)) {
        recipeRow.ingredients.push(new IngredientRow(ingredient));
      }
      if (recipe.id > lastRecipeId) {
        lastRecipeId = recipe.id;
      }
      this.recipes.push(recipeRow);
    }
    recipeId = lastRecipeId + 1;

    window.addEventListener('beforeunload', () => {
      const data: Storage = {
        recipes: [],
        ingredients: [],
      };

      for (const recipe of this.recipes) {
        data.recipes.push(recipe.recipe);
        for (const ingredient of recipe.ingredients) {
          data.ingredients.push(ingredient.ingredient);
        }
      }

      localStorage.setItem('data', JSON.stringify(data));
    });
  }

  get items() {
    const items = new Set<string>();
    for (const recipe of this.recipes) {
      items.add(recipe.name);
      for (const ingredient of recipe.ingredients) {
        items.add(ingredient.name);
      }
    }
    return Array.from(items).sort();
  }

  addRecipe() {
    this.recipes.push(new RecipeRow({
      id: recipeId++,
      name: '',
      quantity: 1,
    }));
  }

  deleteRecipe(recipe: RecipeRow) {
    remove(this.recipes, recipe);
  }

  addRequestRow() {
    this.requests.push(new RequestRow());
  }

  deleteRequestRow(request: RequestRow) {
    remove(this.requests, request);
  }

  get output() {
    if (this.requests.length === 0) {
      return '';
    }

    const rawResources = new MultiSet<string>();
    const q: string[] = [];
    const inventory = new MultiSet<string>();
    const steps = new MultiSet<string>();
    const stepSorted: string[] = [];

    for (const request of this.requests) {
      for (let i = 0; i < request.quantity; i++) {
        q.push(request.name);
      }
      for (let i = 0; i > request.quantity; i--) {
        inventory.add(request.name);
      }
    }

    while (q.length > 0) {
      const item = q.shift()!;

      // If item already exists in inventory, skip expanding subgraph
      if (inventory.has(item)) {
        inventory.remove(item);
        continue;
      }

      // If item is a raw resource, add to raw resources list
      const recipe = this.recipes.find(e => e.name === item);
      if (!recipe) {
        rawResources.add(item);
        continue;
      }

      // If recipe produces multiple quantity, add extra to inventory
      for (let i = 0; i < recipe.quantity - 1; i++) {
        inventory.add(recipe.name);
      }

      // If item is an intermediate resource, add to the steps list and expand subgraph
      steps.add(item);
      stepSorted.push(item);
      for (const ingredient of recipe.ingredients) {
        for (let i = 0; i < ingredient.quantity; i++) {
          q.push(ingredient.name);
        }
      }
    }

    const b = [];
    b.push('Raw resources:');
    b.push(format(rawResources));
    b.push('\nSteps:');
    b.push(format(steps, (a, b) => -(stepSorted.indexOf(a) - stepSorted.indexOf(b))));
    b.push('\nInventory:');
    b.push(format(inventory));
    return b.join('\n').trim();
  }
}

function format<T>(multiset: MultiSet<T>, compareFn?: (a: T, b: T) => number) {
  const keys = Array.from(multiset.keys()).sort(compareFn);
  const b: string[] = [];
  for (const key of keys) {
    b.push(`${key} x ${multiset.count(key)}`);
  }
  return b.join('\n');
}

class RecipeRow {
  constructor(
    public recipe: Recipe,
    public readonly ingredients: IngredientRow[] = [],
  ) { }

  get name() {
    return this.recipe.name;
  }

  set name(name: string) {
    this.recipe.name = name;
  }

  get quantity() {
    return this.recipe.quantity;
  }

  set quantity(quantity: number) {
    this.recipe.quantity = quantity;
  }

  addIngredient() {
    this.ingredients.push(new IngredientRow({
      name: '',
      quantity: 1,
      recipeId: this.recipe.id,
    }));
  }

  deleteIngredient(ingredient: IngredientRow) {
    remove(this.ingredients, ingredient);
  }
}

class IngredientRow {
  constructor(public ingredient: Ingredient) { }

  get name() {
    return this.ingredient.name;
  }

  set name(name: string) {
    this.ingredient.name = name;
  }

  get quantity() {
    return this.ingredient.quantity;
  }

  set quantity(quantity: number) {
    this.ingredient.quantity = quantity;
  }
}

class RequestRow {
  name = '';
  quantity = 1;
}

function remove<T>(arr: T[], e: T) {
  arr.splice(arr.indexOf(e), 1);
}
