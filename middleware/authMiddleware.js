import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import UserModel from '../model/user.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_OR_KEY);
            req.user = await UserModel.findById(decoded.id);

            next();
        } catch (e) {
            console.error(e);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized,  no token');
    }

});


const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export {protect, admin};