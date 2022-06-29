import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model('Product', productSchema);

export default Product;