import { useEffect, useState } from "react";
import "../styles/manager.css";
import { API_BASE_URL } from "../config";

export default function ManagerDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [comments, setComments] = useState({});

  const loadExpenses = async () => {
    const res = await fetch(`${API_BASE_URL}/api/manager/expenses`);
    if (!res.ok) {
      console.error("Failed to load manager expenses");
      return;
    }
    setExpenses(await res.json());
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const process = async (id, action) => {
    await fetch(`${API_BASE_URL}/api/manager/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expenseId: id,
        action,
        comment: comments[id] || "",
      }),
    });

    setComments((prev) => ({ ...prev, [id]: "" }));
    loadExpenses();
  };

  return (
    <div className="manager-bg">
      <div className="manager-card">
        <h2 className="manager-title">📝 Manager Approvals</h2>

        {expenses.length === 0 && (
          <p className="empty-text">No pending expenses</p>
        )}

        {expenses.map((e) => (
          <div key={e.id} className="approval-card">

            <div className="expense-center">
              <h4 className="expense-title">{e.title}</h4>

              <div className="amount-tooltip">
                <span className="expense-amount">₹{e.amount}</span>
                <div className="tooltip">
                  {e.description || "No description provided"}
                </div>
              </div>
            </div>

            <div className="action-panel">
              <input
                placeholder="Add comment (optional)"
                value={comments[e.id] || ""}
                onChange={(ev) =>
                  setComments({ ...comments, [e.id]: ev.target.value })
                }
              />

              <div className="btn-row">
                <button
                  className="approve-btn"
                  onClick={() => process(e.id, "APPROVE")}
                >
                  ✓ Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => process(e.id, "REJECT")}
                >
                  ✕ Reject
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
