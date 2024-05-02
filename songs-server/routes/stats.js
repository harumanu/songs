var express = require("express");
const Song = require("../models/song");
var router = express.Router();

router.get("/", async function (req, res) {
  // This is a very barebones implementation of the stats api that just pulls everything straight from the db
  // There are probably major performance implications to doing it this way. If this was to become a bottleneck,
  // there are several ways to mitigate it.
  //
  // One obvious solution would be to cache this endpoint. Another could be to create some kind of worker that
  // generats these stats asynchronously and saves them to the db. It depends on the use case and how up to date
  // the stats need to be when the user views them.

  const overallStats = await Song.aggregate([
    {
      $group: {
        _id: null,
        uniqueArtists: { $addToSet: "$artist" },
        uniqueSongs: { $addToSet: "$title" },
        uniqueGenres: { $addToSet: "$genre" },
        uniqueAlbums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        numberOfArtists: { $size: "$uniqueArtists" },
        numberOfSongs: { $size: "$uniqueSongs" },
        numberOfGenres: { $size: "$uniqueGenres" },
        numberOfAlbums: { $size: "$uniqueAlbums" },
        _id: 0,
      },
    },
  ]);

  // Number of songs per genre
  const genreStats = await Song.aggregate([
    {
      $group: {
        _id: "$genre",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        genre: "$_id",
        numberOfSongs: "$count",
        _id: 0,
      },
    },
  ]);

  // Number of songs and albums per artist
  const artistStats = await Song.aggregate([
    {
      $group: {
        _id: "$artist",
        numberOfSongs: { $sum: 1 },
        albums: { $addToSet: "$album" },
      },
    },
    {
      $project: {
        artist: "$_id",
        numberOfSongs: 1,
        numberOfAlbums: { $size: "$albums" },
        _id: 0,
      },
    },
  ]);

  // Number of songs per album
  const albumStats = await Song.aggregate([
    {
      $group: {
        _id: { album: "$album", artist: "$artist" },
        numberOfSongs: { $sum: 1 },
      },
    },
    {
      $project: {
        artist: "$_id.artist",
        album: "$_id.album",
        numberOfSongs: 1,
        _id: 0,
      },
    },
  ]);

  res.send({
    albumStats,
    artistStats,
    genreStats,
    overallStats: overallStats[0],
  });
});

module.exports = router;
