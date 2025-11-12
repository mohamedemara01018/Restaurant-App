import { asyncWrapper } from "../Middlewares/asyncWrapper.middleware.js";
import { recipeModel as Recipe } from "../Modules/recipes.Module.js";
import { AppError } from "../utils/appError.js";
import { responseStatus } from "../utils/responseStatus.js";

const getAllRecipes = asyncWrapper(async (req, res) => {
    const recipes = await Recipe.find()
    res.status(200).json({ status: responseStatus.SUCCESS, data: { recipes } })
})


const getRecipeById = asyncWrapper(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id)
    if (!recipe) {
        const fail = AppError(`id => ${req, params.id} is not found`, 404, responseStatus.FAIL);
        return next(fail)
    }
    res.status(200).json({ status: responseStatus.SUCCESS, data: { recipe } })
})

const createRecipe = asyncWrapper(async (req, res) => {

    const newRecipe = new Recipe(req.body)
    const savedRecipe = await newRecipe.save()
    res.status(201).json({ status: responseStatus.SUCCESS, data: { recipe: savedRecipe } })
})

const updateRecipe = asyncWrapper(async (req, res) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
    if (!updatedRecipe)
        return res.status(404).json({ message: "Recipe not found" })
    res.status(200).json(updatedRecipe)
})


const deleteRecipe = asyncWrapper(async (req, res) => {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)
    if (!deletedRecipe) {
        const fail = AppError('Recipe not found', 404, responseStatus.FAIL);
        return next(fail)
    }
    res.status(200).json({ message: "Recipe deleted successfully" })
})


export {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
}