const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const emailrouter = require("./routes/Email.js");

const app = express();
app.use(express.json());
app.use(cors());

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
  .catch((error) => console.log(error));
