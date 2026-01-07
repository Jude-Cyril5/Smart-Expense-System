import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import FinanceFundingDashboard from "./pages/FinanceFundingDashboard";
import FundingChoicePage from "./pages/FundingChoicePage";
import FundRequestForm from "./pages/FundRequestForm";
import Header from "./components/Header";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [flow, setFlow] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setFlow(null);
  };

  return (
    <div>
      <Header user={user} role={user.role} onLogout={logout} />

      {/* EMPLOYEE */}
      {user.role === "EMPLOYEE" && !flow && (
        <FundingChoicePage onSelect={setFlow} />
      )}

      {user.role === "EMPLOYEE" && flow === "EMPLOYEE" && (
        <EmployeeDashboard user={user} />
      )}

      {user.role === "EMPLOYEE" && flow === "FUND_FORM" && (
        <FundRequestForm
          user={user}
          onBack={() => setFlow(null)}
        />
      )}

      {/* MANAGER */}
      {user.role === "MANAGER" && (
        <ManagerDashboard />
      )}

      {/* FINANCE */}
      {user.role === "FINANCE" && (
        <FinanceFundingDashboard />
      )}
    </div>
  );
}
