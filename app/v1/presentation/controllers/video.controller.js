const videoService = require('../../business/services/video.service');

exports.findAll = async (req, res) => {
  try {
    const videos = await videoService.getAllVideos();
    console.log("Success to get data");
    const responseVideos = videos.map(video => ({
      videoId: video._id,
      urlImageThumbnail: video.urlImageThumb

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
