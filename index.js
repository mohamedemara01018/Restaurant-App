



import express from 'express'
import cors from 'cors'
import recipeRoute from './Routes/recipe.route.js'
import userRoute from './Routes/user.route.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import serverless from 'serverless-http'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then((res) => {
        console.log('connect to DB is successed')
    })
    .catch(() => {
        console.log('connect to DB is Failed')
    })
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads'))

app.use('/recipes', recipeRoute)
app.use('/users', userRoute)

app.get("/", (req, res) => {
    res.send("hello from local server!");
});

// error handler
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({ message: error.message, status: error.responseText, data: null })
})


app.listen(process.env.PORT, () => {
    console.log('listening the success');
})

// export const handler = serverless(app);