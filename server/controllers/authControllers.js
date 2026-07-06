if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// sign up controller
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ message: "User saved securely" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Login controller
const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // success — token now includes email too, so the frontend
    // can read it straight off the decoded payload
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful", token
    });

  } catch (err) {
     console.log("FULL ERROR:", err);
  res.status(500).json({ 
    error: err.message || "unknown error",
    detail: err.detail || "no detail",
    code: err.code || "no code",
    stack: err.stack
  });
      }

}

module.exports = {
  signupUser, loginUser
}