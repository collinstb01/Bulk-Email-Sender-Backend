const mongoose = require("mongoose");
const emailDetails = require("../models/Email.js");

const login = async (req, res) => {
  const { emailPassword, emailAddress } = req.body;
  console.log(process.env.LOGIN__PASSWORD);
  console.log({ emailPassword, emailAddress });
  try {
    if (
      emailPassword !== process.env.LOGIN__PASSWORD &&
      emailAddress !== process.env.LOGIN__USERNAME
    ) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({ message: "Successfully Login" });
  } catch (error) {
    console.log(error);
  }
};
const updateEmailDetails = async (req, res) => {
  const { emailPassword, emailName, emailAddress, id } = req.body;

  try {
    const updatedData = await emailDetails.updateOne({ _id: id }, [
      {
        $set: {
          emailPassword: emailPassword,
          emailAddress: emailAddress,
          emailName: emailName,
        },
      },
    ]);

    return res
      .status(200)
      .json({ message: "Successfully Updated", updatedData });
  } catch (error) {
    console.log(error);
  }
};

const getEmailDetails = async (req, res) => {
  try {
    const data = await emailDetails.find();

    console.log(data);
    return res.status(200).json({ message: "All data Retrieved", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateEmailDetails,
  getEmailDetails,
  login,
};
