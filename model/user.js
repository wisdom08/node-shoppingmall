import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true
        },
        profileImg: {
            type: String
        },
        role: {
            type: String,
            default: "USER"
        }

    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

export default User;

