import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "./PostCard";

function Posts({ refresh, currentUserId, showToast }) {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, [refresh]);

  const handleDeleted = (id) => {           
    setPosts((prev) => prev.filter((p) => p.id !== id));                 //prev is the current posts array before the update, goes through every post p, and keeps only the ones whose id is NOT equal to the deleted id
  };

  const handleUpdated = (id, updated) => {          
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))               /*a ternary:
if this post's id matches the one being edited → return a new object that merges the old post with the updated fields*/
    );
  };

  if (loading) {
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">🎨</span>
        <h3>The canvas is blank</h3>
        <p>Be the first to share something with the community.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="feed-header">
        <span className="feed-title">Community Feed</span>
        <span className="feed-count">{posts.length} posts</span>
      </div>

      {posts.map((post) => (                                                  // loops through every post in the posts array and returns a PostCard component for each one. So if you have 5 posts in state, this produces 5 PostCards on the page.
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onDeleted={handleDeleted}
          onUpdated={handleUpdated}
          showToast={showToast}
        />
      ))}
    </div>
  );
}

export default Posts;
