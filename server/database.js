if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { Pool } = require("pg");

console.log("CREATING POOL WITH:", process.env.DATABASE_URL ? "DATABASE_URL" : "individual credentials");

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

pool.on("error", (err) => {
  console.log("POOL ERROR:", err.message, err.code);
});

module.exports = pool;