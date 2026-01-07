import "../styles/common.css";

export default function Header({ user, role, onLogout }) {
  if (!user) return null;

  return (
    <header className="header">
      <h2 className="app-title">Smart Expense System</h2>

      <div className="header-right">
        {/* Avatar + Tooltip */}
        <div className="profile-wrapper">
          <div className="avatar">👤</div>

          <div className="profile-tooltip">
            <div className="tooltip-username">
              Username : {user.username}
            </div>
            <div className="tooltip-role">
              Role : {role}
            </div>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
