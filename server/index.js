const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const { default: mongoose } = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => console.log("Server running on port 4000"));
