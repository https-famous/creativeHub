const express = require("express");
const router = express.Router();   // Creates a mini router (used to handle routes separately from main app)
const authMiddleware = require("../middleware/authMiddleware");
const {
  signupUser,loginUser
}= require("../controllers/authControllers")

router.post("/signup", signupUser);

router.post("/login", loginUser);





module.exports = router;          //Exports this router so it can be used in index.js