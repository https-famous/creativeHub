const pool=require("../database")   // connects to your PostgreSQL database
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")




// sign up controller
const signupUser = async (req, res) => {   // Gives a Post request to signup endpoint  respond
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
}




//Login controller
const loginUser=async (req, res) => {        // route path for login

  const { email, password } = req.body;

  try {

    // find user by email         
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",     // runs though the table on the placeholder to locate the particular email
      [email]                                     //value in that placeholder 
    );

    // check if user exists
    if (result.rows.length === 0) {                //checks the stored result of the user, roes cause there are multiple object ,length becomes 
                                                    //1 if a user is found and 0 if he isn't
      return res.status(400).json({                  // repsone if user doesn't exsits,The return is important cause if the valus is incorrect it automatically stps the check at that stage 
        message: "Invalid password"
      });
    }

    const user = result.rows[0];                         //if 1  user is stord if 0 nothing happens

    // compare entered password with hashed password
    const validPassword = await bcrypt.compare(          //compares the password the user drops to the actual user password in the database
      password,
      user.password
    );

    // wrong password
    if (!validPassword) {
      return res.status(400).json({     // The return is important cause if the valus is incorrect it automatically stps the check at that stage 
        message: "Invalid password"
      });
    }

    // success

    const token = jwt.sign(     // creates a token
  { id: user.id },                      // gets the id from the table 
  "secretkey",                                //is the secret password JWT uses to create and verify tokens.
  { expiresIn: "1h" }                           // expires in 1 hour 
);
    res.json({
      message: "Login successful",token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
module.exports={
    signupUser,loginUser
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzc4Nzk5MDUwLCJleHAiOjE3Nzg4MDI2NTB9.q7B2qgKvGTRsaCGUkqsh5A_Muve_5-IhkmBVjSXn0zQ
