const mongoose = require("mongoose");
const emailDetails = require("../models/Email.js");
const nodemailer = require("nodemailer");

const EMAIL__ADDRESS = process.env.EMAIL__ADDRESS;
const EMAIL__PASSWORD = process.env.EMAIL__PASSWORD;
const NAME__OF__EMAIL = "Evbadoloyi Collins Eguasa";

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

const main = async ({ text, attachments, emails, subject }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL__ADDRESS, // generated ethereal user
        pass: "nktwzmvxyemczgow", // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: `${NAME__OF__EMAIL} <${EMAIL__ADDRESS}>`, // sender address
      // from: `"${subject}" <${EMAIL__ADDRESS}>`, // sender address
      to: "me", // list of receivers
      bcc: JSON.parse(emails),
      subject: `${subject}`, // Subject line
      text: `${text}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(error);
  }
};

const sendEmail = async (req, res) => {
  try {
    const { text, attachments, emails, subject } = req.body;

    main({ text, attachments, emails, subject }).catch((error) => {
      if (error) {
        return res.status(404).json({ message: "Message not Sent" });
      }
    });
    return res.status(200).json({ message: "Message Sent Successfully" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  updateEmailDetails,
  getEmailDetails,
  login,
  sendEmail,
};
