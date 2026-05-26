const { Pool } = require("pg");
const pool =require("../database")

const createPost = async (req,res) =>{
    const {title,content} =req.body;


    try{

        await pool.query(
            "INSERT INTO posts  (title, content, user_id) VALUES ($1, $2, $3)",
            [title,content,req.user.id]
        );
        
        res.json({
            message:"Post created successfully"
        })
    } catch (err){
        res.status(500).json({
          error:err.message
        })
    }
}
    const getMyPosts = async (req, res) => {

  try {
const result = await pool.query(
  `SELECT posts.id,
          posts.title,
          posts.content,
          users.email AS author
   FROM posts
   INNER JOIN users
   ON posts.user_id = users.id
   WHERE posts.id = $1`,
  [id]
);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};

const updatePost= async (req,res) =>{
  const {id} = req.params;
  const {title,content} = req.body;


  try {
    // check if posts exists
    const post= await pool.query(
   "SELECT*FROM posts WHERE id=$1 ",
   [id]
    );

    // post not found
    if (post.rows.length===0){
      res.status(404).json({message:"post not found"})
  }

  //check owernship
  if(post.rows[0].user_id !==req.user.id){
   res.status(403).json({message:"Unauthorized"})
  }

  //update post
    await pool.query(
    "UPDATE posts SET title =$1,  content=$2 WHERE id=$3",
    [title,content,id]
    );

   res.json({
      message: "Post updated successfully"
    });
}
  catch (err){
    res.status(500).json({
     error: err.message
    })
  };
};

const deletepost= async (req,res)=>{
  const {id} =req.params;

  try{
    // check if post exists
    const post =await pool.query(
      "SELECT* FROM posts WHERE id=$1",
      [id]
    );

    if(post.rows.length ===0){
        return res.status(404).json({
          message:"Post Not Found"
        })
    }

  // check ownership
  if(post.rows[0].user_id !== req.user.id){
    return res.status(403).json({
        message: "Unauthorized"
      });
  }

    // delete post
    await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [id]
    );

    res.json({
      message: "Post deleted successfully"
    });
  }
  catch(err){
    res.status(500).json({
      error: err.message
    });
  }
}









module.exports = {
  createPost,getMyPosts,updatePost,deletepost
}