const express = require("express");
const router = express.Router();
const { getLatestPodcast } = require("../controllers/podcastController");

router.get("/latest", getLatestPodcast);

module.exports = router;
