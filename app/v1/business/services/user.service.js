const db = require("../models");
const User = db.users;

exports.checkUsername = async (username) => {
    try {
        const user = await User.findOne({username});
        if (user) {
            return true; 
          } else {
            return false; 
          }
    } catch (error) {
        throw new Error("error when get username");
    }
    
}

exports.getUser = async (username) => {
    try {
        const user = await User.findOne({username});
        return user;
    } catch (error) {
        throw new Error("error when get user");
    }
    
}

exports.createUser = async (username, password, avatar) => {
    try {
        const newUser = new User({
            username,
            password,
            avatar,
        });
    
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw new Error("error when save new user");
    }
}