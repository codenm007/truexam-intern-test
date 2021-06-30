require("dotenv").config({ path: "../../.env" });

const JWT = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const validator = require("validator");
//importing models
const User = require ("../models/user");
const {classes,students_in_classes} = require ("../models/class");
const {tasks,submissions} = require("../models/tasks");
//for signup
const signup = async (req, res, next) => {
    
    //chcecking if the user exist
    
    User.forge({ email: req.body.email })
      .fetch()
      .then(() => {
        return res.status(400).json({
          resp_code: 400,
          resp_message: "User Already registered !",
        });
      })
      .catch((err) => {

        //console.log(5445)
        //if user is not found then we will start registration process
  
        //checking if the fields are none
        if (
          !req.body.email ||
          !req.body.password ||
          !req.body.first_name ||
          !req.body.last_name ||
          !req.body.country_id ||
          !req.body.city_id ||
          !req.body.state_id ||
          !req.body.gender_code
        ) {
          return res.status(200).json({
            resp_code: 400,
            resp_message: "Fields Empty!",
          });
        }
  
        //validating user inputs
        if (!validator.isEmail(req.body.email)) {
         // console.log(validator.isEmail(req.body.username));
          return res.status(200).json({
            resp_code: 400,
            resp_message: "Invalid email !",
          });
        }
        //console.log(validator.isEmail(req.body.first_name),"jjjhh");
  
        // starting user registration
        
            const new_User = new User({
              gender_code: req.body.gender_code,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              profile_pic: req.body.profile_pic,
              email: req.body.email,
              password: req.body.password,
              country_id: req.body.country_id,
              state_id: req.body.state_id,
              city_id: req.body.city_id,
              role_code: 2
            });
  
            new_User
              .save()
              .then(() => {
                 
                  return res.json({
                    resp_code: 200,
                    resp_message: "Registration Complete",
                  });
                
              })
              .catch((err) => {
                  console.log(err);
                return res.status(400).json({
                    resp_code: 400,
                    resp_message: err,
                  });
              });
         
      })
      .catch((err) => {
          console.log(err)
        return res.status(200).json({
          resp_code: 400,
          resp_message: `Error code :${err}`,
        });
      });
  };

//for login
const login = async (req, res, next) => {

    
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        resp_code: 400,
        resp_message: "Fields Empty !",
        data: "",
      });
    }
    User.forge({ email: req.body.email,role_code:2 })
      .fetch()
      .then((result) => {
        result
          .authenticate(req.body.password)
          .then((user) => {
            //console.log(user);


                    //console.log(customToken,"hvhvggjj");
                    const payload = {
                      sub: `${user.id}`,
                      email: req.body.email,
                      role_code:2
                    };
  
                    const token = JWT.sign(payload, process.env.SECRET_OR_KEY, {
                      expiresIn: process.env.expires_in,
                    });
  
                    return res.status(200).json({
                      resp_code: 200,
                      message:"Login successful",
                      data: token
                    });
                  })
  
          .catch(() => {
            return res.status(401).json({
              resp_code: 401,
              resp_message: "Invalid credentials !",
            });
          });
      })
      .catch(() => {
        return res.status(400).json({
          resp_code: 400,
          resp_message: "User not found !",
        });
      });
  };

  
//teacher add class
const add_class = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    const {subject_id,name} = req.body;
  
    //checking if the fields are none
    if (!subject_id || !name) {
      return res.status(200).json({
        resp_code: 400,
        resp_message: "Fields Empty!",
      });
    }
  
    const new_class = new classes({
     user_id:decoded.sub,
     subject_id:subject_id,
     name:name
    });
  
    new_class
      .save()
      .then((data) => {
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Class added successfully!",
                });

      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          resp_code: 400,
          resp_message: err,
        });
      });
  }; 

//teacher add students in class
const add_student_in_class = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    const {class_id,student_id} = req.body;
  
    //checking if the fields are none
    if (!class_id || !student_id) {
      return res.status(200).json({
        resp_code: 400,
        resp_message: "Fields Empty!",
      });
    }
  
    //checking the given student id is valid or not 

    User.forge({id:student_id, role_code:3})
    .fetch()
    .then(() => {

    students_in_classes.forge({
     user_id:student_id,
     class_id:class_id,
    })
    .fetch()
    .then(()=>{
        return res.status(200).json({
            resp_code: 200,
            resp_message: "Student already added to class!",
          });
    })
    .catch(()=>{

   
    const new_class_student = new students_in_classes({
     user_id:student_id,
     class_id:class_id,
     is_student_suspended:false
    });
  
    new_class_student
      .save()
      .then((data) => {
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Student added to class successfully!",
                });

      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          resp_code: 400,
          resp_message: err,
        });
      });
    });    


    }).catch(err =>{
        console.log(err);
        return res.status(400).json({
            resp_code: 400,
            resp_message: 'Invalid student id passed !',
          });
    })
  };   

//teacher removes student from class
const remove_student_from_class = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    const {roll_no} = req.body;
  
    //checking if the fields are none
    if (!roll_no) {
      return res.status(200).json({
        resp_code: 400,
        resp_message: "Fields Empty!",
      });
    }
  
    //checking the given student id is valid or not 

    students_in_classes.forge({id:roll_no})
    .destroy()
    .then(() => {
   
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Student removed from class successfully!",
                });

    }).catch(err =>{
        return res.status(400).json({
            resp_code: 400,
            resp_message: 'Invalid roll no passed !',
          });
    })
  };  

//get classes with students
const get_classes = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));


    //checking the given student id is valid or not 

    classes.forge({user_id:decoded.sub})
    .fetchAll({
        withRelated: ["students","tasks"],
    })
    .then((data) => {
   
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Classes fetched successfully",
                  data:data
                });

    }).catch(err =>{
        return res.status(400).json({
            resp_code: 400,
            resp_message: err
          });
    })
  };  

//add tasks
const add_tasks = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    const {class_id,title,desc, question_url, expires_at} = req.body;
  
    //checking if the fields are none
    if (!class_id || !title || !question_url || !expires_at) {
      return res.status(200).json({
        resp_code: 400,
        resp_message: "Fields Empty!",
      });
    }
  
    const new_tasks = new tasks({
     user_id:decoded.sub,
     class_id:class_id,
     title:title,
     desc:desc,
     question_url:question_url,
     expires_at:expires_at  
    });
  
    new_tasks
      .save()
      .then((data) => {
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Tasks added successfully!",
                });

      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          resp_code: 400,
          resp_message: err,
        });
      });
  }; 

  //edit tasks
const edit_tasks = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    const {task_id,title,desc, question_url, expires_at} = req.body;
  
    //checking if the fields are none
    if (!task_id) {
      return res.status(200).json({
        resp_code: 400,
        resp_message: "Fields Empty!",
      });
    }
  

    tasks.where({id:task_id,user_id:decoded.sub})
    .save(
        {
        title:title,
        desc:desc,
        question_url:question_url,
        expires_at:expires_at,  
        updated_at: `now()`,
        },
        { patch: true }
      )
      .then((data) => {
                return res.status(200).json({
                  resp_code: 200,
                  resp_message: "Tasks updated successfully!",
                });

      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          resp_code: 400,
          resp_message: err,
        });
      });
  }; 
  
  //get tasks with submissions

  module.exports = {
      login,
      signup,
      add_class,
      add_student_in_class,
      remove_student_from_class,
      get_classes,
      add_tasks,
      edit_tasks
  }