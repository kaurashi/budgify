const { Pool } = require("pg");

const pool = new Pool({
    user : "postgres",
    host :"localhost",
    database : "expense_tracker",
    password : "ashi",
    port :5432,
});

module.exports = pool;