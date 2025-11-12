import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById } from '../controllers/recipes.controller.js';

const route = express.Router();


route.route('/')
    .get(getAllRecipes)
    .post(createRecipe)


route.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe)



export default route