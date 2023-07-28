const mongoose = require('mongoose');
const db = require('../../business/models')

const connectDb = async () => {
    try {
         await db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected");

    } catch (error) {
        console.log("Cannot connect to the database!", err);
            process.exit(1);
    }
}

module.exports = connectDb;
