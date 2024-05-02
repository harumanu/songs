var express = require("express");
const Song = require("../models/song");
var router = express.Router();

router.get("/", async function (req, res) {
  const songs = await Song.find({});
  res.send(songs);
});

router.post("/", async function (req, res) {
  let error;
  try {
    const song = new Song(req.body);
    await song.save();
    res.send(song);
  } catch (err) {
    error = err;  
    res.status(400).json({
      error: err,
    });
  }
});

router.patch("/:id", async function (req, res) {
  let error;
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.send(song);
  } catch (err) {
    error = err;
    // This could technically be some other kind of error than not found,
    // would be good to check and send the appropriate status code.
    res.status(404).json({
      error: err,
    });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (err) {
    error = err;
    // This could technically be some other kind of error than not found,
    // would be good to check and send the appropriate status code.
    res.status(404).json({
      error: err,
    });
  }
});

module.exports = router;
