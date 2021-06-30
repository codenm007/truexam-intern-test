require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//importing custom middlewares
const teacher_role_check = require('../middlewares/teacher_role_check');

//imporing controllers
const {login,signup,add_class} = require("../controller/teacher")

//public roues

router.post("/login", login);
router.post("/signup", signup);

//protected routes
router.post(
    "/add_class",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    add_class
  );


module.exports = router;
