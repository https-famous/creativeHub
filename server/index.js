const express = require("express");
const cors = require("cors");

const app = express();
const authMiddleware=require("./middleware/authMiddleware") 
app.use(express.json());

const authRoutes = require("./routes/auth");   //This import our auth file so the main server can access the different route

app.use("/api/auth", authRoutes);   //This connects those routes to your app with a base URL


app.use(cors());                        //Allows frontend to talk to backend 


// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/profile",authMiddleware,(req,res)=>{
  res.json({
    message:"Protected profile data",
    user:req.user
  })
})