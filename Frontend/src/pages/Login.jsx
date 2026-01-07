import { useState } from "react";
import { login, signup } from "../services/api";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await signup(username, password);
      alert("Signup successful. Please login.");
      setUsername("");
      setPassword("");
      setError("");
    } catch {
      setError("Signup failed (username may exist)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Smart Expense Login</h2>
        <p className="subtitle">
          Expense Reimbursement & Approval System
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span>👤</span>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="btn-row">
            <button type="submit">Login</button>

            <button
              type="button"
              className="signup-btn"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>

          <p className="role-hint">
            Roles: Employee | Manager | Finance
          </p>
        </form>
      </div>
    </div>
  );
}
