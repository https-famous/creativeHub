if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { Pool } = require("pg");                   // Import the postgreSql Library, // pool=A tool that managea database connection

const pool = new Pool({                                 //Creates a connection to your database Node.js connects me to PostgreSQL using these details
  user: "postgres",                                      // the username we used to create postgresql account
  host: "localhost",                                     // the dadtabase runs on my computer
  database: "creative_hub",                               //  name of the dataabase we created
  password: "Anin56cpHx3",
  port: 5432,                                             // Default 
});

module.exports = pool;                                     //Makes the code useable in other files 