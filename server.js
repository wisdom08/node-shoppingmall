import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import orderRouter from './router/order.js';
import productRouter from './router/product.js';
import userRouter from './router/user.js';
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// connect db
connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

// routing
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.listen(process.env.PORT, () => {
    console.log('server started!');
})

