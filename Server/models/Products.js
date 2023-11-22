const mongoose=require("mongoose")

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
},
    { timestamps: true }
);

const product = mongoose.model("product", ProductSchema);
module.exports = product;