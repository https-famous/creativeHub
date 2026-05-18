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
      "SELECT * FROM posts WHERE user_id = $1",
      [req.user.id]
    );

    res.json(result.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};
   


module.exports = {
  createPost,getMyPosts
};