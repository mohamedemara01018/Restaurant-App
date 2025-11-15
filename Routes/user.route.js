import express from 'express'
import { login, register } from '../controllers/users.controller.js';

const route = express.Router();

route.route('/register')
    .post(register)

route.route('/login')
    .post(login)



export default route