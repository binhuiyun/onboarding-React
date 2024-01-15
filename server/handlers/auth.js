const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res, next) {
  console.log("signin:", req.body.username);
  try {
    // finding a user
    const user = await db.User.findOne({
      username: req.body.username,
    });

    const { id, username } = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Username / Password.",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Username / Password.",
    });
  }
};

exports.verifyToken = async function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.json(decoded);
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid Token" });
  }
};

exports.register = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username } = user;
    let token = jwt.sign(
      {
        id,
        username,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      token,
    });  
  }catch (err) {
    // if a validation fails!
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
