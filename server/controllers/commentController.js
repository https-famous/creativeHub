const pool = require("../database");

const createComment = async (req, res) => {

  const { content } = req.body;

  const { id: postId } = req.params; 

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

const updateComment = async (req, res) => {

  const { id } = req.params;
  const { content } = req.body;

  try {

    const comment = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [id]
    );

    if (comment.rows.length === 0) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.rows[0].user_id !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await pool.query(
      "UPDATE comments SET content = $1 WHERE id = $2",
      [content, id]
    );

    res.json({
      message: "Comment updated successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};
const deleteComment= async (req,res)=>{
  const {id}=req.params



    try {

    const comment = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [id]
    );

    if (comment.rows.length === 0) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.rows[0].user_id !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await pool.query(
      "DELETE FROM comments WHERE id = $1",
      [id]
    );

    res.json({
      message: "Comment deleted successfully"
    });
}
catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};


module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
};
