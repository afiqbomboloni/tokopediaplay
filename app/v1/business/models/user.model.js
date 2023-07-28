const { mongoose } = require(".");

module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                username: { 
                    type: String, 
                    required: true, 
                    unique: true 
                }, 
                password: { 
                    type: String, 
                    required: true 
                },
                avatar: { 
                    type: String
                }
            }
        )
    );

    return User;
}