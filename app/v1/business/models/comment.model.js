const { mongoose } = require(".");

module.exports = mongoose => {
    const schema = 
        mongoose.Schema(
            {
                username: { 
                    type: String, 
                    required: true
                }, 
                comment: { 
                    type: String, 
                    required: true 
                },
                timestamp: { 
                    type: Date, 
                    default: Date.now 
                },
                
            },
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Comment = mongoose.model("comment", schema);
    return Comment;
}