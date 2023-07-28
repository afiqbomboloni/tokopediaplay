const db = require("../../business/models");
const Comment = db.comments;

exports.getComments = async (commentIds) => {
    try {
        const comments = await Comment.find({ _id: { $in: commentIds } });
        return comments;
    } catch (error) {
        throw new Error("error when fetch all comments");
    }
    
};

exports.createComment = async (username, comment) => {
    try {
        const newComment = new Comment({
            username,
            comment
        });
        const savedComment = await newComment.save();
        return savedComment;
    } catch (error) {
        throw new Error(error);
    }
}