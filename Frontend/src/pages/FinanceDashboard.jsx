import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/finance.css";

export default function FinanceDashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  const loadExpenses = async () => {
    const res = await fetch("http://localhost:8080/api/finance/expenses");
    setExpenses(await res.json());
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const reimburse = async (id) => {
    setProcessingId(id);

    await fetch(`http://localhost:8080/api/finance/reimburse/${id}`, {
      method: "POST",
    });

    setProcessingId(null);
    loadExpenses();
  };

  return (
    <div className="finance-bg">
      

      <div className="finance-card">
        <h2 className="finance-title">💰 Finance Reimbursement</h2>

        {expenses.length === 0 ? (
          <div className="empty-state">
            No approved expenses pending reimbursement
          </div>
        ) : (
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Expense</th>
                  <th>Manager Remark</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((e) => (
                  <tr key={e.id}>
                    <td className="employee-cell">
                      {e.employee.username}
                    </td>

                    <td>{e.title}</td>

                    <td className="manager-comment-cell">
                      {e.managerComment || "—"}
                    </td>

                    <td className="amount-cell">
                      ₹{e.amount}
                    </td>

                    <td>
                      <span className="status approved">
                        {e.status}
                      </span>
                    </td>

                    <td className="action-cell">
                      <button
                        className="reimburse-btn"
                        disabled={processingId === e.id}
                        onClick={() => reimburse(e.id)}
                      >
                        {processingId === e.id
                          ? "Processing..."
                          : "Mark Reimbursed"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
