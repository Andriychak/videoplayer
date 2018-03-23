const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = 'mongodb://anvol:panvol@ds219879.mlab.com:19879/videoplayer';
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error " + err);
  }
});

router.get('/videos', function (req, res) {
  console.log('Get request for all videos');
  Video.find({}).exec(function (err, videos) {
    if (err) {
      console.log("Error retreiving videos.");
    } else {
      res.json(videos);
    }
  });
});

router.get('/videos/:id', function (req, res) {
  console.log('Get request for a single video');
  Video.findById(req.params.id).exec(function (err, aVideo) {
    if (err) {
      console.log("Error retreiving video.");
    } else {
      res.json(aVideo);
    }
  });
});

router.post('/video', function (req, res) {
  console.log("Posting a video");
  let newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save((err, insertedVideo) => {
    if (err) {
      console.log("Error inserting video");
    } else {
      res.json(insertedVideo);
    }
  });
});

router.put('/video/:id', (req, res) => {
  console.log("Updating video");
  Video.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }
    }, {
      new: true
    },

    (err, updatedVideo) => {
      if (err) {
        res.send("Error updating video" + err);
      } else {
        res.json(updatedVideo);
      }
    }
  );
});

router.delete('/video/:id', (req, res) => {
  console.log("Deleting video");
  Video.findByIdAndRemove(req.params.id, (err, deletedVideo) => {
    if (err) {
      res.send("Error deleting video" + err);
    } else {
      res.json(deletedVideo);
    }
  });
});


module.exports = router;
