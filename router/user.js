import express from "express";
import {login, register} from "../controller/user.js";

const router = express.Router();

router.post("/",register)

router.post("/login", login)


export default router;