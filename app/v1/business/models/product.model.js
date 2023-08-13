const mongoose = require("mongoose")

module.exports = mongoose => {
    const Product = mongoose.model(
        "product",
        mongoose.Schema(
            {
                linkProduct: { 
                    type: String, 
                    required: true 
                },
                title: { 
                    type: String, 
                    required: true 
                },
                price: { 
                    type: Number, 
                    required: true 
                }
            },
        )
    );

    return Product;
}