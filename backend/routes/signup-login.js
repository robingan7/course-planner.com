const router = require("express").Router();
const Bcrypt = require("bcryptjs");

let Signup = require("../models/signup.model");

router.route("/").get((req, res) => {});

router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = Bcrypt.hashSync((req.body.password), 10);
  const date = Date.parse(req.body.date);

  Signup.find({ email: email }, (err, clusters) => {
    const newUser = new Signup({
      username,
      email,
      password,
      date
    });

    let array = clusters;
    if (array.length == 0) {
      newUser
        .save()
        .then(() => res.send({message: "Sign up successfully!!"}))
        .catch(err => res.status(400).json("Error: " + err));
    } else {
      res.send({ message: "Email already exists" });
    }
  });
});

router.route("/login").post(async (req, res) => {
    try {
      var user = await Signup.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.send({ message: "The email does not exist" });
      }
      if (!Bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({ message: "The password is invalid" });
      }
      res.send({
        message: "The username and password combination is correct!"
      });
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;