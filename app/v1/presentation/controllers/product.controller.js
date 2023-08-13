const db = require("../../business/models");
const Product = db.products;
const Video = db.videos;
const videoService = require('../../business/services/video.service');
const productService = require('../../business/services/product.service');

// Controller for handling fetch all products
exports.productList = async (req, res) => {
  const { videoId } = req.query;

  try {
    if (!videoId) {
      return res.status(400).json({ message: "videoId required" });
    }

    
    const video = await videoService.getVideo(videoId);
    console.log(video)
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const product_id = video.product_id;
    const products = await productService.getProducts(product_id);

    if (!Array.isArray(products)) {
      return res.status(404).json({ message: "No products found" });
    }

    const responseProducts = products.map(product => ({
      productId: product._id,
      title: product.title,
      price: product.price,
      linkProduct: product.linkProduct
    }));

    console.log('Success get products');
    return res.status(200).json({ products: responseProducts });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Video not found" });
  }
}


// Controller for handling search by title
exports.searchProductByTitle = (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Title parameter is required" });
  }

  const regex = new RegExp(title, "i"); 

  productService.getProductByTitle({ title: regex })
    .then(products => {
      if (products.length === 0) {
        console.log("product not found");
        return res.status(404).json({ message: "No products found" });
      }
      const responseProducts = products.map(product => ({
        productId: product.productId,
        title: product.title,
        price: product.price,
        linkProduct: product.linkProduct
      }));
      console.log('success get products');
      res.status(200).json({product: responseProducts});
    })
    .catch(error => {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};
