import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import "../styles/home.css";

function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className={`toast ${type}`}>{message}</div>;
}

function Home() {
  const navigate  = useNavigate();
  const { logout } = useAuth();
  const [activeNav, setActiveNav]   = useState("feed");
  const [refresh, setRefresh]       = useState(0);
  const [toast, setToast]           = useState(null);

  // decode email from JWT stored in localStorage
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId]       = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
        setUserEmail(payload.email || "");
      }
    } catch (_) {}
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePostCreated = () => {
    setRefresh((r) => r + 1);
    showToast("Post published!", "success");
  };

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const initial = userEmail ? userEmail[0].toUpperCase() : "U";

  return (
    <div className="app-layout">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">✦</div>
          <span className="sidebar-brand-name">CreativeHub</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeNav === "feed" ? "active" : ""}`}
            onClick={() => setActiveNav("feed")}
          >
            <span className="nav-item-icon">🏠</span>
            Feed
          </button>
          <button
            className={`nav-item ${activeNav === "my-posts" ? "active" : ""}`}
            onClick={() => setActiveNav("my-posts")}
          >
            <span className="nav-item-icon">📝</span>
            My Posts
          </button>
          <button
            className={`nav-item ${activeNav === "explore" ? "active" : ""}`}
            onClick={() => setActiveNav("explore")}
          >
            <span className="nav-item-icon">🔍</span>
            Explore
          </button>
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-bottom">
          {userEmail && (
            <div className="sidebar-user">
              <div className="sidebar-avatar">{initial}</div>
              <span className="sidebar-email">{userEmail}</span>
            </div>
          )}
          <button className="btn-logout" onClick={handleLogout}>
            <span>↩</span> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="main-content">
        <div className="topbar">
          <div>
            <h2 className="topbar-title">
              {activeNav === "feed" && "Community Feed"}
              {activeNav === "my-posts" && "My Posts"}
              {activeNav === "explore" && "Explore"}
            </h2>
            <p className="topbar-subtitle">
              {activeNav === "feed" && "See what other creators are sharing"}
              {activeNav === "my-posts" && "Your published posts"}
              {activeNav === "explore" && "Discover new creative work"}
            </p>
          </div>
        </div>

        <CreatePost onPostCreated={handlePostCreated} userEmail={userEmail} />

        <Posts
          refresh={refresh}
          currentUserId={userId}
          showToast={showToast}
        />
      </main>

      {/* ── Toast ───────────────────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Home;
