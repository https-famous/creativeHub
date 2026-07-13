if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { Pool } = require("pg");



const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }             //Tells the connection to use SSL (encrypted connection) but skip certificate verification.
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });



module.exports = pool;