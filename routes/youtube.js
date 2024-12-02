const { clear } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ytdl = require("@distube/ytdl-core");


router.post('/download', async (req, res) => {
  console.log("can receive");
  try{
    const youtubeUrl = req.body.url;

    if (!ytdl.validateURL(youtubeUrl)){
      return res.status(500).send("Invalid Youtube URL");
    } 

    const options = {
      quality: "137", 
      requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
      }
    };

    const youtubeInfo = await ytdl.getInfo(youtubeUrl);
    const title = youtubeInfo.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '').substring(0, 100);
    if (title == ""){
      title += "1";
    }

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp4"`);

    ytdl(youtubeUrl, options)
    .on('error', (err) => {
      console.error('Error downloading video:', err);
      res.status(500).json({ error: "Failed to download video." });
    }).pipe(res);

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