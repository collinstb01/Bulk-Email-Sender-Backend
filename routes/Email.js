const express = require("express");
const {
  updateEmailDetails,
  getEmailDetails,
  login,
  sendEmail,
} = require("../controllers/Email");

const emailrouter = express.Router();

emailrouter.post("/email/updateemaildetails", updateEmailDetails);
emailrouter.get("/email/getemail", getEmailDetails);
emailrouter.post("/email/login", login);
emailrouter.post("/sendemail", sendEmail);

module.exports = emailrouter;
