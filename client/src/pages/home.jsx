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
  return <div className={`toast ${type}`}>{message}</div>;              /* setTimeout(onDone, 2800) — after 2.8 seconds, automatically call onDone (which hides the toast)
return () => clearTimeout(t) — this is cleanup. If the Toast disappears before the timer finishes (e.g. user does something else fast), it cancels the timer so it doesn't try to run on a component that's gone
className={\toast ${type}`}— combines"toast"with either"success"or"error"` to apply the right color styling*/
}

function Home() {
  const navigate  = useNavigate();
  const { logout } = useAuth();                                                    // Grabs the navigate function and pulls logout straight out of your AuthContext.
  const [activeNav, setActiveNav]   = useState("feed");                             // Tracks which sidebar tab is currently selected. Starts on "feed".
  const [refresh, setRefresh]       = useState(0);                       //   A counter with no real meaning by itself — it's just used as a trigger. Every time it changes, it tells the Posts component to re-fetch.
  const [toast, setToast]           = useState(null);                 //  Holds the current toast message, or null if there isn't one.

  // decode email from JWT stored in localStorage
  const [userEmail, setUserEmail] = useState("");     
  const [userId, setUserId]       = useState(null);

  useEffect(() => {                                                                 
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
        setUserEmail(payload.email || "");                                     /*xxxxx.yyyyy.zzzzz
Three parts separated by dots — header, payload, signature.

token.split(".")[1] — grabs the middle part (the payload)
atob(...) — decodes it from Base64 into a readable string
JSON.parse(...) — converts that string into a real JS object so you can read .id and .email off it

useEffect(..., []) with an empty array means run this once, right when the component first loads — that's how you immediately know who's logged in without making another API call.
catch (_) {} — if anything fails (corrupted token, no token), just silently do nothing instead of crashing the app.*/

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
  };                                                     //Called after a new post is created. Increments refresh by 1 (this is the trigger that tells Posts to reload), and shows a success toast.

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const initial = userEmail ? userEmail[0].toUpperCase() : "U";                  //Grabs the first letter of the user's email to use as their avatar initial. If there's no email yet, falls back to "U" (for "User").

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
            onClick={() => setActiveNav("feed")}                                                            //Clicking this button sets activeNav to "feed". The className uses a ternary — if activeNav already equals "feed", it adds the "active" class for highlighting; otherwise no extra class.
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
