var express = require('express');
var router = express.Router();
var ctrlRecipes = require('../controllers/recipe.controllers');
var ctrlCategories = require('../controllers/categories.contollers');

router
  .route('/recipes')
  .get(ctrlRecipes.recipesGetAll);  

router
  .route('/recipes/:recipeId')
  .get(ctrlRecipes.recipesGetOne);

router
  .route('/categories')
  .get(ctrlCategories.categoriesGetList);

router
  .route('/categories/:categoryId')
  .get(ctrlCategories.singleCategory);

module.exports = router;