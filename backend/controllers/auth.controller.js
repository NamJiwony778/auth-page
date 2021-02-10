const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  let avatarFile = req.file;
  let username = req.body.username;
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password, 8);

  console.log("Image:", avatarFile);
  const avatarPath =  'http://localhost:3001/uploads/' + avatarFile.filename;
  console.log("ImagePath:", avatarPath);

  const user = new User({
    avatarPath,
    username,
    email,
    password
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });  
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        avatarPath: user.avatarPath,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};