const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const emailrouter = require("./routes/Email.js");

const app = express();
app.use(express.json());
app.use(cors());

const EMAIL__ADDRESS = process.env.EMAIL__ADDRESS;
const EMAIL__PASSWORD = process.env.EMAIL__PASSWORD;
const NAME__OF__EMAIL = "Evbadoloyi Collins Eguasa";

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

app.post("/api/sendemail", async (req, res) => {
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
});

app.use("/api", emailrouter);

app.use("/", (req, res) => {
  res.send("App Running");
});
// main().catch(console.error);

const PORT = process.env.PORT || 5001;
mongoose
  .connect(
    "mongodb+srv://jayden38400:jayden38400@cluster0.dyldyh0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log("App running at port 5001 And Successfully Connected")
    )
  )
  .catch(() => console.log(error));
