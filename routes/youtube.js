const express = require('express');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');

router.post('/download', async (req, res) => {
  console.log("can receive")
  try{
    const youtubeUrl = req.body.url;

    if (!ytdl.validateURL(youtubeUrl)){
        return res.status(500).send("Invalid link!");
    } else {
        console.log("Link Ok");
    }
  } catch {
    console.log("something error");
  }
  
});

module.exports = router;