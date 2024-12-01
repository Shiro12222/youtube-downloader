const { clear } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');

router.post('/download', async (req, res) => {
  console.log("can receive");
  try{
    const youtubeUrl = req.body.url;

    if (!ytdl.validateURL(youtubeUrl)){
      return res.status(500).send("Invalid Youtube URL");
    } 

    const options = {
      quality: "highestvideo", 
      filter: "videoandaudio",
    };
    // const youtubeInfo = await ytdl.getInfo(youtubeUrl);
    // const downURL = ytdl(youtubeUrl, {format: 'mp4'}).pipe(res);

    console.log(details);
    res.status(200).send(details);
  } catch (err){
    console.log("something error", err.message);
  }
});

router.post('/getTitle', async (req, res) => {
  try {
    const youtubeUrl = req.body.url;

    if(!ytdl.validateURL(youtubeUrl)){
      return res.status(500).send("Invalid Youtube URL");
    }

    const youtubeInfo = await ytdl.getInfo(youtubeUrl);
    const youtubeTitle = youtubeInfo.videoDetails.title;
    const youtubeDescription = youtubeInfo.videoDetails.description;

    res.status(200).json({
      title: youtubeTitle,
      description: youtubeDescription,
      youtubeLink: youtubeUrl
    });
  } catch (err) {
    console.log("something error", err.message);
  }
});

module.exports = router;