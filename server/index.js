require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const path = require("path");
const app = express();

const uri = process.env.url;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// app.use(express.static("public"));
app.use("/*", (req, res) => {
  res.json("Route not defined!");
});

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "courses",
});

// app.listen(3000, () => console.log("Server running on port 3000"));
