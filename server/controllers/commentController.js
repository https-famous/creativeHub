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






module.exports = {
  createComment
};
