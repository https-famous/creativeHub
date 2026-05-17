const express =require("express")
const middleware= require("../middleware/authMiddleware")
const router= express.Router()


const {
    createPost
}=require ("../controllers/postcontroller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,createPost)


module.exports= router