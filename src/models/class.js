const db = require('../database/db');


const students_in_classes = db.Model.extend({
    tableName: "students_in_classes",
  });

const classes = db.Model.extend({
    tableName: "classes",
    students(){
        return this.hasMany(students_in_classes);
      }
  });


  module.exports = {
    classes,
    students_in_classes
  };