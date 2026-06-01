const pool = require("../database");

const createComment = async (req, res) => {

  const { content } = req.body;

  const { postId } = req.params; 

  try {

    // create comment
    const result = await pool.query(
      `INSERT INTO comments (content, user_id, post_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content, req.user.id, postId]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};


const getCommentsByPost =async (req,res)=>{
  const { postId} = req.params;
  try {
    const result =await pool.query(
      `SELECT comments.id,
              comments.content,
              users.email AS author
       FROM comments
       INNER JOIN users
       ON comments.user_id = users.id
       WHERE comments.post_id = $1`,
      [postId]
    );

    res.json(result.rows);
  }
  catch(err){
    res.status(500).json({
      error: err.message
  })
}
}


module.exports = {
  createComment,
  getCommentsByPost
};
