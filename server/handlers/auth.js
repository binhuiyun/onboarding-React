const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
  console.log("signin:", req.body.username);
  try {
    // finding a user
    const user = await db.User.findOne({
      username: req.body.username
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
        token
      });
    } else {
      
      return next({
        status: 400,
        message: 'Invalid Email / Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Email / Password.'
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username } = user;
    let token = await jwt.sign(
      {
        id,
        username,
      
      },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};