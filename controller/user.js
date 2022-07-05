import asyncHandler from "express-async-handler";
import UserModel from '../model/user.js'
import jwt from 'jsonwebtoken';

const register = asyncHandler(async (req, res) => {
    const {email, password, nickname} = req.body;

    // 이미 가입된 이메일인지 체크 => password 암호화
    const user = await UserModel.findOne({email});
    if (user) {
        res.status(400)
        throw new Error('User already exists');
    }


    const newUser = new UserModel({
        email,
        password,
        nickname,
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
        res.status(400)
        throw new Error('you must register')
    }

    // const isMatched = await bcrypt.compare(password, user.password)
    if (user && (await user.passwordMatched(password))) {
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
    } else {
        res.status(400)
        throw new Error('wrong password');
    }
})

const getInfo = asyncHandler(async (req, res) => {
    res.json(req.user)
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find();
    res.json(users)
});

const updateUser =  asyncHandler(async (req, res) => {
    // 유저 조회 => 전체 데이터 교체
    const {email, password, nickname, profileImg, role} = req.body;

    console.log("=>(user.js:76) email, password, nickname, profileImg, role", email, password, nickname, profileImg, role);

    const user = await UserModel.findOne({email});

    console.log("=>(user.js:80) user", user);

    if (user) {
        user.email = email || user.email;
        user.password = password || user.password;
        user.nickname = nickname || user.nickname;
        user.profileImg = profileImg || user.profileImg;
        user.role = role || user.role;

        const updatedUser = await user.save();

        res.json({
            msg: "user put",
            user: updatedUser
        });
    } else {
        res.status(404);
        throw new Error("user not found");
    }


})

export {register, login, getInfo, updateUser, getAllUsers}