const jwt_decode = require("jwt-decode");

const teacher_role_check = (req, res, next)=>{
    let jwtlength = req.get("Authorization").length;
    let decoded = jwt_decode(req.get("Authorization").slice(7, jwtlength));
    //checking if its teacher role code or not 
    if(decoded.role_code !== 2) {
        return res.status(403).json({
            resp_code: 403,
            resp_message: "Unauthorized action!",
          });
    }else{
        next();
    }
    
}

module.exports = teacher_role_check;