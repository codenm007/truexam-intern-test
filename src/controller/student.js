require("dotenv").config({ path: "../../.env" });

const JWT = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const validator = require("validator");
//importing models
const User = require ("../models/user");
const {students_in_classes} = require("../models/class");
const { tasks ,submissions} = require("../models/tasks");

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
              role_code: 3
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
    User.forge({ email: req.body.email,role_code:3 })
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
                      role_code:3
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

//student get classes with task 
const myclasses = async (req, res, next) => {
  let jwtlength = req.get("Authorization").length;
  let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));
   
  students_in_classes.where({
    user_id:decoded.sub
  }).fetchAll()
  .then(data =>{
    return res.status(200).json({
      resp_code: 200,
      resp_message: "Student classes fetched successfully!",
      data:data,
    });
  })
  .catch(err =>{
    return res.status(400).json({
      resp_code: 400,
      resp_message: err,
      data: "",
    });
  })

}

//student get tasks class basis
const get_tasks = async (req, res, next) => {
  let jwtlength = req.get("Authorization").length;
  let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

  const {class_id} = req.params;

  if (!class_id) {
    return res.status(400).json({
      resp_code: 400,
      resp_message: "Fields Empty !",
      data: "",
    });
  }
   
  tasks.where({
    class_id:class_id
  }).fetchAll()
  .then(data =>{
    return res.status(200).json({
      resp_code: 200,
      resp_message: "Student tasks fetched successfully!",
      data:data,
    });
  })
  .catch(err =>{
    return res.status(400).json({
      resp_code: 400,
      resp_message: err,
      data: "",
    });
  })

} 

//student submit homework
const add_submission = async (req, res, next) => {
  let jwtlength = req.get("Authorization").length;
  let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

  const {task_id,title,desc,answer_url} = req.body;

  if (!task_id||!title || !answer_url) {
    return res.status(400).json({
      resp_code: 400,
      resp_message: "Fields Empty !",
      data: "",
    });
  }

  //checking if the student already submitted or not
  submissions.where({task_id:task_id,user_id:decoded.sub})
  .fetch()
   .then(()=>{
    return res.status(400).json({
      resp_code: 400,
      resp_message: "You have already submiited you assignment !",
      data: "",
    });
   })
   .catch(() => {
  tasks.where({
    id:task_id
  }).fetch({
    columns:["expires_at"]
  })
  .then(data =>{
    let task_data = JSON.parse(JSON.stringify(data));
    console.log(new Date(task_data.expires_at).getTime() , new Date().getTime());

    //checking if submission datetime is over or not 
    if(new Date(task_data.expires_at).getTime() < new Date().getTime()){
      return res.status(400).json({
        resp_code: 400,
        resp_message: "Sorry submission to this task is expired !",
        data: "",
      });
    }else{
      const new_submission = new submissions({
        task_id:task_id,
        user_id:decoded.sub,
        status:2,
        title:title,
        desc:desc,
        answer_url:answer_url,
        rating:0
      })
      new_submission.save()
      .then(()=>{
        return res.status(200).json({
          resp_code: 200,
          resp_message: "Task submission successful !"
        });
      }).catch(err =>{
        return res.status(400).json({
          resp_code: 400,
          resp_message: "Error occured during submission",
          data:err,
        });
      })
    }

  })
  .catch(err =>{
    return res.status(400).json({
      resp_code: 400,
      resp_message: "Invalid task id !",
      data: "",
    });
  })

});

} 

  module.exports = {
      login,
      signup,
      myclasses,
      get_tasks,
      add_submission
  }