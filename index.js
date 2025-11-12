// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import serverless from 'serverless-http';
// import recipeRoute from './Routes/Recipe.route.js';

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use('/recipes', recipeRoute);

// app.get("/hello", (req, res) => {
//     res.send("hello from lambda!");
// });

// app.use((error, req, res, next) => {
//     return res.status(error.statusCode || 500).json({
//         status: error.statusResponse || 'error',
//         message: error.message || 'internal server error'
//     });
// });

// // singleton mongoose connection
// let conn = null;
// const connectDB = async () => {
//     if (conn) return conn;
//     conn = await mongoose.connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     console.log("connected to mongo atlas");
//     return conn;
// };

// // create serverless handler once
// const lambdaHandler = serverless(app);

// export const handler = async (event, context) => {
//     context.callbackWaitsForEmptyEventLoop = false;
//     await connectDB(); // ensure mongo connection
//     return lambdaHandler(event, context); // call the serverless handler
// };



import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import recipeRoute from './Routes/Recipe.route.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use('/recipes', recipeRoute);

// test route
app.get("/hello", (req, res) => {
    res.send("hello from local server!");
});

// global error handler
app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        status: error.statusResponse || 'error',
        message: error.message || 'internal server error'
    });
});

// connect to Mongo Atlas
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to mongo atlas'))
    .catch(err => console.log(err));

// run local server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
