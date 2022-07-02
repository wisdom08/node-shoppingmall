import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import orderRouter from './router/order.js';
import productRouter from './router/product.js';
import userRouter from './router/user.js';
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import fs from 'fs';
import https from 'https';
dotenv.config();

const httpOptions = {
    key: fs.readFileSync('./.cert//key.pem'),
    cert: fs.readFileSync('./.cert/cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
}

const app = express();
const server = https.createServer(httpOptions, app);
// connect db
connectDB();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// routing
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use(notFound)
app.use(errorHandler)

server.listen(process.env.PORT, () => {
    console.log('server started!');
})

