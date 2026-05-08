const express = require("express");
const router = express.Router();   // Creates a mini router (used to handle routes separately from main app)
const pool = require("../database");  // connects to your PostgreSQL database
const bcrypt = require("bcrypt");









router.post("/signup", async (req, res) => {   // Gives a Post request to signup endpoint  respond
  const { email, password } = req.body;           //Takes data sent from Postman/frontend

  try {                                     // try the await if it doesn't work run catch 
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);  //Encrypt the password before saving it ,10 is the salt round meaning how much work bcrypt should
                                                                // to secure the password 
    // save to DB
    await pool.query(                                          //Sends SQL query to PostgreSQL database
      "INSERT INTO users (email, password) VALUES ($1, $2)",  // place into table the value the dollar 1 and 2 placeholders
      [email, hashedPassword]                                 // Actual value
    );

    res.json({ message: "User saved securely" });            // response if it gors through

  } catch (err) {                                         //Catch for the error 
    res.status(500).json({ error: err.message });            // response if there is an error
  }
});



module.exports = router;          //Exports this router so it can be used in index.js