const { mongoose } = require(".");

module.exports = mongoose => {
    const Video = mongoose.model(
        "video",
        mongoose.Schema(
            {
                videoId: { 
                    type: String, 
                    required: true, 
                    unique: true 
                }, 
                urlImageThumb: { 
                    type: String, 
                    required: true 
                },
                product_id: [{ 
                    type: mongoose.Schema.Types.ObjectId,  
                    ref: 'Product' 
                }],
                comment_id: [{ 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Comment' 
                }],
            }
        )
    );

    return Video;
}