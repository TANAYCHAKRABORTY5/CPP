const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
// console.log(process.env.MONGO_URL);

// console.log(
//   mongoose.connect(process.env.MONGO_URL, (err) => {
//     if (err) throw err;
//   })
// );

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  }
}

const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password });
    jwt.sign({ userid: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json("ok");
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(7080);

// H0UdfqPq3a5ws3nd
