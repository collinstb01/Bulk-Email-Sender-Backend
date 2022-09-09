const express = require("express");
const {
  updateEmailDetails,
  getEmailDetails,
  login,
} = require("../controllers/Email");

const emailrouter = express.Router();

emailrouter.post("/email/updateemaildetails", updateEmailDetails);
emailrouter.get("/email/getemail", getEmailDetails);
emailrouter.post("/email/login", login);

module.exports = emailrouter;
