const nodeMailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenHistory = require("../models/tokenHistory");

const generateAndSend = async (req, res) => {
  const { email, name } = req.body;
  const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, 
    // TODO: change expiresIn to 3h for production
  {expiresIn: "72h"});
  try{
    const tokenHistory = new TokenHistory({
    email,
    name,
    link: `http://localhost:5173/register/${token}`,
  });
  await tokenHistory.save();
  // try {
  //   const transporter = nodeMailer.createTransport({
  //     host : "smtp.163.com",
  //     port: 465,
  //     secure: false,
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.PASSWORD,
  //     },
  //   });
  //   const mailOptions = {
  //     from: process.env.EMAIL,
  //     to: email,
  //     subject: "Your token for Registration",
  //     text: `Click the following link to register: http://localhost:5173/register/${token}`,
  //   };
  //   const info = await transporter.sendMail(mailOptions);
  //   console.log("Email sent: " + info.response);
  
    res.json(tokenHistory);

  } catch (err) {
    console.error("Error sending email:", err);
  }
};


const getTokenHistory = async(req, res) => {
   try{
      const tokenHistory = await TokenHistory.find();
      res.json(tokenHistory);     
   }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
};

const updateTokenStatus = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.body;
    const tokenHistory = await TokenHistory.findByIdAndUpdate(id, {status}, {new: true});
    res.json(tokenHistory);
  }catch(err){
    res.status(500).json({message: "Server Error"});
  }
};  

module.exports = { generateAndSend, getTokenHistory, updateTokenStatus };
