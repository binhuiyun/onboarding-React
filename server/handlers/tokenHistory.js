const nodeMailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenHistory = require("../models/tokenHistory");

const generateAndSend = async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, 
  {expiresIn: "3h"});
  const tokenHistory = new TokenHistory({
    email,
    link: `http://localhost:5173/register/${token}`,
  });
  await tokenHistory.save();
  try {
    const transporter = nodeMailer.createTransport({
      host : "smtp.163.com",
      port: 465,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your token for Registration",
      text: `Click the following link to register: http://localhost:5173/register/${token}`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    const tokenHistory = new TokenHistory({
      email,
      link: `http://localhost:5173/register/${token}`,
    });
    res.json(tokenHistory);

  } catch (err) {
    console.error("Error sending email:", err);
  }
};


const addTokenHistory = async (req, res) => {
  try{
    const {email, name, link} = req.body;
    const tokenHistory = new TokenHistory({
      email,
      name,
      link,
     
    });
    await tokenHistory.save();
    res.json(tokenHistory);
  } catch(err){
    res.status(500).json({message: "Server Error"});
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

module.exports = { generateAndSend, addTokenHistory, getTokenHistory };
