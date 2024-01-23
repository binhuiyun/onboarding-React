const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const errorHandler = require("./handlers/error");
const authRouter = require("./routes/auth");
const tokenHistoryRouter = require("./routes/tokenHistory");
const visaRouter = require("./routes/visa");
const personalInformationRouter = require("./routes/personalInformation");
const userRouter = require("./routes/user");
const applicationRouter = require("./routes/application");
const employeeProfileRouter = require("./routes/employeeProfile");
const folderRouter = require("./routes/folder");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/tokenHistory", loginRequired, tokenHistoryRouter);
app.use("/api/personalInformation", personalInformationRouter);
app.use("/api/visa", visaRouter);
app.use("/api/user", userRouter);
app.use("/api/application", loginRequired, applicationRouter);
app.use("/api/employeeProfile", employeeProfileRouter);
app.use("/api/folder", folderRouter);
app.use(errorHandler);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => console.log("Server running on port 4000"));
