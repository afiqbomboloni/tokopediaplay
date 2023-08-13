const bcrypt = require('bcrypt');
const userService = require('../../business/services/user.service');
const jwt = require('jsonwebtoken')

// controller for handling 
exports.register = (req, res) => {
    const {username,password,avatar} = req.body;

    userService.checkUsername(username)
        .then(existingUsername => {
            if(existingUsername) {
                return res.status(400).json({message:"username already exists"});
            }

            return bcrypt.hash(password, 10);
        })
        .then(hashPassword => {
            const newUser = userService.createUser(username, hashPassword, avatar);
            return newUser;
        })
        .then(newUser => {
            console.log("register success");
            req.session.userId = newUser._id;
            return res.status(201).json({message:"new user registered"});
        })
        .catch(error => {
            console.error('Error registering user:', error);
            return res.status(500).json({ 
                message: 'Something went wrong' });
          });
}

exports.login = (req, res) => {
    const {username,password} = req.body;

    userService.getUser(username)
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return bcrypt.compare(password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }

                req.session.userId = user._id;

                const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
                
                return res.status(200).json({message:"login success", token:token});
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({message:"error"})
        })
}

exports.getUsername = (req, res) => {
    userService.getUsername()
        .then(user => {
            return res.status(200).json({user})
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({message:"error"})
        })
}