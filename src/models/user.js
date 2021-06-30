
const db = require('../database/db');

const User = db.Model.extend({
    tableName: "users",
    hasSecurePassword: true,
  });

  

  module.exports = User;