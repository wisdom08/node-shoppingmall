import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();



// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

const port = 3000;
app.listen(port, () => {
    console.log('server started!');
})

