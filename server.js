import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import orderRouter from './router/order.js';
import productRouter from './router/product.js';
import userRouter from './router/user.js';

const app = express();



// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

// routing
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server started!');
})

