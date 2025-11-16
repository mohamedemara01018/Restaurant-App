import express from 'express';
import multer from 'multer';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from '../controllers/recipes.controller.js';
import { verifyUser } from '../Middlewares/verifyUser.middleware.js';
import { allowTo } from '../Middlewares/allowTo.middleware.js';
import { roles } from '../utils/roles.js';

const route = express.Router();



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        const fileName = `recipe-${Date.now()}.${ext}`;
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
    .get(verifyUser, allowTo([roles.USER, roles.ADMIN]), getAllRecipes)
    .post(upload.single('image'), createRecipe)


route.route('/:id')
    .get(getRecipeById)
    .delete(deleteRecipe)
    .put(upload.single('image'), updateRecipe)



export default route