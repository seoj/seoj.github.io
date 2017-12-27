let uid = 0;

class Recipe {
  constructor(/** @type {{ id:number, name:string, servingSize:number, ingredients:Ingredient[] }} */ { id, name = `Recipe ${id}`, servingSize = 1, ingredients = [] } = {}) {
    this.id = id;
    this.name = name;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
  }
}

class Ingredient {
  constructor(/** @type {{ name:string, amount:number, unit:string }} */ { name, amount = 1, unit = 'each' } = {}) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}

class RecipeService {
  constructor() {
    /** @type {Recipe[]} */
    this.recipes = [];
  }

  /** @param {number} id */
  get(id) {
    return this.recipes.find(e => e.id === id);
  }

  create() {
    this.recipes.push(new Recipe({ id: uid++ }));
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipes.splice(this.recipes.findIndex(e => e === recipe), 1);
  }

  persist() {
    localStorage.setItem('recipes', angular.toJson(this.recipes));
  }

  load() {
    const recipesString = localStorage.getItem('recipes');
    if (recipesString) {
      /** @type {[]} */
      const recipesJson = angular.fromJson(recipesString);
      recipesJson.forEach(recipe => recipe.ingredients = recipe.ingredients.map(ingredient => new Ingredient(ingredient)));
      this.recipes = recipesJson.map(recipe => new Recipe(recipe));

      this.recipes.forEach(e => {
        if (e.id > uid) {
          uid = e.id + 1;
        }
      });
    }
  }
}

class RecipesCtrl {
  /** @param {RecipeService} recipeService */
  constructor(recipeService) {
    this.recipeService = recipeService;
    this.recipes = this.recipeService.recipes;
  }

  add() {
    this.recipeService.create();
    this.recipes = this.recipeService.recipes;
    this.onChange();
  }

  /** @param {Recipe} recipe */
  remove(recipe) {
    this.recipeService.remove(recipe);
    this.recipes = this.recipeService.recipes;
    this.onChange();
  }

  onChange() {
    this.recipeService.persist();
  }
}

class IngredientsCtrl {
  /**
   * @param {*} $routeParams
   * @param {RecipeService} recipeService
   */
  constructor($routeParams, recipeService) {
    this.recipeService = recipeService;
    this.recipe = this.recipeService.get(Number($routeParams['recipeId']));
  }

  add() {
    this.recipe.ingredients.push(new Ingredient());
    this.onChange();
  }

  /** @param {Ingredient} ingredient */
  remove(ingredient) {
    this.recipe.ingredients.splice(this.recipe.ingredients.findIndex(e => e === ingredient), 1);
    this.onChange();
  }

  onChange() {
    this.recipeService.persist();
  }
}

angular.module('recipes', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider.when('/recipes', {
      controller: RecipesCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'recipes.ng.html',
    }).when('/recipes/:recipeId/ingredients', {
      controller: IngredientsCtrl,
      controllerAs: '$ctrl',
      templateUrl: 'ingredients.ng.html',
    }).otherwise('/recipes');
  })
  .service('recipeService', RecipeService)
  .run((recipeService) => {
    recipeService.load();
  });
