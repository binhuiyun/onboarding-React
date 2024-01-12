const nodeMailer = require("nodemailer");

const tokenHistory = [];
const generateToken = (email) => {
  const token = Math.floor(Math.random() * 1000000);

  setTimeout(() => {
    // Remove the token from the history after 3 hours
    const index = tokenHistory.findIndex((entry) => entry.token === token);
    if (index !== -1) {
      tokenHistory.splice(index, 1);
    }
  }, 3 * 60 * 60 * 1000);
  return token;
};

const sendEmail = async (email, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const storeToken = (email, token) => {
  tokenHistory.push({ email, token, status: "Not submitted" });
};

module.exports = { generateToken, sendEmail, storeToken };
