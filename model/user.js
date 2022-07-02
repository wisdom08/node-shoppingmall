import mongoose from "mongoose";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

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

userSchema.pre('save', async function (next) {
    try {
        console.log('entered!')

        const profileImg = gravatar.url(
            this.email,
            {s: '200', r: 'pg', d: 'mm'},
            {protocol: 'https'}
        );

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        this.profileImg = profileImg;

        console.log('exited!');
        next();

    } catch (e) {
        next(e);
    }
});

userSchema.methods.passwordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);


export default User;

