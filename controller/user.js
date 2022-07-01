import asyncHandler from "express-async-handler";
import userModel from '../model/user.js'
import bcrypt from "bcrypt";

const saltRounds = 10;

const register =  asyncHandler(async (req, res) => {
    const {email, password, nickname} = req.body;

    // 이미 가입된 이메일인지 체크 => password 암호화
    const user = await userModel.findOne({email});
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

})

const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    // 이메일 존재 확인 => 패스워드 디코딩해서 일치 여부 확인
    userModel.findOne({email}, async (err, user) => {
        if (!user) {
            return res.json({
                msg: "you must register"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.json({
                msg: "wrong password"
            })
        }

        res.json({
            msg: "login successful",
            user: user
        })
    })
})

export {register, login}