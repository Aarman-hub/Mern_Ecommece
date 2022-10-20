import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './config/db.js';
import authRouter from "./routes/auth.js";
import categoryRoute from './routes/category.js';

dotenv.config();

const app = express();
connectDB();


app.use(express.json());
app.use(morgan('dev'));


app.use("/user", authRouter);
app.use("/api", categoryRoute);

const port = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`Server is runnig at ${port}`);
});