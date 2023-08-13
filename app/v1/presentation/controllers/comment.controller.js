const db = require("../../business/models");
const Comment = db.comments;
const commentService = require("../../business/services/comment.service");
const videoService = require('../../business/services/video.service');

// controller for handling fetch all comments
exports.commentList = async (req, res) => {
    const { videoId } = req.query;
  
    if (!videoId) {
      return res.status(400).json({
        message: 'video id required',
      });
    }
  
    try {
      const video = await videoService.getVideo(videoId);
  
      if (!video) {
        return res.status(404).json({
          message: 'video id not found',
        });
      }
  
      const commentIds = video.comment_id;
      const comments = await commentService.getComments(commentIds);
  
      if (!comments || comments.length === 0) {
        return res.status(404).json({
          message: 'comments not found for this video',
        });
      }
  
      const responseComments = comments.map((comment) => ({
        username: comment.username,
        comment: comment.comment,
        timestamp: comment.timestamp,
      }));
  
      console.log(`success get all comments in video ${videoId}`);
      return res.status(200).json({ comments: responseComments });
    } catch (error) {
      console.log('Error fetching comments:', error.message);
      return res.status(500).json({
        message: 'Something went wrong while fetching comments',
      });
    }
  };
  
// controller for handling submit comment
exports.submitComment = (req, res) => {
    const {videoId, username, comment} = req.body;

    if(!videoId || !username || !comment) {
        return res.status(400).json({ 
            success: false,
            fail: true, 
            message: 'videoId, username, and comment are required' });
    }

    videoService.getVideo(videoId)
        .then(video => {
          if(!video) {
            res.status(404).json({
              message:"error",
              success:false,
              fail:true
          })
          }
          return commentService.createComment(username, comment)
        })
        .then(savedComment => {
            return videoService.pushCommentId(videoId, savedComment._id);
        })
        .then(() =>{
            console.log('comment saved');
            return res.status(201).json(
              {
                success:true,
                fail:false
              });
        })
        .catch((err) => {
            console.error('error while submitted', err);
            res.status(500).json({
                message:"error",
                success:false,
                fail:true
            })
        })
}