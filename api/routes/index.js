var express = require('express');
var router = express.Router();
require('../models/recipeModel');
var ctrlRecipes = require('../controllers/recipe.controllers');
var ctrlUsers = require('../controllers/user.controllers');
var ctrlAuthentication = require('../controllers/authentication.controllers');
const auth = require('../../middleware/auth');

//recipes routes
router
  .route('/recipes')
  .get(ctrlRecipes.recipesGetAll);  

router
  .route('/recipes/search/:name')
  .get(ctrlRecipes.recipesSearch)

router
  .route('/recipes/:recipeId')
  .get(ctrlRecipes.recipesGetOne);

  //add 
router 
  .route('/recipes')
  .post(auth, ctrlRecipes.recipesCreate);

//delete
router
  .route('/recipes/:recipeId')
  .delete(auth, ctrlRecipes.recipesDeleteOne)

//authentication
router
  .route('/register')
  .post(ctrlAuthentication.register);

router
  .route('/login')
  .post(ctrlAuthentication.login);

router
  .route('/user')
  .get(auth, ctrlAuthentication.userAuth)

module.exports = router;