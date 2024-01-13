const jwt = require('jsonwebtoken');
const db = require('../models');

// make sure the user is logged in - Authentication
exports.loginRequired = async function (req, res, next) {
  try {
    const { username , password } = req.body;
    let user = await db.User.findOne({username});
    if(!user){
      console.log("user not found");
      return next({
        status: 400,
        message: 'User not found'
      });
    }

    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    if (!token) {
      console.log("no token");
      return next({
        status: 401,
        message: 'No token"'
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.user = decoded.user;
      console.log("user found", req.user);
      return next();
    } else {
      return next({
        status: 401,
        message: 'Please log in first'
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: 'Please log in first'
    });
  }
};

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded && decoded.id === req.params.id) {
      return next();
    } else {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
};