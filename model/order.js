import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        }
    },
    {
        timestamps:true
    }
);


const Order = mongoose.model('Order', orderSchema);

export default Order;