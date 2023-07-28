const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const db = require("./app/v1/business/models");
const connectDb = require('./app/v1/data/connections/db.connection');
const configs = require('./app/config/config' )

dotenv.config();

let corsOptions = {
    origin: configs.cors
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

connectDb();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.get('/', (req, res) => {
    res.json({message: "welcome to tokopedia play api"});
});


require("./app/v1/presentation/routes/routes") (app);
const PORT = configs.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});