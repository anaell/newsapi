require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { swaggerSpec, swaggerUi } = require("./swagger");

const newRoutes = require("./routes/newsRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const categoryRoutes = require("./routes/categories.route");
const userRoutes = require("./routes/users.route");

const app = express();
const port = process.env.PORT || 5000;

const whitelist = [
  "https://blog-8c82.vercel.app",
  "http://127.0.0.1:5500",
  "http://localhost:5500", // ADD THIS
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request Origin:", origin); // log it

    if (!origin) return callback(null, true); // allow non-browser tools
    if (whitelist.includes(origin)) return callback(null, true);

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Mount your routes
app.use("/api/news", newRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", userRoutes);

// Start server first
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Then connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
