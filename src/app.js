const express = require("express");
const app = new express();
const parser = require("body-parser");
const cors = require('cors');
const helmet = require("helmet");

app.use(helmet());

//cors allowed to all

app.use(cors());
//body parser configarations
app.use(
  parser.urlencoded({
    extended: false,
  })
);

app.use(parser.json());

app.get("/", (req, res) => {
    res.json({
    resp_code : 200,
    resp_message : "Hi from Nilanjan, don't worry server is up and running !",
    });
  });

  //importing routes
 
  const student = require("./routes/student");
  const teacher = require("./routes/teacher");

  //using routes

  
  app.use('/student',student);
  app.use('/teacher',teacher);
  
  //invalid route settings
app.all("*", (req, res) => {
  res.status(200).json({
   resp_code : 204,
   resp_message : "Not a valid endpoint ! , Galat site visit hogaya ji XD"
   });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT , ()=>
console.log(`Server is listening on port ${PORT}`)
);
