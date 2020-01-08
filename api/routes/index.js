var express = require('express');
var router = express.Router();
require('../models/recipeModel');
var ctrlRecipes = require('../controllers/recipe.controllers');
var ctrlCategories = require('../controllers/categories.contollers');
var ctrlUsers = require('../controllers/user.controllers');
var ctrlAuthentication = require('../controllers/authentication.controllers');

//recipes routes
router
  .route('/recipes')
  .get(ctrlRecipes.recipesGetAll);  

router
  .route('/recipes/:recipeId')
  .get(ctrlRecipes.recipesGetOne);

router 
  .route('/recipes')
  .post(ctrlRecipes.recipesCreate);

//categories routes
router
  .route('/categories')
  .get(ctrlCategories.categoriesGetList);

router
  .route('/categories/:categoryId')
  .get(ctrlCategories.singleCategory);


//authentication
router
  .route('/register')
  .post(ctrlAuthentication.register);

router
  .route('/login')
  .post(ctrlAuthentication.login);


module.exports = router;