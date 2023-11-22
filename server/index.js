const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todo.js");

const authRoutes = require("./routes/user.js");
dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);
function connectDB() {
  mongoose.connect(URL).then(() => {
    console.log("Database Connected!");
  });
}
app.listen(PORT, () => {
  try {
    connectDB();
    console.log("Server running", PORT);
  } catch (error) {
    console.log(error);
  }
});
