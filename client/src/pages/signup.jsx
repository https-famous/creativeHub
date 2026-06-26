import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Link — creates a clickable link that changes the page without refreshing.
import api from "../services/api";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });      //Tracks what the user is typing in both inputs. Starts empty.
  const [error, setError] = useState("");                              //error — stores an error message to show the user if something goes wrong. success — stores a success message after account is created. loading — tracks whether the form is currently submitting so you can disable the button.
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/signup", form);
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left decorative panel */}
      <div className="auth-panel">
        <div className="auth-panel-brand">✦ CreativeHub</div>
        <p className="auth-panel-tagline">
          A space for creators to share ideas, tell stories, and build
          something meaningful together.
        </p>
        <div className="auth-panel-quote">
          "Creativity is connecting things others haven't connected yet."
          <span>— Every creator ever</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Create your account</h2>
          <p className="auth-subtitle">
            Already have one? <Link to="/login">Sign in</Link>
          </p>

          {error   && <div className="auth-message error">{error}</div>}
          {success && <div className="auth-message success">{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
