import { useEffect, useState } from "react";
import { getPendingFundRequests, processFundRequest } from "../services/api";
import "../styles/finance.css";

export default function FinanceFundingDashboard() {
  const [requests, setRequests] = useState([]);
  const [comment, setComment] = useState({});

  const loadRequests = async () => {
    setRequests(await getPendingFundRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (id, action) => {
    await processFundRequest(id, action, comment[id] || "");
    loadRequests();
  };

  return (
    <div className="finance-bg">
      <div className="finance-card">
        <h2 className="finance-title">💼 Fund Requests</h2>

        {requests.length === 0 && (
          <p className="empty-state">No pending fund requests</p>
        )}

        {requests.map((r) => (
          <div key={r.id} className="approval-card">
            <div>
              <b>{r.employeeName}</b> — ₹{r.amount}
              <p>{r.reason}</p>
              <small>Expected: {r.expectedDate}</small>
            </div>

            <div className="action-panel">
              <input
                placeholder="Finance comment"
                value={comment[r.id] || ""}
                onChange={(e) =>
                  setComment({ ...comment, [r.id]: e.target.value })
                }
              />

              <div className="btn-row">
                <button
                  className="approve-btn"
                  onClick={() => handleAction(r.id, "APPROVE")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleAction(r.id, "REJECT")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
