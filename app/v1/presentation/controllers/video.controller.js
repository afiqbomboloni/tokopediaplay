const videoService = require('../../business/services/video.service');

// Controller for handling fetch all videos
exports.findAll = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    console.log("Success to get data");
    const responseVideos = videos.map(video => ({
      videoId: video.videoId,
      urlImageThumbnail: video.urlImageThumb,
      title: video.title

    }));
    console.log(videos._id)
    res.status(200).send({videos: responseVideos});
  } catch (error) {
    console.error("Error to fetch data:", error.message);
    res.status(500).send({
      message: "Something went wrong while fetching data.",
    });
  }
};

// Controller for handling fetch one video
exports.findOne = async (req, res) => {
  try {
    const {id} = req.params;
    const video = await videoService.getVideo(id)
    console.log("success get video")
    res.status(200).json(video);
  } catch (error) {
    console.error("Error to fetch data:", error.message);
    res.status(500).send({
      message: "Something went wrong while fetching data.",
    });
  }
}
