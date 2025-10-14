const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;

const newRoutes = require("./routes/newsRoutes");
const podcastRoutes = require("./routes/podcastRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newRoutes);
app.use("/api/podcast", podcastRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, () => console.log("MongoDB connected, Server running"))
  )
  .catch((err) => console.log(`An error happened : ${err}`));
