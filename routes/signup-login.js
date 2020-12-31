const router = require("express").Router();
const Bcrypt = require("bcryptjs");

let Signup = require("../models/signup.model");

router.route("/").get((req, res) => {});

router.route("/updateAppointments").post(async (req, res) => {

});
router.route("/getAppointment").post(async (req, res) => {
  try {
    let filter = { _id: req.body.id };
    let user = await Signup.findOne(filter).exec();
    if (!user) {
      return res.send({ message: "The id does not exist" });
    }
    let callback = { message: "Got it!" };
    callback.schedule = JSON.parse(user.schedule);
    callback.resources = JSON.parse(user.resources);
    callback.textbooks = JSON.parse(user.textbooks);
    callback.blocks = JSON.parse(user.blocks);
    res.send(callback);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/signup").post((req, res) => {
  signupHelper(req, res, false);
});

router.route("/signup-google").post((req, res) => {
  signupHelper(req, res, true);
});

router.route("/update").post(async (req, res) => {
  try {
    let filter = req.body.filter;
    let update = req.body.update;

    let user = await Signup.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false,
      useFindAndModify: false
    }).exec();

    if (!user) {
      return res.send({ message: "User doesn't exist" });
    }
    
    res.send({
      message: "Your info is updated!!",
      info: user
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.route("/login").post(async (req, res) => {
    try {
      var user = await Signup.findOne({ email: req.body.email, loginType: "normal"}).exec();
      if (!user) {
        return res.send({ message: "Welcome, please sign up" });
      }
      if (!Bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({ message: "The password is incorrect" });
      }
      res.send({
        message: "The username and password combination is correct!",
        info: user
      });
    } catch (error) {
      res.status(500).send(error);
    }
});

router.route("/login-google").post(async (req, res) => {
  try {
    var user = await Signup.findOne({ email: req.body.email, loginType: "google"}).exec();
    if (!user) {
      return res.send({ message: "Welcome, please sign up" });
    } else {
      return res.send({ message: "The username and password combination is correct!", info: user});
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

function signupHelper(req, res, isGoogle){
  const email = req.body.email;
  let findQuery = { email: email };

  Signup.find(findQuery, (err, clusters) => {
    let array = clusters;

    if (array.length == 0) {
      const username = req.body.username;
      let password = "";
      if(!isGoogle){
        password = Bcrypt.hashSync(req.body.password, 10);
      }
      const loginType = req.body.loginType;
      const date = Date.parse(req.body.date);

      const schedule = JSON.stringify([]).trim();
      const blocks = schedule;
      const textbooks = schedule;
      const resources = JSON.stringify([
        {
          fieldName: "period",
          title: "Period",
          instances: [
            { id: "Default Class", text: "Default Class" },
            { id: "Off", text: "Off" }
          ]
        }
      ]).trim();

      let newUser = new Signup({
        username,
        email,
        password,
        loginType,
        date,
        schedule,
        resources,
        blocks,
        textbooks
      });

      if (isGoogle) {
        const googleId = req.body.googleId;
        const imageUrl = req.body.imageUrl;

        newUser = new Signup({
          username,
          email,
          loginType,
          date,
          schedule,
          resources,
          blocks,
          textbooks,
          googleId,
          imageUrl
        });
      }
      newUser
        .save()
        .then(() => {
          Signup.findOne(findQuery, (err, userBack) => {
            res.send({ message: "Sign up successfully!!", info: userBack });
          });
        })
        .catch(err => res.status(400).json("Error: " + err));
    } else {
      res.send({ message: "Email already exists" });
    }
  });
}

module.exports = router;