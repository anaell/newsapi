// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const port = process.env.PORT;

// const newRoutes = require("./routes/newsRoutes");
// const podcastRoutes = require("./routes/podcastRoutes");

// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/news", newRoutes);
// app.use("/api/podcast", podcastRoutes);

// app.get("/", (req, res) => {
//   res.send("Server is up!");
// });

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() =>
//     app.listen(port, () => console.log("MongoDB connected, Server running, Server running on http://localhost:5000"))
//   )
//   .catch((err) => console.log(`An error happened : ${err}`));

// const express = require("express");
// const app = express();
// const port = 5000;

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// app.listen(port, () =>
//   console.log(`Test server running on http://localhost:${port}`)
// );

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { swaggerSpec, swaggerUi } = require("./swagger");

const newRoutes = require("./routes/newsRoutes");
const podcastRoutes = require("./routes/podcastRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount your routes
app.use("/api/news", newRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server first
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Then connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
