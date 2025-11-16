import express from 'express'
import { deleteAllUser, getAllUser, login, register } from '../controllers/users.controller.js';

const route = express.Router();


route.route('/')
    .get(getAllUser)
    .delete(deleteAllUser)

route.route('/register')
    .post(register)

route.route('/login')
    .post(login)



export default route