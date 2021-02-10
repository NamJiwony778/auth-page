const verifySignUp  = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");
const storage = require("../helpers/upload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Origin", 
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
  );
    next();
  });

  app.post("/api/auth/signup", storage, verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);

  app.post("/api/auth/signin", controller.signin);
};