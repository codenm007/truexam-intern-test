require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const {upload_image} =require("../config/upload");

//imporing controllers
const {login,signup,myclasses,get_tasks,add_submission} = require("../controller/student");
const {upload_task_image} = require("../controller/common");

//importing custom middlewares
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

  router.get(
    "/get_tasks/:class_id",
    passport.authenticate("jwt", { session: false }),
    student_role_check,
    get_tasks
  );

  router.post(
    "/add_submission",
    passport.authenticate("jwt", { session: false }),
    student_role_check,
    add_submission
  );

  router.post(
    "/upload_task_image",
    passport.authenticate("jwt", { session: false }),
    student_role_check,
    upload_image.array('upl',1),
    upload_task_image
  );

module.exports = router;
