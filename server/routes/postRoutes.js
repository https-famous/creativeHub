const express =require("express")
const middleware= require("../middleware/authMiddleware")
const router= express.Router()


const {
    createPost,getMyPosts
}=require ("../controllers/postcontroller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,createPost)
router.get("/", authMiddleware,getMyPosts);

module.exports= router