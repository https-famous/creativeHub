import { useState, useEffect } from "react";
import api from "../services/api";

function PostCard({ post, currentUserId, onDeleted, onUpdated, showToast }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments]         = useState([]);
  const [commentText, setCommentText]   = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [sendingComment, setSendingComment]   = useState(false);
  const [editing, setEditing]   = useState(false);
  const [editForm, setEditForm] = useState({ title: post.title, content: post.content });
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);

  const initial = post.author ? post.author[0].toUpperCase() : "U";
  const isOwner = post.user_id === currentUserId;

  // fetch comments when expanding
  useEffect(() => {
    if (!showComments) return;
    const load = async () => {
      setLoadingComments(true);
      try {
        const res = await api.get(`/posts/${post.id}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };
    load();
  }, [showComments, post.id]);

  const handleSendComment = async () => {
    if (!commentText.trim()) return;
    setSendingComment(true);
    try {
      const res = await api.post(`/posts/${post.id}`, { content: commentText });
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setSendingComment(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    setDeleting(true);
    try {
      await api.delete(`/posts/${post.id}`);
      showToast && showToast("Post deleted", "success");
      onDeleted && onDeleted(post.id);
    } catch (err) {
      showToast && showToast("Could not delete post", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) return;
    setSaving(true);
    try {
      await api.put(`/posts/${post.id}`, editForm);
      showToast && showToast("Post updated", "success");
      onUpdated && onUpdated(post.id, editForm);
      setEditing(false);
    } catch (err) {
      showToast && showToast("Could not update post", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-card-header">
        <div className="post-author-row">
          <div className="post-avatar">{initial}</div>
          <div>
            <div className="post-author-name">{post.author || "Creator"}</div>
            <div className="post-meta">CreativeHub member</div>
          </div>
        </div>

        {isOwner && (
          <div className="post-actions">
            <button
              className="btn-icon"
              title="Edit post"
              onClick={() => setEditing(true)}
            >✏️</button>
            <button
              className="btn-icon danger"
              title="Delete post"
              onClick={handleDelete}
              disabled={deleting}
            >🗑️</button>
          </div>
        )}
      </div>

      {/* Body */}
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>

      <div className="post-divider" />

      {/* Comments section */}
      <div className="comments-section">
        <button
          className="comments-toggle"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {showComments ? "Hide comments" : "View comments"}
        </button>

        {showComments && (
          <>
            {loadingComments ? (
              <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)", marginTop: 12, fontFamily: "Arial" }}>
                Loading comments…
              </p>
            ) : (
              <div className="comments-list">
                {comments.length === 0 && (
                  <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)", fontFamily: "Arial" }}>
                    No comments yet. Be the first!
                  </p>
                )}
                {comments.map((c) => (
                  <div className="comment-item" key={c.id}>
                    <div className="comment-avatar">
                      {c.author ? c.author[0].toUpperCase() : "U"}
                    </div>
                    <div className="comment-bubble">
                      <div className="comment-author">{c.author || "Creator"}</div>
                      <div className="comment-text">{c.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="comment-input-row">
              <input
                className="comment-input"
                placeholder="Add a comment…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              />
              <button
                className="btn-comment-send"
                onClick={handleSendComment}
                disabled={sendingComment || !commentText.trim()}
              >
                {sendingComment ? "…" : "Post"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Edit post</h3>
            <input
              type="text"
              value={editForm.title}
              placeholder="Title"
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />
            <textarea
              value={editForm.content}
              placeholder="Content"
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEditing(false)}>
                Cancel
              </button>
              <button
                className="btn-publish"
                onClick={handleSaveEdit}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
