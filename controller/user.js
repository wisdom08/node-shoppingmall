import asyncHandler from "express-async-handler";
import UserModel from '../model/user.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar'

const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
    const {email, password, nickname} = req.body;

    // 이미 가입된 이메일인지 체크 => password 암호화
    const user = await UserModel.findOne({email});
    if (user) {
        return res.json({
            msg: "email is existed"
        })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 프로필 이미지 생성
    const profileImg = gravatar.url(
        email,
        {s: '200', r: 'pg', d: 'mm'},
        {protocol: 'https'}
    );

    const newUser = new UserModel({
        email,
        password: hashedPassword,
        nickname,
        profileImg
    })

    const createdUser = await newUser.save();

    res.json({
        msg: "user create",
        user: createdUser
    })

})

const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body;

    // 이메일 존재 확인 => 패스워드 디코딩해서 일치 여부 확인 => return JWT!
    const user = await UserModel.findOne({email: email});

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

    // JSON WEB TOKEN 생성
    const token = await jwt.sign(
        {id: user._id},
        process.env.SECRET_OR_KEY,
        {expiresIn: "30m"}
    );

    res.json({
        msg: "login successful",
        token
    })
})

export {register, login}