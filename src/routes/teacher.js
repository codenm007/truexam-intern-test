require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//imporing controllers
const {login,signup} = require("../controller/teacher")

//public roues

router.post("/login", login);
router.post("/signup", signup);

//protected routes



module.exports = router;
