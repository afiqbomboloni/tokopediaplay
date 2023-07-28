

const db = require("../../business/models");
const Video = db.videos;
const Product = db.products;
const connectDB = require('../connections/db.connection');

connectDB();

const importData = async () => {
    try {
      const product1 = new Product({
        productId: "prod001",
        linkProduct: "http://example.com/product1",
        title: "Product 1",
        price: 100,
      });
      await product1.save();
  
      const product1Id = product1._id;
  
      const video1 = new Video({
        // videoId: "20303",
        urlImageThumb: "http://detik.com/images",
        product_id: [product1Id], 
        comment: [],
      });
      await video1.save();
  
      console.log("Data imported successfully");
      process.exit();
    } catch (error) {
      console.error("Error importing data:", error);
      process.exit(1);
    }
  };


const deleteVideos = async () => {
    try {
        await Video.deleteMany();
        console.log('Data destroyed')
        process.exit()
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

switch (process.argv[2]) {
    case '-d':
        deleteVideos();
        break;
    default:
        importData();
}
