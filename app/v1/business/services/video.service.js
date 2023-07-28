const db = require("../models");
const Video = db.videos;

exports.getAllVideos = async () => {
  try {
    const projection = { urlImageThumb: 1, _id: 1 };
    const videos = await Video.find({}, projection);
    return videos;
  } catch (error) {
    throw new Error("Error fetching videos from the database.");
  }
};

exports.getVideo = async (videoId) => {
  try {
    const video = await Video.findOne({_id: videoId})
    console.log(video)
    if (!video) {
      throw new Error("Video not found");
    }
    return video;
  } catch (error) {
    throw new Error(error);
  }
  
}

exports.pushCommentId = async (videoId, commentId) => {
  try {
    const video = await Video.findById(videoId);
    video.comment_id.push(commentId);
    await video.save();
  } catch (error) {
    throw new Error('error push comment_id on video');
  }
  
}
