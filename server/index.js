const express = require("express");
const cors = require("cors");

const app = express();

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