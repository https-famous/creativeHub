if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log("ENV CHECK:", {
  DATABASE_URL: process.env.DATABASE_URL ? "EXISTS" : "MISSING",
  JWT_SECRET: process.env.JWT_SECRET ? "EXISTS" : "MISSING",
  PORT: process.env.PORT ? "EXISTS" : "MISSING"
});
const cors = require("cors");
const express = require("express");


const app = express();
const authMiddleware=require("./middleware/authMiddleware") 
app.use(cors());                        //Allows frontend to talk to backend 
app.use(express.json());           // tells Express to read incoming request bodies that are in JSON format and convert them into a JavaScript object 
const postRoutes = require("./routes/postRoutes")
const authRoutes = require("./routes/auth");   //This import our auth file so the main server can access the different route
const commentRoutes=   require("./routes/postRoutes")
app.use("/api/auth", authRoutes);   //This connects those routes to your app with a base URL
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)


 

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