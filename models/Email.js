const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emailScehma = new Schema({
  emailName: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  emailPassword: {
    type: String,
  },
});

const emailDetails = mongoose.model("email", emailScehma);

module.exports = emailDetails;
