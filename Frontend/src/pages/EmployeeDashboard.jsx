import { useEffect, useState } from "react";
import "../styles/employee.css";
import { getEmployeeFundRequests } from "../services/api";
import { API_BASE_URL } from "../config";

export default function EmployeeDashboard({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [fundRequests, setFundRequests] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadExpenses();
    loadFundRequests();
  }, []);

  const loadExpenses = async () => {
    const res = await fetch(
      `${API_BASE_URL}/api/expenses/employee/${user.userId}`
    );
    const data = await res.json();
    setExpenses(data);
  };

  const loadFundRequests = async () => {
    const data = await getEmployeeFundRequests(user.userId);
    setFundRequests(data);
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        employeeId: user.userId,
        title,
        description,
        amount: Number(amount),
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/api/expenses/submit`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Expense submit failed");
      }

      alert("Expense submitted successfully");
      setTitle("");
      setDescription("");
      setAmount("");
      setFile(null);
      loadExpenses();
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  const total = expenses.length;
  const approved = expenses.filter(e => e.status === "APPROVED").length;
  const rejected = expenses.filter(e => e.status === "REJECTED").length;
  const reimbursed = expenses.filter(e => e.status === "REIMBURSED").length;

  return (
    <div className="employee-bg">

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>

        <div className="stat-card approved">
          <div className="stat-number">{approved}</div>
          <div className="stat-label">Approved</div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-number">{rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>

        <div className="stat-card reimbursed">
          <div className="stat-number">{reimbursed}</div>
          <div className="stat-label">Reimbursed</div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="card">

        <h3>🧾 Submit Expense</h3>

        <form className="expense-form" onSubmit={submitExpense}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label className="file-upload">
            📎 {file ? file.name : "Upload PDF Receipt"}
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>

          <button className="primary-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Expense"}
          </button>
        </form>

        <hr />

        <h3>📋 My Expenses</h3>

        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr>
                <td colSpan="3">No expenses submitted yet</td>
              </tr>
            )}
            {expenses.map(e => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
                <td>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
