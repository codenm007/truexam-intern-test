require("dotenv").config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//importing custom middlewares
const teacher_role_check = require('../middlewares/teacher_role_check');

//imporing controllers
const {login,signup,add_class,add_student_in_class,remove_student_from_class,get_classes,add_tasks,edit_tasks,get_task_with_submissions} = require("../controller/teacher")

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

  router.post(
    "/add_student_in_class",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    add_student_in_class
  );

  router.delete(
    "/remove_student_from_class",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    remove_student_from_class
  );

  router.get(
    "/get_classes",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    get_classes
  );

  router.get(
    "/get_task_with_submissions/:task_id",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    get_task_with_submissions
  );

  router.post(
    "/tasks",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    add_tasks
  );

  router.put(
    "/tasks",
    passport.authenticate("jwt", { session: false }),
    teacher_role_check,
    edit_tasks
  );

module.exports = router;
