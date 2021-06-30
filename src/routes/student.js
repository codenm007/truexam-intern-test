require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//imporing controllers
const {login,signup,myclasses} = require("../controller/student");
const student_role_check = require("../middlewares/student_role_check");

//public roues

router.post("/login", login);
router.post("/signup", signup);

//protected routes
router.get(
    "/myclasses",
    passport.authenticate("jwt", { session: false }),
    student_role_check,
    myclasses
  );


module.exports = router;
