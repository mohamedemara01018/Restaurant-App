import express from 'express';
import multer from 'multer';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById } from '../controllers/recipes.controller.js';

const route = express.Router();



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        callback(null, fileName);
    }
}) 

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const imageType = file.mimetype.split('/')[0];

        if (imageType == 'image') {
            return callback(null, true);
        } else {
            return callback(null, appError('this is not an image', 400));
        }
    }
})

route.route('/')
    .get(getAllRecipes)
    .post(upload.single('image'), createRecipe)


route.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe)



export default route