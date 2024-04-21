const db = require("../models");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res, next) {
  console.log("signin:", req.body.email);
  try {
    // finding a user
    const user = await db.User.findOne({
      email: req.body.email,
    });

    const { id, email} = user;

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.password);

    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        email,
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
  console.log("verify token", token);
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
    let { id, email} = user;
    console.log("register", email);
    let token = jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      email,
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

