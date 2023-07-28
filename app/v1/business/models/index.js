const dbConfig = require("../../../config/config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.videos = require("./video.model.js") (mongoose)
db.products = require("./product.model.js") (mongoose)
db.comments = require("./comment.model.js") (mongoose)
db.users = require("./user.model.js") (mongoose)

module.exports = db;