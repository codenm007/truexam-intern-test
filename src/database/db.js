require("dotenv").config({ path: "../../.env" });
const knex = require("knex");
const knexDb = knex( {client: "pg",
connection: {
    host: process.env.db_host,
    user: process.env.db_user,
    port: process.env.db_port,
    password: process.env.db_password,
    database: process.env.db_database,
}} );
const bookshelf = require("bookshelf");
const securePassword = require("bookshelf-secure-password");
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;