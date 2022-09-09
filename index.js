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

app.get("/", (req, res) => {
  res.send("App Running");
});

app.use("/api", emailrouter);

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
