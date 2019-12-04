const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const LOCAL = "mongodb://localhost:27017/Courseplanner";
const CLUSTER = "mongodb+srv://robingan7:gzt11111@cluster0-t6fgx.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(CLUSTER || LOCAL,  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch(err => {
  console.log(err);
});

const connection = mongoose.connection;
connection.on("open", () => {
  console.log("MongoDB database connection established successfully");
});

const signupLogin = require("./routes/signup-login");
app.use("/signup-login", signupLogin);

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 