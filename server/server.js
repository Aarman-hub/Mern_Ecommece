import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from "./routes/auth.js";
import categoryRoute from './routes/category.js';
import productRoute from './routes/product.js';

dotenv.config();

const app = express();
connectDB();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



app.use("/api", authRouter);
app.use("/api", categoryRoute);
app.use("/api", productRoute);

const port = process.env.PORT || 8000;


app.listen(port, ()=>{
    console.log(`Server is runnig at ${port}`);
});