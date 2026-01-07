import { useState } from "react";
import { login, signup } from "../services/api";

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const role = "EMPLOYEE"; // fixed role for signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        await signup(username, password, role);
        alert("Signup successful. Please login.");
        setIsSignup(false);
        setUsername("");
        setPassword("");
      } else {
        const user = await login(username, password);
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isSignup ? "Employee Sign Up" : "Smart Expense Login"}</h2>

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

          {isSignup && (
            <div className="role-fixed">
              Role: <b>EMPLOYEE</b>
            </div>
          )}

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p
            className="switch-link"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "New Employee? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
}
