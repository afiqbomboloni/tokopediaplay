

const db = require("../../business/models");
const Video = db.videos;
const Product = db.products;
const connectDB = require('../connections/db.connection');

connectDB();

const importData = async () => {
    try {
      const product2 = new Product({
        productId: "prod002",
        linkProduct: "https://www.tokopedia.com/kahfofficial/kahf-true-brotherhood-eau-de-toilette-35-ml?extParam=whid%3D9930759",
        title: "Kahf Facial Wash",
        price: 80000,
      });
      await product2.save();
  
      const product2Id = product2._id;
  
      const video1 = new Video({
        videoId: "1vzo4_w8ibo",
        urlImageThumb: "https://img.youtube.com/vi/1vzo4_w8ibo/0.jpg",
        product_id: [product2Id], 
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
