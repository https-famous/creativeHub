import { useState } from "react";
import api from "../services/api";

function CreatePost({ onPostCreated, userEmail }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setLoading(true);
    try {
      await api.post("/posts", form);
      setForm({ title: "", content: "" });
      onPostCreated && onPostCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initial = userEmail ? userEmail[0].toUpperCase() : "U";

  return (
    <div className="create-post-card">
      <div className="create-post-header">
        <div className="create-post-avatar">{initial}</div>
        <span className="create-post-label">Share something with the community</span>
      </div>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Give your post a title…"
          value={form.title}
          onChange={handleChange}
          maxLength={120}
        />
        <textarea
          name="content"
          placeholder="What's on your mind? Share your work, thoughts, or a story…"
          value={form.content}
          onChange={handleChange}
        />
        <div className="create-post-footer">
          <button
            className="btn-publish"
            type="submit"
            disabled={loading || !form.title.trim() || !form.content.trim()}
          >
            {loading ? "Publishing…" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
