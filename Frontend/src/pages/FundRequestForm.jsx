import { useState } from "react";
import { submitFundRequest as submitFundRequestAPI } from "../services/api";

export default function FundRequestForm({ user, onBack }) {
  const [form, setForm] = useState({
    phone: "",
    department: "",
    reason: "",
    amount: "",
    expectedDate: "",
    remarks: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitFundRequestAPI({
      employeeId: user.userId,
      employeeName: user.username,
      phone: form.phone,
      department: form.department,
      reason: form.reason,
      amount: form.amount,
      expectedDate: form.expectedDate,
      remarks: form.remarks
    });

    alert("Fund request submitted successfully");
    onBack();
  };

  return (
    <div className="employee-bg">
      <div className="card">
        <h3>💰 Fund Request Form</h3>

        <form className="expense-form" onSubmit={handleSubmit}>
          <input value={user.username} disabled />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount Required"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="expectedDate"
            value={form.expectedDate}
            onChange={handleChange}
            required
          />

          <textarea
            name="reason"
            placeholder="Need for Fund"
            rows="3"
            className="fund-textarea"
            value={form.reason}
            onChange={handleChange}
            required
          />

          <textarea
            name="remarks"
            placeholder="Remarks (Optional)"
            rows="2"
            className="fund-textarea"
            value={form.remarks}
            onChange={handleChange}
          />

          <div className="btn-row">
            <button type="submit" className="primary-btn">
              Submit Request
            </button>

            <button
              type="button"
              className="logout-pill"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
