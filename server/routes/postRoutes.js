const express =require("express")
const middleware= require("../middleware/authMiddleware")
const router= express.Router()


const {
    createPost,getMyPosts,
    updatePost,
    deletepost,
}=require ("../controllers/postcontroller");
const {
    createComment,getCommentsByPost
}=require("../controllers/commentController")
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,createPost)
router.get("/", authMiddleware,getMyPosts);
router.put("/:id", authMiddleware,updatePost);
router.delete("/:id",authMiddleware,deletepost)
router.post("/:id",authMiddleware,createComment)
router.get("/:postId", getCommentsByPost)
module.exports= router

