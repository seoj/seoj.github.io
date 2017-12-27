class Ingredient {
  constructor(/** @type {{ name:string, amount:number, unit:string }} */ { name, amount = 1, unit = 'each' }) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  /** @return {*} */
  serialize() {
    return {
      name: this.name,
      amount: this.amount,
      unit: this.unit,
    };
  }

  hash() {
    return `${this.name}_${this.unit}`;
  }

  static deserialize(serialized) {
    return new Ingredient({
      name: serialized.name,
      amount: serialized.amount,
      unit: serialized.unit,
    });
  }
}

class Recipe {
  constructor(/** @type {{ name:string, servingSize:number, ingredients:Ingredient[] }} */ { name, servingSize = 1, ingredients = [] }) {
    this.name = name;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
  }

  /** @return {*} */
  serialize() {
    return {
      name: this.name,
      servingSize: this.servingSize,
      ingredients: this.ingredients.map(e => e.serialize()),
    };
  }

  static deserialize(serialized) {
    return new Recipe({
      name: serialized.name,
      servingSize: serialized.servingSize,
      ingredients: serialized.ingredients.map(e => Ingredient.deserialize(e)),
    });
  }
}

class Meal {
  constructor(/** @type {{ recipe:Recipe, servingSize:number }} */ { recipe, servingSize }) {
    this.recipe = recipe;
    this.servingSize = servingSize;
  }

  /** @return {Ingredient[]} */
  getIngredients() {
    const factor = this.servingSize / this.recipe.servingSize;
    return this.recipe.ingredients.map(e => new Ingredient({
      name: e.name,
      amount: e.amount * factor,
      unit: e.unit,
    }));
  }
}

class RecipeSvc {
  constructor() {
    /** @type {Recipe[]} */
    this.recipes = [];
  }

  /** @return {Recipe[]} */
  list() {
    return [...this.recipes];
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipes.splice(this.recipes.findIndex(e => e === recipe), 1);
  }

  create() {
    this.recipes.push(new Recipe({}));
  }

  /** @param {string} name */
  get(name) {
    return { ...this.recipes.find(e => e.name === name) };
  }

  persist() {
    localStorage.setItem('recipes', JSON.stringify(this.recipes.map(e => e.serialize())));
  }

  load() {
    const serialized = localStorage.getItem('recipes');
    if (serialized) {
      this.recipes = JSON.parse(serialized).map(e => Recipe.deserialize(e));
    }
  }
}

class PlannerCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    /** @type {Recipe[]} */
    this.recipes = recipeSvc.list();
    /** @type {Meal[]} */
    this.meals = [];
    /** @type {Recipe} */
    this.selectedRecipe = null;
    /** @type {number} */
    this.selectedRecipeServingSize = 1;
    /** @type {Ingredient[]} */
    this.ingredients = [];
  }

  add() {
    if (this.selectedRecipe) {
      this.meals.push(new Meal({ recipe: this.selectedRecipe, servingSize: this.selectedRecipeServingSize }));
      this.selectedRecipe = null;
      this.selectedRecipeServingSize = 1;
      this.onChange();
    }
  }

  /** @param {Meal} meal */
  remove(meal) {
    this.meals.splice(this.meals.findIndex(e => e === meal), 1);
    this.onChange();
  }

  onChange() {
    /** @type {Map<string,Ingredient>} */
    const map = new Map();
    this.meals.forEach(meal => {
      meal.getIngredients().forEach(e => {
        let ingredient = map.get(e.hash());
        if (!ingredient) {
          ingredient = new Ingredient({
            name: e.name,
            unit: e.unit,
            amount: 0,
          });
          map.set(e.hash(), ingredient);
        }
        ingredient.amount += e.amount;
      });
    });
    this.ingredients = Array.from(map.values()).sort((a, b) => a.hash().localeCompare(b.hash()));
  }
}

class RecipesCtrl {
  /** @param {RecipeSvc} recipeSvc */
  constructor(recipeSvc) {
    this.recipeSvc = recipeSvc;
    this.recipes = this.recipeSvc.list();
  }

  add() {
    this.recipeSvc.create();
    this.recipes = this.recipeSvc.list();
    this.onChange();
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipeSvc.remove(recipe);
    this.recipes = this.recipeSvc.list();
    this.onChange();
  }

  onChange() {
    this.recipeSvc.persist();
  }
}

class IngredientsCtrl {
  /**
   * @param {*} $routeParams
   * @param {RecipeSvc} recipeSvc 
   */
  constructor($routeParams, recipeSvc) {
    this.recipeSvc = recipeSvc;
    this.recipe = this.recipeSvc.get($routeParams['recipeName']);
  }

  add() {
    this.recipe.ingredients.push(new Ingredient({}));
    this.onChange();
  }

  remove(ingredient) {
    this.recipe.ingredients.splice(this.recipe.ingredients.findIndex(e => e === ingredient), 1);
    this.onChange();
  }

  onChange() {
    this.recipeSvc.persist();
  }
}

angular.module('recipes', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
      .when('/planner', {
        controller: PlannerCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'planner.ng.html',
      })

      .when('/recipes', {
        controller: RecipesCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'recipes.ng.html',
      })

      .when('/recipes/:recipeName/ingredients', {
        controller: IngredientsCtrl,
        controllerAs: '$ctrl',
        templateUrl: 'ingredients.ng.html',
      });
  })
  .service('recipeSvc', RecipeSvc)
  .run((recipeSvc) => {
    recipeSvc.load();
  });