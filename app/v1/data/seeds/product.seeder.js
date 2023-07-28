
const dotenv = require('dotenv');
const db = require("../../business/models");
const Product = db.products;
const connectDB = require('../connections/db.connection');

dotenv.config();
connectDB();

const products = [
    {
    //   "productId": "p001",
      "linkProduct": "http://example.com/product1",
      "title": "Product 1",
      "price": 29.99
    },
    {
    //   "productId": "p002",
      "linkProduct": "http://example.com/product2",
      "title": "Product 2",
      "price": 49.99
    }
  ]

const importProducts = async () => {
    try {
        await Product.deleteMany();
        
        await Product.insertMany(products);

        console.log('seeder success')
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }

   
}

const deleteProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Data destroyed')
        process.exit()
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

switch (process.argv[2]) {
    case '-d':
        deleteProducts();
        break;

    default:
        importProducts();
}

