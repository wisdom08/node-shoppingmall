import express from "express";
import asyncHandler from "express-async-handler";
import userModel from '../model/user.js'
import bcrypt from 'bcrypt';

const router = express.Router();
const saltRounds = 10;

router.post("/", asyncHandler(async (req, res) => {
    const {email, password, nickname} = req.body;

    // 이미 가입된 이메일인지 체크 => password 암호화
    const user = await userModel.findOne({email});
    console.log('user', user);
    if (user) {
        return res.json({
            msg: "email is existed"
        })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = new userModel({
        email,
        password: hashedPassword,
        nickname
    })

    const createdUser = await newUser.save();

    res.json({
        msg: "user create",
        user: createdUser
    })

}))



export default router;