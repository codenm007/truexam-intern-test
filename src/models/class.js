const db = require('../database/db');

const {tasks} = require("./tasks");

const students_in_classes = db.Model.extend({
    tableName: "students_in_classes",
  });

const classes = db.Model.extend({
    tableName: "classes",
    students(){
        return this.hasMany(students_in_classes);
      },
    tasks(){
      return this.hasMany(tasks);
    }  
  });


  module.exports = {
    classes,
    students_in_classes
  };