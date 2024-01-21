const jwt = require('jsonwebtoken');
const db = require('../models');
const express = require('express');
const router = express.Router();

// exports.tokenRequired =  async (req, res, next) => {
//   try {
//   const token = req.headers.authorization.split(' ')[1]; // Bearer token
//   console.log("token", token);
//   const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
//   if (decoded) {
//     req.user = decoded.user;
//     console.log("user found", req.user);
//     return next();
//   } else {
//     return next({
//       status: 401,
//       message: 'Token not found'
//     });
//   }
// }catch (err) {
//   return next({
//     status: 401,
//     message: 'Token not valid'
//   });
// }
// };



//make sure the user is logged in - Authentication
exports.loginRequired = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer token
    console.log("login required", token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
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
    console.log("auth user:", req.params.id)
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

