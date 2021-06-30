const jwt_decode = require("jwt-decode");
  //upload image
  const upload_task_image = async (req, res, next) => {
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));

    //console.log( req.files[0])

    if(req.files !== undefined){
    return res.status(200).json({
        resp_code: 200,
        resp_message: "File uploaded successfully!",
        url:req.files[0].location
    })
    }else{
        return res.status(400).json({
            resp_code: 400,
            resp_message: "Format mismatch error !",
          });
    }
  };  

  module.exports = {
      upload_task_image
  }