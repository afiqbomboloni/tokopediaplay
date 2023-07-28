const db = require("../models");
const Product = db.products;

exports.getProducts = async (product_id) => {
    try {
        const products = await Product.find({_id:{$in: product_id}});
        return products
    } catch (error) {
        throw new Error("error when get product by _id");
    }
    
}

exports.getProductByTitle = async (title) => {
    try {
        const products = await Product.find(title);
        return products
    } catch (error) {
        throw new Error("error when get product by title");
    }
    
}

