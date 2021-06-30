const db = require('../database/db');


const submissions = db.Model.extend({
    tableName: "submissions",
  });

const tasks = db.Model.extend({
    tableName: "tasks",
    submissions(){
        return this.hasMany(submissions);
      }
  });


  module.exports = {
    tasks,
    submissions
  };